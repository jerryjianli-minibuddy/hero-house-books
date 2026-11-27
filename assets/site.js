/* Hero House Books test site: header, gift cards, product pages, sample books and the gift chooser.
   Nothing here takes orders or stores anything: names typed in only change the sample on screen. */
(function(){
const A=window.HHArt, G=window.HHGifts, C=window.HHChoose;
const root=document.body.dataset.root||"";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fillSvg=svg=>svg.replace("<svg ","<svg preserveAspectRatio=\"xMidYMid slice\" ");
const logo=`<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 19 L20 6 L35 19 V35 H5Z" fill="#0f7c86"/><path d="M11 22.5 q9 -4.5 9 2 q0 -6.5 9 -2 v9.5 q-9 -4 -9 2 q0 -6 -9 -2z" fill="#fffdf7"/><circle cx="20" cy="14" r="2.6" fill="#f2a900"/></svg>`;
const money=n=>"$"+(Math.round(n*100)%100?n.toFixed(2):String(Math.round(n)));
const half=g=>g.price*C.SECOND, pairTotal=g=>g.price+half(g);
const OFFER="Buy one, get the second book 50% off";
const label=(list,k)=>(list.find(x=>x[0]===k)||[,""])[1];

/* ---------- names in samples ---------- */
const WORDS=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen"];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const ord=n=>n+(["th","st","nd","rd"][(n%100-20)%10]||["th","st","nd","rd"][n%100]||"th");
function vars(g,given){
  const o={};g.fields.forEach(f=>{const v=given&&given[f.k];o[f.k]=(v===undefined||v===null||String(v).trim()==="")?f.def:String(v).trim().slice(0,40);});
  const fem=/^(mom|grandma)$/i.test(o.Rel||"")||o.Role==="Grandma";
  Object.assign(o,{he:fem?"she":"he",He:fem?"She":"He",his:fem?"her":"his",His:fem?"Her":"His",rel:(o.Rel||"").toLowerCase(),spouse:o.Role==="Grandma"?"grandfather":"grandmother",Spouse:o.Role==="Grandma"?"Grandpa":"Grandma",
    Other:{Mom:"Grandma",Dad:"Grandpa",Grandma:"Mom",Grandpa:"Dad"}[o.Rel]||"Grandma",Copy:/^grand/i.test(o.Rel||"")?"Mom and Dad":"Grandma and Grandpa",CopyShort:/^grand/i.test(o.Rel||"")?"Mom & Dad":"Grandma & Grandpa"});
  const age=Math.max(0,Math.min(18,parseInt(o.Age,10)||0));
  if(o.Age!==undefined){o.Age=String(age);o.AgeWord=WORDS[age];o.AgeWordCap=age===0?"Born":cap(WORDS[age]);
    o.Candles=age===0?"No candles yet. One very small hat":(age===1?"One candle":cap(WORDS[age])+" candles")+", a few loose teeth, one new bike";
    o.Grade=age<5?"Pre-K":age===5?"Kindergarten":ord(Math.min(12,age-5))+" grade";}
  if(o.Years!==undefined)o.Years=String(Math.max(1,parseInt(o.Years,10)||1));
  return o;
}
const fill=(s,o)=>String(s).replace(/\{(\w+)\}/g,(m,k)=>k in o?esc(o[k]):m);
function art(key,arg){if(!key)return"";const m=/^cake(\d+)$/.exec(key);if(m)return A.cake(+m[1]);if(key==="cake")return A.cake(5);return A[key]?A[key](arg):"";}

/* ---------- dates ---------- */
const DAY=864e5;
const today=()=>{const d=new Date();d.setHours(12,0,0,0);return d;};
function addBiz(d,n){d=new Date(d);while(n>0){d=new Date(+d+DAY);const w=d.getDay();if(w&&w<6)n--;}return d;}
function subBiz(d,n){d=new Date(d);while(n>0){d=new Date(+d-DAY);const w=d.getDay();if(w&&w<6)n--;}return d;}
const fmt=d=>d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const parse=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||"");return m?new Date(+m[1],+m[2]-1,+m[3],12):null;};
function timing(g,need){
  const t0=today(),ready=new Date(+t0+g.time.collect*DAY),made=addBiz(ready,g.time.make+C.PRINT);
  const r={std:addBiz(made,C.SHIP),rush:addBiz(made,C.RUSH)};
  if(need){r.need=need;r.stdOk=r.std<=need;r.rushOk=r.rush<=need;
    r.startBy=new Date(+subBiz(need,g.time.make+C.PRINT+C.SHIP)-g.time.collect*DAY);}
  return r;
}
function timingHtml(g,need){
  const t=timing(g,need);
  if(!need)return `<p class="timing ok">Arrives about <b>${fmt(t.std)}</b> if you start today. Rush: about ${fmt(t.rush)} for $${C.RUSH_PRICE} more.</p>`;
  if(t.stdOk)return `<p class="timing ok"><b>In time for ${fmt(need)}</b> with regular shipping. Start by ${fmt(t.startBy)} at the latest.</p>`;
  if(t.rushOk)return `<p class="timing warn"><b>Only with rush shipping</b> ($${C.RUSH_PRICE} more): arrives about ${fmt(t.rush)}, before ${fmt(need)}. Start today.</p>`;
  return `<p class="timing no"><b>Too late for ${fmt(need)}.</b> The earliest it can arrive is about ${fmt(t.rush)} with rush shipping. Our free printable <a href="${root}reveal.html?gift=${g.id}">"on its way" card</a> covers the day.</p>`;
}
function nthSunday(y,m,n){const d=new Date(y,m,1,12);const first=(7-d.getDay())%7;return new Date(y,m,1+first+7*(n-1),12);}
function nextDate(occ){
  const t=today(),y=t.getFullYear();
  const mk={mothers:yy=>nthSunday(yy,4,2),fathers:yy=>nthSunday(yy,5,3),valentines:yy=>new Date(yy,1,14,12),holidays:yy=>new Date(yy,11,24,12),schoolyear:yy=>new Date(yy,5,10,12),
    grandparent:yy=>{const lab=new Date(yy,8,1,12);lab.setDate(1+((8-lab.getDay())%7));return new Date(+lab+6*DAY);}}[occ];
  if(!mk)return null;let d=mk(y);if(d<=t)d=mk(y+1);return d;
}

/* ---------- page chrome ---------- */
function chrome(){
  const head=document.createElement("div");
  head.innerHTML=`<div class="testbar">Test site. Every person, quote, drawing and photo here is made up, and nothing is for sale yet.</div>
  <div class="offerbar"><b>${OFFER}.</b> One for Mom, one for Grandma. No code needed.</div>
  <header class="site-head"><div class="wrap"><a class="brand" href="${root}index.html">${logo}Hero House Books</a>
  <nav class="nav" aria-label="Main"><a href="${root}choose.html"><b>Help me choose</b></a><a href="${root}valentines.html">Valentine's</a><a href="${root}mothers-day.html">Mother's Day</a><a href="${root}index.html#gifts">All gifts</a><a href="${root}index.html#how">How it works</a><a href="${root}gallery/maya.html">Sample gallery</a></nav></div></header>`;
  document.body.prepend(...head.childNodes);
  const foot=document.createElement("footer");foot.className="site-foot";
  foot.innerHTML=`<div class="wrap"><span>Hero House Books. Real words, real drawings, printed in the USA.</span><span>A test site: no orders, no uploads, nothing saved.</span></div>`;
  document.body.append(foot);
  const d=document.createElement("dialog");d.id="soon";
  d.innerHTML=`<div class="dlg"><h3>Not taking orders yet</h3><p>This is a test site for trying out ideas. Nothing you click here is saved or charged.</p><p class="notice">After a real order you'd see <a href="${root}thanks.html${document.body.dataset.gift?"?gift="+document.body.dataset.gift:""}">this thank-you page</a>, with a free printable "on its way" card and a $10 code to share.</p><form method="dialog"><button class="btn">Got it</button></form></div>`;
  document.body.append(d);
  document.addEventListener("click",e=>{const t=e.target.closest("[data-soon]");if(t){e.preventDefault();d.showModal();}});
}

