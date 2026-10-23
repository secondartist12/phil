import type { Metadata } from "next";
import { CartView } from "./CartView";
import { checkoutStatus } from "@/lib/checkout";
import { product } from "@/config/product";

export const metadata: Metadata = { title: "Cart" };
export const dynamic = "force-dynamic";

export default function CartPage() {
  const { connected, provider } = checkoutStatus();
  return (
    <div className="pb-28 pt-32 md:pt-44">
      <div className="container-x">
        <p className="eyebrow">Cart</p>
        <h1 className="display mt-6 text-6xl sm:text-7xl md:text-8xl">Your Garage.</h1>
        <div className="hairline my-14" />
        <CartView checkoutReady={connected && product.price !== null} provider={provider} priceSet={product.price !== null} />
      </div>
    </div>
  );
}
