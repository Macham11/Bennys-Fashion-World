/* ============ EDIT THESE ============ */
const CFG = {
  name: "Benny’s Fashion World",
  phone: "09039953015", tel: "+2349039953015", wa: "2349039953015",
  email: "machambwehb@gmail.com",
  freeShip: 0, // set a naira amount to show a free-delivery progress bar, or leave 0 to hide it
  bank: { bank: "", acct: "", holder: "" } // fill in to show your account details at checkout
};
// Add your real customer reviews here, like: ["What the customer said", "Customer, City"]
const REVIEWS = [];
// Add your products here. Example (remove the // to use):
// {id:"my-fabric",n:"Fabric name",c:"Lace",p:0,s:0,u:"what it is good for",g:["#colour1","#colour2"]},
// id = unique, c = category, p = price per yard (₦), s = yards in stock (0 = sold out)
// optional: tr:"Sheer", w:"45 in", img:"images/photo.jpg"
const P = [];
const CATS = ["Lace","Ankara","Silk","Satin","Cotton","Crepe","Chiffon","Linen","Mesh"];
/* ====================================== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const N=v=>"₦"+Number(v).toLocaleString("en-NG");
const byId=id=>P.find(x=>x.id===id);
const sw=x=>x.img?`style="background:#eee url('${x.img}') center/cover"`:`style="background:linear-gradient(135deg,${x.g[0]},${x.g[1]})"`;
const CG={Lace:["#fffaf0","#e8dcc4"],Ankara:["#f5c400","#1a1a1a"],Silk:["#9fd0ef","#5ea6d6"],Satin:["#c9e86a","#8fbf2a"],Cotton:["#b9dcf5","#7fb7e0"],Crepe:["#0f8a5f","#0a5c40"],Chiffon:["#ffb347","#d6336c"],Linen:["#e7d3b4","#9c7a55"],Mesh:["#2b2b2b","#0e0e0e"]};
const waLink=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;
let cart={};try{cart=JSON.parse(localStorage.getItem("bfw_cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("bfw_cart",JSON.stringify(cart))}catch(e){}paint()};
function add(id,q=1){const x=byId(id);if(!x||x.s<=0)return false;cart[id]=Math.min((cart[id]||0)+q,x.s);save();openCart();return true}
function setQ(id,q){const x=byId(id);if(!x)return;if(q<=0)delete cart[id];else cart[id]=Math.min(q,x.s);save()}
const total=()=>Object.entries(cart).reduce((t,[id,q])=>t+(byId(id)?.p||0)*q,0);
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function card(x){const so=x.s<=0;return `<article class="card"><a class="sw ${so?"so":""}" href="product.html?id=${x.id}" ${sw(x)} aria-label="${x.n}">${so?'<span class="tag">Sold out</span>':""}</a><div class="b"><h3>${x.n}</h3><p class="use">Good for ${x.u}.</p><p class="price">${N(x.p)} <small>per yard</small></p>${so?'<button class="btn sm alt" disabled>Sold out</button>':`<button class="btn sm" data-add="${x.id}">Add 1 yard</button>`}</div></article>`}
/* cart drawer */
function mount(){
 document.body.insertAdjacentHTML("beforeend",`<div class="ov" id="ov"></div>
 <aside class="drawer" id="drawer" aria-label="Cart"><div class="h"><h3>Your cart</h3><button class="ibtn" data-close aria-label="Close cart">✕</button></div><div class="l" id="cl"></div><div class="f" id="cf"></div></aside>
 <div class="modal" id="quiz" role="dialog" aria-label="Help me choose"></div>`);
 $("#ov").onclick=closeAll;
 document.addEventListener("click",e=>{
  const t=e.target.closest("[data-add],[data-close],[data-open-cart],[data-quiz],[data-burger],[data-q],[data-minus],[data-plus],[data-rm]");if(!t)return;
  if(t.dataset.add!==undefined){add(t.dataset.add)}
  else if("close" in t.dataset)closeAll();
  else if("openCart" in t.dataset)openCart();
  else if("quiz" in t.dataset)startQuiz();
  else if("burger" in t.dataset)$("#mnav").classList.toggle("open");
  else if(t.dataset.minus)setQ(t.dataset.minus,(cart[t.dataset.minus]||0)-1);
  else if(t.dataset.plus)setQ(t.dataset.plus,(cart[t.dataset.plus]||0)+1);
  else if(t.dataset.rm)setQ(t.dataset.rm,0);
 });
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
 paint();
}
function openCart(){$("#drawer").classList.add("open");$("#ov").classList.add("open")}
function closeAll(){$("#drawer").classList.remove("open");$("#quiz").classList.remove("open");$("#ov").classList.remove("open")}
function paint(){
 $$(".cc").forEach(e=>{e.textContent=count();e.style.display=count()?"grid":"none"});
 const l=$("#cl"),f=$("#cf");if(!l)return;
 const ids=Object.keys(cart).filter(byId);
 if(!ids.length){l.innerHTML=`<h3>Your cart is empty</h3><p>No market stress. Pick a fabric, we’ll deliver.</p><div class="cats" style="margin-top:18px">${["Chiffon","Satin","Ankara","Lace"].map(c=>`<a class="cat" href="products.html?category=${c}">${c}</a>`).join("")}</div>`;
  f.innerHTML=`<a class="btn" href="products.html">Start shopping</a><a class="btn wa" href="${waLink("Hi "+CFG.name+", I have a question.")}">Ask on WhatsApp</a>`;return}
 const t=total(),left=CFG.freeShip-t,fs=CFG.freeShip>0;
 l.innerHTML=(fs?`<p>${left>0?`Add <b>${N(left)}</b> to get free shipping!`:"You’ve unlocked free delivery."}</p><div class="bar"><i style="width:${Math.min(100,t/CFG.freeShip*100)}%"></i></div>`:"")+ids.map(id=>{const x=byId(id);return `<div class="item"><div class="sw" ${sw(x)}></div><div><b>${x.n}</b><br>${N(x.p)}/yd<br><span class="qty"><button data-minus="${id}" aria-label="Fewer yards">−</button><span>${cart[id]}</span><button data-plus="${id}" aria-label="More yards">+</button></span></div><button class="ibtn" data-rm="${id}" aria-label="Remove ${x.n}">🗑</button></div>`}).join("");
 f.innerHTML=`<div style="display:flex;justify-content:space-between"><b>Subtotal</b><b>${N(t)}</b></div><a class="btn" href="checkout.html">Checkout</a>`;
}
/* quiz */
function startQuiz(){const q=$("#quiz");$("#ov").classList.add("open");q.classList.add("open");
 const Q1=[["A flowing gown or skirt",["Chiffon","Crepe","Satin"]],["Sleeves, overlays or a statement piece",["Mesh","Organza"]],["Shirts, dresses or everyday wear",["Cotton","Ankara","Linen","Silk"]],["Aso-ebi or bridal wear",["Lace","Satin"]]];
 const Q2=[["Light and flowy",["Chiffon","Silk","Satin"]],["Crisp and structured",["Organza","Crepe","Mesh"]],["Breathable and easy to sew",["Cotton","Linen","Ankara"]],["Rich and detailed",["Lace","Satin"]]];
 let a1=null;
 const s1=()=>{q.innerHTML=`<p>Question 1 of 2</p><h3>What are you sewing?</h3><div class="opts">${Q1.map((o,i)=>`<button data-q1="${i}">${o[0]}</button>`).join("")}</div><button class="btn sm alt" data-close>Close</button>`;
  $$("[data-q1]",q).forEach(b=>b.onclick=()=>{a1=Q1[b.dataset.q1][1];s2()})};
 const s2=()=>{q.innerHTML=`<p>Question 2 of 2</p><h3>How should it feel?</h3><div class="opts">${Q2.map((o,i)=>`<button data-q2="${i}">${o[0]}</button>`).join("")}</div>`;
  $$("[data-q2]",q).forEach(b=>b.onclick=()=>{const a2=Q2[b.dataset.q2][1];let r=a1.filter(c=>a2.includes(c));if(!r.length)r=a1;
   q.innerHTML=`<h3>We suggest</h3><p>Based on your answers, start with:</p><div class="opts">${r.map(c=>`<a class="btn" style="text-align:center" href="products.html?category=${c}">${c}</a>`).join("")}</div><a class="btn wa sm" href="${waLink("Hi "+CFG.name+", please help me choose a fabric.")}">Ask a fabric expert</a>`})};
 s1();
}
/* pages */
function home(){
 $("#picks").innerHTML=P.length?P.slice(0,10).map(card).join(""):`<p>Our fabrics are being added. <a href="${waLink("Hi "+CFG.name+", what fabrics do you have?")}">Ask us on WhatsApp</a> to see what is available.</p>`;
 $("#catg").innerHTML=CATS.map(c=>{return `<a class="cat" href="products.html?category=${c}"><div class="sw" ${sw({g:CG[c]})}></div>${c}</a>`}).join("");
 if(REVIEWS.length)$("#rev").innerHTML=REVIEWS.map(r=>`<blockquote>“${r[0]}”<cite>${r[1]}</cite></blockquote>`).join("");else $("#rev").closest("section").remove();
}
function shop(){
 const prm=new URLSearchParams(location.search);let cat=prm.get("category")||"",q=prm.get("q")||"";
 const cs=[...new Set(P.map(x=>x.c))];
 $("#fcat").innerHTML=`<label><input type="radio" name="c" value="" ${!cat?"checked":""}> All fabrics</label>`+cs.map(c=>`<label><input type="radio" name="c" value="${c}" ${cat===c?"checked":""}> ${c}</label>`).join("");
 $("#fq").value=q;
 const run=()=>{cat=($("input[name=c]:checked")||{}).value||"";q=$("#fq").value.trim().toLowerCase();
  let r=P.filter(x=>(!cat||x.c===cat)&&(!q||(x.n+x.c).toLowerCase().includes(q))&&($("#fin").checked?x.s>0:true));
  const o=$("#fsort").value;if(o==="lo")r.sort((a,b)=>a.p-b.p);if(o==="hi")r.sort((a,b)=>b.p-a.p);
  $("#title").textContent=cat||"All fabrics";$("#cnt").textContent=r.length+" fabrics";
  $("#list").innerHTML=r.length?r.map(card).join(""):`<p>${P.length?"No fabrics match. Try another filter or ":"Our fabrics are being added. "}<a href="${waLink("Hi, I’m looking for a fabric.")}">Ask us on WhatsApp</a>.</p>`};
 $$("#filters input,#filters select").forEach(e=>e.addEventListener("input",run));run();
}
function product(){
 const x=byId(new URLSearchParams(location.search).get("id"));const el=$("#pd");
 if(!x){el.innerHTML=`<p>We couldn’t find that fabric. <a href="products.html">See all fabrics</a>.</p>`;return}
 document.title=x.n+" | "+CFG.name;let q=1;
 const so=x.s<=0;
 el.innerHTML=`<div class="zoomwrap"><div class="sw ${so?"so":""}" id="zsw" ${sw(x)} title="Click to zoom"></div></div><div><h1>${x.n}</h1><p class="price" style="font-size:24px;margin:8px 0">${N(x.p)} <small>per yard</small></p><p>Good for ${x.u}.</p>
 <div class="facts"><div><b>Type</b>${x.c}</div>${x.tr?`<div><b>Transparency</b>${x.tr}</div>`:""}${x.w?`<div><b>Width</b>${x.w}</div>`:""}<div><b>Availability</b>${so?"Sold out":x.s+" yards in stock"}</div></div>
 ${so?'<button class="btn" disabled>Sold out</button>':`<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="qty"><button id="qm" aria-label="Fewer yards">−</button><span id="qv">1</span><button id="qp" aria-label="More yards">+</button></span><button class="btn" id="addb">Add to cart</button></div>`}
 <p style="margin:18px 0"><a class="btn wa sm" href="${waLink("Hi "+CFG.name+", I have a question about "+x.n+".")}">Got questions? Ask on WhatsApp</a></p></div>`;
 $("#zsw").onclick=e=>e.currentTarget.classList.toggle("z");
 if(!so){$("#qm").onclick=()=>{q=Math.max(1,q-1);$("#qv").textContent=q};$("#qp").onclick=()=>{q=Math.min(x.s,q+1);$("#qv").textContent=q};$("#addb").onclick=()=>add(x.id,q)}
 $("#rel").innerHTML=P.filter(y=>y.c===x.c&&y.id!==x.id).slice(0,4).map(card).join("")||"<p>More fabrics coming soon.</p>";
}
function checkout(){
 const ids=Object.keys(cart).filter(byId);const wrap=$("#co");
 const last=(()=>{try{return JSON.parse(localStorage.getItem("bfw_order"))}catch(e){return null}})();
 if(!ids.length){ if(last&&Date.now()<last.t+864e5){return done(last)} wrap.innerHTML=`<div class="box"><h2>Your cart is empty</h2><p>No market stress. Pick a fabric, we’ll deliver.</p><p style="margin-top:14px"><a class="btn" href="products.html">Start shopping</a></p></div>`;return}
 const t=total();
 wrap.innerHTML=`<form class="box form" id="f"><h2>Delivery details</h2><div class="msg" id="err" role="alert"></div>
 <div class="two"><input name="name" placeholder="Full name" required autocomplete="name"><input name="phone" type="tel" placeholder="Phone (WhatsApp)" required autocomplete="tel"></div>
 <input name="email" type="email" placeholder="Email" required autocomplete="email"><textarea name="addr" rows="3" placeholder="Delivery address" required></textarea>
 <div class="two"><input name="city" placeholder="City / town" required><select name="state" required><option value="">State</option>${["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"].map(s=>`<option>${s}</option>`).join("")}</select></div>
 <textarea name="note" rows="2" placeholder="Note for us (optional)"></textarea><button class="btn">Place order</button><p style="font-size:14px;color:var(--mute)">You pay by bank transfer after placing the order.</p></form>
 <aside class="box"><h3>Order summary</h3>${ids.map(id=>{const x=byId(id);return `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--line)"><span>${x.n} × ${cart[id]} yd</span><b>${N(x.p*cart[id])}</b></div>`}).join("")}
 <p style="display:flex;justify-content:space-between;margin-top:12px"><span>Delivery</span><b>${CFG.freeShip>0&&t>=CFG.freeShip?"Free":"Confirmed on WhatsApp"}</b></p><p style="display:flex;justify-content:space-between;font-size:20px"><b>Subtotal</b><b>${N(t)}</b></p></aside>`;
 $("#f").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const bad=ids.filter(id=>byId(id).s<=0||cart[id]>byId(id).s);
  if(bad.length){const m=$("#err");m.textContent="Some items are no longer available in that quantity: "+bad.map(i=>byId(i).n).join(", ")+". Update your cart and try again.";m.classList.add("show");return}
  const o={t:Date.now(),id:"BFW"+Math.floor(1e5+Math.random()*9e5),d,total:t,items:ids.map(id=>({n:byId(id).n,q:cart[id],p:byId(id).p}))};
  try{localStorage.setItem("bfw_order",JSON.stringify(o))}catch(e){}cart={};save();done(o)};
}
function done(o){
 const lines=o.items.map(i=>`• ${i.n} × ${i.q} yd = ${N(i.p*i.q)}`).join("\n");
 const msg=`Hi ${CFG.name}, I’ve placed order ${o.id}.\n${lines}\nSubtotal: ${N(o.total)}\nName: ${o.d.name}\nPhone: ${o.d.phone}\nAddress: ${o.d.addr}, ${o.d.city}, ${o.d.state}\nPlease send me your account details.`;
 $("#co").innerHTML=`<div class="box" style="grid-column:1/-1"><h2>Thank you, ${o.d.name.split(" ")[0]}. Order ${o.id} is placed.</h2>
 <p style="margin:10px 0">Your total is <b>${N(o.total)}</b>. Pay by bank transfer.</p>
 ${CFG.bank.acct?`<div class="box" style="background:var(--cream);margin:14px 0"><b>${CFG.bank.bank}</b><br>Account number: <b>${CFG.bank.acct}</b><br>Account name: ${CFG.bank.holder}</div>`:"<p>We will send you our account details on WhatsApp.</p>"}
 <p>After paying, send us the order details on WhatsApp so we can confirm and start on your order.</p><p style="margin-top:14px"><a class="btn wa" href="${waLink(msg)}">Send order on WhatsApp</a> <a class="btn alt" href="products.html">Keep shopping</a></p></div>`;
}
document.addEventListener("DOMContentLoaded",()=>{mount();const pg=document.body.dataset.page;({home,shop,product,checkout}[pg]||(()=>{}))()});