/* ---------- sample book ---------- */
function book(el,g,given){
  let i=0;const n=g.sample.spreads.length;
  el.innerHTML=`<div class="spread" aria-live="polite"></div><div class="pager"><button type="button" data-p="-1">Back</button><span></span><button type="button" data-p="1">Next</button></div><p class="notice"></p>`;
  const sp=el.querySelector(".spread"),lab=el.querySelector(".pager span"),[b,f]=el.querySelectorAll(".pager button"),note=el.querySelector(".notice");
  let o=vars(g,given);
  const page=p=>p.art?`<div class="page art-page">${art(fill(p.art,o),p.arg?p.arg.replace(/\{(\w+)\}/g,(m,k)=>k in o?o[k]:m):undefined)}</div>`:`<div class="page">${fill(p.html,o)}</div>`;
  function show(){sp.innerHTML=g.sample.spreads[i].map(page).join("");lab.textContent=`Spread ${i+1} of ${n}`;b.disabled=i===0;f.disabled=i===n-1;
    note.innerHTML=fill(g.sample.caption,o)+(g.sample.link?` <a href="${root}${g.sample.link[1].replace("../","")}">${esc(g.sample.link[0])}</a>`:"");}
  el.onclick=e=>{const p=e.target.closest("[data-p]");if(!p)return;i=Math.max(0,Math.min(n-1,i+ +p.dataset.p));show();};
  el.onkeydown=e=>{if(e.key==="ArrowRight"){i=Math.min(n-1,i+1);show();}if(e.key==="ArrowLeft"){i=Math.max(0,i-1);show();}};
  show();
  return {update(ng){o=vars(g,ng);show();},title:()=>fill(g.sample.title,o)};
}
const img=(n,alt,cls,sm)=>`<img${cls?` class="${cls}"`:""} src="${root}assets/img/${n}${sm?"-sm":""}.webp" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const pic=g=>g.photo?img(g.id,g.photo,"",true):fillSvg(art(g.card));
function card(g){return `<a class="card" href="${root}gifts/${g.id}.html" data-tags="${g.tags.join(" ")}"><div class="art">${pic(g)}</div><div class="body"><span class="for">${esc(g.forLine)}</span><h3>${esc(g.name)}</h3><p>${esc(g.tagline)}</p><span class="price">$${g.price} <small>2nd book half off</small></span></div></a>`;}
const giftUrl=(g,given,need)=>{const q=new URLSearchParams();g.fields.forEach(f=>{if(given&&given[f.k]!==undefined&&String(given[f.k]).trim()!=="")q.set(f.k,given[f.k]);});if(need)q.set("need",iso(need));const s=q.toString();return `${root}gifts/${g.id}.html${s?"?"+s:""}`;};

/* ---------- home ---------- */
function home(){
  const grid=document.getElementById("grid");if(!grid)return;
  grid.innerHTML=G.map(card).join("");
  const q=document.getElementById("quote-art");if(q)q.innerHTML=img("hero","A child drawing a picture of Dad at the kitchen table while a phone records their answers, next to an open book of drawings");
  const chips=document.querySelectorAll("#gifts .chips button");
  chips.forEach(c=>c.addEventListener("click",()=>{chips.forEach(x=>x.setAttribute("aria-pressed",x===c));const t=c.dataset.tag;
    grid.querySelectorAll(".card").forEach(k=>k.hidden=!(t==="all"||k.dataset.tags.split(" ").includes(t)));}));
}

/* ---------- gift page ---------- */
function fieldHtml(f,val,id){
  const v=val!==undefined?val:"";
  if(f.type==="select")return `<label class="fld"><span>${esc(f.label)}</span><select data-k="${f.k}" id="${id}">${f.opts.map(o=>`<option${o===(v||f.def)?" selected":""}>${esc(o)}</option>`).join("")}</select></label>`;
  if(f.type==="number")return `<label class="fld"><span>${esc(f.label)}</span><input data-k="${f.k}" id="${id}" type="number" inputmode="numeric" min="${f.min}" max="${f.max}" placeholder="${f.def}" value="${esc(v)}"></label>`;
  return `<label class="fld"><span>${esc(f.label)}</span><input data-k="${f.k}" id="${id}" type="text" maxlength="40" autocomplete="off" placeholder="${esc(f.def)}" value="${esc(v)}"></label>`;
}
/* Heirloom edition: navy linen hardcover, gold foil on the spine, printed dust jacket, 8.5 x 11 in. Lulu: $22.15 vs $17.85 standard (Nov 23). */
const HEIR=69;
const heirOk=g=>g.price===49;
/* Grandparents' copy shipped to their own address: a second Lulu shipment, Mail from $5.69 */
const SHIP2=5.95;
/* Free shipping from $69: two $49 books ($73.50), Fridge Gallery and the Heirloom edition ship free. One $49 book pays $5.95. */
const SHIP=5.95,FREE_AT=69;
const shipFee=sub=>sub>=FREE_AT?0:SHIP;
function shipBarHtml(sub,g){const left=+(FREE_AT-sub).toFixed(2),pct=Math.min(100,sub/FREE_AT*100);
  return `<div class="shipbar${left<=0?" done":""}" role="status"><div class="sb-track" aria-hidden="true"><i style="width:${pct.toFixed(1)}%"></i></div><p>${left<=0?`<b>Free shipping.</b> Your order is ${money(sub)}.`:`<b>You're ${money(left)} away from free shipping.</b> ${g&&half(g)>=left?`Add a second book for ${money(half(g))} and the whole order ships free.`:`Shipping on this order is ${money(SHIP)}.`}`}</p></div>`;}
/* Add 8 more pages: Lulu charges about $1.72 more for 40 pages than 32 (premium color hardcover, 8.5 x 8.5), so most of the $9 is kept. */
const MORE=9;
const MORE_WHAT={"fridge-gallery":"Room for about 8 more pieces of art.","from-all-of-us":"Room for about 16 more notes.","grandpas-stories":"Room for one more story, or more family photos.","family-epic":"Room for more of the adventure, or more of your photos."};
function moreHtml(g,on){return `<label class="gcopy more-top${on?" on":""}"><input type="checkbox" id="more-on"${on?" checked":""}><span class="more-ic" aria-hidden="true">+8</span><span><b>Add 8 more pages</b><small>${MORE_WHAT[g.id]||"Room for about 8 more drawings or photos."} In this book and any copy of it.</small></span><em>+${money(MORE)}</em></label>`;}
/* Matching wall print: 11 x 14 in matte print of the cover. Printful (read Nov 26): $9.83 a print, US shipping from $4.99, always ships on its own. At $15 it about breaks even; it is there to lift the order toward free shipping. */
const WALL=15;
function wallPic(g){const bk=window.HHBooks&&HHBooks[g.id],cv=bk&&bk.spreads.flat().find(x=>x&&x.t==="cover"&&x.art);return cv?`<img src="${root}assets/books/${g.id}/${cv.art}.webp" alt="" loading="lazy">`:pic(g);}
function wallHtml(g,on){return `<label class="gcopy wall-top${on?" on":""}"><input type="checkbox" id="wall-on"${on?" checked":""}><span class="wp-frame" aria-hidden="true">${wallPic(g)}</span><span><b>Add a matching wall print</b><small>The cover, 11 × 14 in on thick matte paper, for their wall. Ships rolled in a tube, on its own. Frame not included.</small></span><em>+${money(WALL)}</em></label>`;}
/* Bilingual edition: every page in English with Spanish or Chinese beside it, in this book and any copy. Same page count and Lulu price when the text fits; the long-text books may need 8 more pages (about $1.72). */
const BI=10;
const LANGS=[["es","Español","Spanish"],["zh-Hans","简体中文","Chinese (simplified)"],["zh-Hant","繁體中文","Chinese (traditional)"]];
const BI_SAMPLE={en:"He sits on the floor by my bed until I'm asleep. He thinks I don't know he's there, but I know.",
  es:"Se sienta en el suelo junto a mi cama hasta que me duermo. Cree que no sé que está ahí, pero yo lo sé.",
  "zh-Hans":"他坐在我床边的地上，一直等到我睡着。他以为我不知道他在那儿，可是我知道。",
  "zh-Hant":"他坐在我床邊的地上，一直等到我睡著。他以為我不知道他在那兒，可是我知道。"};
const langName=c=>(LANGS.find(l=>l[0]===c)||LANGS[0])[2];
function biHtml(g,on,lang){return `<div class="gcopy bi-top${on?" on":""}"><label class="sib-top"><input type="checkbox" id="bi-on"${on?" checked":""}><span class="more-ic bi-ic" aria-hidden="true">Aa<br>文</span><span><b>Make it bilingual</b><small>Every page in English with Spanish or Chinese beside it, in this book and any copy. Made for grandparents who read another language first.</small></span><em>+${money(BI)}</em></label>
  ${on?`<div class="bi-more"><div class="seg" role="group" aria-label="Second language">${LANGS.map(l=>`<button type="button" data-lang="${l[0]}" aria-pressed="${l[0]===lang}" lang="${l[0]}">${l[1]}</button>`).join("")}</div>
   <figure class="bi-page"><p>${esc(BI_SAMPLE.en)}</p><p lang="${lang}">${esc(BI_SAMPLE[lang])}</p><figcaption>A sample page with real words from a made-up book. Your family's words are translated by a person who speaks ${esc(langName(lang))}, and you see every page before we print.</figcaption></figure></div>`:""}</div>`;}
/* Email me my preview: saves the preview link by email now, and one reminder 2 days later if they haven't ordered (Shopify Email: 10,000 free emails a month, automations included). */
function saveHtml(){return `<form class="panel stack save-prev" id="savep" novalidate><h3>Not ready to order?</h3><p class="notice">We'll email you this preview with your names in it, so you can come back to it. One reminder in 2 days, then nothing more. Unsubscribe anytime.</p>
  <div class="save-row"><label class="fld"><span>Your email</span><input type="email" id="save-email" autocomplete="email" placeholder="you@example.com"></label><button type="submit" class="btn">Email me my preview</button></div>
  <p class="notice" id="save-msg" aria-live="polite"></p><div id="save-mails"></div></form>`;}
function saveMails(g,o,email,url){const nm=esc(g.name),when=new Date(Date.now()+2*864e5).toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});
  const mail=(tag,subj,body)=>`<div class="mail"><span class="mail-tag">${tag}</span><b class="mail-subj">${subj}</b><div class="mail-body">${body}</div></div>`;
  return `<p class="notice"><b>A sample of the two emails ${esc(email)} would get.</b> Nothing was sent.</p><div class="mails">
   ${mail("Right now","Your preview is saved: "+nm,`<p>Here's the book you started, with your names already in it. Every page is just as you left it.</p><p><a class="btn" href="${url}">Open my preview</a></p><p class="mail-small">Need it by a date? The page tells you the last day to start.</p>`)}
   ${mail(when+", only if you haven't ordered","Still thinking about "+nm+"?",`<p>Your preview is still here, names and all. Most people finish in about 15 minutes, and the second book is always half off.</p><p><a class="btn" href="${url}">Pick up where I left off</a></p><p class="mail-small">This is the only reminder we'll send.</p>`)}
  </div>`;}
/* Give $10, get $10: a friend gets $10 off their first book, and the person who shared gets $10 off their next one. */
const REF=10;
const refCode=from=>((from||"").normalize("NFD").replace(/[^A-Za-z]/g,"").toUpperCase().slice(0,10)||"FRIEND")+REF;
function refHtml(code){return `<div class="ref-code"><span>Your code</span><b>${esc(code)}</b><small>herohousebooks.com/r/${esc(code.toLowerCase())}</small></div>`;}
function editionHtml(g,ed){
  const row=(v,title,sub,add,pic)=>`<label class="pair-opt${ed===v?" on":""}"><input type="radio" name="ed" value="${v}"${ed===v?" checked":""}>${pic||""}<span><b>${title}</b><small>${sub}</small></span><em>${add}</em></label>`;
  return `<legend>Choose the edition</legend>
   ${row("classic","Classic hardcover","8.5 × 8.5 in with a printed cover.",money(g.price))}
   ${row("heirloom","Heirloom edition","Navy linen cover with the title and their name in gold foil on the spine, and a dust jacket with their name on the front. Larger 8.5 × 11 in pages.",money(HEIR),`<span class="linen" aria-hidden="true"><i></i></span>`)}`;
}
function pairHtml(g,o,pick,sibName,p1,ship,note,heir){
  const row=(v,title,sub,add)=>`<label class="pair-opt${pick===v?" on":""}"><input type="radio" name="two" value="${v}"${pick===v?" checked":""}><span><b>${title}</b>${sub?`<small>${sub}</small>`:""}</span><em>${add}</em></label>`;
  const two=pick!=="none";
  const gc=g.gcopy?`<label class="gcopy${pick==="0"?" on":""}"><input type="checkbox" id="gcopy"${pick==="0"?" checked":""}>${g.photo?img(g.id,"",null,true):""}<span><b>Copy for ${esc(o.CopyShort||"Grandma & Grandpa")}</b><small>The same book, so they get their own. One tap, half off.</small></span><em>+${money(half(g))}</em></label>`:"";
  const who=esc(o.CopyShort||"Grandma & Grandpa");
  const gcx=g.gcopy&&pick==="0"?`<div class="gship"><label class="sib-top"><input type="checkbox" id="gship"${ship?" checked":""}><span><b>Ship it straight to them</b><small>Their copy goes in its own box to their address, with its own tracking. We ask for the address when you order.</small></span><em>+${money(SHIP2)}</em></label>${ship?`<label class="fld sib-name"><span>Gift note for ${who}</span><textarea id="gnote" maxlength="200" rows="3" placeholder="We made this for you. Love, Maya">${esc(note||"")}</textarea></label><p class="notice" id="gnote-n">Printed on a card inside their box. ${200-(note||"").length} characters left.</p>`:""}</div>`:"";
  const sv=g.sibIdx!=null?String(g.sibIdx):"sib";
  const sb=g.sib?`<div class="gcopy sibcopy${pick===sv?" on":""}"><label class="sib-top"><input type="checkbox" id="sibcopy"${pick===sv?" checked":""}><span><b>${fill(g.sib[0],o)}</b><small>${fill(g.sib[1],o)} One tap, half off.</small></span><em>+${money(half(g))}</em></label>${pick===sv?`<label class="fld sib-name"><span>Brother or sister's name</span><input type="text" id="sib-name" maxlength="40" autocomplete="off" placeholder="Their name" value="${esc(sibName||"")}"></label><p class="notice">You'll add their photo${g.id==="fridge-gallery"?" and art":""} when you start the order.</p>`:""}</div>`:"";
  return `<legend>${OFFER}</legend>
   ${gc}${gcx}${sb}
   ${row("none","Just one book","",money(p1))}
   ${g.pair.map((p,i)=>(g.gcopy&&i===0)||(g.sib&&g.sibIdx===i)?"":row(String(i),fill(p[0],o),fill(p[1],o),"+"+money(half(g)))).join("")}
   <p class="pair-total">${two?`<b>${money(p1+half(g))} for two books.</b> You save ${money(half(g))}, and shipping is free.${pick==="0"&&ship?` With their copy shipped to them, <b>your order is ${money(p1+half(g)+SHIP2)}</b>.`:""}`:`Add a second book for ${money(half(g))} and pay ${money(p1+half(g))} for both.`}</p>${heir&&two?`<p class="notice">The second book is the classic edition, half off.</p>`:""}
   <p class="notice">Or pair it with <a href="${root}index.html#gifts">any other gift</a>: the lower-priced book is half off.</p>`;
}
/* ---------- "Hear my voice" add-on: a code printed inside the cover that plays a recorded message ---------- */
const VOICE=9;
const voiceOk=g=>g.id!=="grandpas-stories"; /* Grandpa's Stories already has a voice code on every chapter */
function qrSvg(seed){ /* a stand-in code for the mockup: the real one is made per order */
  let x=seed||7;const rnd=()=>(x=(x*16807)%2147483647)/2147483647;const n=25,c=[];
  const finder=(r,q)=>r<8&&q<8||r<8&&q>=n-8||r>=n-8&&q<8;
  for(let r=0;r<n;r++)for(let q=0;q<n;q++){if(finder(r,q))continue;if(rnd()<.48)c.push(`<rect x="${q}" y="${r}" width="1" height="1"/>`);}
  const box=(X,Y)=>`<rect x="${X}" y="${Y}" width="7" height="7"/><rect x="${X+1}" y="${Y+1}" width="5" height="5" fill="#fff"/><rect x="${X+2}" y="${Y+2}" width="3" height="3"/>`;
  return `<svg viewBox="-2 -2 ${n+4} ${n+4}" role="img" aria-label="Sample voice code"><rect x="-2" y="-2" width="${n+4}" height="${n+4}" fill="#fff"/><g fill="#1c2340">${box(0,0)}${box(n-7,0)}${box(0,n-7)}${c.join("")}</g></svg>`;
}
function voice(g,getBase){
  const el=document.getElementById("voice");let on=false,who="child",url="",rec=null,chunks=[];
  const WHO=[["child","The child, in their own voice"],["grandparent","A grandparent"],["you","You"]];
  const base=getBase;
  const totalHtml=()=>on?`<b>Your order: ${money(base()+VOICE)}</b>, with the voice message. ${shipFee(base()+VOICE)?`Plus ${money(SHIP)} shipping.`:"Shipping is free."}`:"";
  function render(){
    el.innerHTML=`<label class="gcopy voice-top${on?" on":""}"><input type="checkbox" id="voice-on"${on?" checked":""}><span class="voice-ic" aria-hidden="true">${qrSvg(3)}</span><span><b>Hear my voice</b><small>A code printed inside the cover. Scan it with any phone to hear a recorded message. No app.</small></span><em>+${money(VOICE)}</em></label>
    ${on?`<div class="voice-body">
      <label class="fld"><span>Whose voice?</span><select id="voice-who">${WHO.map(w=>`<option value="${w[0]}"${w[0]===who?" selected":""}>${w[1]}</option>`).join("")}</select></label>
      <div class="voice-try"><figure class="voice-qr">${qrSvg(11)}<figcaption>Sample code. Yours is made for your book.</figcaption></figure>
       <div class="stack" style="gap:8px"><b>Try it now</b><p class="notice">Record up to 60 seconds to hear how it works. It stays on this device. Nothing is uploaded.</p>
        <div class="upl"><button type="button" class="btn ghost" id="voice-rec">${rec?"Stop":"Record a sample"}</button><label class="btn ghost">Or pick a sound file<input type="file" id="voice-file" accept="audio/*"></label></div>
        ${url?`<audio controls src="${url}"></audio>`:""}<p class="notice" id="voice-note" aria-live="polite"></p></div></div>
      <p class="notice">After you order, we send a link to record from any phone. We keep the message online for at least 10 years and email you the file too.</p></div>`:""}
    <p class="pair-total" id="voice-total">${totalHtml()}</p>`;
  }
  function stop(){if(rec&&rec.state!=="inactive")rec.stop();}
  el.addEventListener("change",e=>{
    if(e.target.id==="voice-on"){on=e.target.checked;if(!on)stop();render();}
    if(e.target.id==="voice-who")who=e.target.value;
    if(e.target.id==="voice-file"&&e.target.files[0]){if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(e.target.files[0]);render();}
  });
  el.addEventListener("click",async e=>{
    if(e.target.id!=="voice-rec")return;
    if(rec){stop();return;}
    const note=()=>document.getElementById("voice-note");
    if(!navigator.mediaDevices||!window.MediaRecorder){note().textContent="This browser can't record here. Pick a sound file instead.";return;}
    try{const stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];rec=new MediaRecorder(stream);
      rec.ondataavailable=ev=>chunks.push(ev.data);
      rec.onstop=()=>{stream.getTracks().forEach(t=>t.stop());if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||"audio/webm"}));rec=null;render();};
      rec.start();setTimeout(stop,60000);render();note().textContent="Recording. Press Stop when you're done.";
    }catch(err){rec=null;render();note().textContent="The microphone isn't available here. Pick a sound file instead.";}
  });
  render();
  return {total(){const t=document.getElementById("voice-total");if(t)t.innerHTML=totalHtml();},on:()=>on};
}

/* ---------- Valentine's page ---------- */
function valentines(){
  if(document.body.dataset.page!=="valentines")return;
  const day=new Date(2027,1,13,12); /* arrive by Saturday, Feb 13 */
  const gs=["in-my-words","two-sides"].map(id=>G.find(x=>x.id===id));
  const t=gs.map(g=>timing(g,day));
  const last=new Date(Math.max(...t.map(x=>+x.startBy)));last.setHours(23,59,59,0);
  const rushBy=g=>new Date(+subBiz(day,g.time.make+C.PRINT+C.RUSH)-g.time.collect*DAY);
  const lastRush=new Date(Math.max(...gs.map(g=>+rushBy(g))));lastRush.setHours(23,59,59,0);
  document.getElementById("app").innerHTML=`<div class="wrap">
  <section class="hero vday-hero"><div class="stack-lg"><div class="stack"><span class="eyebrow">Valentine's Day, Sunday, February 14</span>
   <h1>A Valentine they'll keep for twenty years.</h1>
   <p class="lede">Not a card that's gone by March. A hardcover of your kids' real words about Mom or Dad, or both sides of how you two met.</p></div>
   <div class="countdown" id="cd" aria-live="polite"></div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#vday-gifts">Pick a Valentine</a><a class="btn ghost" href="choose.html?occ=valentines">Help me choose</a></div></div>
   <figure class="p-photo" style="margin:0">${img("two-sides","A couple on the sofa with tea, looking through a book with a photo of the two of them on a date")}</figure></section>
  <section class="stack-lg" id="vday-gifts"><div class="stack"><h2>Two Valentines</h2><p class="notice">Both arrive by Saturday, Feb 13 with regular shipping if you start by the date on each.</p></div>
   <div class="cards vday-grid">${gs.map((g,i)=>`<a class="card" href="${giftUrl(g,null,day)}"><div class="art">${img(g.id,g.photo,"",true)}</div><div class="body"><span class="for">${i?"For your partner":"From the kids, for Mom or Dad"}</span><h3>${esc(g.name)}</h3><p>${esc(i?"You each answer the same 15 questions on your own. The book puts your answers side by side.":"15 minutes at the kitchen table: your kids' real answers and drawings about Mom or Dad.")}</p><span class="price">$${g.price} <small>Start by ${fmt(t[i].startBy)}</small></span></div></a>`).join("")}</div>
   <div class="cta-band"><div class="stack"><h2>One of each: ${money(pairTotal(gs[0]))}</h2><p>The kids' book for Mom or Dad, and Two Sides of Us for the two of you. The second book is half off, and the pair ships free.</p></div><a class="btn" href="${giftUrl(gs[0],null,day)}">Start with the kids' book</a></div></section>
  <section class="stack-lg"><h2>Add their voice for $9</h2><div class="vday-voice"><figure class="voice-qr">${qrSvg(11)}</figure><p>A code printed inside the cover. Scan it with any phone and hear your child say "Happy Valentine's Day, Mom", or the two of you reading your answers out loud. Add it on the gift's page.</p></div></section>
  <section class="stack"><h2>Dates that matter</h2><ul class="vday-dates">
   ${gs.map((g,i)=>`<li><b>${fmt(t[i].startBy)}</b> Last day to start ${esc(g.name)} with regular shipping.</li>`).join("")}
   <li><b>${fmt(lastRush)}</b> Last day with rush shipping, $${C.RUSH_PRICE} more.</li>
   <li><b>Sat, Feb 13</b> Your book arrives.</li></ul>
   <p class="notice">Every book needs a few days for your answers, a few for us to make it, then printing and the mail. That's why the start dates come early.</p></section></div>`;
  const cd=document.getElementById("cd");
  function tick(){
    const now=new Date(),reg=last-now,rush=lastRush-now;
    if(reg>0){const d=Math.floor(reg/DAY),h=Math.floor(reg%DAY/36e5),m=Math.floor(reg%36e5/6e4);
      cd.innerHTML=`<span class="cd-n"><b>${d}</b>days</span><span class="cd-n"><b>${h}</b>hours</span><span class="cd-n"><b>${m}</b>min</span><span class="cd-l">left to order for Valentine's Day with regular shipping. Last day: ${fmt(last)}.</span>`;}
    else if(rush>0)cd.innerHTML=`<span class="cd-l"><b>Rush only now.</b> Start by ${fmt(lastRush)} and add rush shipping, $${C.RUSH_PRICE}, to have it by Feb 13.</span>`;
    else cd.innerHTML=`<span class="cd-l"><b>Too late for delivery by Valentine's Day.</b> Order now and we'll email a <a href="${root}reveal.html?gift=two-sides">printable "your book is on its way" card</a> for the 14th.</span>`;
  }
  tick();setInterval(tick,30000);
}
/* ---------- "On its way" reveal card: free with every order, so nobody is empty-handed while the book prints ---------- */
const REVEAL_TO={"in-my-words":o=>o.Rel,"fridge-gallery":()=>"Grandma","two-sides":o=>o.B,"grandpas-stories":o=>o.Elder,"the-year-you-were":o=>o.Kid,"from-all-of-us":o=>o.Honoree,"family-epic":o=>"the "+o.Family};
const revealUrl=(g,given)=>{const q=giftUrl(g,given,null).split("?")[1];return `${root}reveal.html?gift=${g.id}${q?"&"+q:""}`;};
function revealCard(g,to,from,msg,arrive,gift10){
  return `<div class="rv-card" id="rv-card">
   <div class="rv-panel rv-front"><div class="rv-pic">${img(g.id,g.photo)}</div><div class="rv-words"><p class="rv-kick">Something is on its way</p><h2 class="rv-to">For ${esc(to||"you")}</h2></div></div>
   <div class="rv-panel rv-inside"><p class="rv-msg">${esc(msg||"We made you something, and it's on its way.")}</p>
    <p>It's a book called <b>${esc(g.name)}</b>, printed just for you. It arrives about <b>${fmt(arrive)}</b>.</p>
    <div class="rv-peek">${qrSvg(5)}<span>Can't wait? Scan to flip through every page now.</span></div>
    <p class="rv-from">${from?"Love, "+esc(from):""}</p>${gift10?`<p class="rv-ten">Want to make one for someone you love? $${REF} off your first book with code <b>${esc(refCode(from))}</b>.</p>`:""}<p class="rv-mark">Hero House Books</p></div></div>`;
}
function reveal(){
  if(document.body.dataset.page!=="reveal")return;
  const qs=new URLSearchParams(location.search);
  let g=G.find(x=>x.id===qs.get("gift"))||G[0];const given={};g.fields.forEach(f=>{if(qs.has(f.k))given[f.k]=qs.get(f.k);});
  let to=REVEAL_TO[g.id](vars(g,given)),from="",msg="",ten=true;
  const app=document.getElementById("app");
  app.innerHTML=`<div class="wrap">
  <section class="hero rv-hero"><div class="stack"><span class="eyebrow">Free with every order</span><h1>Your book is on its way. Here's what to hand over on the day.</h1>
   <p class="lede">Printing and shipping take about three weeks. So every order comes with a printable card to give on the day, and the full preview pages to show them. Nobody waits empty-handed.</p></div></section>
  <section class="rv-grid"><form class="panel" id="rv-form" onsubmit="return false"><h3>Make your card</h3>
    <label class="fld"><span>The gift</span><select id="rv-gift">${G.map(x=>`<option value="${x.id}"${x===g?" selected":""}>${esc(x.name)}</option>`).join("")}</select></label>
    <label class="fld"><span>Who it's for</span><input type="text" id="rv-to" maxlength="40" autocomplete="off" value="${esc(to)}"></label>
    <label class="fld"><span>From</span><input type="text" id="rv-from" maxlength="40" autocomplete="off" placeholder="Your names"></label>
    <label class="fld"><span>A line from you</span><input type="text" id="rv-msg" maxlength="90" autocomplete="off" placeholder="We made you something, and it's on its way."></label>
    <label class="chk"><input type="checkbox" id="rv-ten" checked> <span>Add a $${REF} code they can use for a book of their own. When they use it, you get $${REF} off your next one.</span></label>
    <p class="notice">Nothing you type here is saved. After a real order, the card comes by email, already filled in, and its code opens your book's preview pages. The code here is a sample.</p>
    <div class="upl"><button type="button" class="btn" id="rv-print">Print the card</button><a class="btn ghost" id="rv-look" href="#">Open the preview pages</a></div>
    <p class="notice">Prints on one sheet. Fold it in half with the picture on the outside.</p></form>
   <div class="rv-stage" id="rv-stage"></div></section>
  <section class="stack-lg rv-day"><h2>On the day</h2><ol class="how">
   <li><b>Hand over the card</b><span>The picture is on the front, your note on the back.</span></li>
   <li><b>Show them the pages</b><span>Open the preview on your phone or a TV. It's the real book, every page, with their names.</span></li>
   <li><b>The book arrives</b><span>We email you the tracking number the day it ships.</span></li></ol></section></div>`;
  const show=()=>{const a=timing(g,null).std;document.getElementById("rv-stage").innerHTML=revealCard(g,to,from,msg,a,ten);document.getElementById("rv-look").href=giftUrl(g,given,null)+"#look";};show();
  document.getElementById("rv-form").addEventListener("input",e=>{const id=e.target.id;
    if(id==="rv-to")to=e.target.value;if(id==="rv-from")from=e.target.value;if(id==="rv-msg")msg=e.target.value;if(id==="rv-ten")ten=e.target.checked;show();});
  document.getElementById("rv-ten").addEventListener("change",e=>{ten=e.target.checked;show();});
  document.getElementById("rv-gift").addEventListener("change",e=>{g=G.find(x=>x.id===e.target.value);for(const k in given)delete given[k];to=REVEAL_TO[g.id](vars(g,given));document.getElementById("rv-to").value=to;show();});
  document.getElementById("rv-print").addEventListener("click",()=>window.print());
}

