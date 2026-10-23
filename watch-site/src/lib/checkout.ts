import "server-only";

/**
 * Checkout integration — Shopify Storefront API (cartCreate → hosted checkout).
 *
 * Payment is never simulated: when the store is not configured, checkout is
 * reported as unavailable and the UI says so. Card data never touches this
 * site; the buyer pays on the platform's hosted checkout page.
 */

type ShopifyConfig = {
  domain: string;
  token: string;
  variantId: string;
  apiVersion: string;
};

function shopifyConfig(): ShopifyConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN?.trim();
  const variantId = process.env.SHOPIFY_VARIANT_ID?.trim();
  if (!domain || !token || !variantId) return null;
  return {
    domain: domain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    token,
    variantId,
    apiVersion: process.env.SHOPIFY_API_VERSION?.trim() || "2026-07",
  };
}

export function checkoutStatus(): { connected: boolean; provider: string | null } {
  return shopifyConfig() ? { connected: true, provider: "Shopify" } : { connected: false, provider: null };
}

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

export type CheckoutResult =
  | { ok: true; checkoutUrl: string }
  | { ok: false; reason: "not_configured" | "platform_error"; message: string };

export async function createCheckout(quantity: number): Promise<CheckoutResult> {
  const cfg = shopifyConfig();
  if (!cfg) {
    return { ok: false, reason: "not_configured", message: "결제 플랫폼이 아직 연동되지 않았습니다." };
  }
  try {
    const res = await fetch(`https://${cfg.domain}/api/${cfg.apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": cfg.token,
      },
      body: JSON.stringify({
        query: CART_CREATE,
        variables: { input: { lines: [{ merchandiseId: cfg.variantId, quantity }] } },
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, reason: "platform_error", message: `결제 플랫폼 응답 오류 (${res.status})` };
    }
    const json = (await res.json()) as {
      data?: {
        cartCreate?: {
          cart?: { checkoutUrl?: string } | null;
          userErrors?: { message: string }[];
        };
      };
      errors?: { message: string }[];
    };
    const userErrors = json.data?.cartCreate?.userErrors ?? [];
    const url = json.data?.cartCreate?.cart?.checkoutUrl;
    if (json.errors?.length || userErrors.length || !url || !url.startsWith("https://")) {
      const msg = json.errors?.[0]?.message ?? userErrors[0]?.message ?? "체크아웃 URL을 받지 못했습니다.";
      return { ok: false, reason: "platform_error", message: msg };
    }
    return { ok: true, checkoutUrl: url };
  } catch {
    return { ok: false, reason: "platform_error", message: "결제 플랫폼에 연결할 수 없습니다." };
  }
}
