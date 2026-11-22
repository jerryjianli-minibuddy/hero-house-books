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
  if(!need)return `<p class="timing ok">Arrives about <b>${fmt(t.std)}</b> if you start today, shipping included. Rush: about ${fmt(t.rush)} for $${C.RUSH_PRICE} more.</p>`;
  if(t.stdOk)return `<p class="timing ok"><b>In time for ${fmt(need)}</b> with regular shipping, included in the price. Start by ${fmt(t.startBy)} at the latest.</p>`;
  if(t.rushOk)return `<p class="timing warn"><b>Only with rush shipping</b> ($${C.RUSH_PRICE} more): arrives about ${fmt(t.rush)}, before ${fmt(need)}. Start today.</p>`;
  return `<p class="timing no"><b>Too late for ${fmt(need)}.</b> The earliest it can arrive is about ${fmt(t.rush)} with rush shipping.</p>`;
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
  <nav class="nav" aria-label="Main"><a href="${root}choose.html"><b>Help me choose</b></a><a href="${root}valentines.html">Valentine's</a><a href="${root}index.html#gifts">All gifts</a><a href="${root}index.html#how">How it works</a><a href="${root}gallery/maya.html">Sample gallery</a></nav></div></header>`;
  document.body.prepend(...head.childNodes);
  const foot=document.createElement("footer");foot.className="site-foot";
  foot.innerHTML=`<div class="wrap"><span>Hero House Books. Real words, real drawings, printed in the USA.</span><span>A test site: no orders, no uploads, nothing saved.</span></div>`;
  document.body.append(foot);
  const d=document.createElement("dialog");d.id="soon";
  d.innerHTML=`<div class="dlg"><h3>Not taking orders yet</h3><p>This is a test site for trying out ideas. Nothing you click here is saved or charged.</p><form method="dialog"><button class="btn">Got it</button></form></div>`;
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
function pairHtml(g,o,pick,sibName){
  const row=(v,title,sub,add)=>`<label class="pair-opt${pick===v?" on":""}"><input type="radio" name="two" value="${v}"${pick===v?" checked":""}><span><b>${title}</b>${sub?`<small>${sub}</small>`:""}</span><em>${add}</em></label>`;
  const two=pick!=="none";
  const gc=g.gcopy?`<label class="gcopy${pick==="0"?" on":""}"><input type="checkbox" id="gcopy"${pick==="0"?" checked":""}>${g.photo?img(g.id,"",null,true):""}<span><b>Copy for ${esc(o.CopyShort||"Grandma & Grandpa")}</b><small>The same book, so they get their own. One tap, half off.</small></span><em>+${money(half(g))}</em></label>`:"";
  const sv=g.sibIdx!=null?String(g.sibIdx):"sib";
  const sb=g.sib?`<div class="gcopy sibcopy${pick===sv?" on":""}"><label class="sib-top"><input type="checkbox" id="sibcopy"${pick===sv?" checked":""}><span><b>${fill(g.sib[0],o)}</b><small>${fill(g.sib[1],o)} One tap, half off.</small></span><em>+${money(half(g))}</em></label>${pick===sv?`<label class="fld sib-name"><span>Brother or sister's name</span><input type="text" id="sib-name" maxlength="40" autocomplete="off" placeholder="Their name" value="${esc(sibName||"")}"></label><p class="notice">You'll add their photo${g.id==="fridge-gallery"?" and art":""} when you start the order.</p>`:""}</div>`:"";
  return `<legend>${OFFER}</legend>
   ${gc}${sb}
   ${row("none","Just one book","",money(g.price))}
   ${g.pair.map((p,i)=>(g.gcopy&&i===0)||(g.sib&&g.sibIdx===i)?"":row(String(i),fill(p[0],o),fill(p[1],o),"+"+money(half(g)))).join("")}
   <p class="pair-total">${two?`<b>${money(pairTotal(g))} for two books.</b> You save ${money(half(g))}, and shipping is included for both.`:`Add a second book for ${money(half(g))} and pay ${money(pairTotal(g))} for both.`}</p>
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
function voice(g,getPick){
  const el=document.getElementById("voice");let on=false,who="child",url="",rec=null,chunks=[];
  const WHO=[["child","The child, in their own voice"],["grandparent","A grandparent"],["you","You"]];
  const base=()=>getPick()==="none"?g.price:pairTotal(g);
  const totalHtml=()=>on?`<b>Your order: ${money(base()+VOICE)}</b>, with the voice message. Shipping included.`:"";
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
  return {total(){const t=document.getElementById("voice-total");if(t)t.innerHTML=totalHtml();}};
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
   <div class="cta-band"><div class="stack"><h2>One of each: ${money(pairTotal(gs[0]))}</h2><p>The kids' book for Mom or Dad, and Two Sides of Us for the two of you. The second book is half off, shipping included.</p></div><a class="btn" href="${giftUrl(gs[0],null,day)}">Start with the kids' book</a></div></section>
  <section class="stack-lg"><h2>Add their voice for $9</h2><div class="vday-voice"><figure class="voice-qr">${qrSvg(11)}</figure><p>A code printed inside the cover. Scan it with any phone and hear your child say "Happy Valentine's Day, Mom", or the two of you reading your answers out loud. Add it on the gift's page.</p></div></section>
  <section class="stack"><h2>Dates that matter</h2><ul class="vday-dates">
   ${gs.map((g,i)=>`<li><b>${fmt(t[i].startBy)}</b> Last day to start ${esc(g.name)} with regular shipping, included in the price.</li>`).join("")}
   <li><b>${fmt(lastRush)}</b> Last day with rush shipping, $${C.RUSH_PRICE} more.</li>
   <li><b>Sat, Feb 13</b> Your book arrives.</li></ul>
   <p class="notice">Every book needs a few days for your answers, a few for us to make it, then printing and the mail. That's why the start dates come early.</p></section></div>`;
  const cd=document.getElementById("cd");
  function tick(){
    const now=new Date(),reg=last-now,rush=lastRush-now;
    if(reg>0){const d=Math.floor(reg/DAY),h=Math.floor(reg%DAY/36e5),m=Math.floor(reg%36e5/6e4);
      cd.innerHTML=`<span class="cd-n"><b>${d}</b>days</span><span class="cd-n"><b>${h}</b>hours</span><span class="cd-n"><b>${m}</b>min</span><span class="cd-l">left to order for Valentine's Day with free shipping. Last day: ${fmt(last)}.</span>`;}
    else if(rush>0)cd.innerHTML=`<span class="cd-l"><b>Rush only now.</b> Start by ${fmt(lastRush)} and add rush shipping, $${C.RUSH_PRICE}, to have it by Feb 13.</span>`;
    else cd.innerHTML=`<span class="cd-l"><b>Too late for delivery by Valentine's Day.</b> Order now and we'll email a printable "your book is on its way" card for the 14th.</span>`;
  }
  tick();setInterval(tick,30000);
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
   <div><div class="price-big">$${g.price}</div><p class="notice">${esc(g.priceNote)}</p></div>
   <fieldset class="pair" id="pair"></fieldset>${voiceOk(g)?`<div class="voice" id="voice"></div>`:""}
   <dl class="facts">${g.facts.map(f=>`<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join("")}</dl>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#" data-soon>Start this gift</a>${full?`<a class="btn ghost" href="#look">See every page</a>`:""}<a class="btn ghost" href="${root}choose.html">Not sure? Help me choose</a></div></div>
   <div class="stack-lg">${g.photo?`<figure class="p-photo">${img(g.id,g.photo)}</figure>`:""}${full?"":`<div class="book" id="book" tabindex="0" aria-label="Sample book"></div>`}
    <form class="panel" id="mine" onsubmit="return false">${full?`<h3>When do you need it?</h3><p class="notice">We'll tell you the last day to start.</p>`:`<h3>Make the sample yours</h3><p class="notice">Type real names to see how your book would read. Nothing is saved.</p>
     <div class="fields">${g.fields.map((f,i)=>fieldHtml(f,given[f.k],"f"+i)).join("")}</div>`}
     <label class="fld"><span>Need it by</span><input type="date" id="need" min="${iso(today())}" value="${need?iso(need):""}"></label>
     <div id="when"></div></form></div></section>
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
  let sibName="";
  const vc=voiceOk(g)?voice(g,()=>pick):null;
  const showPair=()=>{pairEl.innerHTML=pairHtml(g,vars(g,given),pick,sibName);if(vc)vc.total();};showPair();
  pairEl.addEventListener("change",e=>{if(e.target.name==="two"){pick=e.target.value;showPair();}if(e.target.id==="gcopy"){pick=e.target.checked?"0":"none";showPair();}
    if(e.target.id==="sibcopy"){pick=e.target.checked?(g.sibIdx!=null?String(g.sibIdx):"sib"):"none";showPair();if(e.target.checked)document.getElementById("sib-name").focus();}});
  pairEl.addEventListener("input",e=>{if(e.target.id==="sib-name")sibName=e.target.value;});
  const when=document.getElementById("when");const showWhen=()=>when.innerHTML=timingHtml(g,need);showWhen();
  document.getElementById("app").addEventListener("input",e=>{if(!e.target.closest("#mine,#mine-book"))return;
    if(e.target.id==="need"){need=parse(e.target.value);showWhen();return;}
    const k=e.target.dataset.k;if(k){given[k]=e.target.value;bk.update(given);showPair();}
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
  return {update(){bk.update();renderMini();}};
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
    if(k==="budget")body=`<h2>What would you like to spend?</h2><p class="notice">Prices are for one book, shipping included. A second book is always half off, and group gifts can be split.</p>${opts("budget",C.budgets)}`;
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
chrome();home();valentines();gift();chooser();
})();
