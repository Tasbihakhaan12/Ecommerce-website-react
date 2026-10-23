import { useState, useEffect } from 'react'
import Img from './Img.jsx'
import { CATS } from '../data/products.js'
import { money } from '../data/themes.js'

export default function Shop({ theme, products, cat, setCat, query, setQuery, cur, add }) {
  const [n, setN] = useState(12)
  const [sort, setSort] = useState('')
  useEffect(() => setN(12), [cat, query, sort])
  let all = products.filter((p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(query.toLowerCase()))
  if (sort === 'low') all = [...all].sort((a, b) => a.price - b.price)
  if (sort === 'high') all = [...all].sort((a, b) => b.price - a.price)
  return (
    <section id="shop" className="px-4 md:px-10 py-14 max-w-7xl mx-auto">
      <h2 style={{ fontFamily: theme.logo }} className="text-3xl md:text-4xl text-center font-bold">Our Collections</h2>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {CATS.map((c) => <button key={c} onClick={() => setCat(c)} style={{ background: cat === c ? 'var(--accent)' : 'transparent', borderColor: 'var(--accent)', color: cat === c ? 'var(--onAccent)' : 'var(--text)' }} className="px-4 py-2 border text-xs tracking-widest uppercase rounded-full">{c}</button>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 text-sm">
        <span className="opacity-70">{all.length} products</span>
        <div className="flex gap-2">
          {query && <button onClick={() => setQuery('')} style={{ borderColor: 'var(--accent)' }} className="px-3 py-1 border rounded-full">Search: {query} ×</button>}
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: 'var(--card)', color: 'var(--text)' }} className="px-3 py-1 border line"><option value="">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
        {all.slice(0, n).map((p) => (
          <div key={p.id} style={{ background: 'var(--card)' }} className="group rounded-md overflow-hidden border line">
            <div className="relative aspect-[2/3] overflow-hidden">
              <Img src={p.img} alt={p.name} className="transition-transform duration-500 group-hover:scale-105" />
              {p.tag && <span style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="absolute top-2 left-2 text-[10px] uppercase tracking-widest px-2 py-1">{p.tag}</span>}
            </div>
            <div className="p-3 md:p-4">
              <p style={{ color: 'var(--soft)' }} className="text-[10px] uppercase tracking-[0.3em]">{p.cat}</p>
              <h3 className="mt-1 text-sm md:text-base font-semibold leading-snug">{p.name}</h3>
              <div className="flex items-center justify-between mt-3 gap-2">
                <div className="text-sm md:text-base">{p.old && <span className="line-through opacity-50 mr-2 text-xs">{money(p.old, cur)}</span>}{money(p.price, cur)}</div>
                <button onClick={() => add(p)} style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!all.length && <p className="text-center opacity-70 mt-10">No products found.</p>}
      {n < all.length && <div className="text-center mt-10"><button onClick={() => setN(n + 12)} style={{ borderColor: 'var(--accent)' }} className="px-8 py-3 border uppercase tracking-widest text-sm hov">Load More ({all.length - n})</button></div>}
    </section>
  )
}
