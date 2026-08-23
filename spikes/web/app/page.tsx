"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Surface = "radar" | "watch" | "projects" | "evidence";
type Signal = { id:string; domain:string; title:string; claim:string; why_it_matters:string; evidence_quality:string; evidence_rationale:string; priority:string; disposition:string; workflow_status:string; move_text:string; move_state:string; confirmation_state:string; review_trigger:string; as_of_date:string; source_count:number; project_name?:string };
type Project = { id:string; name:string; description:string; status:string; signal_count:number };
type Source = { id:number; title:string; publisher:string; source_type:string; locator:string; publication_date:string };

const nav: {id:Surface; label:string; glyph:string}[] = [
  {id:"radar",label:"Radar",glyph:"◎"},{id:"watch",label:"Watch",glyph:"◇"},{id:"projects",label:"Projects",glyph:"□"},{id:"evidence",label:"Evidence",glyph:"≡"},
];

export default function Home(){
  const [surface,setSurface]=useState<Surface>("radar");
  const [signals,setSignals]=useState<Signal[]>([]);
  const [projects,setProjects]=useState<Project[]>([]);
  const [sources,setSources]=useState<Source[]>([]);
  const [selected,setSelected]=useState<Signal|null>(null);
  const [modal,setModal]=useState<"source"|"signal"|null>(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [notice,setNotice]=useState("");

  const load=useCallback(async()=>{
    try{
      const [signalResponse,sourceResponse]=await Promise.all([fetch("/api/signals"),fetch("/api/sources")]);
      if(!signalResponse.ok||!sourceResponse.ok) throw new Error("The evidence store could not be opened.");
      const signalData=await signalResponse.json(), sourceData=await sourceResponse.json();
      setSignals(signalData.signals); setProjects(signalData.projects); setSources(sourceData.sources);
    }catch(error){setNotice(error instanceof Error?error.message:"Unable to load the radar.");}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{load();},[load]);

  const queue=useMemo(()=>signals.filter((s)=>s.priority==="P1"&&s.workflow_status==="OPEN").slice(0,10),[signals]);
  const watched=useMemo(()=>signals.filter((s)=>s.disposition==="MONITOR"||s.priority!=="P1"),[signals]);
  const confirmed=signals.filter((s)=>s.confirmation_state==="CONFIRMED").length;

  async function saveDecision(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); if(!selected)return; setSaving(true); const data=new FormData(event.currentTarget);
    const payload={id:selected.id,disposition:String(data.get("disposition")),moveState:String(data.get("moveState")),confirmationState:data.get("confirmed")?"CONFIRMED":"DRAFT",moveText:String(data.get("moveText")??"")};
    const response=await fetch("/api/signals",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});
    setSaving(false); if(!response.ok){setNotice("Decision could not be saved.");return;} setNotice(`${selected.id} decision saved to history.`); setSelected(null); await load();
  }
  async function submitSource(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); setSaving(true); const data=Object.fromEntries(new FormData(event.currentTarget));
    const response=await fetch("/api/sources",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)}); setSaving(false);
    if(!response.ok){setNotice("Source could not be captured.");return;} setModal(null);setNotice("Source captured as evidence—not yet a Signal.");await load();
  }
  async function submitSignal(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setSaving(true);const data=Object.fromEntries(new FormData(event.currentTarget));
    const response=await fetch("/api/signals",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});setSaving(false);
    if(!response.ok){setNotice("Signal could not be created. Complete every required field.");return;}setModal(null);setNotice("Signal created as an unconfirmed human-review draft.");await load();
  }

  return <main className="app-shell">
    <aside className="rail" aria-label="Primary navigation">
      <button className="brand" onClick={()=>setSurface("radar")} aria-label="Signal Radar home">R</button>
      <nav>{nav.map((item)=><button key={item.id} className={`nav-item ${surface===item.id?"active":""}`} onClick={()=>setSurface(item.id)}><span className="nav-glyph">{item.glyph}</span><span>{item.label}</span></button>)}</nav>
      <button className="avatar" aria-label="User menu">SK</button>
    </aside>

    <section className="content" id="top">
      <header className="topbar">
        <div><p className="eyebrow">SATURDAY · 22 AUGUST 2026</p><h1>{surface==="radar"?`${queue.length} signals need a decision.`:surface==="watch"?"Watch what changes—not what is merely new.":surface==="projects"?"Intelligence belongs in a decision context.":"Every claim returns to retrievable evidence."}</h1></div>
        <div className="top-actions"><button className="secondary-button" onClick={()=>setModal("signal")}>＋ New signal</button><button className="capture-button" onClick={()=>setModal("source")}><span>＋</span> Capture source</button></div>
      </header>
      {notice&&<button className="notice" onClick={()=>setNotice("")} aria-label="Dismiss message">{notice}<span>×</span></button>}
      <div className="gate-note" role="status"><span className="gate-dot"/><div><strong>Human build override active</strong><p>{confirmed}/{signals.length} seeded judgments confirmed. Prototype evidence remains pending.</p></div><span className="gate-label">PHASE 1</span></div>

      {loading?<Loading/>:surface==="radar"?<Radar queue={queue} onReview={setSelected}/>:surface==="watch"?<Watch signals={watched} onReview={setSelected}/>:surface==="projects"?<Projects projects={projects}/>:<Evidence sources={sources}/>} 
    </section>

    {selected&&<SignalDetail signal={selected} saving={saving} onClose={()=>setSelected(null)} onSave={saveDecision}/>} 
    {modal==="source"&&<SourceModal saving={saving} onClose={()=>setModal(null)} onSubmit={submitSource}/>} 
    {modal==="signal"&&<SignalModal saving={saving} onClose={()=>setModal(null)} onSubmit={submitSignal}/>} 
  </main>;
}

