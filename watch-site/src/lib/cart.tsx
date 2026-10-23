"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { product } from "@/config/product";
import { MAX_QTY } from "./cart-limits";

export type CartLine = { productId: string; quantity: number };

type State = { lines: CartLine[] };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; quantity: number }
  | { type: "set"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

const STORAGE_KEY = "wd-cart.v1";
const clampQty = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(n)));

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const existing = state.lines.find((l) => l.productId === action.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId
              ? { ...l, quantity: clampQty(l.quantity + action.quantity) }
              : l,
          ),
        };
      }
      return {
        lines: [...state.lines, { productId: action.productId, quantity: clampQty(action.quantity) }],
      };
    }
    case "set":
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, quantity: clampQty(action.quantity) } : l,
        ),
      };
    case "remove":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "clear":
      return { lines: [] };
  }
}

/** Only the known catalogue item survives hydration; anything else is dropped. */
function sanitize(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        (l as CartLine).productId === product.id &&
        Number.isFinite((l as CartLine).quantity),
    )
    .map((l) => ({ productId: l.productId, quantity: clampQty(l.quantity) }));
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** Subtotal in KRW, or null while any line has no confirmed price. */
  subtotal: number | null;
  ready: boolean;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", lines: sanitize(JSON.parse(raw)) });
    } catch {
      // Storage unavailable (private mode, blocked): cart lives in memory only.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // ignore
    }
  }, [state.lines, ready]);

  const add = useCallback((productId: string, quantity = 1) => {
    dispatch({ type: "add", productId, quantity });
    setDrawerOpen(true);
  }, []);
  const setQuantity = useCallback(
    (productId: string, quantity: number) => dispatch({ type: "set", productId, quantity }),
    [],
  );
  const remove = useCallback((productId: string) => dispatch({ type: "remove", productId }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal =
      product.price === null
        ? null
        : state.lines.reduce((sum, l) => sum + l.quantity * (product.price ?? 0), 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      ready,
      add,
      setQuantity,
      remove,
      clear,
      drawerOpen,
      setDrawerOpen,
    };
  }, [state.lines, ready, add, setQuantity, remove, clear, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
