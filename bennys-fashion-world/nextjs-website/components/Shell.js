"use client";
import Link from "next/link";
import { useState } from "react";
import { CartProvider, useCart } from "@/lib/cart";
import { CFG, N, waLink, swStyle, byId } from "@/lib/data";

const Q1 = [["A flowing gown or skirt",["Chiffon","Crepe","Satin"]],["Sleeves, overlays or a statement piece",["Mesh","Organza"]],["Shirts, dresses or everyday wear",["Cotton","Ankara","Linen","Silk"]],["Aso-ebi or bridal wear",["Lace","Satin"]]];
const Q2 = [["Light and flowy",["Chiffon","Silk","Satin"]],["Crisp and structured",["Organza","Crepe","Mesh"]],["Breathable and easy to sew",["Cotton","Linen","Ankara"]],["Rich and detailed",["Lace","Satin"]]];

function Quiz() {
  const { quiz, setQuiz } = useCart();
  const [a1, setA1] = useState(null);
  const [res, setRes] = useState(null);
  const close = () => { setQuiz(false); setA1(null); setRes(null); };
  if (!quiz) return null;
  return (
    <>
      <div className="ov open" onClick={close} />
      <div className="modal open" role="dialog" aria-label="Help me choose">
        {!a1 && <><p>Question 1 of 2</p><h3>What are you sewing?</h3><div className="opts">{Q1.map((o) => <button key={o[0]} onClick={() => setA1(o[1])}>{o[0]}</button>)}</div></>}
        {a1 && !res && <><p>Question 2 of 2</p><h3>How should it feel?</h3><div className="opts">{Q2.map((o) => <button key={o[0]} onClick={() => { let r = a1.filter((c) => o[1].includes(c)); if (!r.length) r = a1; setRes(r); }}>{o[0]}</button>)}</div></>}
        {res && <><h3>We suggest</h3><p>Based on your answers, start with:</p><div className="opts">{res.map((c) => <Link key={c} className="btn" style={{ textAlign: "center" }} href={`/products?category=${c}`} onClick={close}>{c}</Link>)}</div><a className="btn wa sm" href={waLink(`Hi ${CFG.name}, please help me choose a fabric.`)}>Ask a fabric expert</a></>}
        <p style={{ marginTop: 12 }}><button className="btn sm alt" onClick={close}>Close</button></p>
      </div>
    </>
  );
}

