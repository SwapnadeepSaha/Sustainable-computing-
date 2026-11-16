export const examples = {
  sum: {
    title: "Sum from 1 to N",
    description: "Compare repeated addition with a constant-time formula.",
    leftName: "Repeated addition",
    rightName: "Mathematical formula",
    leftComplexity: "O(n)",
    rightComplexity: "O(1)",
    left: (n) => { let total = 0; for (let i = 1; i <= n; i++) total += i; return total; },
    right: (n) => n * (n + 1) / 2
  },
  search: {
    title: "Search in sorted data",
    description: "Compare checking every element with binary search.",
    leftName: "Linear search",
    rightName: "Binary search",
    leftComplexity: "O(n)",
    rightComplexity: "O(log n)",
    left: (n) => { const a = Array.from({length:n}, (_,i)=>i); let found=-1; for(let i=0;i<a.length;i++){if(a[i]===n-1){found=a[i];break;}} return found; },
    right: (n) => { const a = Array.from({length:n}, (_,i)=>i); let lo=0,hi=a.length-1; while(lo<=hi){const mid=Math.floor((lo+hi)/2);if(a[mid]===n-1)return a[mid];if(a[mid]<n-1)lo=mid+1;else hi=mid-1;} return -1; }
  },
  duplicates: {
    title: "Find duplicates",
    description: "Compare nested-loop checking with a Set-based approach.",
    leftName: "Nested loops",
    rightName: "Set lookup",
    leftComplexity: "O(n²)",
    rightComplexity: "O(n) average",
    left: (n) => { const a=Array.from({length:n},(_,i)=>i%Math.max(1,Math.floor(n/2))); let count=0; for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]===a[j])count++; return count; },
    right: (n) => { const a=Array.from({length:n},(_,i)=>i%Math.max(1,Math.floor(n/2))); const seen=new Set();let count=0;for(const x of a){if(seen.has(x))count++;else seen.add(x);}return count; }
  }
};

export function benchmark(fn, input, runs=5) {
  const samples=[];
  for(let i=0;i<2;i++) fn(input); // warm-up
  for(let i=0;i<runs;i++){
    const start=performance.now();
    fn(input);
    samples.push(performance.now()-start);
  }
  return {
    average: samples.reduce((a,b)=>a+b,0)/samples.length,
    best: Math.min(...samples),
    worst: Math.max(...samples),
    samples
  };
}

export function scoreFor(a,b) {
  const ratio = Math.min(a,b) / Math.max(a,b,0.000001);
  return Math.round(50 + ratio * 50);
}