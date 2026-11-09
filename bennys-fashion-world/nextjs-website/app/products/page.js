import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
export const metadata = { title: "Shop all fabrics | Benny’s Fashion World" };
export default function Products() {
  return <Suspense fallback={<div className="wrap"><p className="crumbs">Loading fabrics…</p></div>}><ShopClient /></Suspense>;
}
