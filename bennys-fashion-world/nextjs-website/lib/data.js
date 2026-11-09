// ================= EDIT THIS FILE =================
export const CFG = {
  name: "Benny’s Fashion World",
  phone: "09039953015", tel: "+2349039953015", wa: "2349039953015",
  email: "machambwehb@gmail.com",
  freeShip: 0, // set a ₦ amount to show a free-delivery bar in the cart; 0 hides it
  bank: { bank: "", acct: "", holder: "" }, // fill in to show account details at checkout
};

// Add your real customer reviews: ["What the customer said", "Customer, City"]
export const REVIEWS = [];

// Add your products. Put photos in /public/images and use img:"/images/name.jpg".
// Example (remove the // to use):
// { id:"my-fabric", n:"Fabric name", c:"Lace", p:0, s:0, u:"what it is good for", img:"/images/my-fabric.jpg", g:["#ddd","#bbb"] },
// id = unique, c = category, p = price per yard (₦), s = yards in stock (0 = Sold out)
// optional: tr:"Sheer", w:"45 in"   (g = fallback colours if no photo)
export const P = [];
// ==================================================

export const CATS = ["Lace","Ankara","Silk","Satin","Cotton","Crepe","Chiffon","Linen","Mesh"];
export const CG = {Lace:["#fffaf0","#e8dcc4"],Ankara:["#f5c400","#1a1a1a"],Silk:["#9fd0ef","#5ea6d6"],Satin:["#c9e86a","#8fbf2a"],Cotton:["#b9dcf5","#7fb7e0"],Crepe:["#0f8a5f","#0a5c40"],Chiffon:["#ffb347","#d6336c"],Linen:["#e7d3b4","#9c7a55"],Mesh:["#2b2b2b","#0e0e0e"]};
export const N = (v) => "₦" + Number(v).toLocaleString("en-NG");
export const waLink = (t) => `https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;
export const byId = (id) => P.find((x) => x.id === id);
export const swStyle = (x) => {
  const g = x.g || ["#ddd", "#bbb"];
  return x.img ? { background: `#eee url(${x.img}) center/cover` } : { background: `linear-gradient(135deg,${g[0]},${g[1]})` };
};
export const FAQ = [
  ["How do I know the fabric will look like the photo?", "What you see is what you get.", "We film every fabric in daylight. Not sure? WhatsApp us and we’ll send a live video before you pay."],
  ["How quickly will my fabric arrive?", "We deliver to your doorstep.", "Message us on WhatsApp to confirm the delivery time and cost for your location."],
  ["How do I pay, and is it safe?", "Bank transfer to our account.", "We’ll send you our account details. Once we confirm your payment, we start on your order and keep you updated on WhatsApp."],
  ["Can I cancel my order?", "Yes, before your fabric is cut.", "Message us on WhatsApp and we can cancel, refund or do an exchange."],
  ["How many yards do I need?", "We’ll help you work it out.", "Tell us what you’re sewing on WhatsApp, or ask your tailor, so you don’t buy too much or too little."],
];
