/* Hero House Books gift lineup. Test site: every person, quote and drawing here is made up.
   Sample text uses {Tokens} filled from the names a shopper types; defaults come from each field's def. */
window.HHGifts=[
{
 id:"in-my-words", gcopy:true, book:true, fillDemo:{raw:"photo-steps-raw",done:"photo-steps"}, bookNote:"Leo, his dad, the answers and the drawings are made up.", photo:"A hardcover book titled Mom, According to Ava with a child's drawing on the cover, next to tulips on a sunny table", name:"In My Words", short:"Dad, According to Leo",
 tags:["parents"], forLine:"For Mom, Dad or a grandparent, from the kids", card:"kidDad",
 tagline:"Your child describes Mom, Dad or a grandparent in their own words. Every answer goes in the book exactly as they said it, next to their own drawings.",
 price:49, priceNote:"Hardcover, 8.5 × 8.5 in, about 26 pages, shipping included",
 pair:[["A copy for {Copy}","The same book, so {Copy} can keep one too."],["A second book about {Other}","{Kid} answers a new set of questions about {Other}. Another 15 minutes, a whole new book."]],
 facts:[["Who buys it","The other parent, or a grandparent"],["The moment","Mother's Day, Father's Day, a birthday"],["Best for kids aged","3 to 12"],["Ready in","About 3 weeks"]],
 fit:{occ:["mothers","fathers","birthday","holidays","grandparent","just"],to:["mom","dad","grandma","grandpa"],from:["kids","mekids","family"],ages:[3,12]},
 time:{collect:3,make:3,needs:"15 minutes of your child answering questions on your phone, 6 to 10 of their drawings and up to 4 family photos"},
 fields:[{k:"Rel",label:"The book is about",type:"select",opts:["Dad","Mom","Grandpa","Grandma"],def:"Dad"},{k:"Kid",label:"Child's name",def:"Leo"},{k:"Age",label:"Child's age",type:"number",min:2,max:14,def:6}],
 why:"Nobody else can write this book. A six-year-old's answer to \"What does Dad do when you're scared?\" is the kind of thing a parent forgets in a year and wants back for the rest of their life. We don't improve the words, and the drawings stay exactly as wonky as they were.",
 how:[["Get 20 questions","We send a short list made for their age: what's Dad's job, what makes him laugh, what do you want to tell him."],["Record 15 minutes","Ask them on your phone, video or voice, in one go or over a week. Send the recordings, 6 to 10 of their drawings and up to 4 family photos."],["We write nothing","We type their answers word for word, pick the best 12 to 14, draw crayon doodles on your photos and design the book around their art."],["See it first","You get every page to check and one free round of changes before we print."]],
 inside:["A cover with their drawing of the person","Their best 12 to 14 answers, word for word","Their drawings, cleaned up but never redrawn","Your family photos, with crayon doodles drawn on them","Their handprint, and a last page: \"What do you want to tell them?\"","A blank page at the back for the grown-up to write back"],
 faq:[["What if my child is shy?","Short sessions work best. Most families record 3 or 4 short chats over a week. Silly answers are the best ones."],["Can two kids share one book?","Yes. Each answer is signed with who said it, up to 3 kids."],["Do you use AI to write it?","No. Every word is your child's. A person on our team lays out the book."]],
 sample:{title:"{Rel}, According to {Kid}", caption:"Sample book. {Kid}, {Rel} and the drawings are made up.", spreads:[
  [{art:"kidDad"},{html:`<h4>{Rel}, According to {Kid}</h4><p class="small">Words by {Kid}, age {Age}. Drawings by {Kid}.</p><p>Everything in this book is exactly what {Kid} said.</p>`}],
  [{html:`<p class="who">What is your {rel}'s job?</p><p class="said">"{He} fixes computers. And {he} fixes me when I fall off my bike."</p><p class="who">What does {Rel} cook best?</p><p class="said">"Pancakes shaped like a T-rex. They look like a potato."</p>`},{art:"kidPancakes"}],
  [{art:"kidHeart"},{html:`<p class="who">How much do you love {Rel}?</p><p class="said">"More than a hundred thousand. And also the moon."</p>`}],
  [{html:`<p class="who">What does {Rel} do when you're scared?</p><p class="said">"{He} sits on the floor by my bed until I'm asleep. {He} thinks I don't know {he}'s there, but I know."</p>`},{art:"kidSun"}],
  [{html:`<p class="who">What do you want to tell {Rel}?</p><p class="said">"Can we go to the lake again. I'll be brave with the worms this time."</p>`},{html:`<p class="small">Recorded at the kitchen table, April 2027.</p><p class="small">{Kid}, age {Age}.</p>`}]
 ]}
},
{
 id:"fridge-gallery", gcopy:true, look:4, photo:"A fridge covered in children's drawings, with an open art book of the same drawings on the counter below", name:"The Fridge Gallery", short:"Maya's Year in Art",
 tags:["kids","parents","grandparents"], forLine:"For the artist, and the grandparents who want copies", card:"kidRocket",
 tagline:"Snap their school art all year. We turn it into a private online gallery and, in June, a hardcover book of the year.",
 price:69, priceNote:"40-page hardcover, up to 60 pieces, online gallery included",
 pair:[["A copy for the grandparents","The same book of {Kid}'s year, for Grandma and Grandpa's shelf."],["A book for a brother or sister","Each kid gets their own year in art."]],
 facts:[["Who buys it","Parents, often with grandparents chipping in"],["The moment","End of the school year, or a birthday"],["Best for kids aged","2 to 12"],["Ready in","About 3 weeks after you say \"done\""]],
 fit:{occ:["schoolyear","birthday","holidays","grandparent","just"],to:["child","grandma","grandpa","mom","dad"],from:["me","mekids","family"],ages:[2,12]},
 time:{collect:2,make:3,needs:"phone photos of the art you've kept, and a word or two about any favorites"},
 fields:[{k:"Kid",label:"Artist's name",def:"Maya"},{k:"Age",label:"Artist's age",type:"number",min:2,max:14,def:5}],
 why:"Every family has the same pile on the counter and the same guilt about the recycling bin. This keeps the piece without keeping the paper, and it gives the grandparents a link they'll open every week. Rivals charge $99 to $175 and most want you to mail the originals in a box.",
 how:[["Snap it","Take a phone photo of each piece as it comes home. Add what they said about it if you like."],["We clean it up","We straighten, crop and color-correct each photo so it looks like a gallery print."],["Share the gallery","Grandparents get a private link, grouped by school year."],["Get the book","In June, or whenever you're ready, we design the year into a hardcover."]],
 inside:["Each piece on its own page or paired by theme","Your child's title and what they said about it","A school-year index at the back","A matching online gallery to share"],
 faq:[["Do I mail in the art?","No. Phone photos are enough. Originals stay home."],["Who can see the gallery?","Only people you send the private link to."],["Can I add more than 60 pieces?","Yes, extra pages are added at cost."]],
 sample:{title:"{Kid}'s Year in Art", caption:"Sample book. {Kid} and the art are made up.", link:["See a sample online gallery","../gallery/maya.html"], spreads:[
  [{art:"kidRocket"},{html:`<h4>{Kid}'s Big Year</h4><p class="small">{Grade}, Room 12</p><p>31 drawings, 4 paintings and 1 macaroni necklace (photographed).</p>`}],
  [{art:"kidCat"},{html:`<p class="who">Rainbow Cat, September</p><p class="said">"She is rainbow because she ate a rainbow."</p><p class="small">{Kid}, age {Age}</p>`}],
  [{art:"kidDino"},{art:"kidHouse"}],
  [{html:`<p class="who">{Kid} at the end of {Grade}</p><p><b>Favorite color:</b> purple, "but sparkly."</p><p><b>Best thing I made:</b> "The dinosaur. He likes tacos."</p>`},{art:"kidFamily"}]
 ]}
},
{
 id:"two-sides", look:4, photo:"A couple on the sofa with tea, looking through a book with a photo of the two of them on a date", name:"Two Sides of Us", short:"Marcus and Dana, Ten Years",
 tags:["partner"], forLine:"For a husband, wife or partner, or for your parents' anniversary", card:"couple",
 tagline:"You both answer the same questions, separately. The book puts your answers side by side, and neither of you sees the other's until it's opened.",
 price:49, priceNote:"Hardcover, 32 pages, shipping included",
 pair:[["A copy for each of you","The same book, one for each nightstand."],["Two Sides for your parents","Their own how-we-met book, for their anniversary."]],
 facts:[["Who buys it","One partner, or grown kids for their parents"],["The moment","An anniversary, a wedding, Valentine's Day"],["Works for","Any couple, any number of years"],["Ready in","About 3 weeks"]],
 fit:{occ:["anniversary","valentines","birthday","just"],to:["partner","parents"],from:["me","family"]},
 time:{collect:7,make:3,needs:"both of you answering 15 questions separately; a friend can ask your partner if it's a surprise"},
 fields:[{k:"A",label:"First partner",def:"Marcus"},{k:"B",label:"Second partner",def:"Dana"},{k:"Years",label:"Years together",type:"number",min:1,max:75,def:10}],
 why:"Most couple books are a story about a generic pair with your names pasted in. This one is the two of you disagreeing about who said \"I love you\" first. The gap between the two answers is where the laughing and the crying happen.",
 how:[["Two private links","Each of you gets 15 questions. If it's a surprise, a friend asks your partner for you."],["Answer in your own words","Type or record. Long or short, funny or serious."],["We pair the answers","Same question, two sides, one spread. We add a small drawing for each chapter."],["Open it together","It arrives sealed with a note: open on the day."]],
 inside:["How you met, told twice","The most \"us\" thing you do","What I've never told you","A blank last page to write the next chapter"],
 faq:[["Can I do it without my partner knowing?","Yes. A friend or family member can send them the questions as a \"fun quiz\"."],["Can it be for my parents' 50th?","Yes. Grown kids gather both parents' answers, often over a phone call each."]],
 sample:{title:"Two Sides of Us", caption:"Sample book. {A} and {B} are made up.", spreads:[
  [{art:"couple"},{html:`<h4>Two Sides of Us</h4><p class="small">{A} and {B}, {Years} years</p><p>We asked them the same questions, separately. Neither has seen the other's answers until now.</p>`}],
  [{html:`<p class="who">When did you know? {A}</p><p class="said">"Our second date. {B} got a parking ticket and laughed so hard there were tears. I thought: I want to be near that."</p>`},{html:`<p class="who">When did you know? {B}</p><p class="said">"Month four. {A} drove three hours with soup when I had the flu. The soup was bad. I stayed anyway."</p>`}],
  [{art:"cafe"},{html:`<p class="who">The most "us" thing we do</p><p><b>{A}:</b> "Sunday pancakes."</p><p><b>{B}:</b> "Fight about the thermostat, then share a blanket."</p>`}],
  [{html:`<p class="who">What I've never told you. {A}</p><p class="said">"I still keep the parking ticket in my wallet."</p>`},{html:`<p class="who">What I've never told you. {B}</p><p class="said">"When you nap on the couch, I check that you're breathing. Every time."</p>`}]
 ]}
},
{
 id:"grandpas-stories", look:3, photo:"A grandparent's hands holding a book of old family photos while a grandchild points at one", name:"Tell Me When You Were Little", short:"Grandpa Walt's Stories",
 tags:["grandparents"], forLine:"For a grandparent, and for the grandkids after", card:"porch",
 tagline:"A grandparent tells us six stories, one a week, by phone. We turn them into an illustrated hardcover, with a code on each chapter to hear their voice.",
 price:89, priceNote:"Hardcover, 40 pages, voice recordings kept online",
 pair:[["A copy for another family","The same stories, so each grown child's house has one."],["{Spouse}'s stories too","A second book of stories, in {Spouse}'s own voice."]],
 facts:[["Who buys it","Grown kids, for their parent and their own kids"],["The moment","A grandparent's birthday, the holidays, a big anniversary"],["Works for","Any grandparent or older parent who can talk on the phone"],["Ready in","6 weeks of stories, then about 3 weeks"]],
 fit:{occ:["birthday","holidays","grandparent","mothers","fathers","just"],to:["grandma","grandpa","mom","dad"],from:["me","family","mekids"]},
 time:{collect:42,make:5,needs:"your grandparent free for six short phone calls, one a week, and a few old photos"},
 fields:[{k:"Elder",label:"What the grandkids call them",def:"Grandpa Walt"},{k:"Role",label:"They are a",type:"select",opts:["Grandpa","Grandma"],def:"Grandpa"},{k:"Grandkid",label:"Grandchild's name",def:"Noah"}],
 why:"The stories a grandparent tells at dinner are gone the day they are. Memoir services ask an 80-year-old to type answers for a year. This asks them to talk, which they're already good at, and keeps their actual voice for the grandkids.",
 how:[["Pick six questions","From our list or your own: the house they grew up in, how they met, the worst job they ever had."],["One call a week","Each week they call a number and tell one story. No app, no typing."],["We write it up","We tidy the transcript but keep their words and their way of saying things."],["Illustrated and printed","Each chapter gets a drawing from an old photo you send, plus a code that plays their voice."]],
 inside:["Six chapters in their own voice","A drawing for each chapter, made from your old photos","A code on each chapter that plays the recording","A family page for photos and dates"],
 faq:[["What if they ramble?","Good. We keep the best of it and the recording keeps all of it."],["Can more than one grandparent take part?","Yes, as a pair book. Each story is signed."],["How long are the recordings kept?","We'd keep them online for at least 10 years, and give you the files."]],
 sample:{title:"{Elder}'s Stories", caption:"Sample book. {Elder}, {Grandkid} and the photo are made up.", spreads:[
  [{art:"porch"},{html:`<h4>Tell Me When You Were Little</h4><p class="small">{Elder}'s stories, told for {Grandkid}</p><p>Six Sundays, six phone calls, one book.</p>`}],
  [{art:"oldPhoto"},{html:`<p class="who">Chapter 2. The summer of 1974</p><p>"Your {spouse} and I had eleven dollars and a car with no reverse gear. So we only went places we could drive straight through. That's how we ended up in Galveston."</p><p class="small">Scan to hear {Elder} tell it.</p>`}],
  [{html:`<p class="who">Chapter 5. What I'd tell you at sixteen, {Grandkid}</p><p>"Learn to change a tire. Write thank-you notes by hand. And when you're wrong, say so fast. Being wrong slow is what costs you."</p>`},{art:"kitchen"}]
 ]}
},
{
 id:"the-year-you-were", gcopy:true, look:4, photo:"A fifth birthday table with a cake, party hats and a child's hands on an illustrated picture book", name:"The Year You Were Five", short:"Ava at Five",
 tags:["kids"], forLine:"For a child's birthday, from parents or grandparents", card:"cake",
 tagline:"One small book every birthday: what they said, loved and feared that year, and a letter from you. By eighteen it's a shelf of who they were.",
 price:49, priceNote:"Hardcover, 32 pages, shipping included",
 pair:[["A copy for the grandparents","The same book of {Kid} at {AgeWord}, for Grandma and Grandpa."],["One for a brother or sister","Each kid gets their own year."]],
 facts:[["Who buys it","Parents, and grandparents who want to start the shelf"],["The moment","Every birthday, from the first to the eighteenth"],["Ages","0 to 18, one book a year"],["Ready in","About 3 weeks"]],
 fit:{occ:["birthday","baby"],to:["child"],from:["me","family"],ages:[0,18]},
 time:{collect:5,make:3,needs:"their answers to a few questions for their age, a few photos or drawings, and a letter from you"},
 fields:[{k:"Kid",label:"Child's name",def:"Ava"},{k:"Age",label:"Age this birthday",type:"number",min:0,max:18,def:5}],
 why:"Parents swear they'll remember the funny things. They don't. One book a year, same size, numbered on the spine, becomes the most important shelf in the house. No subscription: we just send a reminder a month before the birthday.",
 how:[["We send a reminder","A month before the birthday, with this year's questions for their age."],["Fill it in over a week","Their answers, a few photos or drawings, and a letter from you."],["We design that year","Same layout every year so the books match, with that year's colors."],["Add it to the shelf","The spine shows their name and age."]],
 inside:["\"At five, Ava says\": best food, scariest thing, what I'll be","Things they learned this year","Their drawing of themselves at that age","A letter from you, to read when they're grown"],
 faq:[["Is this a subscription?","No. You order each year if you want to. We only send a reminder."],["Can I start at 7 and go back?","Yes. You can make earlier years from what you remember and your photos."],["What about a new baby?","Book zero, The Year You Were Born, is filled in by you: the day they arrived, the first weeks, a letter."]],
 sample:{title:"{Kid} at {AgeWord}", caption:"Sample book. {Kid} and the family are made up.", spreads:[
  [{art:"cake{Age}"},{html:`<h4>The Year You Were {AgeWordCap}</h4><p class="small">{Kid}, book {Age} of the shelf</p><p>{Candles}.</p>`}],
  [{html:`<p class="who">At {AgeWord}, {Kid} says</p><p><b>Best food:</b> "Noodles with nothing on them."</p><p><b>Scariest thing:</b> "The hand dryer at the store."</p><p><b>When I grow up:</b> "A vet and a mermaid, on different days."</p>`},{art:"kidCat"}],
  [{art:"beach"},{html:`<p class="who">Things {Kid} learned this year</p><p>To swim without the noodle. To whistle, almost. That the moon follows the car.</p>`}],
  [{html:`<p class="who">Dear {Kid}</p><p>"This was the year you started reading signs out loud, every sign, everywhere. Please never stop. Love, Mom and Dad."</p>`},{art:"kidSun"}]
 ]}
},
{
 id:"from-all-of-us", look:3, photo:"Coworkers gathered around a desk with an open book of handwritten thank-you notes and flowers", name:"From All of Us", short:"Thank You, Denise",
 tags:["coworkers"], forLine:"For a coworker, coach, teacher or graduate, from the whole group", card:"office",
 tagline:"Everyone adds a memory through one link. We turn the notes into a real hardcover for a retirement, a farewell, a graduation or the end of the season.",
 price:79, priceNote:"Hardcover, 40 pages, about $4 each when 20 people chip in",
 pair:[["A copy for {Honoree}'s family","The same book, so the people at home see what the team wrote."],["A book for the next goodbye","Another teammate, teacher or coach. Same easy group link."]],
 facts:[["Who buys it","The one person who always organizes the card"],["The moment","Retirement, a farewell, a teacher's last day, a graduation, a baby shower"],["Group size","5 to 100 people"],["Ready in","Link open up to 3 weeks, then about 3 weeks"]],
 fit:{occ:["retirement","teacher","graduation","baby","birthday","holidays"],to:["coworker","teacher","friend","child","mom","dad","grandma","grandpa"],from:["group","family"]},
 time:{collect:14,make:3,needs:"one link shared with the group; each person writes a note, with a photo if they like"},
 fields:[{k:"Honoree",label:"Who it's for",def:"Denise"},{k:"Years",label:"Years (at work, in school, as coach)",type:"number",min:1,max:60,def:22},{k:"Org",label:"Team, school or company",def:"Bright Path"}],
 why:"The group card gets read once and the digital board disappears with the link. Years of somebody's work deserve something that sits on a shelf. The organizer collects the money, we do the rest, and nobody has to pass a card around.",
 how:[["Share one link","With the team, the parents, the whole club. No sign-up for them."],["Everyone writes a note","A sentence or a page, plus an optional photo."],["We make the book","Every note goes in, signed. We add drawings and a \"what we'll miss\" page."],["One payment","The organizer pays once and can split it through the link."]],
 inside:["Every note, signed","Photos people added","A \"what we'll miss most\" page from all the notes","Space for the last few people who were late"],
 faq:[["What if someone writes something awkward?","The organizer sees every note before we print."],["Can it be for a teacher or a graduate?","Yes. A class thank-you for a teacher, or family and friends writing to a graduate, both work the same way."]],
 sample:{title:"Thank You, {Honoree}", caption:"Sample book. {Honoree}, the notes and {Org} are made up.", spreads:[
  [{art:"office",arg:"{Honoree}"},{html:`<h4>From All of Us</h4><p class="small">{Honoree}, {Years} years at {Org}</p><p>31 people wanted to say something.</p>`}],
  [{html:`<p class="said">"You trained me on my first day, and you still answer my questions like it's my first day."</p><p class="who">Ray, dispatch</p><p class="said">"The birthday cakes. Every single one. For {Years} years."</p><p class="who">Linh, accounting</p>`},{art:"desk"}],
  [{art:"cake{Years}"},{html:`<p class="who">What we'll miss most about {Honoree}</p><p>The laugh came up in 14 of 31 notes. The cakes came up in 11. "Answering the phone like you were happy to hear from us" came up in 9.</p>`}]
 ]}
},
{
 id:"family-epic", gcopy:true, look:3, photo:"An open comic book of a family canoe trip on a dock by a misty cypress lake", name:"The Family Epic", short:"The Parkers and the Gator of Caddo Lake",
 tags:["kids","parents"], forLine:"For the whole family, about a trip you took", card:"lake",
 tagline:"Send photos and the story of a real family trip. We turn it into a comic book where your family are the heroes, and the dramatic parts get more dramatic.",
 price:49, priceNote:"Comic book hardcover, 32 pages, shipping included",
 pair:[["A copy for the grandparents","The same adventure, for the house the kids visit most."],["An epic for the cousins","Their family gets their own adventure."]],
 facts:[["Who buys it","Parents, after a trip the kids still talk about"],["The moment","Holidays, a birthday, the end of summer"],["Best for kids aged","4 to 14"],["Ready in","About 4 weeks"]],
 fit:{occ:["holidays","birthday","just","schoolyear"],to:["child","family"],from:["me","family","mekids"],ages:[4,14]},
 time:{collect:3,make:7,needs:"the story of the trip in a few sentences, and clear photos of each person"},
 fields:[{k:"Family",label:"Family name",def:"Parkers"},{k:"Place",label:"Where you went",def:"Caddo Lake"},{k:"Kid",label:"A child's name",def:"Junie"},{k:"Age",label:"Their age",type:"number",min:2,max:17,def:7}],
 why:"Kids retell the trip for years, getting the gator bigger each time. This makes it official. It's the one we're least sure of: drawing the same faces right on every page is hard, so we'd test it before selling it.",
 how:[["Tell us the trip","Where you went, who was there and the one moment everyone retells."],["Send photos","A few clear photos of each person and some from the trip."],["We draw the episode","A person on our team writes and draws it in our comic style."],["See it first","Every page, with one round of changes."]],
 inside:["A cover where you're the heroes","The real trip, told as an adventure","Each person's character page","A \"true story, mostly\" page with your real photos"],
 faq:[["Will the faces look like us?","That's the risk. We'd only sell it once our test books look right."],["Can we pick the style?","One house comic style at first."]],
 sample:{title:"The {Family} and the Gator of {Place}", caption:"Sample book. The {Family} are made up.", spreads:[
  [{art:"lake"},{html:`<h4>The {Family} vs. the Gator of {Place}</h4><p class="small">Episode 1</p><p>Starring Dad (captain), Mom (navigator) and {Kid}, age {Age} (gator expert).</p>`}],
  [{art:"comic"},{html:`<p class="who">Based on a true story. Mostly.</p><p>The gator was a log. {Kid} still says it blinked.</p>`}],
  [{html:`<p class="who">{Kid}'s field notes</p><p class="said">"Gators are 100 feet. This one was 99."</p>`},{art:"kidDino"}]
 ]}
}
];