function Drawer() {
  const { open, setOpen, ids, cart, setQ, total } = useCart();
  const left = CFG.freeShip - total, fs = CFG.freeShip > 0;
  return (
    <>
      <div className={"ov" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <aside className={"drawer" + (open ? " open" : "")} aria-label="Cart">
        <div className="h"><h3>Your cart</h3><button className="ibtn" onClick={() => setOpen(false)} aria-label="Close cart">✕</button></div>
        <div className="l">
          {!ids.length ? (
            <><h3>Your cart is empty</h3><p>No market stress. Pick a fabric, we’ll deliver.</p>
              <div className="cats" style={{ marginTop: 18 }}>{["Chiffon","Satin","Ankara","Lace"].map((c) => <Link key={c} className="cat" href={`/products?category=${c}`} onClick={() => setOpen(false)}>{c}</Link>)}</div></>
          ) : (
            <>
              {fs && <><p>{left > 0 ? <>Add <b>{N(left)}</b> to get free shipping!</> : "You’ve unlocked free delivery."}</p><div className="bar"><i style={{ width: Math.min(100, (total / CFG.freeShip) * 100) + "%" }} /></div></>}
              {ids.map((id) => { const x = byId(id); return (
                <div className="item" key={id}>
                  <div className="sw" style={swStyle(x)} />
                  <div><b>{x.n}</b><br />{N(x.p)}/yd<br />
                    <span className="qty"><button onClick={() => setQ(id, cart[id] - 1)} aria-label="Fewer yards">−</button><span>{cart[id]}</span><button onClick={() => setQ(id, cart[id] + 1)} aria-label="More yards">+</button></span></div>
                  <button className="ibtn" onClick={() => setQ(id, 0)} aria-label={`Remove ${x.n}`}>🗑</button>
                </div>); })}
            </>
          )}
        </div>
        <div className="f">
          {ids.length ? <><div style={{ display: "flex", justifyContent: "space-between" }}><b>Subtotal</b><b>{N(total)}</b></div><Link className="btn" href="/checkout" onClick={() => setOpen(false)}>Checkout</Link></>
            : <><Link className="btn" href="/products" onClick={() => setOpen(false)}>Start shopping</Link><a className="btn wa" href={waLink(`Hi ${CFG.name}, I have a question.`)}>Ask on WhatsApp</a></>}
        </div>
      </aside>
    </>
  );
}

function Inner({ children }) {
  const { count, setOpen, setQuiz } = useCart();
  const [menu, setMenu] = useState(false);
  const wa = waLink(`Hi ${CFG.name}, I have a question.`);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="top">Order online, we deliver to your door. <a href={wa}>WhatsApp us</a></div>
      <header className="nav">
        <div className="wrap">
          <button className="ibtn burger" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
          <Link className="logo" href="/">Benny’s Fashion World<small>Fabrics delivered from Jos</small></Link>
          <nav className="links" aria-label="Main"><Link href="/products">Shop all</Link><Link href="/products?category=Chiffon">New fabrics</Link><Link href="/#collections">Collections</Link></nav>
          <span className="sp" />
          <button className="btn sm alt hide" onClick={() => setQuiz(true)}>Help me choose</button>
          <Link className="ibtn" href="/products" aria-label="Search fabrics">🔍</Link>
          <button className="ibtn" onClick={() => setOpen(true)} aria-label="Open cart">🛍{count > 0 && <span className="badge">{count}</span>}</button>
        </div>
        <div className={"mnav" + (menu ? " open" : "")} onClick={() => setMenu(false)}>
          <Link href="/products">Shop all</Link><Link href="/products?category=Chiffon">New fabrics</Link><Link href="/#collections">Collections</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); setQuiz(true); }}>Help me choose</a><Link href="/about">About us</Link>
          <p><b>Talk to a real person</b><br />Mon–Sat, 9am–7pm.</p>
          <p style={{ marginTop: 8 }}><a className="btn wa sm" style={{ display: "inline-block" }} href={wa}>WhatsApp</a> <a className="btn alt sm" style={{ display: "inline-block" }} href={`tel:${CFG.tel}`}>Call</a></p>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="wrap">
          <div className="cols">
            <div><h4>{CFG.name}</h4><p>Beautiful fabrics delivered to your doorstep. No market stress — order online, we deliver.</p>
              <p style={{ marginTop: 10 }}>Jos, Plateau State, Nigeria<br /><a href={`tel:${CFG.tel}`}>{CFG.phone}</a><a href={`mailto:${CFG.email}`}>{CFG.email}</a></p>
              <p className="soc" style={{ marginTop: 8 }}><a href="#" style={{ display: "inline" }}>Instagram</a><a href="#" style={{ display: "inline" }}>YouTube</a><a href="#" style={{ display: "inline" }}>TikTok</a><a href="#" style={{ display: "inline" }}>Facebook</a></p></div>
            <div><h4>Shop fabrics</h4><Link href="/products">All fabrics</Link>{["Ankara","Lace","Silk","Satin","Cotton","Crepe","Linen"].map((c) => <Link key={c} href={`/products?category=${c}`}>{c}</Link>)}</div>
            <div><h4>Help &amp; support</h4><Link href="/contact">Contact us</Link><Link href="/about">About us</Link><Link href="/faq">Frequently asked questions</Link><a href={waLink(`Hi ${CFG.name}, I would like to enquire about a wholesale or bulk order.`)}>Wholesale &amp; bulk orders</a></div>
            <div><h4>Good to know</h4><p>We deliver across Nigeria<br />Pay by bank transfer</p></div>
          </div>
          <div className="legal"><span>© 2026 {CFG.name}</span><span><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link><Link href="/returns">Return policy</Link><a href="#main">Back to top ↑</a></span></div>
        </div>
      </footer>
      <a className="fab" href={wa} aria-label="Chat on WhatsApp">💬</a>
      <Drawer /><Quiz />
    </>
  );
}
export default function Shell({ children }) { return <CartProvider><Inner>{children}</Inner></CartProvider>; }
