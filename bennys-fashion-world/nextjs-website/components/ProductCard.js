"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { N, swStyle } from "@/lib/data";
export default function ProductCard({ x }) {
  const { add } = useCart();
  const so = x.s <= 0;
  return (
    <article className="card">
      <Link className={"sw" + (so ? " so" : "")} href={`/products/${x.id}`} style={swStyle(x)} aria-label={x.n}>
        {so && <span className="tag">Sold out</span>}
      </Link>
      <div className="b">
        <h3>{x.n}</h3>
        <p className="use">Good for {x.u}.</p>
        <p className="price">{N(x.p)} <small>per yard</small></p>
        {so ? <button className="btn sm alt" disabled>Sold out</button> : <button className="btn sm" onClick={() => add(x.id)}>Add 1 yard</button>}
      </div>
    </article>
  );
}
