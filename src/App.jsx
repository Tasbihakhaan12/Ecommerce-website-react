import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Shop from './components/Shop.jsx'
import Cart from './components/Cart.jsx'
import Chat from './components/Chat.jsx'
import Footer from './components/Footer.jsx'
import Logo from './components/Logo.jsx'
import { THEMES, orderProducts } from './data/themes.js'
import { PRODUCTS } from './data/products.js'

function Splash({ theme, done }) {
  const [out, setOut] = useState(false)
  useEffect(() => { const a = setTimeout(() => setOut(true), 2000), b = setTimeout(done, 2700); return () => { clearTimeout(a); clearTimeout(b) } }, [])
  return (
    <div style={{ background: 'var(--bg)', opacity: out ? 0 : 1, transition: 'opacity .7s' }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <Logo theme={theme} size={90} showText={false} />
      <div style={{ fontFamily: theme.logo }} className="mt-6 text-3xl tracking-[0.3em]">VELVET ROOM</div>
      <div style={{ color: 'var(--soft)' }} className="mt-2 text-xs tracking-[0.5em] uppercase">{theme.tagline}</div>
    </div>
  )
}

export default function App() {
  const [themeKey, setTheme] = useState('red')
  const [cur, setCur] = useState('PKR')
  const [cat, setCat] = useState('All')
  const [query, setQuery] = useState('')
  const [splash, setSplash] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const theme = THEMES[themeKey]
  const products = useMemo(() => orderProducts(PRODUCTS, theme), [themeKey])
  const goShop = () => setTimeout(() => { const el = document.getElementById('shop'); el && el.scrollIntoView({ behavior: 'smooth' }) }, 50)
  const add = (p) => { setCart((c) => (c.find((x) => x.id === p.id) ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...p, qty: 1 }])); setCartOpen(true) }
  const change = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0))
  const count = cart.reduce((s, x) => s + x.qty, 0)
  const vars = { '--bg': theme.bg, '--card': theme.card, '--text': theme.text, '--accent': theme.accent, '--soft': theme.soft, '--line': theme.line, '--onAccent': theme.onAccent, background: theme.bg, color: theme.text, fontFamily: theme.body, minHeight: '100vh', transition: 'background .4s' }
  return (
    <div style={vars}>
      {splash && <Splash theme={theme} done={() => setSplash(false)} />}
      <Header theme={theme} themeKey={themeKey} setTheme={setTheme} cur={cur} setCur={setCur} count={count} openCart={() => setCartOpen(true)} setCat={setCat} query={query} setQuery={setQuery} goShop={goShop} />
      <Hero theme={theme} products={products} goShop={goShop} />
      <Shop theme={theme} products={products} cat={cat} setCat={setCat} query={query} setQuery={setQuery} cur={cur} add={add} />
      <section id="contact" className="px-4 md:px-10 py-10 text-center max-w-2xl mx-auto">
        <h2 style={{ fontFamily: theme.logo }} className="text-3xl font-bold">Have a Question?</h2>
        <p className="mt-3 opacity-80">Use the chat button in the bottom right corner to message us, or reach out to us on WhatsApp.</p>
      </section>
      <Footer theme={theme} setCat={setCat} goShop={goShop} />
      <Cart theme={theme} open={cartOpen} close={() => setCartOpen(false)} items={cart} change={change} cur={cur} />
      <Chat />
    </div>
  )
}
