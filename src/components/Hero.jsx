import { useState, useEffect } from 'react'
import Img from './Img.jsx'

export default function Hero({ theme, products, goShop }) {
  const [i, setI] = useState(0)
  const n = theme.slides.length
  const go = (d) => setI((x) => (x + d + n) % n)
  useEffect(() => { const t = setTimeout(() => go(1), 6000); return () => clearTimeout(t) }, [i])
  useEffect(() => setI(0), [theme])
  const s = theme.slides[i]
  const pics = [products[(i * 2) % products.length].img, products[(i * 2 + 1) % products.length].img]
  return (
    <section id="home" className="px-4 md:px-10 py-10 grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
      <div>
        <p style={{ color: 'var(--soft)' }} className="tracking-[0.4em] text-xs uppercase mb-3">New Collection</p>
        <h1 style={{ fontFamily: theme.logo }} className="text-4xl md:text-6xl font-bold leading-tight">{s.title}</h1>
        <p className="mt-4 opacity-80 text-lg">{s.text}</p>
        <button onClick={goShop} style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="mt-6 px-8 py-3 tracking-widest text-sm uppercase hover:opacity-90">Shop Now</button>
        <div className="flex items-center gap-2 mt-8">
          <button onClick={() => go(-1)} aria-label="Previous" style={{ borderColor: 'var(--accent)' }} className="w-11 h-11 border rounded-full text-2xl leading-none hov">‹</button>
          <button onClick={() => go(1)} aria-label="Next" style={{ borderColor: 'var(--accent)' }} className="w-11 h-11 border rounded-full text-2xl leading-none hov">›</button>
          <div className="flex gap-2 ml-3">{theme.slides.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={'Slide ' + (k + 1)} style={{ background: k === i ? 'var(--accent)' : 'var(--line)' }} className="w-2.5 h-2.5 rounded-full" />)}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pics.map((p, k) => (
          <div key={p} style={{ marginTop: k ? '2rem' : 0, background: 'var(--card)' }} className="aspect-[2/3] rounded-md overflow-hidden border line shadow-xl"><Img src={p} alt={s.title} /></div>
        ))}
      </div>
    </section>
  )
}