/* ---------- The Year You Were: a collectible series whose spines build one picture on the shelf ---------- */
const SER_N=19,SER_W=30,SER_H=200;
function seriesScene(u){return `<defs><linearGradient id="sky${u}" x1="0" x2="1"><stop offset="0" stop-color="#ffcfb8"/><stop offset=".45" stop-color="#bfe3ff"/><stop offset="1" stop-color="#cbbcff"/></linearGradient></defs>
 <rect width="570" height="200" fill="url(#sky${u})"/><circle cx="300" cy="62" r="26" fill="#ffd447"/>
 <g fill="#fff" opacity=".92"><ellipse cx="90" cy="40" rx="26" ry="9"/><ellipse cx="108" cy="34" rx="16" ry="9"/><ellipse cx="430" cy="46" rx="30" ry="9"/><ellipse cx="450" cy="39" rx="17" ry="9"/></g>
 <path d="M250 30q4-4 8 0q4-4 8 0M512 24q3-3 6 0q3-3 6 0" fill="none" stroke="#1c2340" stroke-width="1.2"/>
 <path d="M420 132L482 70L520 108L546 86L570 112V200H420Z" fill="#8a95c9"/><path d="M482 70L494 82L488 85L482 79L474 87Z" fill="#fff"/>
 <path d="M0 130Q80 100 160 125T330 118T570 128V200H0Z" fill="#7cc58a"/><path d="M0 160Q100 135 200 155T400 150T570 158V200H0Z" fill="#4fae64"/>
 <path d="M20 200Q60 170 140 168T300 150T470 128" fill="none" stroke="#f6e3b0" stroke-width="7" stroke-linecap="round"/>
 <g transform="translate(22 122)"><rect y="12" width="26" height="20" fill="#fffdf7"/><path d="M-3 13L13 0L29 13Z" fill="#e5432d"/><rect x="10" y="20" width="7" height="12" fill="#f2a900"/></g>
 <g transform="translate(372 106)"><rect x="6" y="18" width="5" height="22" fill="#8a5a3c"/><circle cx="8.5" cy="14" r="14" fill="#2f8f4e"/></g>
 <g transform="translate(196 70)"><ellipse cx="10" cy="10" rx="10" ry="12" fill="#e5432d"/><path d="M10 22V40" stroke="#1c2340" stroke-width=".8"/></g>`;}
