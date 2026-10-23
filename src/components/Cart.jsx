import { useState, useEffect } from 'react'
import Img from './Img.jsx'
import { money } from '../data/themes.js'
import { WHATSAPP, EMAIL } from '../data/config.js'

export default function Cart({ theme, open, close, items, change, cur }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [done, setDone] = useState(null) // holds the order details once an order has been placed
  const [err, setErr] = useState('')
  const total = items.reduce((s, x) => s + x.price * x.qty, 0)
  const btn = 'w-7 h-7 border line rounded'
  const field = { background: 'var(--card)', color: 'var(--text)' }

  // clear the old confirmation message when a new item is added
  useEffect(() => { if (items.length) setDone(null) }, [items.length])

  // Order text sent through WhatsApp / email (prices are always in PKR)
  const orderText = () => {
    const lines = items.map((x, i) => `${i + 1}. ${x.name} x ${x.qty} = ${money(x.price * x.qty, 'PKR')}`)
    return `New Order - TS Velvet Room\n\n${lines.join('\n')}\n\nTotal: ${money(total, 'PKR')}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}`
  }
  const place = (how) => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return setErr('Please enter your name, phone number and address.')
    setErr('')
    const text = orderText()
    const url = how === 'wa' ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}` : `mailto:${EMAIL}?subject=${encodeURIComponent('New Order - TS Velvet Room')}&body=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    setDone({ text })
    items.forEach((x) => change(x.id, -x.qty))
  }

  return (
    <>
      {open && <div onClick={close} className="fixed inset-0 bg-black/60 z-40" />}
      <aside style={{ background: 'var(--bg)', transform: open ? 'none' : 'translateX(100%)', transition: 'transform .3s' }} className="fixed top-0 right-0 h-full w-full max-w-sm z-50 border-l line flex flex-col">
        <div className="p-4 flex items-center justify-between border-b line"><h3 className="text-xl font-bold">Your Cart</h3><button onClick={close} className="text-2xl" aria-label="Close cart">×</button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {done && (
            <div style={{ background: 'var(--card)' }} className="p-3 rounded text-sm">
              <p style={{ color: 'var(--soft)' }} className="font-semibold">Thank you! Your order is ready to send.</p>
              <p className="mt-1 opacity-80">If WhatsApp or your email app did not open, copy the order details below and send them to us.</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">{done.text}</pre>
              <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(done.text)} style={{ borderColor: 'var(--accent)' }} className="mt-2 px-3 py-1 border rounded text-xs">Copy</button>
            </div>
          )}
          {!items.length && !done && <p className="opacity-70">Your cart is empty.</p>}
          {items.map((x) => (
            <div key={x.id} style={{ background: 'var(--card)' }} className="flex gap-3 p-2 rounded">
              <div className="w-16 h-24 rounded overflow-hidden shrink-0"><Img src={x.img} alt={x.name} /></div>
              <div className="flex-1 text-sm"><p className="font-semibold">{x.name}</p><p className="opacity-80">{money(x.price, cur)}</p>
                <div className="flex items-center gap-2 mt-1"><button onClick={() => change(x.id, -1)} className={btn}>-</button><span>{x.qty}</span><button onClick={() => change(x.id, 1)} className={btn}>+</button></div></div>
            </div>
          ))}
          {items.length > 0 && (
            <div className="space-y-2 pt-2">
              <p style={{ color: 'var(--soft)' }} className="text-xs uppercase tracking-[0.3em]">Delivery details</p>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={field} className="w-full px-3 py-2 text-sm outline-none border line" />
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone / WhatsApp number" style={field} className="w-full px-3 py-2 text-sm outline-none border line" />
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" rows={2} style={field} className="w-full px-3 py-2 text-sm outline-none border line" />
              {err && <p className="text-xs text-red-400">{err}</p>}
            </div>
          )}
        </div>
        <div className="p-4 border-t line">
          <div className="flex justify-between mb-3 font-semibold"><span>Total</span><span>{money(total, cur)}</span></div>
          <button disabled={!items.length} onClick={() => place('wa')} style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="w-full py-3 uppercase tracking-widest text-sm disabled:opacity-40">Order on WhatsApp</button>
          <button disabled={!items.length} onClick={() => place('mail')} style={{ borderColor: 'var(--accent)' }} className="w-full py-2.5 mt-2 border uppercase tracking-widest text-xs disabled:opacity-40">Send order by Email</button>
        </div>
      </aside>
    </>
  )
}
