import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { P, byId, CFG } from "@/lib/data";

export function generateStaticParams() { return P.map((x) => ({ id: x.id })); }
export function generateMetadata({ params }) {
  const x = byId(params.id);
  return { title: x ? `${x.n} | ${CFG.name}` : CFG.name };
}
export default function ProductPage({ params }) {
  const x = byId(params.id);
  if (!x) notFound();
  return <ProductView x={x} />;
}
