import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/checkout";
import { product } from "@/config/product";
import { MAX_QTY } from "@/lib/cart-limits";

export async function POST(req: Request) {
  if (product.price === null) {
    return NextResponse.json({ message: "판매 가격이 확정되지 않아 주문할 수 없습니다." }, { status: 409 });
  }

  let quantity = 0;
  try {
    const body = (await req.json()) as { lines?: { productId?: unknown; quantity?: unknown }[] };
    for (const line of body.lines ?? []) {
      if (line.productId === product.id && typeof line.quantity === "number") quantity += line.quantity;
    }
  } catch {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }
  quantity = Math.floor(quantity);
  if (quantity < 1 || quantity > MAX_QTY) {
    return NextResponse.json({ message: "수량을 확인해 주세요." }, { status: 400 });
  }

  const result = await createCheckout(quantity);
  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }
  return NextResponse.json({ checkoutUrl: result.checkoutUrl });
}
