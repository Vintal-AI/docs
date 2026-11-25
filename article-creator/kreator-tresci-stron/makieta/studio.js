(() => {
  "use strict";
  const root = document.getElementById("ac-site-content");
  const el = id => root.querySelector("#ac-" + id);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const lines = value => value.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const copy = value => JSON.parse(JSON.stringify(value));
  const layouts = {hero:"Hero", photo:"Tekst + foto", action:"Tekst + przycisk", cards:"Kafelki tekstowe", gallery:"Kafelki ze zdjęciem", list:"Lista punktów", steps:"Etapy", faq:"FAQ"};
  const repeated = ["cards","gallery","list","steps","faq"];
  const goals = ["Umów rozmowę","Przedstaw ofertę","Umów demo","Zapytanie o wycenę","Sprzedaż usługi"];
  const states = {draft:"Szkic",review:"Do akceptacji",approved:"Zatwierdzona",returned:"Do poprawy"};
  const brandDefault = {
    description:"Pracownia Jodła projektuje meble na wymiar do mieszkań. Zaczynamy od rozmowy o wnętrzu, dobieramy materiały i planujemy montaż.",
    facts:"Jodła Forma\nJodła Moduł",
  };
  const emptyText = () => ({headline:"",body:"",badges:"",photo:"",items:[]});
  function makeSection(layout, name = layouts[layout]) {
    return {layout,name,count:4,focus:"",seed:"",exact:"",mode:layout === "hero" ? "both" : layout === "action" ? "primary" : "none",custom:"",text:emptyText()};
  }
  function makePage(name,kind="Strona ofertowa") {
    const sections = kind === "Kontakt" ? [makeSection("action","Kontakt")] :
      [makeSection("hero","Otwarcie strony"), makeSection("cards","Dla kogo jest oferta")];
    return {name,kind,topic:"",lang:"pl",goal:"",primary:"",secondary:"",mainKeys:"",extraKeys:"",rev:1,state:"draft",sections};
  }
  const samples = {
    pl:{
      cards:[["Do małego mieszkania","Wykorzystaj miejsce we wnękach i zaplanuj przechowywanie od podłogi aż po sufit."],["Do rodzinnej kuchni","Rozmieść sprzęty i zapasy tam, gdzie sięgasz po nie podczas gotowania."],["Do domowego biura","Połącz wygodny blat z miejscem na dokumenty i ukrytymi przewodami."],["Do przedpokoju","Zostaw pod ręką codzienne rzeczy, a resztę schowaj za spokojnym frontem."],["Do sypialni","Rozplanuj drążki i szuflady według tego, co najczęściej nosisz."],["Do salonu","Połącz zamykane szafki z otwartą półką na ulubione przedmioty."]],
      steps:[["Rozmowa o wnętrzu","Opisz potrzeby i prześlij przybliżone wymiary."],["Pomiar","Sprawdzamy wnęki, narożniki i dostęp do instalacji."],["Projekt","Omawiamy układ i wybieramy materiały."],["Montaż","Ustalamy termin i składamy zabudowę w mieszkaniu."],["Odbiór","Wspólnie sprawdzamy gotową zabudowę."],["Pielęgnacja","Omawiamy czyszczenie powierzchni i okuć."]],
      faq:[["Co przygotować przed rozmową?","Zdjęcia wnętrza i orientacyjne wymiary pomogą omówić możliwości."],["Kiedy wybieram materiały?","Próbki omawiamy podczas pracy nad projektem."],["Co obejmuje projekt?","Układ zabudowy, podział szafek i dobór wykończeń."],["Jak zaplanować montaż?","Termin ustalamy wspólnie po zaakceptowaniu projektu."],["Czy mogę pokazać inspiracje?","Tak. Przygotuj zdjęcia rozwiązań, z których chcesz korzystać."],["Jak zgłosić zmiany?","Zbierz uwagi do projektu i przekaż je podczas konsultacji."]],
      titles:{hero:"Meble na wymiar",cards:"Znajdź rozwiązanie do swojego wnętrza",gallery:"Zobacz pomysły na zabudowę",steps:"Od pomiaru do montażu",faq:"Pytania przed pierwszą rozmową",photo:"Zabudowa dopasowana do wnętrza",action:"Opowiedz nam o swoim wnętrzu",list:"Co warto przygotować"},
      list:["Przybliżone wymiary pomieszczenia","Zdjęcia wnęk i narożników","Listę rzeczy do przechowania","Przykłady ulubionych materiałów","Lokalizację gniazdek","Preferowany termin realizacji"],
      goals:["Opowiedz o swoim wnętrzu podczas konsultacji.","Poznaj rozwiązania do swojego mieszkania.","Zobacz przykładowy projekt podczas prezentacji.","Prześlij wymiary, aby omówić wycenę.","Wybierz zakres prac i zamów projekt."],
      photo:"Zabudowa w mieszkaniu", body:"Przeprowadzimy Cię przez wybór układu, materiałów i wykończenia."
    },
    en:{
      cards:[["For a compact apartment","Make use of alcoves and plan storage from floor to ceiling."],["For a family kitchen","Keep appliances and ingredients within reach while you cook."],["For a home office","Pair a comfortable desk with document storage and concealed cables."],["For an entrance hall","Keep everyday items nearby and store the rest behind a quiet front."],["For a bedroom","Arrange rails and drawers around the clothes you wear most."],["For a living room","Combine closed storage with display shelves."]],
      steps:[["Tell us about your space","Share your needs and approximate dimensions."],["Measure the room","We check corners, alcoves and access to utilities."],["Review the design","We discuss the layout and choose materials together."],["Installation","We agree on a date and assemble your furniture on site."],["Final review","We check the finished furniture together."],["Care instructions","Learn how to care for surfaces and fittings."]],
      faq:[["What should I prepare?","Bring photos and approximate dimensions of your space."],["When do I select materials?","We review samples while working on the design."],["What does the design include?","A layout, storage plan and choice of finishes."],["When is installation scheduled?","We agree on a date once the design is approved."],["Can I share inspiration?","Yes. Bring photos of features you would like to use."],["How do I request changes?","Collect your comments for the next design review."]],
      titles:{hero:"Made-to-measure furniture",cards:"Find a fit for your space",gallery:"Explore fitted furniture ideas",steps:"From measurement to installation",faq:"Before your first consultation",photo:"Designed around your room",action:"Tell us about your space",list:"What to prepare"},
      list:["Approximate room dimensions","Photos of alcoves and corners","A list of items to store","Examples of favourite materials","Socket locations","Preferred installation date"],
      goals:["Discuss your space in a consultation.","Explore designs for your home.","See a sample design during a demo.","Send measurements to discuss a quote.","Select your scope of work and order a design."],
      photo:"Fitted furniture in an apartment", body:"We help you choose the layout, materials and finish."
    }
  };
  const translations = {"Meble na wymiar":"Made-to-measure furniture","Kuchnie na wymiar":"Bespoke kitchens","Umów rozmowę":"Book a consultation","Zobacz realizacje":"Explore our work","meble na wymiar":"made-to-measure furniture","zabudowa wnęk":"alcove storage"};
  function local(value,p) { return p.lang === "en" ? translations[value] || value : value; }
  function generate(p,s,brand) {
    const t=samples[p.lang], topic=local(p.topic.trim(),p);
    const keys=[p.mainKeys,p.extraKeys].flatMap(v => v.split(/[,;\n]/).map(x => local(x.trim(),p))).filter(Boolean);
    const text=emptyText();
    text.headline=s.seed.trim() || (s.layout==="hero" ? topic : t.titles[s.layout]);
    const desc=p.lang==="en" && brand.description===brandDefault.description ? "Pracownia Jodła designs fitted furniture for apartments. We plan the layout, select materials and arrange installation with you." : brand.description;
    text.body=[s.layout==="hero" ? desc : t.body, s.layout==="hero" || s.layout==="action" ? t.goals[goals.indexOf(p.goal)] : "", s.focus.trim(), ...lines(s.exact)].filter(Boolean).join(" ");
    if (keys.length && ["hero","cards","gallery","photo"].includes(s.layout)) {
      const terms=keys.filter(k=>!text.headline.toLowerCase().includes(k.toLowerCase()));
      if(terms.length) text.body+=" "+(p.lang==="en"?"Explore options for ":"Sprawdź możliwości w zakresie: ")+terms.join(", ")+".";
    }
    if(s.layout==="hero") text.badges=lines(brand.facts).slice(0,3).join("\n");
    if(s.layout==="photo") text.photo=t.photo;
    if(repeated.includes(s.layout)) {
      const corpus=t[s.layout] || t.cards;
      text.items=corpus.slice(0,s.count).map((pair,i) => ({
        title:s.layout==="list" ? pair : pair[0],body:s.layout==="list" ? "" : pair[1],
        photo:s.layout==="gallery" ? t.photo+" · "+(i+1) : ""
      }));
    }
    return text;
  }
  const first=makePage("Strona główna","Strona główna");
  Object.assign(first,{topic:"Meble na wymiar",goal:goals[1],primary:"Umów rozmowę",secondary:"Zobacz realizacje",mainKeys:"meble na wymiar",extraKeys:"zabudowa wnęk"});
  const example=copy(first);
  Object.assign(example,{name:"Kuchnie na wymiar",kind:"Strona ofertowa",topic:"Kuchnie na wymiar",state:"approved",rev:2});
  example.sections.forEach(s=>s.text=generate(example,s,brandDefault));
  const storageKey="ac.website-studio.demo.v2";
  let data={brand:copy(brandDefault),pages:[first,example]};
  try {const saved=JSON.parse(localStorage.getItem(storageKey));if(saved?.brand && saved?.pages?.length && saved.pages.every(p=>p.sections?.length)) data=saved;}catch{}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(data));}catch{}}
  let screen="library",pageIndex=0,sectionIndex=0,working=null,output="site",exportUrls=[];
  const p=()=>data.pages[pageIndex], sec=()=>p().sections[sectionIndex];
  const msg=value=>{el("message").textContent=value;};
  const dirty=()=>screen==="sections" && working && JSON.stringify(working)!==JSON.stringify(sec());
  const complete=page=>[page.topic,page.lang,page.goal,page.primary].every(v=>v.trim());
  const ready=page=>complete(page) && page.sections.every(s=>s.text.headline.trim());
  function revised(){p().rev++;p().state="draft";persist();}
  const button=(label,act,extra="",attrs="")=>'<button type="button" data-do="'+act+'" class="ac-btn '+extra+'" '+attrs+'>'+safe(label)+'</button>';
  const options=(choices,value)=>Object.entries(choices).map(([key,label])=>'<option value="'+safe(key)+'" '+(value===key?"selected":"")+'>'+safe(label)+'</option>').join("");
  function field(label,key,value,{choices,multi=false,required=false,attrs=""}={}) {
    const prop=' data-key="'+key+'" '+(required?"required ":"")+attrs;
    const control=choices?'<select'+prop+'>'+options(choices,value)+'</select>':multi?'<textarea rows="2"'+prop+'>'+safe(value)+'</textarea>':'<input'+prop+' value="'+safe(value)+'">';
    return '<label>'+safe(label)+(required?" *":"")+control+'</label>';
  }
  const grouped=(...fields)=>'<div class="ac-grid">'+fields.join("")+'</div>';
  const heading=(title,sub,actions="")=>'<header class="ac-heading"><div><h1>'+safe(title)+'</h1><div class="ac-dim">'+safe(sub)+'</div></div><div class="ac-tools">'+actions+'</div></header>';
  const badge=page=>'<span class="ac-status" data-state="'+page.state+'">'+states[page.state]+' · v'+page.rev+'</span>';
  const guard=()=>{if(!dirty())return true;msg("Zapisz sekcję lub odrzuć zmiany przed przejściem dalej.");el("message").scrollIntoView({block:"nearest"});return false;};
  function navigate(next) {screen=next;working=copy(sec());msg("");render();}
  function library(){
    const rows=data.pages.map((page,i)=>'<div class="ac-record"><div><strong>'+safe(page.name)+'</strong><span class="ac-dim">'+safe(page.kind)+' · '+page.lang.toUpperCase()+'</span></div>'+badge(page)+button("Otwórz","open-page","","data-index="+i+' aria-label="Otwórz: '+safe(page.name)+'"')+'</div>').join("");
    return heading("Treści stron","Podstrony witryny marki Pracownia Jodła",button("Dodaj podstronę","add-page","ac-primary"))+'<section class="ac-listing" aria-label="Lista podstron">'+rows+'</section>';
  }
  function brief(){
    const page=p();
    return '<form id="ac-brief" class="ac-form ac-page-ai"><div class="ac-panel-heading"><h2>Brief dla AI</h2><span class="ac-dim">* Pola obowiązkowe</span></div>'+
      field("Co ma przedstawiać podstrona?","topic",page.topic,{required:true,attrs:'placeholder="np. Kuchnie na wymiar do małych mieszkań"'})+
      grouped(field("Język podstrony","lang",page.lang,{choices:{pl:"Polski",en:"Angielski"},required:true}),field("Cel podstrony","goal",page.goal,{choices:Object.fromEntries([["","Wybierz cel"],...goals.map(g=>[g,g])]),required:true}))+
      grouped(field("Główne CTA","primary",page.primary,{required:true,attrs:'placeholder="np. Umów rozmowę"'}),field("Dodatkowe CTA","secondary",page.secondary,{attrs:'placeholder="np. Zobacz realizacje"'}))+
      grouped(field("Główne frazy kluczowe","mainKeys",page.mainKeys),field("Dodatkowe frazy kluczowe","extraKeys",page.extraKeys))+
      '<details><summary>Kontekst z wiedzy marki</summary><p>'+safe(data.brand.description)+'</p><p>'+safe(lines(data.brand.facts).join(" · "))+'</p></details>'+
      '<div class="ac-tools"><button type="button" data-do="draft-page" class="ac-btn ac-primary">Generuj szkic podstrony</button><span class="ac-dim">Uzupełnia puste sekcje.</span></div></form>';
  }
  function draftEditor(s) {
    if(!s.text.headline && !s.text.items.length) return "";
    const t=s.text,faq=s.layout==="faq",list=s.layout==="list";
    const blocks=t.items.map((it,i)=>'<div class="ac-block"><strong>'+({faq:"Pytanie",steps:"Etap",list:"Punkt"}[s.layout] || "Kafelek")+' '+(i+1)+'</strong>'+
      field(faq?"Pytanie":list?"Tekst punktu":"Nagłówek elementu","item."+i+".title",it.title)+
      (list?"":field(faq?"Odpowiedź":"Opis elementu","item."+i+".body",it.body,{multi:true}))+
      (s.layout==="gallery"?field("Opis zdjęcia","item."+i+".photo",it.photo):"")+'</div>').join("");
    return '<h2>Treść do edycji</h2>'+field("Nagłówek widoczny na stronie","text.headline",t.headline)+field("Treść","text.body",t.body,{multi:true})+
      (s.layout==="hero"?field("Wyróżniki · każdy w nowym wierszu","text.badges",t.badges,{multi:true}):"")+
      (s.layout==="photo"?field("Opis zdjęcia","text.photo",t.photo):"")+blocks;
  }
  function sectionEditor(){
    const s=working;
    const menu=p().sections.map((it,i)=>button(it.name,"section","","data-index="+i+' aria-pressed="'+(sectionIndex===i)+'"')).join("");
    const modes={none:"Bez przycisku",primary:"Główne CTA z briefu"};
    if(p().secondary || ["secondary","both"].includes(s.mode)) modes.secondary="Dodatkowe CTA z briefu";
    if(s.layout==="hero" && (p().secondary || s.mode==="both")) modes.both="Oba CTA z briefu";
    modes.custom="Własny tekst";
    const controls=grouped(field("Robocza nazwa sekcji","name",s.name),field("Układ sekcji","layout",s.layout,{choices:layouts}));
    const count=repeated.includes(s.layout)?field("Liczba elementów","count",String(s.count),{choices:Object.fromEntries([1,2,3,4,5,6].map(i=>[i,String(i)]))}):"";
    const cta=field("Przycisk w tej sekcji","mode",s.mode,{choices:modes})+(s.mode==="custom"?field("Własny tekst przycisku","custom",s.custom):"");
    const guide=s.layout==="faq"?"AI przygotuje osobne pytania i odpowiedzi.":repeated.includes(s.layout)?"Każdy element możesz edytować osobno.":s.layout==="hero"?"Pierwszy ekran podstrony z nagłówkiem, wyróżnikami i wybranymi CTA.":"AI przygotuje nagłówek i treść w wybranym układzie.";
    return '<div class="ac-rail"><nav aria-label="Sekcje podstrony">'+menu+button("Dodaj sekcję","add-section","ac-primary")+'</nav><section class="ac-work ac-form" aria-label="Edycja sekcji"><div class="ac-panel-heading"><h2>Ustawienia sekcji</h2><div class="ac-tools">'+button("↑","up","","aria-label=\"Przenieś wyżej\" "+(sectionIndex===0?"disabled":""))+button("↓","down","","aria-label=\"Przenieś niżej\" "+(sectionIndex===p().sections.length-1?"disabled":""))+'</div></div>'+controls+
      '<span class="ac-dim">'+guide+'</span>'+count+grouped(field("Własny nagłówek (opcjonalnie)","seed",s.seed),field("Co chcesz podkreślić?","focus",s.focus))+
      field("Zachowaj dokładne brzmienie","exact",s.exact,{multi:true,attrs:'placeholder="Nazwa produktu, parametr lub zatwierdzone sformułowanie"'})+
      (lines(data.brand.facts).length?'<div class="ac-tools"><span class="ac-dim">Wstaw z wiedzy marki</span>'+lines(data.brand.facts).map((f,i)=>button(f,"fact","","data-index="+i)).join("")+'</div>':"")+
      cta+'<div class="ac-tools">'+button(s.text.headline?"Wygeneruj ponownie":"Generuj treść sekcji","generate","ac-primary")+'</div>'+draftEditor(s)+
      '<div class="ac-tools">'+button("Zapisz sekcję","save","ac-primary")+button("Odrzuć zmiany","discard")+'</div></section></div>';
  }

  function buttonsFor(s,page){
    if(s.mode==="both") return [page.primary,page.secondary].filter(Boolean);
    if(s.mode==="primary") return [page.primary].filter(Boolean);
    if(s.mode==="secondary") return [page.secondary].filter(Boolean);
    return s.mode==="custom" && s.custom.trim() ? [s.custom.trim()] : [];
  }
  const paperStyle = [
    ".ac-paper{color:#183b32;background:#f9faf6;font:15px/1.5 system-ui,sans-serif;overflow-wrap:anywhere;margin:0}",
    ".ac-paper>header,.ac-paper>section{max-width:900px;margin:auto;padding:clamp(16px,3vw,32px);border-bottom:1px solid #d9e1d8}",
    ".ac-paper>header{font-weight:700;color:#47645a}.ac-paper .hero{background:#e9f0e3}",
    ".ac-paper h1,.ac-paper h2,.ac-paper h3{margin:0 0 9px!important;line-height:1.18}.ac-paper h1{font:700 clamp(26px,3vw,42px)/1.18 Georgia,serif}.ac-paper h2{font:700 24px/1.18 Georgia,serif!important}",
    ".ac-paper p{margin:8px 0!important;white-space:pre-line}.ac-paper .buttons,.ac-paper .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}",
    ".ac-paper .buttons span{border:1px solid #274935;padding:7px 12px;border-radius:7px}.ac-paper .buttons span:first-child{background:#274935;color:#fff}",
    ".ac-paper .chips small{color:#3e5644}.ac-paper .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:12px;margin-top:12px}",
    ".ac-paper .tile{background:white;border:1px solid #d5ddd5;border-radius:10px;padding:14px}.ac-paper .photo{background:#e1e7de;padding:25px 12px;text-align:center;color:#445846}",
    ".ac-paper .split{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:16px}.ac-paper details{margin:9px 0}.ac-paper summary{cursor:pointer;font-weight:600}",
    ".ac-paper.document{color:#192633;background:white}.ac-paper.document h2,.ac-paper.document h1{color:#234c62}.ac-paper.document p{line-height:1.55}.ac-paper.document .entry{margin-block:14px}",
    ".ac-paper .fieldname{font-weight:650}.ac-paper .docmeta{font-size:13px;color:#59636b}.exportbar{display:flex;justify-content:center;padding:10px}.exportbar button{font:inherit;padding:9px 14px}",
    "@media print{.exportbar{display:none}.ac-paper{background:white}.ac-paper>section,.ac-paper>header{border:0;padding:8pt 0}.ac-paper h2,.ac-paper h3{break-after:avoid}.ac-paper .entry{break-inside:avoid}@page{margin:18mm}}"
  ].join("\n");
  const style=document.createElement("style");style.textContent=paperStyle;root.append(style);
  function sectionMarkup(s,page,documentMode,index){
    const t=s.text, actions=buttonsFor(s,page);
    const english=page.lang==="en", headingTag=index===0?"h1":"h2";
    const inlinePhoto=desc=>'<div class="photo">'+safe((english?"Photo · ":"Zdjęcie · ")+desc)+'</div>';
    if(documentMode){
      const row=(label,value)=>value?'<p><span class="fieldname">'+safe(label)+'</span> '+safe(value)+'</p>':"";
      const labels={faq:"FAQ",steps:english?"Step":"Etap",list:english?"Item":"Punkt"};
      const items=t.items.map((it,i)=>'<div class="entry"><strong>'+(labels[s.layout] || (english?"Card":"Karta"))+' '+(i+1)+' · '+safe(it.title)+'</strong>'+row("",it.body)+row(english?"Photo":"Zdjęcie",it.photo)+'</div>').join("");
      const actionRows=actions.map((val,i)=>row(s.mode==="both"?(i?"CTA Secondary":"CTA Primary"):s.mode==="primary"?"CTA Primary":s.mode==="secondary"?"CTA Secondary":"CTA",val)).join("");
      return '<section><h2>'+safe(s.name)+'</h2>'+row(headingTag.toUpperCase(),t.headline)+row(english?"Copy":"Treść",t.body)+row(english?"Badges":"Wyróżniki",lines(t.badges).join(" · "))+row(english?"Photo":"Zdjęcie",t.photo)+items+actionRows+'</section>';
    }
    const head='<'+headingTag+'>'+safe(t.headline)+'</'+headingTag+'><p>'+safe(t.body)+'</p>';
    const items=t.items.map(it=>{
      if(s.layout==="faq")return '<details><summary>'+safe(it.title)+'</summary><p>'+safe(it.body)+'</p></details>';
      if(s.layout==="list")return '<li>'+safe(it.title)+'</li>';
      if(s.layout==="steps")return '<li><strong>'+safe(it.title)+'</strong><p>'+safe(it.body)+'</p></li>';
      return '<article class="tile">'+(it.photo?inlinePhoto(it.photo):"")+'<h3>'+safe(it.title)+'</h3><p>'+safe(it.body)+'</p></article>';
    }).join("");
    const group=s.layout==="steps"?"ol":s.layout==="list"?"ul":"div";
    return '<section class="'+(s.layout==="hero"?"hero":"")+'">'+(t.photo?'<div class="split">'+inlinePhoto(t.photo)+'<div>'+head+'</div></div>':head)+
      (t.badges?'<div class="chips">'+lines(t.badges).map(v=>'<small>'+safe(v)+'</small>').join("")+'</div>':"")+
      (items?'<'+group+(["gallery","cards"].includes(s.layout)?' class="tiles"':"")+'>'+items+'</'+group+'>':"")+
      (actions.length?'<div class="buttons">'+actions.map(v=>'<span>'+safe(v)+'</span>').join("")+'</div>':"")+'</section>';
  }
  function paper(doc){
    const page=p();
    return '<main lang="'+page.lang+'" class="ac-paper'+(doc?' document':'')+'"><header>'+(doc?'<h1>'+safe(page.name)+'</h1><div class="docmeta">Pracownia Jodła · '+page.lang.toUpperCase()+' · '+safe(states[page.state])+' · v'+page.rev+'</div>':"Pracownia Jodła")+'</header>'+
      page.sections.filter(s=>s.text.headline).map((s,i)=>sectionMarkup(s,page,doc,i)).join("")+'</main>';
  }
  function standalone(doc){
    return '<!doctype html>\n<html lang="'+p().lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+safe(p().name)+' · Pracownia Jodła</title><style>body{margin:0}'+paperStyle+'</style></head><body>'+
      (doc?'<div class="exportbar"><button type="button" onclick="window.print()">Drukuj / Zapisz PDF</button></div>':"")+paper(doc)+'</body></html>';
  }
  function results(){
    if(!p().sections.some(s=>s.text.headline))return '<section class="ac-preview"><h2>Podgląd treści</h2><p class="ac-example">Uzupełnij brief i wygeneruj szkic, aby zobaczyć podstronę i dokument.</p>'+button("Otwórz brief","brief")+'</section>';
    const doc=output==="document";
    const tabs=[["site","Strona"],["document","Dokument"],["html","Pokaż HTML"]].map(([key,label])=>button(label,"output","","data-view="+key+' aria-pressed="'+(key===output)+'"')).join("");
    let open="";
    if(window.top===window){
      const url=URL.createObjectURL(new Blob([standalone(doc)],{type:"text/html;charset=utf-8"}));exportUrls.push(url);
      open='<a class="ac-btn" href="'+safe(url)+'" target="_blank" rel="noopener">'+(doc?"Otwórz dokument do druku / PDF":"Otwórz w nowej karcie")+'</a>';
    }
    const body=output==="html"?'<pre class="ac-output">'+safe(standalone(false))+'</pre>':paper(doc);
    const review=p().state==="approved"?"":p().state==="review"?button("Zatwierdź wersję","approve","ac-primary")+button("Zwróć do poprawy","return"):button("Wyślij do akceptacji","review","ac-primary",ready(p())?"":"disabled");
    return '<section class="ac-preview"><div class="ac-panel-heading"><div class="ac-tools">'+tabs+'</div>'+open+'</div><div class="ac-window">'+body+'</div><div class="ac-review"><div class="ac-tools">'+review+'</div></div></section>';
  }
  function render(){
    exportUrls.forEach(url=>URL.revokeObjectURL(url));exportUrls=[];
    el("crumb").textContent=screen==="library"?"Treści stron":"Treści stron / "+p().name;
    if(screen==="library"){el("content").innerHTML=library();return;}
    const nav=[["brief","Brief"],["sections","Sekcje"],["results","Podgląd i dokument"]].map(([key,label])=>button(label,key,"ac-quiet",screen===key?'aria-current="step"':"")).join("");
    el("content").innerHTML=heading(p().name,p().kind,badge(p()))+'<nav class="ac-navline" aria-label="Etapy pracy">'+nav+'</nav>'+(screen==="brief"?brief():screen==="sections"?sectionEditor():results());
  }
  function openPage(i){
    pageIndex=i;sectionIndex=0;output="site";navigate(p().sections.some(s=>s.text.headline)?"results":"brief");
  }
  function inputChanged(event){
    const key=event.target.dataset.key;if(!key)return;
    const value=event.target.value;
    if(screen==="brief" && el("brief")?.contains(event.target)){
      const changed=p()[key]!==value;
      p()[key]=value;
      if(changed && p().state!=="draft"){revised();const b=el("content").querySelector(".ac-status");b.outerHTML=badge(p());}
      else persist();
      return;
    }
    if(screen!=="sections" || !el("content").contains(event.target))return;
    if(key.startsWith("item.")){const [,n,k]=key.split(".");working.text.items[Number(n)][k]=value;}
    else if(key.startsWith("text."))working.text[key.slice(5)]=value;
    else working[key]=key==="count"?Number(value):value;
    if(key==="layout"){
      if(value!=="hero" && working.mode==="both")working.mode="primary";
      working.text=emptyText();
      render();msg("Wybrano nowy układ. Wygeneruj treść lub odrzuć zmiany.");
    } else if(key==="mode")render();
    else if(key==="count" && working.text.headline)msg("Wygeneruj ponownie, aby dopasować liczbę elementów.");
  }
  function validateBrief(){
    if(complete(p()))return true;
    msg("Uzupełnij temat, język, cel i główne CTA w briefie.");
    return false;
  }
  function saveSection(){
    const s=working;
    if(!s.name.trim()){msg("Wpisz roboczą nazwę sekcji.");return false;}
    if(s.mode==="custom" && !s.custom.trim()){msg("Wpisz tekst przycisku lub wybierz inny tryb.");return false;}
    if(s.text.headline && repeated.includes(s.layout) && s.count!==s.text.items.length){msg("Wygeneruj treść dla wybranej liczby elementów.");return false;}
    const copyFields=[s.text.headline,s.text.body,s.text.badges,s.text.photo,...s.text.items.flatMap(it=>[it.title,it.body,it.photo])];
    if(s.text.headline && lines(s.exact).some(fact=>!copyFields.some(value=>value.includes(fact)))){msg("Wstaw do treści wszystkie sformułowania wskazane do zachowania.");return false;}
    if(dirty()){p().sections[sectionIndex]=copy(s);revised();}
    navigate("sections");msg("Zapisano sekcję.");return true;
  }
  let dialogKind;
  function dialog(kind){
    if(!guard())return;
    dialogKind=kind;
    el("dialog-title").textContent={page:"Dodaj podstronę",section:"Dodaj sekcję",brand:"Wiedza marki"}[kind];
    if(kind==="brand")el("dialog-fields").innerHTML=field("Opis marki i temat witryny","description",data.brand.description,{multi:true,required:true})+field("Nazwy produktów i stałe dane · każdy wpis w nowym wierszu","facts",data.brand.facts,{multi:true});
    if(kind==="page")el("dialog-fields").innerHTML=field("Nazwa podstrony","name","",{required:true})+field("Typ podstrony","kind","Strona ofertowa",{choices:Object.fromEntries(["Strona główna","Strona ofertowa","O nas","Kontakt"].map(x=>[x,x]))});
    if(kind==="section")el("dialog-fields").innerHTML=field("Układ sekcji","layout","cards",{choices:layouts})+field("Robocza nazwa sekcji","name","",{attrs:'placeholder="np. Dla kogo jest oferta"'});
    el("confirm").textContent=kind==="brand"?"Zapisz":"Dodaj";
    el("dialog").showModal();
  }
  function createFromDialog(){
    if(!el("dialog-form").reportValidity())return;
    const val=key=>el("dialog-fields").querySelector('[data-key="'+key+'"]').value.trim();
    if(dialogKind==="brand"){
      if(!val("description"))return;
      data.brand={description:val("description"),facts:val("facts")};persist();render();msg("Zapisano wiedzę marki do kolejnych generacji.");
    } else if(dialogKind==="page"){
      if(!val("name"))return;
      data.pages.push(makePage(val("name"),val("kind")));persist();openPage(data.pages.length-1);
    } else {
      p().sections.push(makeSection(val("layout"),val("name") || layouts[val("layout")]));sectionIndex=p().sections.length-1;revised();navigate("sections");
    }
    el("dialog").close();
  }
  el("confirm").onclick=createFromDialog;
  el("dialog-form").onsubmit=event=>{event.preventDefault();createFromDialog();};
  el("cancel").onclick=()=>el("dialog").close();
  el("library").onclick=()=>{if(guard())navigate("library");};
  el("brand-edit").onclick=()=>dialog("brand");
  el("content").addEventListener("input",inputChanged);
  function generatePage(){
    if(!el("brief").reportValidity() || !validateBrief())return;
    let changed=false;
    p().sections.forEach(s=>{if(!s.text.headline){s.text=generate(p(),s,data.brand);changed=true;}});
    if(changed)revised();sectionIndex=0;navigate("sections");
    msg(changed?"Szkic podstrony jest gotowy. Możesz edytować sekcje.":"Wszystkie sekcje mają treść. Wybraną sekcję możesz wygenerować ponownie.");
  }
  el("content").addEventListener("submit",event=>{event.preventDefault();generatePage();});
  el("content").addEventListener("click",event=>{
    const b=event.target.closest("button[data-do]");if(!b)return;
    const act=b.dataset.do;
    if(["brief","sections","results"].includes(act)){if(guard())navigate(act);return;}
    switch(act){
      case "draft-page":generatePage();break;
      case "open-page":openPage(Number(b.dataset.index));break;
      case "add-page":dialog("page");break;
      case "add-section":dialog("section");break;
      case "section":if(guard()){sectionIndex=Number(b.dataset.index);navigate("sections");}break;
      case "generate":
        if(!validateBrief())break;
        working.text=generate(p(),working,data.brand);render();msg("Szkic sekcji gotowy do edycji. Zapisz go po sprawdzeniu.");break;
      case "discard":navigate("sections");msg("Przywrócono zapisaną sekcję.");break;
      case "save":saveSection();break;
      case "fact":{
        const fact=lines(data.brand.facts)[Number(b.dataset.index)];
        working.exact=[...new Set([...lines(working.exact),fact])].join("\n");render();break;
      }
      case "up":case "down":{
        if(!guard())break;
        const i=sectionIndex+(act==="up"?-1:1);
        if(i<0 || i>=p().sections.length)break;
        const list=p().sections;list.splice(i,0,list.splice(sectionIndex,1)[0]);sectionIndex=i;revised();navigate("sections");break;
      }
      case "output":output=b.dataset.view;render();break;
      case "review":case "approve":case "return":
        if(!ready(p()))break;
        p().state={review:"review",approve:"approved",return:"returned"}[act];persist();render();msg("Zapisano status wersji w makiecie.");break;
    }
  });
  render();
})();
