import React, { useMemo, useState } from "react";
import { Activity, ArrowDownRight, ArrowRight, BarChart3, CheckCircle2, Code2, Cpu, Gauge, Leaf, Menu, Zap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { benchmark, examples, scoreFor } from "./algorithms";

const fmt = (n) => n < 1 ? `${(n*1000).toFixed(2)} µs` : `${n.toFixed(3)} ms`;

export default function App() {
  const [selected,setSelected]=useState("sum");
  const [size,setSize]=useState(50000);
  const [result,setResult]=useState(null);
  const [busy,setBusy]=useState(false);
  const [tab,setTab]=useState("compare");
  const current=examples[selected];

  function runBenchmark(){
    setBusy(true);
    setResult(null);
    // Let the UI update before running short, bounded benchmark tasks.
    setTimeout(()=>{
      try {
        const left=benchmark(current.left,size);
        const right=benchmark(current.right,size);
        setResult({left,right,score:scoreFor(left.average,right.average)});
      } finally { setBusy(false); }
    },30);
  }

  const chartData=useMemo(()=>result?[
    {name:current.leftName,time:Number(result.left.average.toFixed(4))},
    {name:current.rightName,time:Number(result.right.average.toFixed(4))}
  ]:[],[result,current]);
  const faster=result?(result.left.average<result.right.average?"left":"right"):null;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><Leaf size={21}/></div><div><b>GreenCode</b><small>SUSTAINABLE COMPUTING</small></div></div>
      <div className="side-label">WORKSPACE</div>
      <button className={tab==="compare"?"nav active":"nav"} onClick={()=>setTab("compare")}><Code2 size={18}/> Algorithm lab</button>
      <button className={tab==="insights"?"nav active":"nav"} onClick={()=>setTab("insights")}><BarChart3 size={18}/> Green insights</button>
      <div className="sidebar-bottom"><div className="leaf-card"><Leaf size={18}/><b>Small improvements matter.</b><p>Efficient code can reduce unnecessary computation.</p></div><small>GREENCODE · v1.0</small></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="mobile-brand"><Leaf size={20}/> GreenCode</div><span className="status"><span/> SYSTEM READY</span><span className="top-tag">Sustainable Coding Assistant</span></header>
      <section className="hero">
        <div className="eyebrow"><span/> SUSTAINABLE SOFTWARE ENGINEERING</div>
        <h1>Write smarter.<br/><em>Compute less.</em></h1>
        <p>Compare approaches, measure execution time, and learn how algorithm choices affect computational efficiency.</p>
        <div className="hero-pills"><span><Zap size={14}/> Performance-first</span><span><Leaf size={14}/> Resource-aware</span><span><Activity size={14}/> Data-informed</span></div>
      </section>

      {tab==="compare" ? <>
        <section className="section-head"><div><div className="eyebrow">01 / ALGORITHM LAB</div><h2>Compare two approaches</h2><p>Choose a problem and run a repeatable browser benchmark.</p></div><div className="live"><span/> READY TO RUN</div></section>
        <section className="panel controls">
          <label>PROBLEM TYPE<select value={selected} onChange={e=>{setSelected(e.target.value);setResult(null);}}>{Object.entries(examples).map(([key,v])=><option key={key} value={key}>{v.title}</option>)}</select></label>
          <label>INPUT SIZE <strong>{size.toLocaleString("en-IN")}</strong><input type="range" min="1000" max="100000" step="1000" value={size} onChange={e=>{setSize(Number(e.target.value));setResult(null);}}/><div className="range-labels"><span>1,000</span><span>100,000</span></div></label>
          <button className="run-button" onClick={runBenchmark} disabled={busy}>{busy?"Benchmarking…":<><Gauge size={17}/> Run comparison <ArrowRight size={16}/></>}</button>
          <p className="helper">Runs are performed locally in your browser. Avoid switching tabs during measurement for more consistent results.</p>
        </section>
        <div className="compare-grid">
          <article className="algorithm-card"><div className="card-top"><span className="number">A</span><span className="complexity">{current.leftComplexity}</span></div><h3>{current.leftName}</h3><p>{current.description}</p><div className="code-mini">{selected==="sum"?"for i in range(1, n+1):\n    total += i":selected==="search"?"for item in values:\n    if item == target:\n        return item":"for i in values:\n    for j in values:\n        compare(i, j)"}</div><div className="metric">{result?fmt(result.left.average):"—"}<small>AVERAGE TIME</small></div>{result&&faster==="left"&&<div className="winner"><CheckCircle2 size={14}/> Faster in this run</div>}</article>
          <div className="versus">VS</div>
          <article className="algorithm-card featured"><div className="card-top"><span className="number">B</span><span className="complexity">{current.rightComplexity}</span></div><h3>{current.rightName}</h3><p>{current.description}</p><div className="code-mini">{selected==="sum"?"total = n * (n + 1) // 2":selected==="search"?"while low <= high:\n    mid = (low + high) // 2":"seen = set()\nfor item in values:\n    if item in seen: ..."} </div><div className="metric">{result?fmt(result.right.average):"—"}<small>AVERAGE TIME</small></div>{result&&faster==="right"&&<div className="winner"><CheckCircle2 size={14}/> Faster in this run</div>}</article>
        </div>
        {result&&<section className="results">
          <div className="section-head"><div><div className="eyebrow">02 / RESULTS</div><h2>Performance snapshot</h2></div><span className="result-badge">BENCHMARK COMPLETE</span></div>
          <div className="stats-grid"><div className="stat"><small>APPROACH A · AVG</small><b>{fmt(result.left.average)}</b><span>Best {fmt(result.left.best)} · Worst {fmt(result.left.worst)}</span></div><div className="stat"><small>APPROACH B · AVG</small><b>{fmt(result.right.average)}</b><span>Best {fmt(result.right.best)} · Worst {fmt(result.right.worst)}</span></div><div className="stat green"><small>RELATIVE EFFICIENCY</small><b>{result.score}/100</b><span>Lower measured time gets higher score</span></div></div>
          <div className="panel chart-panel"><h3>Average execution time</h3><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{top:10,right:15,left:5,bottom:5}}><CartesianGrid strokeDasharray="3 3" stroke="#20352d"/><XAxis dataKey="name" stroke="#8ca398"/><YAxis stroke="#8ca398"/><Tooltip contentStyle={{background:"#10231b",border:"1px solid #294438",borderRadius:10}}/><Bar dataKey="time" fill="#65d69a" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div><small className="chart-note">Milliseconds; very short operations may be affected by browser timer precision.</small></div>
          <div className="insight"><Leaf size={19}/><div><b>{faster==="left"?current.leftName:current.rightName} was faster in this run.</b><p>Measured time is only one observation. Repeat on the same device and browser for a fairer comparison. Big-O describes growth as input size increases; it does not predict exact milliseconds.</p></div></div>
        </section>}
      </>:<section className="panel insights-page"><div className="eyebrow">GREEN INSIGHTS</div><h2>What sustainable code means</h2><p>Green software aims to minimize the resources required to deliver useful functionality. GreenCode focuses on computational efficiency as a practical learning signal.</p><div className="insight-list"><div><Cpu/><b>Choose suitable algorithms</b><p>Prefer an approach whose time complexity grows more slowly for the expected input sizes.</p></div><div><Activity/><b>Measure, don't assume</b><p>Benchmark under comparable conditions. Runtime changes with hardware, browser load, and input data.</p></div><div><Leaf/><b>Avoid unnecessary work</b><p>Reuse results when appropriate, reduce repeated calculations, and avoid needless allocations.</p></div></div><div className="notice"><b>Measurement honesty</b><p>This version measures browser execution time only. It does not measure electricity consumption, carbon emissions, or actual device energy use. The score is a relative performance indicator, not a carbon score.</p></div></section>}
      <footer><span>GREENCODE</span><span>Write Smarter. Compute Less. Code Sustainably.</span><span>Built for learning</span></footer>
    </main>
  </div>;
}