/* Choosing helpers shared by the chooser and gift pages */
window.HHChoose={
 occasions:[["birthday","A birthday"],["anniversary","An anniversary"],["mothers","Mother's Day"],["fathers","Father's Day"],["valentines","Valentine's Day"],["holidays","The holidays"],["grandparent","Grandparents Day"],["schoolyear","End of the school year"],["graduation","A graduation"],["retirement","A retirement or farewell"],["teacher","Thanking a teacher or coach"],["baby","A new baby"],["just","Just because"]],
 recipients:[["mom","Mom"],["dad","Dad"],["grandma","Grandma"],["grandpa","Grandpa"],["partner","My partner"],["parents","My parents, as a couple"],["child","A child"],["family","The whole family"],["coworker","A coworker or boss"],["teacher","A teacher or coach"],["friend","A friend"]],
 givers:[["me","Just me"],["mekids","Me and the kids"],["kids","The kids"],["family","Our family"],["group","A group: coworkers, a class, a team, friends"]],
 budgets:[["50","Under $50: one book"],["80","Under $80: two $49 books fit"],["any","Whatever it takes"]],
 SECOND:0.5,
 /* Days: collect is calendar days for you to gather things; make, print and ship are business days. Print is our estimate. */
 PRINT:4, SHIP:13, RUSH:8, RUSH_PRICE:15
};
