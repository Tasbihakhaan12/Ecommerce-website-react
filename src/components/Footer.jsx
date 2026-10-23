import { useState } from 'react'
import Logo from './Logo.jsx'
import { CATS } from '../data/products.js'
import { WHATSAPP, EMAIL } from '../data/config.js'

const SOCIALS = [
  ['Instagram', 'https://www.instagram.com/shadowstack.tech'],
  ['LinkedIn', 'https://www.linkedin.com/in/tasbihazaman'],
  ['GitHub', 'https://tasbihakhaan12.github.io/Tasbihakhaan12/'],
  ['Freelancer', 'https://www.freelancer.com/u/Tasbihak2'],
]
const PERKS = [['🚚', 'Free Delivery', 'Orders above Rs 15,000'], ['↩', 'Easy Exchange', '7 days exchange policy'], ['🔒', 'Secure Payment', 'COD, bank & wallets'], ['💬', 'WhatsApp Support', 'Mon - Sat, 10am - 8pm']]

export default function Footer({ theme, setCat, goShop }) {
  const [mail, setMail] = useState('')
  const [sub, setSub] = useState(false)
  const h = { color: 'var(--soft)' }
  const hc = 'uppercase tracking-[0.3em] text-xs mb-4'
  const link = 'block text-sm opacity-80 hover:opacity-100 hover:underline mb-2 text-left'
  return (
    <footer style={{ background: 'var(--card)' }} className="mt-10 border-t line">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-4 border-b line">
        {PERKS.map(([i, t, s]) => <div key={t} className="flex items-center gap-3"><span style={{ borderColor: 'var(--accent)' }} className="w-11 h-11 border rounded-full flex items-center justify-center text-lg shrink-0">{i}</span><div><p className="text-sm font-semibold">{t}</p><p className="text-xs opacity-70">{s}</p></div></div>)}
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div><Logo theme={theme} size={46} /><p className="mt-4 text-sm opacity-75 max-w-xs">Bridal, formal and designer wear, thoughtfully crafted and delivered to your door.</p>
          <div className="flex flex-wrap gap-2 mt-5">{SOCIALS.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" style={{ borderColor: 'var(--accent)' }} className="px-3 py-1.5 border rounded-full text-xs hov">{n}</a>)}</div></div>
        <div><h4 style={h} className={hc}>Shop</h4>{CATS.slice(1).map((c) => <button key={c} onClick={() => { setCat(c); goShop() }} className={link}>{c}</button>)}</div>
        <div><h4 style={h} className={hc}>Customer Care</h4>{['Delivery & Shipping', 'Size Guide', 'Returns & Exchange', 'Custom Orders', 'Care Instructions', 'FAQs'].map((c) => <a key={c} href="#contact" className={link}>{c}</a>)}</div>
        <div><h4 style={h} className={hc}>Contact & Newsletter</h4>
          <a href={`mailto:${EMAIL}`} className={link}>✉ {EMAIL}</a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className={link}>💬 WhatsApp: +{WHATSAPP}</a>
          <p className="text-xs opacity-70 mb-2">Be the first to hear about new collections and offers.</p>
          {sub ? <p style={h} className="text-sm">Thank you for subscribing!</p> : (
            <div className="flex"><input value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Your email" style={{ background: 'var(--bg)', color: 'var(--text)' }} className="min-w-0 flex-1 px-3 py-2 text-sm outline-none rounded-l border line" /><button onClick={() => mail.includes('@') && setSub(true)} style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-4 text-sm rounded-r">Join</button></div>)}</div>
      </div>
      <div className="border-t line max-w-7xl mx-auto px-4 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-75">
        <span>© 2026 TS Velvet Room. All rights reserved.</span>
        <span>Cash on Delivery · Bank Transfer · Easypaisa · JazzCash · Visa · Mastercard</span>
        <a href="#home" className="uppercase tracking-widest hover:underline">Back to top ↑</a>
      </div>
    </footer>
  )
}