const SER_COL=["#f2a900","#e5432d","#2f6fd6","#2fa84f","#e8589e","#0f7c86"];
function seriesHtml(o){
  const age=+o.Age,kid=esc(o.Kid);let spines="";
  for(let i=0;i<SER_N;i++){const x=i*SER_W,own=i<=age;
    spines+=(own?"":`<rect x="${x}" y="0" width="${SER_W}" height="${SER_H}" fill="#f6f2ea" opacity=".8"/>`)+
     `<path d="M${x} 0V${SER_H}" stroke="rgba(28,35,64,.35)" stroke-width="1"/><rect x="${x+5}" y="6" width="20" height="15" rx="3" fill="#fffdf7" opacity="${own?.95:.6}"/><text x="${x+15}" y="17.5" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1c2340" opacity="${own?1:.5}">${i}</text>`+
     (own?`<text transform="translate(${x+19} 192) rotate(-90)" font-size="9.5" fill="#1c2340" font-weight="600">${kid}</text>`:"");}
  const cur=`<rect x="${age*SER_W+1}" y="1" width="${SER_W-2}" height="${SER_H-2}" fill="none" stroke="#1c2340" stroke-width="2.5"/>`;
  const shelf=`<svg viewBox="0 0 570 212" role="img" aria-label="A shelf of 19 matching books, ages 0 to 18. Together their spines make one picture of a path from a little house to the mountains. ${age+1} are filled in.">${seriesScene("s")}${spines}${cur}<rect y="200" width="570" height="12" rx="2" fill="#8a5a3c"/></svg>`;
  const ages=[age-1,age,age+1].filter(a=>a>=0&&a<=18),lab=a=>a===age?"This birthday":a<age?"Last year":"Next year";
  const covers=ages.map(a=>`<figure class="sc-cov${a===age?" cur":""}" style="--c:${SER_COL[a%SER_COL.length]}"><div class="sc-body"><svg class="sc-spine" viewBox="${a*SER_W} 0 ${SER_W} ${SER_H}" preserveAspectRatio="none" aria-hidden="true">${seriesScene("c"+a)}</svg><span class="sc-n">${a}</span><b>The Year You Were ${a===0?"Born":cap(WORDS[a])}</b><small>${kid}</small></div><figcaption>${lab(a)}</figcaption></figure>`).join("");
  return `<div class="stack"><h2>Collect every year</h2><p class="lede">Every book in the series is the same size, with a matching cover and a numbered spine. Each spine is one slice of a single picture, so ${kid}'s shelf fills in one birthday at a time. By eighteen the picture is whole.</p></div>
   <figure class="shelf">${shelf}<figcaption>${kid}'s shelf at ${o.Age}: ${age+1} of 19 books. The faded spines are the years still to come.</figcaption></figure>
   <div class="stack"><h3>Same cover, new color each year</h3><div class="sc-covers">${covers}</div></div>
   <p class="notice">No subscription. We email you a month before each birthday with that year's questions, and you decide. Start at any age, and make the earlier years from your photos and what you remember.</p>`;
}
/* ---------- Handwritten first page: the giver writes a note on paper, photographs it, and it's printed on page 1 ---------- */
function dedHtml(){return `<div class="panel stack ded" id="ded"><h3>Add a handwritten first page</h3><p class="notice">Write a few lines on any paper and take a photo. We print it on the first page in your own handwriting. Free with every book.</p>
  <div class="ded-page" id="ded-page"></div>
  <div class="upl"><label class="btn ghost">Add a photo of your note<input type="file" id="ded-file" accept="image/jpeg,image/png,image/webp,image/heic"></label><button type="button" class="btn ghost" id="ded-reset" hidden>Show the sample</button></div>
  <p class="notice" id="ded-note" aria-live="polite">Your photo stays on this device. Nothing is uploaded.</p></div>`;}
