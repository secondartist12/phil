# Wheel Dial — Automotive Luxury Watch Store

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3.

Dark, cinematic e-commerce site for a watch with a sports-wheel dial
(black round case, silver multi-spoke dial, red hands, green caliper-style
accent, black metal link bracelet).

```bash
cd watch-site
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Pages

| Route | Content |
| --- | --- |
| `/` | 01 Hero · 02 Design DNA (interactive hotspots) · 03 Details · 04 On the Wrist · 05 Showcase (gallery + buy) · 06 Final CTA |
| `/product` | Gallery + zoom lightbox, name/price, features, wear shots, spec table, styling compare slider, box contents, shipping summary, FAQ, buy section, mobile sticky buy bar |
| `/cart` | Cart (localStorage-persisted) + order summary + checkout |
| `/checkout` | Redirects to `/cart` (checkout starts there) |
| `/faq`, `/contact`, `/shipping-returns`, `/privacy`, `/terms` | Support & legal |
| `/api/checkout` | Creates a Shopify cart and returns its hosted `checkoutUrl` |

## Undecided facts (single source of truth)

Nothing unverified is invented. Every undecided value is `null` and renders
as "가격 미정" / "확정 후 안내":

- `src/config/product.ts` — product name (working name shown), **price**,
  materials, movement, water resistance, size, weight, glass, warranty, box
  contents. Spec rows carry `status: "visible"` (seen in the product images)
  or `"pending"`.
- `src/config/site.ts` — brand name (working wordmark "WHEEL DIAL" shown),
  business registration info (상호, 사업자등록번호, 통신판매업 신고번호 …),
  shipping fee / carrier / lead time, return shipping fee, `indexable`.
- No reviews, ratings, discounts, or stock counts exist anywhere in the site.

## Checkout

Payment is **never simulated**. Checkout becomes active only when both:

1. `product.price` is set, and
2. Shopify Storefront env vars are set (see `.env.example`):
   `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN`, `SHOPIFY_VARIANT_ID`,
   optional `SHOPIFY_API_VERSION`.

Then "결제하기" calls `cartCreate` and redirects to Shopify's hosted
checkout; card data never touches this site. Otherwise the cart shows
"결제 준비 중" with the exact reason. The Shopify adapter
(`src/lib/checkout.ts`) has **not been tested against a live store** —
verify with a development store before launch. To use a Korean PG
(Toss Payments, etc.) instead, replace `createCheckout` with that
provider's server-side flow.

## Launch checklist

- [ ] Brand name, logo, product name, price → `src/config/*.ts`
- [ ] Confirmed specs and box contents → `product.specs`, `product.inTheBox`
- [ ] Business info for the footer (전자상거래법 표시 의무) → `site.business`
- [ ] Shipping/returns terms → `site.shipping`
- [ ] Privacy policy & terms: replace draft text, legal review
- [ ] Checkout provider connected and tested end to end
- [ ] `NEXT_PUBLIC_SITE_URL` set; `site.indexable = true` (robots + meta)
- [ ] Image rights reviewed (below)

## Image assets — rights review required before launch

All images in `public/images/` are derived from the 5 supplied reference
images. Cropping was used to exclude visible third-party marks, but the
following still needs confirmation by the operator:

| File | Source | Note |
| --- | --- | --- |
| `watch-rain.jpg`, `detail-*.jpg` | ref. image 1 (cropped) | Original contained a race car with sponsor decals (HKS, Brembo, RAYS, ZEAL, ENDLESS) — cropped out. Confirm usage rights of the source render. |
| `watch-street.jpg`, `detail-hands.jpg` | ref. image 2 (cropped) | Original carried unverified claims ("JAPAN MOVEMENT", "PREMIUM STAINLESS STEEL") — cropped out, not used anywhere. |
| `watch-garage.jpg`, `watch-garage-portrait.jpg`, `og.jpg` | ref. image 5 | Contains a black sports car (no visible badge). Confirm the vehicle design is cleared for advertising use. |
| `watch-wrist.jpg` | ref. image 4 | Only wear shot; 492 px — replace with high-res photography. |
| — | ref. image 3 | Not used: sponsor decals overlap the watch. |

The caliper on the dial shows a partial mark ("ME…") that is part of the
product itself — confirm it matches the final brand.

Most images look like staged/AI-composited advertising renders. The site
labels them "연출된 광고 이미지". No other angles were generated: the 360°
section states that rotation photography is pending. Needed for launch:
real 360° turntable shots, high-res macro details, more wear shots (city
night, car interior).
