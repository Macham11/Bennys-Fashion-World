"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";
import { CFG, P, N, waLink, swStyle } from "@/lib/data";

export default function ProductView({ x }) {
  const { add } = useCart();
  const [q, setQ] = useState(1);
  const [zoom, setZoom] = useState(false);
  const so = x.s <= 0;
  const rel = P.filter((y) => y.c === x.c && y.id !== x.id).slice(0, 4);
  return (
    <div className="wrap">
      <p className="crumbs"><Link href="/">Home</Link> / <Link href="/products">Shop</Link></p>
      <div className="pd">
        <div className="zoomwrap"><div className={"sw" + (so ? " so" : "") + (zoom ? " z" : "")} style={swStyle(x)} onClick={() => setZoom(!zoom)} title="Click to zoom" /></div>
        <div>
          <h1>{x.n}</h1>
          <p className="price" style={{ fontSize: 24, margin: "8px 0" }}>{N(x.p)} <small>per yard</small></p>
          <p>Good for {x.u}.</p>
          <div className="facts">
            <div><b>Type</b>{x.c}</div>
            {x.tr && <div><b>Transparency</b>{x.tr}</div>}
            {x.w && <div><b>Width</b>{x.w}</div>}
            <div><b>Availability</b>{so ? "Sold out" : `${x.s} yards in stock`}</div>
          </div>
          {so ? <button className="btn" disabled>Sold out</button> : (
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <span className="qty"><button onClick={() => setQ(Math.max(1, q - 1))} aria-label="Fewer yards">−</button><span>{q}</span><button onClick={() => setQ(Math.min(x.s, q + 1))} aria-label="More yards">+</button></span>
              <button className="btn" onClick={() => add(x.id, q)}>Add to cart</button>
            </div>)}
          <p style={{ margin: "18px 0" }}><a className="btn wa sm" href={waLink(`Hi ${CFG.name}, I have a question about ${x.n}.`)}>Got questions? Ask on WhatsApp</a></p>
        </div>
      </div>
      {rel.length > 0 && <><div className="hd"><h2>You may also like</h2></div><div className="grid" style={{ marginBottom: 60 }}>{rel.map((y) => <ProductCard key={y.id} x={y} />)}</div></>}
    </div>
  );
}