let dedUrl=null;
function dedSample(g,given){const el=document.getElementById("ded-page");if(!el||dedUrl)return;const to=REVEAL_TO[g.id](vars(g,given));
  el.innerHTML=`<div class="ded-hand"><p>Dear ${esc(to)},</p><p>We made this so you'd always have it. Every word in here is real, and so is every bit of love.</p><p class="ded-sign">Always,<br>all of us</p></div><span class="ded-tag">Sample</span>`;}
function ded(g,given,bk){
  const el=document.getElementById("ded-page"),file=document.getElementById("ded-file"),rs=document.getElementById("ded-reset"),note=document.getElementById("ded-note");
  dedSample(g,given);
  file.onchange=e=>{const f=e.target.files[0];if(!f||!/^image\//.test(f.type))return;if(dedUrl)URL.revokeObjectURL(dedUrl);dedUrl=URL.createObjectURL(f);
    el.innerHTML=`<img class="ded-img" src="${dedUrl}" alt="Your handwritten note on the first page">`;rs.hidden=false;
    if(bk)bk.dedication(f);
    note.textContent=`This is how it prints on page 1${bk?", and it's on page 1 of the book below too":""}. In a real book we lift the writing off the paper and keep every stroke. We never retype it.`;e.target.value="";};
  rs.onclick=()=>{if(dedUrl)URL.revokeObjectURL(dedUrl);dedUrl=null;dedSample(g,given);rs.hidden=true;if(bk)bk.dedication(null);note.textContent="Your photo stays on this device. Nothing is uploaded.";};
}
function gift(){
  const id=document.body.dataset.gift;if(!id)return;const g=G.find(x=>x.id===id);if(!g)return;
  document.title=`${g.name} | Hero House Books`;
  const qs=new URLSearchParams(location.search),given={};g.fields.forEach(f=>{if(qs.has(f.k))given[f.k]=qs.get(f.k);});
  let need=parse(qs.get("need"));
  const others=G.filter(x=>x.id!==id).slice(0,3);
  const full=!!(g.book&&window.HHBook&&window.HHBooks&&HHBooks[g.id]);
  const main=document.getElementById("app");
  main.innerHTML=`<div class="wrap">
  <section class="p-hero"><div class="stack-lg"><div class="stack"><span class="eyebrow">${esc(g.forLine)}</span><h1>${esc(g.name)}</h1><p class="lede">${esc(g.tagline)}</p></div>
   <div><div class="price-big" id="price-big">$${g.price}</div><p class="notice" id="price-note">${esc(g.priceNote)}</p></div>
   ${heirOk(g)?`<fieldset class="pair" id="edition"></fieldset>`:""}<div id="more"></div><div id="bi"></div><div id="wall"></div>
   <fieldset class="pair" id="pair"></fieldset>${voiceOk(g)?`<div class="voice" id="voice"></div>`:""}<div id="shipbar"></div>
   <dl class="facts">${g.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#" data-soon>Start this gift</a>${full?`<a class="btn ghost" href="#look">See every page</a>`:""}<a class="btn ghost" href="${root}choose.html">Not sure? Help me choose</a><a class="btn ghost" href="#savep">Email me my preview</a></div>
   <p class="notice rv-line">Every order comes with a free printable "on its way" card and the full preview pages to show on the day. <a id="rv-link" href="${revealUrl(g,given)}">See the card</a></p></div>
   <div class="stack-lg">${g.photo?`<figure class="p-photo">${img(g.id,g.photo)}</figure>`:""}${full?"":`<div class="book" id="book" tabindex="0" aria-label="Sample book"></div>`}
    <form class="panel" id="mine" onsubmit="return false">${full?`<h3>When do you need it?</h3><p class="notice">We'll tell you the last day to start.</p>`:`<h3>Make the sample yours</h3><p class="notice">Type real names to see how your book would read. Nothing is saved.</p>
     <div class="fields">${g.fields.map((f,i)=>fieldHtml(f,given[f.k],"f"+i)).join("")}</div>`}
     <label class="fld"><span>Need it by</span><input type="date" id="need" min="${iso(today())}" value="${need?iso(need):""}"></label>
     <div id="when"></div></form>${dedHtml()}${saveHtml()}</div></section>${g.id==="in-my-words"?`<p class="md-line"><b>Mother's Day edition:</b> All About Mom, with questions all about her and a spring cover. <a href="${root}mothers-day.html">See it</a></p>`:""}
  ${g.series?`<section class="stack-lg series" id="series"></section>`:""}
  ${full?fullBookHtml(g,given):""}
  ${g.look&&!full?`<section class="stack-lg look" id="look"><div class="stack"><h2>Look inside</h2><p class="notice">Real page spreads from a sample book. Printed as an 8.5 × 8.5 in hardcover. The family and drawings here are made up.</p></div>
   <figure class="look-stage"><img id="look-img" src="${root}assets/look/${g.id}-1.webp" alt="" width="1600" height="800" decoding="async">
    <button type="button" class="look-nav prev" id="look-prev" aria-label="Previous pages">&#8249;</button><button type="button" class="look-nav next" id="look-next" aria-label="Next pages">&#8250;</button></figure>
   <div class="look-bar"><span id="look-count" aria-live="polite"></span><div class="look-thumbs" role="group" aria-label="Choose pages">${Array.from({length:g.look},(_,i)=>`<button type="button" data-i="${i}" aria-label="Pages ${i*2+1} and ${i*2+2}"><img src="${root}assets/look/${g.id}-${i+1}-sm.webp" alt="" loading="lazy"></button>`).join("")}</div></div></section>`:""}
  <section class="stack" style="padding-top:20px"><h2>Why it lands</h2><p class="why">${esc(g.why)}</p></section>
  <section class="stack-lg" id="how"><h2>How it's made</h2><ol class="how">${g.how.map(h=>`<li><b>${esc(h[0])}</b><span>${esc(h[1])}</span></li>`).join("")}</ol><p class="notice">What we'll need from you: ${esc(g.time.needs)}.</p></section>
  <section class="stack"><h2>What's inside</h2><ul>${g.inside.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>
  <section class="stack"><h2>Questions</h2><div class="faq">${g.faq.map(f=>`<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join("")}</div></section>
  <section class="stack-lg"><h2>More gifts like this</h2><div class="cards">${others.map(card).join("")}</div></section></div>`;
  const bk=full?fullBook(g,given):book(document.getElementById("book"),g,given);
  if(g.look&&!full)lookInside(g);
  const pairEl=document.getElementById("pair");const tw=parseInt(qs.get("two"),10);let pick=tw>=1&&tw<=g.pair.length?String(tw-1):"none";
  let sibName="",ed="classic",ship=false,note="",more=false,wall=false,bi=false,lang="es";
  const wp=()=>(wall?WALL:0)+(bi?BI:0);
  const p1=()=>(ed==="heirloom"?HEIR:g.price)+(more?MORE:0);
  const vc=voiceOk(g)?voice(g,()=>(pick==="none"?p1():p1()+half(g))+(pick==="0"&&ship?SHIP2:0)+wp()):null;
  const shipEl=document.getElementById("shipbar");
  const showShip=()=>{const sub=(pick==="none"?p1():p1()+half(g))+(vc&&vc.on()?VOICE:0)+wp();shipEl.innerHTML=shipBarHtml(sub,pick==="none"?g:null);};
  const showPair=()=>{pairEl.innerHTML=pairHtml(g,vars(g,given),pick,sibName,p1(),ship,note,ed==="heirloom");const gs=bi&&pairEl.querySelector("label.gcopy small");if(gs)gs.textContent=`The same book in English and ${langName(lang)}, so they read it in their own language. One tap, half off.`;if(vc)vc.total();showShip();};showPair();
  main.addEventListener("change",e=>{if(e.target.id==="voice-on")showShip();});
  ded(g,given,full?bk:null);
  const edEl=document.getElementById("edition");
  if(edEl){const showEd=()=>{edEl.innerHTML=editionHtml(g,ed);document.getElementById("price-big").textContent=money(p1());document.getElementById("price-note").textContent=ed==="heirloom"?"Navy linen hardcover, 8.5 × 11 in, free shipping":g.priceNote;};showEd();
    edEl.addEventListener("change",e=>{if(e.target.name==="ed"){ed=e.target.value;showEd();showPair();}});}
  const moreEl=document.getElementById("more");const showMore=()=>{moreEl.innerHTML=moreHtml(g,more);document.getElementById("price-big").textContent=money(p1());};showMore();
  moreEl.addEventListener("change",e=>{if(e.target.id==="more-on"){more=e.target.checked;showMore();showPair();}});
  const biEl=document.getElementById("bi");const showBi=()=>{biEl.innerHTML=biHtml(g,bi,lang);};showBi();
  biEl.addEventListener("change",e=>{if(e.target.id==="bi-on"){bi=e.target.checked;showBi();showPair();}});
  biEl.addEventListener("click",e=>{const b=e.target.closest("[data-lang]");if(b){lang=b.dataset.lang;showBi();showPair();}});
  const wallEl=document.getElementById("wall");const showWall=()=>{wallEl.innerHTML=wallHtml(g,wall);};showWall();
  wallEl.addEventListener("change",e=>{if(e.target.id==="wall-on"){wall=e.target.checked;showWall();showPair();}});
  const sv=document.getElementById("savep");sv.addEventListener("submit",e=>{e.preventDefault();const em=document.getElementById("save-email").value.trim(),msg=document.getElementById("save-msg");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)){msg.textContent="Please type an email address like you@example.com.";document.getElementById("save-mails").innerHTML="";return;}
    msg.textContent="";document.getElementById("save-mails").innerHTML=saveMails(g,vars(g,given),em,giftUrl(g,given,need));});
  pairEl.addEventListener("change",e=>{if(e.target.name==="two"){pick=e.target.value;showPair();}if(e.target.id==="gcopy"){pick=e.target.checked?"0":"none";showPair();}
    if(e.target.id==="gship"){ship=e.target.checked;showPair();if(ship)document.getElementById("gnote").focus();}
    if(e.target.id==="sibcopy"){pick=e.target.checked?(g.sibIdx!=null?String(g.sibIdx):"sib"):"none";showPair();if(e.target.checked)document.getElementById("sib-name").focus();}});
  pairEl.addEventListener("input",e=>{if(e.target.id==="sib-name")sibName=e.target.value;
    if(e.target.id==="gnote"){note=e.target.value;document.getElementById("gnote-n").textContent=`Printed on a card inside their box. ${200-note.length} characters left.`;}});
  const serEl=document.getElementById("series");const showSeries=()=>{if(serEl)serEl.innerHTML=seriesHtml(vars(g,given));};showSeries();
  const when=document.getElementById("when");const showWhen=()=>when.innerHTML=timingHtml(g,need);showWhen();
  document.getElementById("app").addEventListener("input",e=>{if(!e.target.closest("#mine,#mine-book"))return;
    if(e.target.id==="need"){need=parse(e.target.value);showWhen();return;}
    const k=e.target.dataset.k;if(k){given[k]=e.target.value;bk.update(given);showPair();showSeries();document.getElementById("rv-link").href=revealUrl(g,given);dedSample(g,given);}
  });
}

/* ---------- the whole finished book (assets/book.js) ---------- */
const UPLOAD={coverWhat:"one drawing",coverBtn:"Add a drawing",coverDone:"Your drawing is on the cover. In a real book we clean it up but never redraw it.",doneAlt:"The same photo with crayon doodles drawn on it",doneSub:"Doodles drawn to fit your picture.",pageSub:"Right next to your child's own words."};
function fullBookHtml(g,given){
  const base=`${root}assets/books/${g.id}/`,u=Object.assign({},UPLOAD,g.upload);
  return `<section class="stack-lg look" id="look"><div class="stack"><h2>Look inside the whole book</h2><p class="notice">Every page of a finished example, printed as an 8.5 × 8.5 in hardcover. ${esc(g.bookNote||"The family, the answers and the drawings are made up.")}</p></div>
   <div id="hbook"></div>
   <div class="hb-tools">
    <div class="panel stack"><h3>Pick a style</h3><div class="seg" role="group" aria-label="Book style">${(HHBooks[g.id].styles||HHBook.STYLES).map((x,i)=>`<button type="button" data-style="${x[0]}" aria-pressed="${i===0}">${x[1]}</button>`).join("")}</div><p class="notice">Same words and pictures, two looks. You choose when you order.</p></div>
    <form class="panel stack" id="mine-book" onsubmit="return false"><h3>Try it with your names</h3><div class="fields">${g.fields.map((f,i)=>fieldHtml(f,given[f.k],"b"+i)).join("")}</div></form>
    <div class="panel stack"><h3>Try it with your photos</h3><p class="notice">Add up to 4 photos and ${esc(u.coverWhat)} to see them in the book. They stay on this device. Nothing is uploaded.</p>
     <div class="upl"><label class="btn ghost">Add photos<input type="file" id="up-photos" accept="image/jpeg,image/png,image/webp,image/gif" multiple></label><label class="btn ghost">${esc(u.coverBtn)}<input type="file" id="up-draw" accept="image/jpeg,image/png,image/webp,image/gif"></label><button type="button" class="btn ghost" id="up-reset" hidden>Start over</button></div>
     <p class="notice" id="up-note" aria-live="polite"></p></div>
   </div>
   ${g.fillDemo?`<div class="stack"><h3>How your photo becomes a page</h3><ol class="fill-demo">
    <li><img src="${base}${g.fillDemo.raw}.webp" alt="A plain family photo" loading="lazy"><b>1. You send a photo</b>Any phone photo works.</li>
    <li><img src="${base}${g.fillDemo.done}.webp" alt="${esc(u.doneAlt)}" loading="lazy"><b>2. We draw on it</b>${esc(u.doneSub)}</li>
    <li><div class="mini hb-book hb-${(HHBooks[g.id].styles||HHBook.STYLES)[0][0]}" id="fill-mini"></div><b>3. It's a page in the book</b>${esc(u.pageSub)}</li></ol></div>`:""}
  </section>`;
}
function fullBook(g,given){
  const bk=HHBook.mount(document.getElementById("hbook"),{book:HHBooks[g.id],base:`${root}assets/books/${g.id}/`,vars:()=>vars(g,given)});
  const mini=document.getElementById("fill-mini");
  const renderMini=()=>{if(!mini)return;const pg=HHBooks[g.id].spreads.flat().find(p=>p.t==="photo"&&p.slot===0);
    if(pg)mini.innerHTML=HHBook.pageHtml(pg,vars(g,given),{book:HHBooks[g.id],base:`${root}assets/books/${g.id}/`},"r");};renderMini();
  const seg=[...document.querySelectorAll("[data-style]")];
  seg.forEach(b=>b.onclick=()=>{seg.forEach(x=>x.setAttribute("aria-pressed",x===b));bk.style(b.dataset.style);});
  const note=document.getElementById("up-note"),reset=document.getElementById("up-reset");
  const pages=()=>HHBooks[g.id].spreads.map((s,k)=>s.map((p,j)=>p.t==="photo"?{slot:p.slot,page:k*2-1+j}:null)).flat().filter(Boolean).sort((a,b)=>a.slot-b.slot);
  document.getElementById("up-photos").onchange=e=>{const f=[...e.target.files].filter(x=>/^image\//.test(x.type));if(!f.length)return;const n=bk.photos(f);
    const pg=pages().slice(0,n).map(x=>x.page);note.textContent=`Your ${n===1?"photo is":n+" photos are"} on page${n===1?"":"s"} ${pg.join(", ").replace(/, (\d+)$/," and $1")}, with sample doodles on top. In a real book, the doodles are drawn to fit each photo.`;reset.hidden=false;e.target.value="";};
  document.getElementById("up-draw").onchange=e=>{const f=e.target.files[0];if(!f||!/^image\//.test(f.type))return;bk.drawing(f);note.textContent=Object.assign({},UPLOAD,g.upload).coverDone;reset.hidden=false;e.target.value="";};
  reset.onclick=()=>{bk.reset();note.textContent="";reset.hidden=true;};
  return {update(){bk.update();renderMini();},dedication:f=>bk.dedication(f)};
}

/* ---------- look inside ---------- */
function lookInside(g){
  const im=document.getElementById("look-img"),cnt=document.getElementById("look-count"),th=[...document.querySelectorAll(".look-thumbs button")];
  let i=0;const go=n=>{i=(n+g.look)%g.look;im.src=`${root}assets/look/${g.id}-${i+1}.webp`;im.alt=`${g.name} sample, spread ${i+1} of ${g.look}`;cnt.textContent=`Spread ${i+1} of ${g.look}`;th.forEach((b,k)=>b.setAttribute("aria-current",k===i?"true":"false"));};
  document.getElementById("look-prev").onclick=()=>go(i-1);document.getElementById("look-next").onclick=()=>go(i+1);
  th.forEach(b=>b.onclick=()=>go(+b.dataset.i));
  const st=im.parentElement;st.tabIndex=0;st.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")go(i-1);if(e.key==="ArrowRight")go(i+1);});
  let x0=null;st.addEventListener("touchstart",e=>x0=e.touches[0].clientX,{passive:true});st.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null;});
  for(let k=2;k<=g.look;k++){const p=new Image();p.src=`${root}assets/look/${g.id}-${k}.webp`;}
  go(0);
}

/* ---------- chooser ---------- */
function chooser(){
  const host=document.getElementById("chooser");if(!host)return;
  const ans={};let step=0;
  const STEPS=["occ","to","from","names","when","budget","result"];
  const role={mom:"Mom",dad:"Dad",grandma:"Grandma",grandpa:"Grandpa"};
  const OCC={birthday:"a birthday",anniversary:"an anniversary",mothers:"Mother's Day",fathers:"Father's Day",valentines:"Valentine's Day",holidays:"the holidays",grandparent:"Grandparents Day",schoolyear:"the end of the school year",graduation:"a graduation",retirement:"a retirement or farewell",teacher:"thanking a teacher or coach",baby:"a new baby",just:"any day"};
  const TO={mom:"Mom",dad:"Dad",grandma:"Grandma",grandpa:"Grandpa",partner:"your partner",parents:"your parents",child:"a child",family:"the whole family",coworker:"a coworker",teacher:"a teacher or coach",friend:"a friend"};
  const FROM={me:"you",mekids:"you and the kids",kids:"the kids",family:"your family",group:"a group"};
  const kidGiving=()=>ans.from==="kids"||ans.from==="mekids";
  function namesFields(){
    const f=[];const t=ans.to;
    const nameLabel={mom:"What do you call her? (Mom, Mama, Mommy)",dad:"What do you call him? (Dad, Papa, Daddy)",grandma:"What do the grandkids call her? (Grandma Rose, Nai Nai)",grandpa:"What do the grandkids call him? (Grandpa Walt, Ye Ye)",
      partner:"Your partner's first name",parents:"Your parents' names (Mom and Dad, Lily and Sam)",child:"The child's first name",family:"Your family name (the Parkers)",coworker:"Their first name",teacher:"Their name (Ms. Rivera, Coach Dan)",friend:"Their first name"}[t]||"Their name";
    f.push(["name",nameLabel,"text"]);
    if(t==="child")f.push(["age","How old will they be?","number"]);
    if(t==="partner")f.push(["giver","Your first name","text"],["years","Years together","number"]);
    if(t==="coworker"||t==="teacher")f.push(["years","Years they've been there","number"],["org","Team, school or company","text"]);
    if(kidGiving()&&t!=="child")f.push(["kid","Your child's first name (the one giving)","text"],["kidAge","Their age","number"]);
    else if(t==="grandma"||t==="grandpa")f.push(["kid","A grandchild's first name","text"]);
    if(t==="family"||(t==="child"&&ans.from!=="group"))f.push(["place","A trip or place the family loves (optional)","text"]);
    return f;
  }
  function mapTo(g){
    const v={},r=role[ans.to],kidName=ans.to==="child"?ans.name:ans.kid,kidAge=ans.to==="child"?ans.age:ans.kidAge;
    switch(g.id){
      case"in-my-words":Object.assign(v,{Rel:r||"Mom",Kid:ans.kid,Age:ans.kidAge});break;
      case"fridge-gallery":case"the-year-you-were":Object.assign(v,{Kid:kidName,Age:kidAge});break;
      case"two-sides":Object.assign(v,{A:ans.giver,B:ans.name,Years:ans.years});break;
      case"grandpas-stories":Object.assign(v,{Elder:ans.name||r,Role:(ans.to==="grandma"||ans.to==="mom")?"Grandma":"Grandpa",Grandkid:ans.kid});break;
      case"from-all-of-us":Object.assign(v,{Honoree:ans.name,Years:ans.years,Org:ans.org});break;
      case"family-epic":Object.assign(v,{Family:ans.to==="family"?String(ans.name||"").replace(/^the\s+/i,""):undefined,Kid:kidName,Age:kidAge,Place:ans.place});break;
    }
    Object.keys(v).forEach(k=>{if(v[k]===undefined||String(v[k]).trim()==="")delete v[k];});return v;
  }
  function rank(){
    const need=parse(ans.need);
    return G.map(g=>{let s=0;const why=[],warn=[];
      if(ans.occ){if(g.fit.occ.includes(ans.occ)){s+=3;why.push(`Made for ${OCC[ans.occ]}`);}else s-=2;}
      if(ans.to){if(g.fit.to.includes(ans.to)){s+=4;why.push(`Right for ${TO[ans.to]}${ans.from?`, from ${FROM[ans.from]}`:""}`);}else s-=4;}
      if(ans.from){if(g.fit.from.includes(ans.from))s+=2;else s-=1;}
      const a=ans.to==="child"?ans.age:kidGiving()?ans.kidAge:"";
      if(g.fit.ages&&a!==""&&a!==undefined){const n=+a;if(n<g.fit.ages[0]||n>g.fit.ages[1]){s-=3;warn.push(`Best for ages ${g.fit.ages[0]} to ${g.fit.ages[1]}`);}else{s+=1;why.push(`Works well at age ${n}`);}}
      if(ans.budget&&ans.budget!=="any"){if(g.price>+ans.budget){s-=3;warn.push(`Over your budget at $${g.price}`);}else{s+=1;why.push(pairTotal(g)<=+ans.budget?`Fits your budget at $${g.price}, or ${money(pairTotal(g))} for two`:`Fits your budget at $${g.price}`);}}
      if(need){const t=timing(g,need);if(!t.rushOk){s-=6;warn.push("Can't arrive in time");}else if(!t.stdOk){s-=1;warn.push("Needs rush shipping");}}
      return {g,s,why,warn};}).sort((x,y)=>y.s-x.s);
  }
  const opts=(key,list,sub)=>`<div class="opts" role="radiogroup">${list.map(([k,l])=>`<button type="button" role="radio" aria-checked="${ans[key]===k}" data-set="${key}" data-v="${k}">${esc(l)}</button>`).join("")}</div>${sub||""}`;
  function render(){
    const k=STEPS[step],total=STEPS.length-1;
    let body="";
    if(k==="occ")body=`<h2>What's the occasion?</h2>${opts("occ",C.occasions)}`;
    if(k==="to")body=`<h2>Who is it for?</h2>${opts("to",C.recipients)}`;
    if(k==="from")body=`<h2>Who is it from?</h2>${opts("from",C.givers)}`;
    if(k==="names")body=`<h2>Tell us a little about them</h2><p class="notice">Only used to show you a sample with their names. Nothing is saved. Skip anything you like.</p>
      <div class="fields">${namesFields().map(([fk,fl,ty])=>`<label class="fld"><span>${esc(fl)}</span><input data-a="${fk}" type="${ty}" ${ty==="number"?'inputmode="numeric" min="0" max="99"':'maxlength="40" autocomplete="off"'} value="${esc(ans[fk]||"")}"></label>`).join("")}</div>`;
    if(k==="when"){const pre=ans.need||(nextDate(ans.occ)?iso(nextDate(ans.occ)):"");ans.need=pre;
      body=`<h2>When do you need it?</h2><p class="notice">Books take about 3 weeks: a few days for you to gather things, a few for us to design, then printing and mail.</p>
      <div class="fields"><label class="fld"><span>Need it by</span><input data-a="need" type="date" min="${iso(today())}" value="${pre}"></label></div>
      <button type="button" class="linkish" data-norush>No date, no rush</button>`;}
    if(k==="budget")body=`<h2>What would you like to spend?</h2><p class="notice">Prices are for one book. A second book is always half off, orders of $69 or more ship free, and group gifts can be split.</p>${opts("budget",C.budgets)}`;
    if(k==="result")return result();
    host.innerHTML=`<div class="progress" aria-hidden="true"><span style="width:${Math.round(step/total*100)}%"></span></div><p class="notice">Question ${step+1} of ${total}</p>
      <div class="q">${body}</div>
      <div class="pager"><button type="button" data-nav="-1" ${step===0?"disabled":""}>Back</button><button type="button" data-nav="1">${k==="names"||k==="when"?"Next":"Skip"}</button></div>`;
    const first=host.querySelector(".q button,.q input");if(first&&step>0)first.focus({preventScroll:true});
  }
  const pairFor=g=>g.id==="in-my-words"&&kidGiving()&&/^(mom|dad|grandma|grandpa)$/.test(ans.to||"")?1:0;
  function result(){
    const r=rank(),best=r[0],alts=r.slice(1,3),need=parse(ans.need),v=mapTo(best.g);
    host.innerHTML=`<div class="progress"><span style="width:100%"></span></div>
    <div class="result">
     <div class="stack-lg"><div class="stack"><span class="eyebrow">Our pick for you</span><h2>${esc(best.g.name)} <span class="muted">$${best.g.price}</span></h2><p class="lede">${esc(best.g.tagline)}</p></div>
      <ul class="ticks">${best.why.map(w=>`<li>${esc(w)}</li>`).join("")}${best.warn.map(w=>`<li class="w">${esc(w)}</li>`).join("")}</ul>
      ${timingHtml(best.g,need)}
      <p><b>What we'll need from you:</b> ${esc(best.g.time.needs)}.</p>
      ${(()=>{const pp=best.g.pair[pairFor(best.g)],o=vars(best.g,v);return `<div class="pair-tip"><b>Make it two for ${money(pairTotal(best.g))}.</b> ${fill(pp[0],o)} is ${money(half(best.g))} more. ${fill(pp[1],o)}</div>`;})()}
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="${giftUrl(best.g,v,need)}">See this gift with your names</a><a class="btn ghost" href="${(u=>u+(u.includes("?")?"&":"?")+"two="+(pairFor(best.g)+1)+"#pair")(giftUrl(best.g,v,need))}">Make it two</a><a class="btn ghost" href="#" data-soon>Start this gift</a></div></div>
     <div class="book" id="rbook" tabindex="0" aria-label="Sample book with your names"></div></div>
    <section class="stack-lg"><h3>Also good</h3><div class="cards">${alts.map(a=>`<a class="card" href="${giftUrl(a.g,mapTo(a.g),need)}"><div class="art">${pic(a.g)}</div><div class="body"><h3>${esc(a.g.name)}</h3><p>${esc(a.why[0]||a.g.forLine)}${a.warn.length?". "+esc(a.warn[0]):""}</p><span class="price">$${a.g.price} <small>2nd book half off</small></span></div></a>`).join("")}</div>
     <p><button type="button" class="linkish" data-restart>Start over</button> or <a href="${root}index.html#gifts">see all seven gifts</a></p></section>`;
    book(document.getElementById("rbook"),best.g,v);
    host.scrollIntoView({behavior:"smooth",block:"start"});
  }
  host.addEventListener("click",e=>{
    const s=e.target.closest("[data-set]");if(s){ans[s.dataset.set]=s.dataset.v;step++;render();return;}
    const n=e.target.closest("[data-nav]");if(n){step=Math.max(0,step+ +n.dataset.nav);render();return;}
    if(e.target.closest("[data-norush]")){ans.need="";step++;render();return;}
    if(e.target.closest("[data-restart]")){Object.keys(ans).forEach(k=>delete ans[k]);step=0;render();}
  });
  host.addEventListener("input",e=>{const a=e.target.dataset.a;if(a)ans[a]=e.target.value;});
  host.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches("input")){e.preventDefault();step++;render();}});
  const pre=new URLSearchParams(location.search).get("occ");if(pre&&C.occasions.some(o=>o[0]===pre)){ans.occ=pre;step=1;}
  render();
}
/* ---------- Sample order confirmation, with "Give $10, get $10" ---------- */
function thanks(){
  if(document.body.dataset.page!=="thanks")return;
  const qs=new URLSearchParams(location.search);
  const g=G.find(x=>x.id===qs.get("gift"))||G[0];const given={};g.fields.forEach(f=>{if(qs.has(f.k))given[f.k]=qs.get(f.k);});
  const to=REVEAL_TO[g.id](vars(g,given)),a=timing(g,null).std;
  let from="",heir=false,copy=false;const kidName=vars(g,given).Kid||"your child";
  const total=()=>(heir?HEIR:g.price)+(copy?half(g):0);
  const msg=code=>`I just made a book for ${to} with Hero House Books and I can't wait to give it. Here's $${REF} off if you want to make one: herohousebooks.com/r/${code.toLowerCase()}`;
  document.getElementById("app").innerHTML=`<div class="wrap">
  <section class="pp" id="pp" aria-labelledby="pp-h"><div class="pp-head"><span class="eyebrow">Right after payment, before the receipt</span><h2 id="pp-h">Your order is paid. One more thing?</h2><p class="notice">One tap adds it to the same order, on the same card. Nothing to type again.</p></div><div class="pp-offers" id="pp-offers"></div><p class="notice">A sample of the step that shows right after checkout. Nothing is charged.</p></section>
  <section class="hero rv-hero"><div class="stack"><span class="eyebrow">Sample order confirmation</span><h1>Thank you. We've started on your book.</h1>
   <p class="lede">Next, we email you the link for the questions. You'll see every page before we print, and you can change anything once for free.</p></div></section>
  <section class="ty-grid">
   <div class="panel stack"><h3>Your order</h3><dl class="facts ty-facts"><div><dt>Gift</dt><dd>${esc(g.name)}</dd></div><div><dt>For</dt><dd>${esc(to)}</dd></div><div><dt>Arrives about</dt><dd>${fmt(a)}</dd></div><div><dt>Total</dt><dd id="ty-total"></dd></div></dl>
    <p class="notice">While it's being made: <a href="${revealUrl(g,given)}">print your free "on its way" card</a> to give on the day.</p></div>
   <div class="panel stack ref" id="ref"><span class="eyebrow">Give $${REF}, get $${REF}</span><h2>Know someone with a birthday coming up?</h2>
    <p>Share your code. They get $${REF} off their first book. When they order, you get $${REF} off your next one, like the copy for Grandma.</p>
    <label class="fld"><span>Your first name, for your code</span><input type="text" id="ref-name" maxlength="20" autocomplete="off" placeholder="Jamie"></label>
    <div id="ref-code"></div>
    <label class="fld"><span>A message you can send</span><textarea id="ref-msg" rows="3" readonly></textarea></label>
    <div class="upl"><button type="button" class="btn" id="ref-copy">Copy the message</button><button type="button" class="btn ghost" id="ref-share" hidden>Share</button></div>
    <p class="notice" id="ref-note" aria-live="polite">A sample. On the real site the code is made for your order. Nothing here is saved or sent.</p></div></section>
  <section class="panel stack bday" id="bday"><span class="eyebrow">One quick question</span><h2>When's ${esc(kidName)}'s birthday?</h2>
   <p>We'll email you once a year, 3 weeks before it, so the next book in the series arrives in time. That's all we send. Unsubscribe anytime.</p>
   <div class="save-row"><label class="fld"><span>Birthday</span><input type="date" id="bday-date" max="${iso(today())}"></label><button type="button" class="btn" id="bday-save">Remind me</button></div>
   <p class="notice" id="bday-msg" aria-live="polite">Optional. A sample. On the real site this is saved with your order. Nothing here is saved or sent.</p><div id="bday-mail"></div></section>
  <section class="stack-lg"><h2>How the $${REF} works</h2><ol class="how">
   <li><b>Share your code</b><span>Text it, post it, or let the "on its way" card carry it. The card can print it on the inside.</span></li>
   <li><b>They save $${REF}</b><span>On their first book, any gift. It works with the second book half off.</span></li>
   <li><b>You save $${REF}</b><span>The day their order goes in, $${REF} off your next book lands in your email. No limit.</span></li></ol></section>
</div>`;
  const show=()=>{const c=refCode(from);document.getElementById("ref-code").innerHTML=refHtml(c);document.getElementById("ref-msg").value=msg(c);};show();
  const offer=(id,on,title,sub,add,pic)=>`<div class="pp-offer${on?" on":""}">${pic}<div><b>${title}</b><small>${sub}</small></div>${on?`<span class="pp-done">Added</span>`:`<button type="button" class="btn" data-pp="${id}">Add it, ${add}</button>`}</div>`;
  const showPP=()=>{const t=total(),f=shipFee(t);
    document.getElementById("pp-offers").innerHTML=(heirOk(g)?offer("heir",heir,"Make it an Heirloom","Navy linen cover, their name in gold foil on the spine, larger 8.5 × 11 in pages.","+"+money(HEIR-g.price),`<span class="linen" aria-hidden="true"><i></i></span>`):"")+
      offer("copy",copy,`A second copy for ${esc(vars(g,given).CopyShort||"Grandma & Grandpa")}`,"The same book, half off. Two books ship free.","+"+money(half(g)),g.photo?img(g.id,"",null,true):"");
    document.getElementById("ty-total").textContent=money(t+f)+(f?` with ${money(SHIP)} shipping`:", free shipping");};showPP();
  document.getElementById("pp-offers").addEventListener("click",e=>{const b=e.target.closest("[data-pp]");if(!b)return;if(b.dataset.pp==="heir")heir=true;else copy=true;showPP();});
  document.getElementById("ref-name").addEventListener("input",e=>{from=e.target.value;show();});
  const note=document.getElementById("ref-note");
  document.getElementById("ref-copy").onclick=()=>{const t=document.getElementById("ref-msg").value;
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>note.textContent="Copied. Paste it into a text or a post.",()=>{document.getElementById("ref-msg").select();note.textContent="Select the message and copy it.";});};
  document.getElementById("bday-save").onclick=()=>{const v=document.getElementById("bday-date").value,out=document.getElementById("bday-mail"),msg=document.getElementById("bday-msg");
    const d=parse(v);if(!d){msg.textContent="Pick the date first.";out.innerHTML="";return;}
    const t=today();let next=new Date(t.getFullYear(),d.getMonth(),d.getDate(),12);if(next<t)next=new Date(t.getFullYear()+1,d.getMonth(),d.getDate(),12);
    const turns=next.getFullYear()-d.getFullYear();
    if(turns>18){msg.textContent=`${kidName} is past the series, which runs from birth to 18. Nothing to remind you about.`;out.innerHTML="";return;}
    let send=new Date(next);send.setDate(send.getDate()-21);const soon=send<t;if(soon)send=t;
    const title=`The Year You Were ${cap(WORDS[turns])}`;
    msg.textContent=soon?`That's less than 3 weeks away, so this year's email would go out today. Rush delivery is $15.`:`Saved for the sample. The email goes out ${fmt(send)}, 3 weeks before ${kidName} turns ${turns}.`;
    out.innerHTML=`<div class="mail"><span class="mail-tag">${fmt(send)}</span><b class="mail-subj">${kidName} turns ${turns} on ${fmt(next)}. Make ${esc(title)}?</b><div class="mail-body"><p>${g.id==="the-year-you-were"?"Last year's book is on the shelf. This year's goes right next to it, with a new cover color and the next piece of the picture on the spine.":"One book for each birthday, from the first to the eighteenth: what they loved, said and did that year, in their own words."}</p><p><a class="btn" href="${giftUrl(G.find(x=>x.id==="the-year-you-were")||g,{Kid:kidName==="your child"?"":kidName,Age:String(turns)},null)}">Make ${esc(title)}</a></p><p class="mail-small">Start by ${fmt(new Date(next.getTime()-21*864e5))} for it to arrive in time. One email a year, unsubscribe anytime.</p></div></div>`;};
  const sh=document.getElementById("ref-share");if(navigator.share){sh.hidden=false;sh.onclick=()=>navigator.share({text:document.getElementById("ref-msg").value}).catch(()=>{});}
}

