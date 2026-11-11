/* Hero House Books sample art. Every person and drawing here is made up. */
(function(){
const P={red:"#e5484d",org:"#f28c28",yel:"#f5c518",grn:"#3fa34d",blu:"#2f6fdb",pur:"#8a4fd1",brn:"#8a5a33",blk:"#2b2540",pnk:"#f26fa8",sky:"#8fd3ff",
  skin1:"#f1c7a3",skin2:"#c98d5f",skin3:"#8d5a3b",hair1:"#3b2a20",hair2:"#c9a26b",hair3:"#7a7a7a",teal:"#0f7c86",sun:"#f2a900",cream:"#fffdf7",navy:"#1c2340",sea:"#7cc6d6",sand:"#f3dcae",leaf:"#5aa469",dusk:"#f6b8a0",night:"#26305e"};
let fid=0;
function crayon(inner,vb){const id="cr"+(++fid);vb=vb||"0 0 400 300";
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img"><defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${fid%7+1}"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></defs><rect width="100%" height="100%" fill="${P.cream}"/><g filter="url(#${id})" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="5">${inner}</g></svg>`;}
function flat(inner,vb,bg){vb=vb||"0 0 400 400";return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img"><rect width="100%" height="100%" fill="${bg||P.cream}"/>${inner}</svg>`;}
// simple storybook person: x,y = feet center, s = scale
function person(x,y,s,o){o=o||{};const sk=o.skin||P.skin1,hr=o.hair||P.hair1,sh=o.shirt||P.teal,pa=o.pants||P.navy;const h=110*s;
  return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-15" y="-55" width="12" height="55" rx="6" fill="${pa}"/><rect x="3" y="-55" width="12" height="55" rx="6" fill="${pa}"/>
  <rect x="-24" y="-112" width="48" height="64" rx="18" fill="${sh}"/>
  <rect x="-36" y="-106" width="12" height="46" rx="6" fill="${sh}" transform="rotate(${o.wave?-40:8} -30 -106)"/><rect x="24" y="-106" width="12" height="46" rx="6" fill="${sh}" transform="rotate(-8 30 -106)"/>
  <circle cx="0" cy="-138" r="24" fill="${sk}"/>
  <path d="M-25 -140 Q-24 -168 0 -167 Q24 -168 25 -140 Q14 -156 0 -154 Q-14 -156 -25 -140Z" fill="${hr}"/>
  ${o.long?`<path d="M-25 -142 Q-30 -110 -20 -98 L-16 -130Z M25 -142 Q30 -110 20 -98 L16 -130Z" fill="${hr}"/>`:""}
  ${o.beard?`<path d="M-18 -128 Q0 -104 18 -128 Q0 -118 -18 -128Z" fill="${hr}"/>`:""}
  ${o.glasses?`<circle cx="-9" cy="-140" r="6" fill="none" stroke="${P.blk}" stroke-width="2"/><circle cx="9" cy="-140" r="6" fill="none" stroke="${P.blk}" stroke-width="2"/><path d="M-3 -140h6" stroke="${P.blk}" stroke-width="2"/>`:`<circle cx="-8" cy="-140" r="2.6" fill="${P.blk}"/><circle cx="8" cy="-140" r="2.6" fill="${P.blk}"/>`}
  <path d="M-7 -128 Q0 -122 7 -128" stroke="${P.blk}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </g>`;}
const A={P,crayon,flat,person};

/* ---- Kid drawings (crayon) ---- */
A.kidDad=()=>crayon(`<circle cx="200" cy="80" r="34" stroke="${P.brn}"/><path d="M182 74h1M218 74h1" stroke="${P.blk}" stroke-width="8"/><path d="M184 96 Q200 110 216 96" stroke="${P.red}"/>
 <path d="M168 66 Q200 30 232 66" stroke="${P.blk}" stroke-width="9"/><path d="M200 114 v90 M200 140 l-55 -30 M200 140 l60 -45 M200 204 l-30 70 M200 204 l30 70" stroke="${P.blu}" stroke-width="8"/>
 <path d="M262 92 l30 -40 l14 24 z" stroke="${P.org}" fill="${P.org}" fill-opacity=".4"/><path d="M40 270 h320" stroke="${P.grn}"/><path d="M330 40 l6 12 l12 2 l-9 8 l2 12 l-11 -6 l-11 6 l2 -12 l-9 -8 l12 -2 z" stroke="${P.yel}"/>`);
A.kidMom=()=>crayon(`<circle cx="200" cy="85" r="32" stroke="${P.pnk}"/><path d="M168 80 Q170 40 200 46 Q232 40 232 80 M168 80 Q160 130 175 140 M232 80 Q240 130 225 140" stroke="${P.brn}" stroke-width="8"/>
 <path d="M188 82h1M212 82h1" stroke="${P.blk}" stroke-width="8"/><path d="M188 100 Q200 110 212 100" stroke="${P.red}"/><path d="M200 118 L150 250 H250 Z" stroke="${P.pur}" fill="${P.pur}" fill-opacity=".25"/>
 <path d="M168 150 l-50 30 M232 150 l50 -40" stroke="${P.pur}"/><path d="M290 100 c-10 -20 20 -25 15 -5 c20 -10 25 20 5 18 c5 20 -25 20 -15 0" stroke="${P.red}"/><path d="M180 250 v30 M220 250 v30" stroke="${P.blk}"/>`);
A.kidHouse=()=>crayon(`<path d="M120 250 V150 H280 V250 Z" stroke="${P.brn}"/><path d="M105 155 L200 80 L295 155" stroke="${P.red}"/><path d="M185 250 v-50 h30 v50" stroke="${P.blu}"/>
 <path d="M140 175 h30 v25 h-30 z M230 175 h30 v25 h-30 z" stroke="${P.sky}"/><circle cx="330" cy="60" r="26" stroke="${P.yel}" fill="${P.yel}" fill-opacity=".35"/><path d="M40 255 h330" stroke="${P.grn}"/><path d="M60 255 v-30 M60 225 l-8 -8 M60 225 l8 -8" stroke="${P.grn}"/><circle cx="60" cy="214" r="7" stroke="${P.pnk}"/>`);
A.kidRocket=()=>crayon(`<circle cx="320" cy="70" r="40" stroke="${P.yel}" fill="${P.yel}" fill-opacity=".35"/><path d="M170 230 L170 120 Q195 60 220 120 L220 230 Z" stroke="${P.red}" fill="${P.red}" fill-opacity=".25"/>
 <circle cx="195" cy="140" r="9" stroke="${P.blu}"/><circle cx="195" cy="170" r="9" stroke="${P.blu}"/><path d="M170 200 L145 235 L170 230 M220 200 L245 235 L220 230" stroke="${P.red}"/><path d="M180 240 Q195 290 210 240" stroke="${P.org}"/><path d="M60 60 l6 12 l12 2 l-9 8 l2 12 l-11 -6 l-11 6 l2 -12 l-9 -8 l12 -2 z" stroke="${P.yel}"/>`);
A.kidCat=()=>crayon(`<ellipse cx="200" cy="190" rx="95" ry="60" stroke="${P.pur}"/><path d="M120 175 Q200 140 280 175" stroke="${P.red}"/><path d="M115 210 Q200 178 285 210" stroke="${P.grn}"/>
 <circle cx="150" cy="110" r="45" stroke="${P.pur}"/><path d="M118 80 L112 40 L140 68 M182 80 L188 40 L160 68" stroke="${P.pur}"/><circle cx="135" cy="105" r="5" stroke="${P.blk}" fill="${P.blk}"/><circle cx="165" cy="105" r="5" stroke="${P.blk}" fill="${P.blk}"/><path d="M290 185 Q340 150 330 100" stroke="${P.pur}"/>`);
A.kidDino=()=>crayon(`<path d="M70 220 Q90 120 180 130 Q230 80 270 95 Q310 100 300 125 Q280 140 245 135 Q260 180 250 220 M120 220 v30 M210 220 v30 M70 220 Q40 230 20 210" stroke="${P.grn}" fill="${P.grn}" fill-opacity=".2"/>
 <circle cx="280" cy="110" r="4" fill="${P.blk}" stroke="${P.blk}"/><path d="M130 135 l10 -22 l12 20 l12 -24 l12 22 l10 -18" stroke="${P.org}"/><path d="M310 175 Q340 140 370 175 Z" stroke="${P.yel}" fill="${P.yel}" fill-opacity=".4"/>`);
A.kidSun=()=>crayon(`<circle cx="200" cy="150" r="70" stroke="${P.yel}" fill="${P.yel}" fill-opacity=".4"/><path d="M200 60 v-40 M200 240 v40 M110 150 h-40 M290 150 h40 M135 85 l-28 -28 M265 85 l28 -28 M135 215 l-28 28 M265 215 l28 28" stroke="${P.org}"/>
 <circle cx="175" cy="135" r="6" fill="${P.blk}" stroke="${P.blk}"/><circle cx="225" cy="135" r="6" fill="${P.blk}" stroke="${P.blk}"/><path d="M168 168 Q200 200 232 168" stroke="${P.red}"/>`);
A.kidFamily=()=>crayon(`<path d="M0 230 h400" stroke="${P.grn}"/><circle cx="340" cy="55" r="28" stroke="${P.org}"/>
 <circle cx="90" cy="95" r="16" stroke="${P.blk}"/><path d="M90 111 v60 M90 130 l-22 16 M90 130 l22 16 M90 171 l-14 34 M90 171 l14 34" stroke="${P.blk}"/>
 <circle cx="160" cy="115" r="14" stroke="${P.pnk}"/><path d="M160 129 v45 M160 145 l-18 12 M160 145 l18 12 M160 174 l-12 30 M160 174 l12 30" stroke="${P.pnk}"/>
 <circle cx="220" cy="140" r="11" stroke="${P.pur}"/><path d="M220 151 v32 M220 162 l-14 10 M220 162 l14 10 M220 183 l-9 22 M220 183 l9 22" stroke="${P.pur}"/>
 <circle cx="275" cy="120" r="13" stroke="${P.blu}"/><path d="M275 133 v42 M275 148 l-16 12 M275 148 l16 12 M275 175 l-11 30 M275 175 l11 30" stroke="${P.blu}"/>`);
A.kidHeart=()=>crayon(`<path d="M200 250 C80 170 90 70 160 80 C185 84 198 105 200 120 C202 105 215 84 240 80 C310 70 320 170 200 250 Z" stroke="${P.red}" fill="${P.red}" fill-opacity=".3"/><path d="M60 60 l10 10 M340 60 l-10 10 M70 250 l10 -10 M330 250 l-10 -10" stroke="${P.pnk}"/>`);
A.kidPancakes=()=>crayon(`<ellipse cx="200" cy="230" rx="130" ry="26" stroke="${P.blu}"/><path d="M110 210 Q200 230 290 210 M115 185 Q200 205 285 185 M120 160 Q200 180 280 160" stroke="${P.org}" stroke-width="12"/><path d="M180 150 q20 -30 40 0" stroke="${P.yel}" fill="${P.yel}" fill-opacity=".5"/><path d="M150 155 q-5 40 -10 60" stroke="${P.brn}"/><path d="M320 70 q20 -20 30 10" stroke="${P.blk}"/>`);

/* ---- Storybook scenes (flat) ---- */
A.beach=(o)=>flat(`<rect y="0" width="400" height="230" fill="${P.sky}"/><circle cx="320" cy="70" r="34" fill="${P.sun}"/><rect y="200" width="400" height="60" fill="${P.sea}"/><path d="M0 255 Q100 240 200 255 T400 255 V400 H0Z" fill="${P.sand}"/>
 ${person(150,360,1,{shirt:P.red,hair:P.hair1,beard:true})}${person(235,365,.62,{shirt:P.sun,hair:P.hair2,long:true,wave:true})}`);
A.lake=()=>flat(`<rect width="400" height="400" fill="#cfe7e0"/><path d="M0 170 Q60 120 120 160 Q200 100 270 150 Q330 110 400 150 V230 H0Z" fill="#7aa68c"/>
 <rect y="225" width="400" height="175" fill="#5f8f8a"/><path d="M40 225 v-110 M40 140 q-25 0 -30 30 M40 130 q25 0 32 34 M360 225 v-120 M360 150 q-30 4 -34 34" stroke="#4b5b3f" stroke-width="7" fill="none"/>
 <path d="M30 120 q10 -40 20 0 q-4 20 -10 50 M350 110 q10 -40 20 0" stroke="#8a9b6a" stroke-width="3" fill="none"/>
 <path d="M120 300 q80 30 170 0 l-20 22 q-65 18 -130 0z" fill="${P.brn}"/>${person(170,300,.55,{shirt:P.red,beard:true})}${person(205,300,.5,{shirt:P.sun,long:true,hair:P.hair2})}${person(238,300,.38,{shirt:P.teal,wave:true})}
 <path d="M60 330 q10 -6 20 0 M300 350 q10 -6 20 0" stroke="#d6efe8" stroke-width="3" fill="none"/>`);
A.kitchen=()=>flat(`<rect width="400" height="400" fill="#fde8c8"/><rect y="250" width="400" height="150" fill="#e7b98a"/><rect x="40" y="60" width="120" height="100" rx="6" fill="#bfe3f0" stroke="#fff" stroke-width="8"/>
 <rect x="230" y="180" width="140" height="70" fill="#d48a5a"/>${person(140,340,1,{shirt:P.teal,hair:P.hair3,glasses:true,skin:P.skin2})}${person(260,330,.55,{shirt:P.pnk,hair:P.hair1,long:true,skin:P.skin2,wave:true})}
 <ellipse cx="300" cy="178" rx="34" ry="8" fill="#f5c46b"/><ellipse cx="300" cy="170" rx="30" ry="7" fill="#f2b04a"/>`);
A.porch=()=>flat(`<rect width="400" height="400" fill="${P.dusk}"/><circle cx="80" cy="90" r="40" fill="#ffd9a8"/><rect x="0" y="230" width="400" height="170" fill="#8c6a52"/><rect x="0" y="120" width="400" height="14" fill="#6e5140"/>
 <rect x="30" y="134" width="10" height="96" fill="#6e5140"/><rect x="360" y="134" width="10" height="96" fill="#6e5140"/>${person(160,330,1,{shirt:"#4a6fa5",hair:P.hair3,glasses:true,beard:true,skin:P.skin1})}${person(250,330,.5,{shirt:P.sun,hair:P.hair1,skin:P.skin1})}`);
A.couple=()=>flat(`<rect width="400" height="400" fill="#dfe7ff"/><circle cx="200" cy="150" r="110" fill="#c9d6ff"/><rect y="320" width="400" height="80" fill="#9fb3e6"/>
 ${person(165,350,1,{shirt:P.navy,hair:P.hair1,skin:P.skin3})}${person(240,350,.95,{shirt:"#e5484d",hair:P.hair1,long:true,skin:P.skin2})}
 <path d="M202 95 c-8 -14 -26 -6 -18 8 l18 16 l18 -16 c8 -14 -10 -22 -18 -8z" fill="${P.red}"/>`);
A.cafe=()=>flat(`<rect width="400" height="400" fill="#f4e3d3"/><rect x="40" y="40" width="320" height="150" rx="10" fill="#c7e1ea"/><path d="M40 115 h320 M200 40 v150" stroke="#fff" stroke-width="6"/><rect y="260" width="400" height="140" fill="#b68d6a"/>
 <rect x="130" y="250" width="140" height="14" rx="4" fill="#6b4c36"/>${person(120,360,.9,{shirt:P.navy,hair:P.hair1,skin:P.skin3})}${person(285,360,.9,{shirt:"#e5484d",hair:P.hair1,long:true,skin:P.skin2})}
 <rect x="175" y="232" width="16" height="18" rx="3" fill="#fff"/><rect x="210" y="232" width="16" height="18" rx="3" fill="#fff"/>`);
A.office=(n)=>flat(`<rect width="400" height="400" fill="#e8f1ef"/><rect x="30" y="50" width="340" height="120" rx="8" fill="#ffffff" stroke="#c9d8d5" stroke-width="4"/>
 <text x="200" y="120" text-anchor="middle" font-family="Bricolage Grotesque,Segoe UI,sans-serif" font-size="30" font-weight="700" fill="${P.teal}">Thank you, ${String(n||"Denise").replace(/[&<>"]/g,"").slice(0,22)}!</text>
 ${person(80,370,.8,{shirt:P.sun,hair:P.hair2,long:true})}${person(150,370,.85,{shirt:P.teal,hair:P.hair1,skin:P.skin3})}${person(220,370,.95,{shirt:"#7a5af8",hair:P.hair3,long:true,glasses:true,skin:P.skin2,wave:true})}${person(290,370,.85,{shirt:P.red,hair:P.hair1,beard:true})}${person(350,370,.78,{shirt:P.navy,hair:P.hair1,skin:P.skin2})}`);
A.cake=(n)=>flat(`<rect width="400" height="400" fill="#fff1d6"/><rect x="110" y="200" width="180" height="110" rx="12" fill="#f7b6c8"/><rect x="110" y="200" width="180" height="26" rx="12" fill="#fff"/>
 <rect x="70" y="305" width="260" height="14" rx="7" fill="#d9a066"/>${[0,1,2,3,4].slice(0,Math.min(n===undefined?5:n,5)).map(i=>`<rect x="${150+i*25}" y="160" width="8" height="40" fill="${[P.blu,P.grn,P.red,P.pur,P.org][i]}"/><path d="M${154+i*25} 148 q6 8 0 14 q-6 -6 0 -14z" fill="${P.sun}"/>`).join("")}
 <text x="200" y="275" text-anchor="middle" font-family="Caveat,cursive" font-size="40" fill="#8a3550">${n===undefined?5:n}</text>`);
A.desk=()=>flat(`<rect width="400" height="400" fill="#eaeef9"/><rect y="270" width="400" height="130" fill="#b9c4e0"/><rect x="70" y="160" width="160" height="110" rx="6" fill="#2b2540"/><rect x="80" y="170" width="140" height="86" fill="#8fd3ff"/>
 <rect x="260" y="200" width="44" height="70" rx="6" fill="#fff"/><rect x="250" y="226" width="12" height="20" rx="5" fill="none" stroke="#fff" stroke-width="5"/>
 <path d="M100 190 h80 M100 206 h60 M100 222 h70" stroke="#2f6fdb" stroke-width="5"/>`);
A.grandmaGarden=()=>flat(`<rect width="400" height="400" fill="#e4f2dc"/><rect y="280" width="400" height="120" fill="#9fcf87"/>${[50,110,320,360].map((x,i)=>`<path d="M${x} 300 v-50" stroke="${P.leaf}" stroke-width="5"/><circle cx="${x}" cy="244" r="12" fill="${[P.red,P.sun,P.pnk,P.pur][i]}"/>`).join("")}
 ${person(180,350,1,{shirt:"#7a5af8",hair:P.hair3,long:true,glasses:true,skin:P.skin2})}${person(250,350,.5,{shirt:P.sun,hair:P.hair1,skin:P.skin2})}`);
A.oldPhoto=()=>flat(`<rect width="400" height="400" fill="#efe4cf"/><rect x="70" y="60" width="260" height="280" fill="#fff" transform="rotate(-3 200 200)"/><rect x="90" y="80" width="220" height="200" fill="#c9b79a" transform="rotate(-3 200 200)"/>
 <g transform="rotate(-3 200 200)">${person(170,270,.8,{shirt:"#6b5a44",hair:"#3a3028",skin:"#d9c3a3"})}${person(240,270,.8,{shirt:"#8a7a5c",hair:"#3a3028",long:true,skin:"#d9c3a3"})}</g>
 <text x="200" y="320" text-anchor="middle" font-family="Caveat,cursive" font-size="26" fill="#5a4a36" transform="rotate(-3 200 200)">Galveston, 1974</text>`);
A.comic=()=>{const panel=(x,y,w,h,inner)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#1c2340" stroke-width="5"/>${inner}</g>`;
 return flat(panel(14,14,180,180,`<rect x="17" y="17" width="174" height="174" fill="#cfe7e0"/><path d="M17 120 Q100 90 191 120 V191 H17Z" fill="#5f8f8a"/><path d="M50 150 q40 16 90 0 l-10 12 q-35 10 -70 0z" fill="${P.brn}"/><g transform="translate(-30 -40)">${person(110,190,.32,{shirt:P.red,beard:true})}${person(130,190,.28,{shirt:P.sun,long:true})}${person(146,190,.22,{shirt:P.teal})}</g>`)
 +panel(206,14,180,180,`<rect x="209" y="17" width="174" height="174" fill="#fff3cf"/>${person(296,200,.75,{shirt:P.teal,wave:true})}<rect x="222" y="26" width="140" height="44" rx="20" fill="#fff" stroke="#1c2340" stroke-width="3"/><text x="292" y="54" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="700" font-size="17" fill="#1c2340">GATOR!!!</text>`)
 +panel(14,206,372,180,`<rect x="17" y="209" width="366" height="174" fill="#7aa68c"/><path d="M60 330 q60 -30 120 0 q-20 10 -40 6 l-10 12 l-10 -12 q-30 4 -60 -6z" fill="#3d5a3a"/><circle cx="160" cy="318" r="4" fill="#fff"/><text x="300" y="250" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="34" fill="${P.sun}" stroke="#1c2340" stroke-width="2">SPLASH!</text>`),
 "0 0 400 400","#1c2340");};
A.galleryWall=()=>flat(`<rect width="400" height="250" fill="#f3f0fa"/>${[[30,40,100,80],[150,30,110,90],[280,45,90,70],[60,150,90,70],[175,140,100,80],[295,140,80,70]].map((r,i)=>`<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="#fff" stroke="#ddd8ec" stroke-width="3"/><rect x="${r[0]+8}" y="${r[1]+8}" width="${r[2]-16}" height="${r[3]-16}" fill="${["#ffe08a","#bfe3ff","#ffc7d9","#c9f0c2","#e2d4ff","#ffd3a8"][i]}"/>`).join("")}
 <path d="M58 75 q20 -20 40 0 M182 70 l20 -25 l20 25 M300 75 a14 14 0 1 0 1 0 M80 185 h40 M200 175 q25 25 50 0 M318 175 l25 0" stroke="#2b2540" stroke-width="4" fill="none" stroke-linecap="round"/>`,"0 0 400 250");

window.HHArt=A;
})();
