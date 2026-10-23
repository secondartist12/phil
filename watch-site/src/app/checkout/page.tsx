import { redirect } from "next/navigation";

// Checkout happens on the connected platform's hosted page, started from the
// cart. This route exists so /checkout links never 404.
export default function CheckoutPage() {
  redirect("/cart");
}