/* ---------- All About Mom: the Mother's Day edition of In My Words ---------- */
const MOM_Q=[["What is {Rel} really good at?","“Finding my shoes. And braids. And knowing I'm sad before I say it.”"],["What does {Rel} say the most?","“Did you brush your teeth?” And “I love you more.”"],
 ["If {Rel} were an animal, what would she be?","“A mama bear. But a soft one.”"],["What is {Rel}'s favorite food?","“Coffee. Is coffee a food? Then pancakes.”"],
 ["How old is {Rel}?","“Twenty-five. Or forty. One of those.”"],["What makes {Rel} laugh?","“When Dad sings in the car. Not the good kind of singing.”"],
 ["What would you give {Rel} if you could give her anything?","“A whole day where nobody needs anything.”"],["How much do you love {Rel}?","“More than all the tulips in the world. And the dirt.”"]];
const MOM_MORE=["What is {Rel}'s job?","What does {Rel} do when you're asleep?","Where is {Rel}'s favorite place?","What is {Rel} scared of?","What's the best thing {Rel} ever made?","What do you and {Rel} do on rainy days?","What would {Rel} be in a superhero movie?","What do you want to tell {Rel} right now?"];
function momCover(o){return `<svg class="md-cover" viewBox="0 0 400 400" role="img" aria-label="A spring book cover titled All About ${esc(o.Rel)}, by ${esc(o.Kid)}, age ${esc(o.Age)}, with crayon tulips along the bottom">
 <rect width="400" height="400" fill="#fdf1f4"/><circle cx="330" cy="70" r="34" fill="#ffd447"/>
 <g stroke="#f2a900" stroke-width="5" stroke-linecap="round">${[0,1,2,3,4,5,6,7].map(i=>{const a=Math.PI/4*i;return `<path d="M${(330+Math.cos(a)*44).toFixed(0)} ${(70+Math.sin(a)*44).toFixed(0)}L${(330+Math.cos(a)*58).toFixed(0)} ${(70+Math.sin(a)*58).toFixed(0)}"/>`;}).join("")}</g>
 <path d="M0 330Q100 300 200 322T400 318V400H0Z" fill="#9fd89a"/>
 ${[[40,"#e5432d"],[92,"#e8589e"],[150,"#f07b1d"],[250,"#e8589e"],[305,"#e5432d"],[360,"#a066d6"]].map(([x,c],i)=>`<g transform="translate(${x} ${300+(i%2)*14})"><path d="M0 0V64" stroke="#2fa84f" stroke-width="5"/><path d="M0 40Q-18 30 -20 14Q-4 22 0 40" fill="#2fa84f"/><path d="M-14 -22Q-16 4 0 6Q16 4 14 -22L7 -12L0 -26L-7 -12Z" fill="${c}"/></g>`).join("")}
 <g fill="#e8589e"><path d="M70 92c-10-12 6-20 10-8c4-12 20-4 10 8l-10 10z"/><path d="M300 210c-7-9 4-14 7-6c3-8 14-3 7 6l-7 7z"/></g>
 <text x="200" y="150" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="700" font-size="46" fill="#1c2340">All About</text>
 <text x="200" y="208" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="700" font-size="62" fill="#e5432d">${esc(o.Rel)}</text>
 <text x="200" y="252" text-anchor="middle" font-family="Caveat,cursive" font-size="28" fill="#1c2340">by ${esc(o.Kid)}, age ${esc(o.Age)}</text></svg>`;}
