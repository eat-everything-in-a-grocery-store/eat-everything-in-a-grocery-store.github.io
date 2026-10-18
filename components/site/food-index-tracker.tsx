"use client";
import { useEffect, useState } from "react";
const items=[
 {name:"Apples",category:"Named food",calories:"Not stated"},
 {name:"Choco Puffs",category:"Named food",calories:"Not stated"},
 {name:"Bloxy Cola",category:"Named food",calories:"Not stated"},
 {name:"Mega Watermelon",category:"Large target",calories:"150,000 (developer)"},
 {name:"Golden Banana",category:"Hidden target",calories:"Not stated"}
] as const;
const key="eat-everything-food-index-checklist-v1";
export function FoodIndexTracker(){
 const [checked,setChecked]=useState<string[]>([]);
 const [loaded,setLoaded]=useState(false);
 const [query,setQuery]=useState("");
 const [filter,setFilter]=useState("All");
 useEffect(()=>{try{const value=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(value))setChecked(value.filter((v):v is string=>typeof v==="string"&&items.some(item=>item.name===v)));}catch{}setLoaded(true);},[]);
 useEffect(()=>{if(loaded){try{localStorage.setItem(key,JSON.stringify(checked));}catch{}}},[checked,loaded]);
 const visible=items.filter(item=>(filter==="All"||item.category===filter)&&item.name.toLowerCase().includes(query.trim().toLowerCase()));
 function toggle(name:string){setChecked(prev=>prev.includes(name)?prev.filter(x=>x!==name):[...prev,name]);}
 function reset(){if(window.confirm("Clear your saved checklist on this browser?"))setChecked([]);}
 return <section aria-label="Food Index browser checklist" className="content-card my-7" style={{padding:"1.25rem"}}>
 <p className="eyebrow">Searchable developer-name starter list</p>
 <h2>175 official target · {items.length} developer-named entries shown</h2>
 <p>{checked.length} / {items.length} checked here. These are local notes, not Roblox Food Index progress. Index UI status and precise locations have not been independently verified.</p>
 <div className="my-4 flex flex-wrap gap-3">
 <label className="flex flex-col gap-1">Search names<input className="rounded border border-border bg-background px-3 py-2 text-foreground" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search food names" /></label>
 <label className="flex flex-col gap-1">Filter type<select className="rounded border border-border bg-background px-3 py-2 text-foreground" value={filter} onChange={e=>setFilter(e.target.value)}>{["All","Named food","Large target","Hidden target"].map(v=><option key={v}>{v}</option>)}</select></label>
 </div>
 <ul className="grid gap-2">{visible.map(item=><li key={item.name} className="rounded border border-border p-3"><label className="flex cursor-pointer items-start gap-3"><input type="checkbox" className="mt-1 h-4 w-4" checked={checked.includes(item.name)} onChange={()=>toggle(item.name)} /><span><strong>{item.name}</strong><span className="block text-sm text-muted-foreground">{item.category} · calories: {item.calories} · named by developer · index screenshot: not verified</span></span></label></li>)}</ul>
 {visible.length===0?<p>No matching developer-named items in this starter list.</p>:null}
 <div className="mt-4 flex flex-wrap items-center gap-4"><button type="button" className="button-secondary" onClick={reset}>Reset local checks</button><span className="text-sm text-muted-foreground">Saved to this browser only; it is not synced to Roblox.</span></div>
 </section>;
}
