"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { byId } from "./data";
const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);
export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [quiz, setQuiz] = useState(false);
  useEffect(() => { try { setCart(JSON.parse(localStorage.getItem("bfw_cart") || "{}")); } catch (e) {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem("bfw_cart", JSON.stringify(cart)); } catch (e) {} }, [cart, ready]);
  const add = (id, q = 1) => { const x = byId(id); if (!x || x.s <= 0) return; setCart((c) => ({ ...c, [id]: Math.min((c[id] || 0) + q, x.s) })); setOpen(true); };
  const setQ = (id, q) => { const x = byId(id); if (!x) return; setCart((c) => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = Math.min(q, x.s); return n; }); };
  const clear = () => setCart({});
  const ids = Object.keys(cart).filter(byId);
  const total = ids.reduce((t, id) => t + byId(id).p * cart[id], 0);
  const count = ids.reduce((t, id) => t + cart[id], 0);
  return <Ctx.Provider value={{ cart, ids, add, setQ, clear, total, count, ready, open, setOpen, quiz, setQuiz }}>{children}</Ctx.Provider>;
}
