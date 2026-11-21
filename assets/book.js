/* Hero House book templates.
   Renders a finished example book as HTML spreads, in two styles (Crayon, Classic).
   The same pages serve the Look inside viewer, the "try it with your photos" preview and the print export.
   A book's content lives in assets/books/<gift>/book.js as window.HHBooks[<gift>]. */
(function(){
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fill=(s,o)=>String(s==null?"":s).replace(/\{(\w+)\}/g,(m,k)=>k in o?esc(o[k]):m);
const STYLES=[["crayon","Crayon"],["classic","Classic"]];

/* Crayon doodles laid over a customer's own photo in the preview.
   They sit near the edges so they work on any picture. In a real book an artist draws them to fit the photo. */
const C={red:"#e5432d",yel:"#f4b400",blue:"#2f6fd6",green:"#2fa84f",pink:"#e8589e",orange:"#f07b1d"};
const star=(x,y,r,c)=>{let d="";for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,rr=i%2?r*.45:r;d+=(i?"L":"M")+(x+rr*Math.cos(a)).toFixed(1)+" "+(y+rr*Math.sin(a)).toFixed(1);}return `<path d="${d}Z" fill="none" stroke="${c}"/>`;};
const heart=(x,y,s,c)=>`<path d="M${x} ${y+s*.9}C${x-s*1.4} ${y} ${x-s*.7} ${y-s*.9} ${x} ${y-s*.2}C${x+s*.7} ${y-s*.9} ${x+s*1.4} ${y} ${x} ${y+s*.9}Z" fill="none" stroke="${c}"/>`;
const sun=(x,y,r)=>{let d=`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.yel}" fill-opacity=".35" stroke="${C.yel}"/>`;for(let i=0;i<10;i++){const a=Math.PI/5*i;d+=`<path d="M${(x+Math.cos(a)*r*1.35).toFixed(1)} ${(y+Math.sin(a)*r*1.35).toFixed(1)}L${(x+Math.cos(a)*r*1.9).toFixed(1)} ${(y+Math.sin(a)*r*1.9).toFixed(1)}" stroke="${C.orange}"/>`;}return d;};
const word=(x,y,t,c,sz,rot)=>`<text x="${x}" y="${y}" fill="${c}" font-size="${sz}" transform="rotate(${rot||0} ${x} ${y})">${esc(t)}</text>`;
const DOODLES=[
  o=>sun(14,13,6.5)+word(50,15,"MY "+String(o.Rel).toUpperCase(),C.blue,11,-3)+heart(86,14,3.4,C.red)+heart(92,24,2.4,C.pink)+star(8,84,4,C.green)+star(91,80,3.4,C.yel),
  o=>word(10,16,"YUM!",C.red,12,-8)+`<path d="M70 20c-3-4 3-6 0-10M78 20c-3-4 3-6 0-10M86 20c-3-4 3-6 0-10" fill="none" stroke="${C.orange}"/>`+star(9,86,3.5,C.yel)+star(90,88,3,C.blue)+heart(92,50,2.6,C.pink),
  o=>sun(86,13,5.5)+`<path d="M2 92q6-5 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0" fill="none" stroke="${C.blue}"/><path d="M12 80q5-5 10 0q-5 5-10 0l-3 -3v6z" fill="none" stroke="${C.orange}"/>`+word(8,18,"SPLASH!",C.blue,10,-6),
  o=>`<path d="M84 8a9 9 0 1 0 6 15a7 7 0 1 1 -6 -15z" fill="${C.yel}" fill-opacity=".35" stroke="${C.yel}"/>`+word(10,18,"Zzz",C.blue,12,-8)+star(30,10,3,C.yel)+star(66,9,2.4,C.yel)+star(8,40,2.2,C.yel)+heart(90,86,3,C.red)
];
/* White-ink doodles for grown-up books (book.doodles:"ink"): hearts, sparkles, a moon. No words. */
const W="#ffffff";
const spark=(x,y,r)=>`<path d="M${x} ${y-r}L${x} ${y+r}M${x-r} ${y}L${x+r} ${y}M${x-r*.6} ${y-r*.6}L${x+r*.6} ${y+r*.6}M${x-r*.6} ${y+r*.6}L${x+r*.6} ${y-r*.6}" stroke="${W}"/>`;
const INK=[
  o=>heart(50,14,3.2,W)+spark(40,10,1.6)+spark(60,9,1.3)+`<path d="M84 18q-6 8 -14 9m14 -9l-1 4m1 -4l-4 0" fill="none" stroke="${W}"/>`+spark(10,88,1.8),
  o=>`<path d="M14 24c-3-4 3-6 0-10M20 24c-3-4 3-6 0-10" fill="none" stroke="${W}"/>`+heart(88,16,2.8,W)+spark(80,10,1.4)+spark(90,86,1.6),
  o=>`<circle cx="14" cy="14" r="4" fill="none" stroke="${W}"/>`+[0,1,2,3,4,5,6,7].map(i=>{const a=Math.PI/4*i;return `<path d="M${(14+Math.cos(a)*5.5).toFixed(1)} ${(14+Math.sin(a)*5.5).toFixed(1)}L${(14+Math.cos(a)*8).toFixed(1)} ${(14+Math.sin(a)*8).toFixed(1)}" stroke="${W}"/>`;}).join("")+heart(50,28,2.6,W)+`<path d="M88 40q-6 20 0 40" fill="none" stroke="${W}" stroke-dasharray="1.6 2.4"/>`,
  o=>`<path d="M86 8a8 8 0 1 0 5 13a6 6 0 1 1 -5 -13z" fill="none" stroke="${W}"/>`+spark(70,10,1.3)+spark(92,32,1.2)+spark(60,18,1)+heart(48,36,2.6,W)
];
const doodle=(slot,o,set)=>{const ink=set==="ink",D=ink?INK:DOODLES;return `<svg class="hb-doodle${ink?" ink":""}" viewBox="0 0 100 100" aria-hidden="true"><defs><filter id="hbcr${slot}"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="${slot+3}"/><feDisplacementMap in="SourceGraphic" scale="${ink?.5:1.1}"/></filter></defs><g filter="url(#hbcr${slot})" stroke-width="${ink?.7:1.1}" stroke-linecap="round" stroke-linejoin="round">${D[slot%D.length](o)}</g></svg>`;};

/* ---------- page templates ---------- */
function photoSrc(p,ctx){const u=ctx.photos&&ctx.photos[p.slot];return u?{src:u,mine:true}:{src:ctx.base+p.src+".webp",mine:false};}
const T={
  cover(p,o,ctx){const d=ctx.drawing?ctx.drawing:ctx.base+p.art+".webp";
    return `<div class="hb-cover"><h3 class="hb-booktitle">${fill(ctx.book.title,o)}</h3><div class="hb-window"><img src="${esc(d)}" alt="${ctx.drawing?"Your picture on the cover":esc(fill(p.alt||"A child's crayon drawing of Dad with the child on his shoulders",o))}"></div><p class="hb-by">${fill(p.by,o)}</p></div>`;},
  back(p,o){return `<div class="hb-back"><p class="hb-pull">${fill(p.quote,o)}</p><p class="hb-pullwho">${fill(p.who,o)}</p><p class="hb-mark">Hero House Books</p></div>`;},
  title(p,o,ctx){return `<div class="hb-center"><h3 class="hb-booktitle">${fill(ctx.book.title,o)}</h3><p class="hb-sub">${fill(p.sub,o)}</p></div>`;},
  note(p,o){return `<div class="hb-center hb-note">${p.lines.map(l=>`<p>${fill(l,o)}</p>`).join("")}</div>`;},
  qa(p,o){return `<div class="hb-qa${p.big?" big":""}"><p class="hb-q">${fill(p.q,o)}</p><p class="hb-a">${fill(p.a,o)}</p>${p.two?`<p class="hb-q">${fill(p.two.q,o)}</p><p class="hb-a">${fill(p.two.a,o)}</p>`:""}</div>`;},
  art(p,o,ctx){return `<figure class="hb-art${p.tilt?" tilt-"+p.tilt:""}"><img src="${ctx.base}${p.src}.webp" alt="${esc(fill(p.alt,o))}" loading="lazy" decoding="async"></figure>`;},
  photo(p,o,ctx){const s=photoSrc(p,ctx);return `<figure class="hb-photo${s.mine?" mine":""}"><img src="${esc(s.src)}" alt="${s.mine?"Your photo":esc(fill(p.alt,o))}" loading="lazy" decoding="async">${s.mine?doodle(p.slot,o,ctx.book.doodles):""}${p.cap?`<figcaption>${fill(p.cap,o)}</figcaption>`:""}</figure>`;},
  hand(p,o,ctx){return `<figure class="hb-hand"><img src="${ctx.base}${p.src}.webp" alt="A child's blue paint handprint" loading="lazy" decoding="async"><figcaption>${fill(p.cap,o)}</figcaption></figure>`;},
  reply(p,o){return `<div class="hb-reply"><h4>${fill(p.title,o)}</h4><p class="hb-sub">${fill(p.sub,o)}</p><div class="hb-lines"></div></div>`;},
  /* Two Sides: one partner's answer on a page, the other's on the facing page. */
  side(p,o){return `<div class="hb-qa hb-side"><p class="hb-who">${fill(p.who,o)}</p><p class="hb-q">${fill(p.q,o)}</p><p class="hb-a">${fill(p.a,o)}</p></div>`;},
  /* Two Sides: a short question with both answers on one page. */
  pair(p,o){return `<div class="hb-qa hb-pair"><p class="hb-q">${fill(p.q,o)}</p>${p.ans.map(x=>`<p class="hb-who">${fill(x[0],o)}</p><p class="hb-a">${fill(x[1],o)}</p>`).join("")}</div>`;},
  /* Year You Were: a keepsake card of that year's facts (height, teeth, best friend). */
  stats(p,o){return `<div class="hb-stats"><h4>${fill(p.title,o)}</h4><dl>${p.rows.map(r=>`<dt>${fill(r[0],o)}</dt><dd>${fill(r[1],o)}</dd>`).join("")}</dl></div>`;},
  /* Grandpa's Stories: a chapter opener with a voice code, and plain story pages. */
  chapter(p,o){return `<div class="hb-chapter"><p class="hb-chn">${fill(p.n,o)}</p><h4>${fill(p.title,o)}</h4>${(p.paras||[]).map(x=>`<p>${fill(x,o)}</p>`).join("")}<div class="hb-voice"><span class="hb-qr" aria-hidden="true"></span><span>Scan to hear it told</span></div></div>`;},
  story(p,o){return `<div class="hb-story">${p.paras.map(x=>`<p>${fill(x,o)}</p>`).join("")}</div>`;},
  family(p,o){return `<div class="hb-family"><h4>${fill(p.title,o)}</h4><p class="hb-sub">${fill(p.sub,o)}</p><div class="hb-tree"><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="hb-lines"></div></div>`;},
  end(p,o){return `<div class="hb-center hb-end">${p.lines.map(l=>`<p>${fill(l,o)}</p>`).join("")}<p class="hb-mark">Hero House Books</p></div>`;}
};
function pageHtml(p,o,ctx,side){return `<div class="hb-pg ${side} t-${p.t}">${(T[p.t]||T.note)(p,o,ctx)}</div>`;}
function spreadHtml(book,i,o,ctx){const s=book.spreads[i];return `<div class="hb-spread${i===0?" is-cover":""}">${pageHtml(s[0],o,ctx,"l")}${pageHtml(s[1],o,ctx,"r")}</div>`;}
const label=i=>i===0?"Cover":`Pages ${i*2-1} and ${i*2}`;

/* ---------- viewer ---------- */
function mount(el,opt){
  const book=opt.book,n=book.spreads.length;
  const ctx={book,base:opt.base,photos:[],drawing:null};
  const styles=book.styles||STYLES;let i=0,o=opt.vars(),style=styles[0][0];
  el.classList.add("hb");
  el.innerHTML=`<div class="hb-stage" tabindex="0" aria-roledescription="book" aria-label="Sample book, use the arrow keys to turn pages"><div class="hb-book hb-${style}" aria-live="polite"></div>
    <button type="button" class="look-nav prev" aria-label="Previous pages">&#8249;</button><button type="button" class="look-nav next" aria-label="Next pages">&#8250;</button></div>
   <div class="look-bar"><span class="hb-count"></span><div class="hb-jump" role="group" aria-label="Go to pages">${book.spreads.map((_,k)=>`<button type="button" data-i="${k}">${k===0?"Cover":k*2-1}</button>`).join("")}</div></div>`;
  const pg=el.querySelector(".hb-book"),cnt=el.querySelector(".hb-count"),jump=[...el.querySelectorAll(".hb-jump button")],stage=el.querySelector(".hb-stage");
  function show(){pg.className=`hb-book hb-${style}`;pg.innerHTML=spreadHtml(book,i,o,ctx);cnt.textContent=i===0?"Cover":`${label(i)} of ${n*2-2}`;
    jump.forEach((b,k)=>b.setAttribute("aria-current",k===i?"true":"false"));if(opt.onShow)opt.onShow(i);}
  const go=k=>{i=Math.max(0,Math.min(n-1,k));show();};
  el.querySelector(".prev").onclick=()=>go(i-1);el.querySelector(".next").onclick=()=>go(i+1);
  jump.forEach(b=>b.onclick=()=>go(+b.dataset.i));
  stage.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){go(i-1);e.preventDefault();}if(e.key==="ArrowRight"){go(i+1);e.preventDefault();}});
  let x0=null;stage.addEventListener("touchstart",e=>x0=e.touches[0].clientX,{passive:true});
  stage.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null;});
  const slots=book.spreads.flat().filter(p=>p.t==="photo").sort((a,b)=>a.slot-b.slot);
  const firstSpread=slot=>book.spreads.findIndex(s=>s.some(p=>p.t==="photo"&&p.slot===slot));
  show();
  return {
    go,get index(){return i;},count:n,slots:slots.length,
    update(){o=opt.vars();show();},
    style(s){style=s;show();},
    photos(files){ctx.photos.forEach(u=>u&&URL.revokeObjectURL(u));ctx.photos=[];[...files].slice(0,slots.length).forEach((f,k)=>ctx.photos[k]=URL.createObjectURL(f));go(firstSpread(0));return ctx.photos.length;},
    drawing(file){if(ctx.drawing)URL.revokeObjectURL(ctx.drawing);ctx.drawing=file?URL.createObjectURL(file):null;go(0);},
    reset(){ctx.photos.forEach(u=>u&&URL.revokeObjectURL(u));ctx.photos=[];if(ctx.drawing)URL.revokeObjectURL(ctx.drawing);ctx.drawing=null;show();}
  };
}
window.HHBook={mount,spreadHtml,pageHtml,STYLES,label};
})();