function Loading(){return <div className="loading-state"><span/><p>Opening the evidence store…</p></div>}
function Radar({queue,onReview}:{queue:Signal[];onReview:(s:Signal)=>void}){return <>
  <section className="radar-head"><div><p className="section-kicker">TODAY&apos;S RADAR</p><h2>A finite decision queue</h2></div><div className="queue-count"><strong>{queue.length}</strong><span>to review</span></div></section>
  <div className="signal-list">{queue.map((signal,index)=><SignalCard key={signal.id} signal={signal} index={index} onReview={onReview}/>)}</div>
  <div className="queue-end"><span>✓</span><div><strong>That is the queue.</strong><p>No infinite feed. Return when evidence or a decision changes.</p></div></div>
  </>}
function SignalCard({signal,index,onReview}:{signal:Signal;index:number;onReview:(s:Signal)=>void}){return <article className={`signal-card ${index===0?"featured":""}`}>
  <div className="card-index">{String(index+1).padStart(2,"0")}</div><div className="signal-main">
    <div className="signal-meta"><span className="priority">{signal.priority}</span><span>{signal.domain}</span>{signal.confirmation_state==="DRAFT"&&<span className="draft-label">DRAFT</span>}</div>
    <h3>{signal.title}</h3><div className="evidence-line"><span className="quality-mark">✓</span><span><strong>{signal.evidence_quality} evidence</strong> · {signal.source_count||"Unlinked"} {signal.source_count===1?"source":"sources"}</span>{signal.project_name&&<span className="project-pill">{signal.project_name}</span>}</div>
    {signal.move_text&&<div className="move-line"><span>THE MOVE</span><p>{signal.move_text}</p></div>}
  </div><button className="review-button" onClick={()=>onReview(signal)} aria-label={`Review ${signal.id}`}>Review <span>→</span></button></article>}
function Watch({signals,onReview}:{signals:Signal[];onReview:(s:Signal)=>void}){return <section><div className="surface-heading"><p className="section-kicker">WATCH</p><h2>{signals.length} questions waiting for meaningful change</h2><p>Background Signals stay out of today&apos;s queue until evidence, urgency or project context changes.</p></div><div className="compact-list">{signals.map((s)=><button key={s.id} onClick={()=>onReview(s)}><span className={`priority soft ${s.priority.toLowerCase()}`}>{s.priority}</span><span><strong>{s.title}</strong><small>{s.domain} · {s.review_trigger}</small></span><b>→</b></button>)}</div></section>}
function Projects({projects}:{projects:Project[]}){return <section><div className="surface-heading"><p className="section-kicker">PROJECTS</p><h2>Where Signals change active work</h2><p>Project links remain suggestions until a person confirms the affected decision.</p></div><div className="project-grid">{projects.map((p)=><article key={p.id}><span>{p.id}</span><h3>{p.name}</h3><p>{p.description}</p><footer><strong>{p.signal_count}</strong> linked Signals <em>{p.status}</em></footer></article>)}</div></section>}
function Evidence({sources}:{sources:Source[]}){return <section><div className="surface-heading"><p className="section-kicker">EVIDENCE</p><h2>A source library, not a verdict machine</h2><p>Sources are retrievable facts. Their relationship to a Signal determines what they actually support.</p></div><div className="source-table"><div className="source-row head"><span>Source</span><span>Publisher</span><span>Date</span><span>Type</span></div>{sources.map((s)=><a className="source-row" href={s.locator} target="_blank" rel="noreferrer" key={s.id}><span><strong>{s.title}</strong><small>Open source ↗</small></span><span>{s.publisher}</span><span>{s.publication_date}</span><span>{s.source_type.replaceAll("_"," ")}</span></a>)}</div></section>}

