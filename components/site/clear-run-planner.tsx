"use client";
import { useState } from "react";
const phases=[
 "Choose solo or party and record the actual player count",
 "Inspect and record the start landmark and visible gym levels",
 "Mark food sections using observed landmarks, not a guessed map",
 "Check the gym cost when a real bottleneck appears",
 "Revisit unresolved food areas and verify remaining objects",
 "Capture the in-game completion cue or leaderboard result"
];
export function ClearRunPlanner(){
 const [party,setParty]=useState(false);
 const [marked,setMarked]=useState<number[]>([]);
 return <section aria-label="Run planning checklist" className="content-card my-7" style={{padding:"1.25rem"}}>
 <p className="eyebrow">Interactive planning tool · untested route</p>
 <h2>Your Store-Clear Checklist</h2>
 <div className="mb-4 flex flex-wrap gap-2"><button type="button" aria-pressed={!party} className={!party?"button-primary":"button-secondary"} onClick={()=>{setParty(false);setMarked([]);}}>Solo plan</button><button type="button" aria-pressed={party} className={party?"button-primary":"button-secondary"} onClick={()=>{setParty(true);setMarked([]);}}>Party plan</button></div>
 <p>{party?"Assign observed sections to teammates, agree on finish signals, and avoid duplicate searching.":"Track every section yourself; keep one list of unresolved objects and return only where needed."} {marked.length} / {phases.length} planning checks marked.</p>
 <ul className="mt-4 grid gap-2">{phases.map((item,i)=><li key={item} className="rounded border border-border p-3"><label className="flex cursor-pointer gap-3"><input type="checkbox" checked={marked.includes(i)} onChange={()=>setMarked(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])}/><span>{item}</span></label></li>)}</ul>
 <p className="mt-3 text-sm text-muted-foreground">Checklist marks last only in this tab. Checking all boxes does not prove the Roblox server registered a clear.</p>
 </section>;
}
