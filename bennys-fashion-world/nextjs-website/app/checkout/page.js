"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CFG, N, byId, waLink } from "@/lib/data";

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

export default function Checkout() {
  const { ids, cart, total, clear, ready } = useCart();
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!ready || ids.length) return;
    try { const o = JSON.parse(localStorage.getItem("bfw_order")); if (o && Date.now() < o.t + 864e5) setOrder(o); } catch (e) {}
  }, [ready, ids.length]);

  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const bad = ids.filter((id) => byId(id).s <= 0 || cart[id] > byId(id).s);
    if (bad.length) { setErr("Some items are no longer available in that quantity: " + bad.map((i) => byId(i).n).join(", ") + ". Update your cart and try again."); return; }
    const o = { t: Date.now(), id: "BFW" + Math.floor(1e5 + Math.random() * 9e5), d, total, items: ids.map((id) => ({ n: byId(id).n, q: cart[id], p: byId(id).p })) };
    try { localStorage.setItem("bfw_order", JSON.stringify(o)); } catch (e2) {}
    clear(); setOrder(o);
  };

  if (!ready) return <div className="wrap"><div className="co"><p>Loading…</p></div></div>;

  if (order) {
    const lines = order.items.map((i) => `• ${i.n} × ${i.q} yd = ${N(i.p * i.q)}`).join("\n");
    const msg = `Hi ${CFG.name}, I’ve placed order ${order.id}.\n${lines}\nSubtotal: ${N(order.total)}\nName: ${order.d.name}\nPhone: ${order.d.phone}\nAddress: ${order.d.addr}, ${order.d.city}, ${order.d.state}\nPlease send me your account details.`;
    return (
      <div className="wrap"><div className="co"><div className="box" style={{ gridColumn: "1/-1" }}>
        <h2>Thank you, {order.d.name.split(" ")[0]}. Order {order.id} is placed.</h2>
        <p style={{ margin: "10px 0" }}>Your total is <b>{N(order.total)}</b>. Pay by bank transfer.</p>
        {CFG.bank.acct
          ? <div className="box" style={{ background: "var(--cream)", margin: "14px 0" }}><b>{CFG.bank.bank}</b><br />Account number: <b>{CFG.bank.acct}</b><br />Account name: {CFG.bank.holder}</div>
          : <p>We will send you our account details on WhatsApp.</p>}
        <p>After paying, send us the order details on WhatsApp so we can confirm and start on your order.</p>
        <p style={{ marginTop: 14 }}><a className="btn wa" href={waLink(msg)}>Send order on WhatsApp</a> <Link className="btn alt" href="/products">Keep shopping</Link></p>
      </div></div></div>
    );
  }

  if (!ids.length) return (
    <div className="wrap"><div className="co"><div className="box"><h2>Your cart is empty</h2><p>No market stress. Pick a fabric, we’ll deliver.</p><p style={{ marginTop: 14 }}><Link className="btn" href="/products">Start shopping</Link></p></div></div></div>
  );

  return (
    <div className="wrap"><div className="co">
      <form className="box form" onSubmit={submit}>
        <h2>Delivery details</h2>
        {err && <div className="msg show" role="alert">{err}</div>}
        <div className="two"><input name="name" placeholder="Full name" required autoComplete="name" /><input name="phone" type="tel" placeholder="Phone (WhatsApp)" required autoComplete="tel" /></div>
        <input name="email" type="email" placeholder="Email" required autoComplete="email" />
        <textarea name="addr" rows={3} placeholder="Delivery address" required />
        <div className="two"><input name="city" placeholder="City / town" required /><select name="state" required defaultValue=""><option value="">State</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <textarea name="note" rows={2} placeholder="Note for us (optional)" />
        <button className="btn">Place order</button>
        <p style={{ fontSize: 14, color: "var(--mute)" }}>You pay by bank transfer after placing the order.</p>
      </form>
      <aside className="box">
        <h3>Order summary</h3>
        {ids.map((id) => { const x = byId(id); return <div key={id} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line)" }}><span>{x.n} × {cart[id]} yd</span><b>{N(x.p * cart[id])}</b></div>; })}
        <p style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}><span>Delivery</span><b>{CFG.freeShip > 0 && total >= CFG.freeShip ? "Free" : "Confirmed on WhatsApp"}</b></p>
        <p style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}><b>Subtotal</b><b>{N(total)}</b></p>
      </aside>
    </div></div>
  );
}
