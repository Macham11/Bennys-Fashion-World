"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { CFG, P, waLink } from "@/lib/data";

export default function ShopClient() {
  const sp = useSearchParams();
  const [cat, setCat] = useState(sp.get("category") || "");
  const [q, setQ] = useState(sp.get("q") || "");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("");
  const cats = [...new Set(P.map((x) => x.c))];
  let r = P.filter((x) => (!cat || x.c === cat) && (!q || (x.n + x.c).toLowerCase().includes(q.toLowerCase())) && (!inStock || x.s > 0));
  if (sort === "lo") r = [...r].sort((a, b) => a.p - b.p);
  if (sort === "hi") r = [...r].sort((a, b) => b.p - a.p);
  return (
    <div className="wrap">
      <p className="crumbs"><Link href="/">Home</Link> / Shop</p>
      <div className="shop">
        <aside className="filters">
          <label htmlFor="fq"><b>Search</b></label>
          <input id="fq" type="search" placeholder="Search fabrics" value={q} onChange={(e) => setQ(e.target.value)} />
          <h4>Fabric</h4>
          <label><input type="radio" name="c" checked={!cat} onChange={() => setCat("")} /> All fabrics</label>
          {cats.map((c) => <label key={c}><input type="radio" name="c" checked={cat === c} onChange={() => setCat(c)} /> {c}</label>)}
          <h4>Availability</h4>
          <label><input type="checkbox" style={{ width: "auto" }} checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock only</label>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select>
        </aside>
        <div>
          <div className="hd"><h1 style={{ fontSize: 34 }}>{cat || "All fabrics"}</h1><p>{r.length} fabrics</p></div>
          {r.length ? <div className="grid">{r.map((x) => <ProductCard key={x.id} x={x} />)}</div>
            : <p>{P.length ? "No fabrics match. Try another filter or " : "Our fabrics are being added. "}<a href={waLink(`Hi ${CFG.name}, I’m looking for a fabric.`)}>Ask us on WhatsApp</a>.</p>}
        </div>
      </div>
    </div>
  );
}
