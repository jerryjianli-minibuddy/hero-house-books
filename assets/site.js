/* Hero House Books test site: renders the header, gift cards, product pages and book previews. Nothing here takes orders or stores anything. */
(function(){
const A=window.HHArt, G=window.HHGifts;
const root=document.body.dataset.root||"";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const logo=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 19 L20 6 L35 19 V35 H5Z" fill="#0f7c86"/><path d="M11 22.5 q9 -4.5 9 2 q0 -6.5 9 -2 v9.5 q-9 -4 -9 2 q0 -6 -9 -2z" fill="#fffdf7"/><circle cx="20" cy="14" r="2.6" fill="#f2a900"/></svg>`;
function art(key){if(!key)return"";const m=/^cake(\d+)$/.exec(key);if(m)return A.cake(+m[1]);if(key==="cake")return A.cake(5);return A[key]?A[key]():"";}
function chrome(){
  const head=document.createElement("div");
  head.innerHTML=`<div class="testbar">Test site. Every person, quote and drawing here is made up, and nothing is for sale yet.</div>
  <header class="site-head"><div class="wrap"><a class="brand" href="${root}index.html">${logo}Hero House Books</a>
  <nav class="nav" aria-label="Main"><a href="${root}index.html#gifts">Gifts</a><a href="${root}index.html#how">How it works</a><a href="${root}index.html#promise">Our promise</a><a href="${root}gallery/maya.html">Sample gallery</a></nav></div></header>`;
  document.body.prepend(...head.childNodes);
  const foot=document.createElement("footer");foot.className="site-foot";
  foot.innerHTML=`<div class="wrap"><span>Hero House Books. Real words, real drawings, printed in the USA.</span><span>A test site: no orders, no uploads, nothing saved.</span></div>`;
  document.body.append(foot);
  const d=document.createElement("dialog");d.id="soon";
  d.innerHTML=`<div class="dlg"><h3>Not taking orders yet</h3><p>This is a test site for trying out ideas. Nothing you click here is saved or charged.</p><form method="dialog"><button class="btn">Got it</button></form></div>`;
  document.body.append(d);
  document.addEventListener("click",e=>{const t=e.target.closest("[data-soon]");if(t){e.preventDefault();d.showModal();}});
}
function book(el,sample){
  let i=0;const n=sample.spreads.length;
  el.innerHTML=`<div class="spread" aria-live="polite"></div><div class="pager"><button type="button" data-p="-1">Back</button><span></span><button type="button" data-p="1">Next</button></div><p class="notice">${esc(sample.caption)}${sample.link?` <a href="${sample.link[1]}">${esc(sample.link[0])}</a>`:""}</p>`;
  const sp=el.querySelector(".spread"),lab=el.querySelector(".pager span"),[b,f]=el.querySelectorAll(".pager button");
  const page=p=>p.art?`<div class="page art-page">${art(p.art)}</div>`:`<div class="page">${p.html}</div>`;
  function show(){sp.innerHTML=sample.spreads[i].map(page).join("");lab.textContent=`Spread ${i+1} of ${n}`;b.disabled=i===0;f.disabled=i===n-1;}
  el.addEventListener("click",e=>{const p=e.target.closest("[data-p]");if(!p)return;i=Math.max(0,Math.min(n-1,i+ +p.dataset.p));show();});
  el.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){i=Math.min(n-1,i+1);show();}if(e.key==="ArrowLeft"){i=Math.max(0,i-1);show();}});
  show();
}
function card(g){return `<a class="card" href="${root}gifts/${g.id}.html" data-tags="${g.tags.join(" ")}"><div class="art">${art(g.card)}</div><div class="body"><span class="for">${esc(g.forLine)}</span><h3>${esc(g.name)}</h3><p>${esc(g.tagline)}</p><span class="price">$${g.price}</span></div></a>`;}
function home(){
  const grid=document.getElementById("grid");if(!grid)return;
  grid.innerHTML=G.map(card).join("");
  const q=document.getElementById("quote-art");if(q)q.innerHTML=art("kidDad");
  const chips=document.querySelectorAll(".chips button");
  chips.forEach(c=>c.addEventListener("click",()=>{chips.forEach(x=>x.setAttribute("aria-pressed",x===c));const t=c.dataset.tag;
    grid.querySelectorAll(".card").forEach(k=>k.hidden=!(t==="all"||k.dataset.tags.split(" ").includes(t)));}));
}
function gift(){
  const id=document.body.dataset.gift;if(!id)return;const g=G.find(x=>x.id===id);if(!g)return;
  document.title=`${g.name} | Hero House Books`;
  const others=G.filter(x=>x.id!==id).slice(0,3);
  const main=document.getElementById("app");
  main.innerHTML=`<div class="wrap">
  <section class="p-hero"><div class="stack-lg"><div class="stack"><span class="eyebrow">${esc(g.forLine)}</span><h1>${esc(g.name)}</h1><p class="lede">${esc(g.tagline)}</p></div>
   <div><div class="price-big">$${g.price}</div><p class="notice">${esc(g.priceNote)}</p></div>
   <dl class="facts">${g.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#" data-soon>Start this gift</a><a class="btn ghost" href="#how">How it's made</a></div></div>
   <div class="book" id="book" tabindex="0" aria-label="Sample book: ${esc(g.sample.title)}"></div></section>
  <section class="stack" style="padding-top:20px"><h2>Why it lands</h2><p class="why">${esc(g.why)}</p></section>
  <section class="stack-lg" id="how"><h2>How it's made</h2><ol class="how">${g.how.map(h=>`<li><b>${esc(h[0])}</b><span>${esc(h[1])}</span></li>`).join("")}</ol></section>
  <section class="stack"><h2>What's inside</h2><ul>${g.inside.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>
  <section class="stack"><h2>Questions</h2><div class="faq">${g.faq.map(f=>`<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join("")}</div></section>
  <section class="stack-lg"><h2>More gifts like this</h2><div class="cards">${others.map(card).join("")}</div></section></div>`;
  book(document.getElementById("book"),g.sample);
}
chrome();home();gift();
})();
