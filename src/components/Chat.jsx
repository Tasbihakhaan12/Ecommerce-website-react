import { useState, useEffect, useRef } from 'react'

const reply = (q) => {
  q = q.toLowerCase()
  if (q.includes('deliver') || q.includes('ship')) return 'We deliver across Pakistan within 3 to 5 working days.'
  if (q.includes('size')) return 'Sizes range from XS to XXL, and custom stitching is available for bridal outfits.'
  if (q.includes('bridal') || q.includes('order')) return 'For bridal orders, please message us on Instagram or email with your event date and preferred colour.'
  if (q.includes('price')) return 'Prices are listed on every product. Custom work is quoted separately.'
  return 'Thank you! We have received your message and our team will reply by email shortly.'
}

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [msgs, setMsgs] = useState([{ from: 'bot', t: 'Assalam o Alaikum! Welcome to TS Velvet Room. How can we help you today?' }])
  const end = useRef(null)
  useEffect(() => { end.current && end.current.scrollIntoView({ behavior: 'smooth' }) }, [msgs, open])
  const send = (t) => { t = t.trim(); if (!t) return; setMsgs((m) => [...m, { from: 'me', t }]); setText(''); setTimeout(() => setMsgs((m) => [...m, { from: 'bot', t: reply(t) }]), 600) }
  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <div style={{ background: 'var(--bg)' }} className="w-[88vw] max-w-sm h-[26rem] mb-3 rounded-lg border line shadow-2xl flex flex-col overflow-hidden">
          <div style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-4 py-3 font-semibold flex justify-between">TS Velvet Room Chat <button onClick={() => setOpen(false)}>×</button></div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {msgs.map((m, i) => <div key={i} className={m.from === 'me' ? 'text-right' : ''}><span style={{ background: m.from === 'me' ? 'var(--accent)' : 'var(--card)', color: m.from === 'me' ? 'var(--onAccent)' : 'var(--text)' }} className="inline-block px-3 py-2 rounded-lg max-w-[85%] text-left">{m.t}</span></div>)}
            <div ref={end} />
          </div>
          <div className="flex gap-1 px-2 flex-wrap">{['Delivery', 'Sizes', 'Bridal order'].map((q) => <button key={q} onClick={() => send(q)} style={{ borderColor: 'var(--accent)' }} className="text-xs border rounded-full px-2 py-1">{q}</button>)}</div>
          <div className="flex p-2 gap-2"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(text)} placeholder="Type your message..." style={{ background: 'var(--card)', color: 'var(--text)' }} className="flex-1 min-w-0 px-3 py-2 rounded outline-none text-sm" /><button onClick={() => send(text)} style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-4 rounded">Send</button></div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} aria-label="Chat" style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="w-14 h-14 rounded-full text-2xl shadow-xl ml-auto block">💬</button>
    </div>
  )
}