function SignalDetail({signal,saving,onClose,onSave}:{signal:Signal;saving:boolean;onClose:()=>void;onSave:(e:FormEvent<HTMLFormElement>)=>void}){return <div className="overlay" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose()}}><aside className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
  <header><div><span>{signal.id} · {signal.domain}</span><h2 id="detail-title">{signal.title}</h2></div><button onClick={onClose} aria-label="Close">×</button></header>
  <div className="detail-body"><section><label>WHAT CHANGED</label><p>{signal.claim}</p></section><section><label>WHY IT MATTERS</label><p>{signal.why_it_matters}</p></section><section className="quality-box"><div><label>EVIDENCE QUALITY</label><strong>{signal.evidence_quality}</strong></div><p>{signal.evidence_rationale}</p></section>
  <form onSubmit={onSave}><label htmlFor="disposition">HUMAN DISPOSITION</label><select id="disposition" name="disposition" defaultValue={signal.disposition}><option>UNDECIDED</option><option>MONITOR</option><option>TEST</option><option>ADOPT</option><option>DISMISS</option></select><label htmlFor="moveText">THE MOVE</label><textarea id="moveText" name="moveText" defaultValue={signal.move_text} rows={3}/><label htmlFor="moveState">EXECUTION STATE</label><select id="moveState" name="moveState" defaultValue={signal.move_state}><option>NOT_STARTED</option><option>IN_PROGRESS</option><option>COMPLETED</option><option>CANCELLED</option></select><label className="confirm-check"><input type="checkbox" name="confirmed" defaultChecked={signal.confirmation_state==="CONFIRMED"}/><span>I confirm the claim, evidence category, decision and THE MOVE.</span></label><button className="save-button" disabled={saving}>{saving?"Saving…":"Save decision to history"}</button></form></div>
  </aside></div>}
function ModalShell({title,onClose,children}:{title:string;onClose:()=>void;children:React.ReactNode}){return <div className="overlay modal-overlay" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose()}}><section className="form-modal" role="dialog" aria-modal="true"><header><div><p className="section-kicker">MANUAL CAPTURE</p><h2>{title}</h2></div><button onClick={onClose} aria-label="Close">×</button></header>{children}</section></div>}
function SourceModal({saving,onClose,onSubmit}:{saving:boolean;onClose:()=>void;onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){return <ModalShell title="Capture a retrievable Source" onClose={onClose}><form className="capture-form" onSubmit={onSubmit}><label>Title<input name="title" required/></label><div className="form-pair"><label>Publisher<input name="publisher" required/></label><label>Publication date<input name="publicationDate" type="date" required/></label></div><label>Locator<input name="locator" type="url" placeholder="https://…" required/></label><label>Source type<select name="sourceType"><option>OFFICIAL_ANNOUNCEMENT</option><option>POLICY_OR_REGULATION</option><option>DATASET_OR_DOCUMENTATION</option><option>SCIENTIFIC_STUDY</option><option>TECHNICAL_REPORT</option><option>OTHER</option></select></label><p className="form-note">Capturing a Source does not make it evidence for a claim. Link and classify it during Signal review.</p><button className="save-button" disabled={saving}>{saving?"Saving…":"Capture source"}</button></form></ModalShell>}
function SignalModal({saving,onClose,onSubmit}:{saving:boolean;onClose:()=>void;onSubmit:(e:FormEvent<HTMLFormElement>)=>void}){return <ModalShell title="Create a reviewed Signal draft" onClose={onClose}><form className="capture-form" onSubmit={onSubmit}><label>Material change<input name="title" required/></label><label>Claim<textarea name="claim" rows={3} required/></label><label>Why it matters<textarea name="whyItMatters" rows={2}/></label><div className="form-pair"><label>Domain<input name="domain" required/></label><label>Priority<select name="priority"><option>P1</option><option>P2</option><option>P3</option></select></label></div><label>Evidence rationale<textarea name="evidenceRationale" rows={2} required/></label><div className="form-pair"><label>Evidence quality<select name="evidenceQuality"><option>HIGH</option><option>MEDIUM</option><option>LOW</option></select></label><label>Review trigger<input name="reviewTrigger"/></label></div><label>THE MOVE<textarea name="moveText" rows={2}/></label><p className="form-note">New records remain DRAFT. AI text is never counted as a Source or human decision.</p><button className="save-button" disabled={saving}>{saving?"Saving…":"Create draft Signal"}</button></form></ModalShell>}