function mothers(){
  if(document.body.dataset.page!=="mothers")return;
  const g=G.find(x=>x.id==="in-my-words"),day=nthSunday(2027,4,2),need=new Date(+day-DAY),t=timing(g,need);
  const given={Rel:"Mom",Kid:"Ava",Age:"6"};
  const bookObj={title:"All About {Rel}",spreads:[[],[{t:"qa",q:MOM_Q[0][0],a:MOM_Q[0][1]},{t:"qa",q:MOM_Q[1][0],a:MOM_Q[1][1]}],[{t:"qa",big:true,q:MOM_Q[2][0],a:MOM_Q[2][1]},{t:"qa",big:true,q:MOM_Q[3][0],a:MOM_Q[3][1]}],
    [{t:"qa",big:true,q:MOM_Q[4][0],a:MOM_Q[4][1]},{t:"qa",q:MOM_Q[5][0],a:MOM_Q[5][1]}],[{t:"qa",q:MOM_Q[6][0],a:MOM_Q[6][1]},{t:"qa",big:true,q:MOM_Q[7][0],a:MOM_Q[7][1]}]]};
  const ctx={book:bookObj,base:"",photos:[]};
  const rushBy=new Date(+subBiz(need,g.time.make+C.PRINT+C.RUSH)-g.time.collect*DAY);
  document.getElementById("app").innerHTML=`<div class="wrap">
  <section class="hero md-hero"><div class="stack-lg"><div class="stack"><span class="eyebrow">Mother's Day, Sunday, May 9</span><h1>All About Mom</h1>
   <p class="lede">The Mother's Day edition of In My Words. Your kids answer twenty questions about her, and every answer goes in the book exactly as they said it, next to their own drawings. With a spring cover.</p></div>
   <div><div class="price-big">$${g.price}</div><p class="notice">Two books are ${money(pairTotal(g))} and ship free: one for Mom, one for Grandma.</p></div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" id="md-start" href="#">Start All About Mom</a><a class="btn ghost" href="#md-q">See the questions</a></div></div>
   <figure class="md-fig" id="md-fig"></figure></section>
  <section class="stack-lg"><form class="panel md-try" id="md-try" onsubmit="return false"><h3>Try it with your names</h3><div class="fields">
    <label class="fld"><span>The book is about</span><select data-k="Rel"><option>Mom</option><option>Grandma</option></select></label>
    <label class="fld"><span>Child's name</span><input type="text" data-k="Kid" maxlength="40" autocomplete="off" value="Ava"></label>
    <label class="fld"><span>Child's age</span><input type="number" data-k="Age" min="2" max="14" value="6"></label></div></form></section>
  <section class="stack-lg" id="md-q"><div class="stack"><h2>Questions all about her</h2><p class="notice">Real pages from a sample. Ava and her answers are made up.</p></div>
   <div class="md-spreads" id="md-spreads"></div>
   <div class="stack"><h3>More of the questions</h3><ul class="md-more" id="md-more"></ul></div></section>
  <section class="stack"><h2>Dates that matter</h2><ul class="vday-dates">
   <li><b>${fmt(t.startBy)}</b> Last day to start with regular shipping.</li>
   <li><b>${fmt(rushBy)}</b> Last day with rush shipping, $${C.RUSH_PRICE} more.</li>
   <li><b>Sat, May 8</b> Your book arrives.</li></ul>
   <p class="notice">Too late? Every order comes with a free printable <a href="${root}reveal.html?gift=in-my-words&amp;Rel=Mom">"on its way" card</a> for the day.</p></section></div>`;
  const show=()=>{const o=vars(g,given);document.getElementById("md-fig").innerHTML=momCover(o);
    document.getElementById("md-spreads").innerHTML=[1,2,3,4].map(i=>`<div class="hb-book hb-crayon md-book">${HHBook.spreadHtml(bookObj,i,o,ctx)}</div>`).join("");
    document.getElementById("md-more").innerHTML=MOM_MORE.map(q=>`<li>${fill(q,o)}</li>`).join("");
    document.getElementById("md-start").href=giftUrl(g,given,need);};show();
  document.getElementById("md-try").addEventListener("input",e=>{const k=e.target.dataset.k;if(k){given[k]=e.target.value;show();}});
}

chrome();home();valentines();mothers();thanks();reveal();gift();chooser();
})();
