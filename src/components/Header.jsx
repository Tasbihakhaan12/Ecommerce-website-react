import { useState } from 'react'
import Logo from './Logo.jsx'
import { THEMES, CURRENCIES } from '../data/themes.js'
import { CATS } from '../data/products.js'

// Theme switcher list - used in both the header menu and the sidebar
function ThemeList({ themeKey, setTheme }) {
  return Object.entries(THEMES).map(([k, v]) => (
    <button key={k} onClick={() => setTheme(k)} style={{ background: k === themeKey ? 'var(--accent)' : 'transparent', color: k === themeKey ? 'var(--onAccent)' : 'var(--text)', fontFamily: v.body }} className="w-full flex items-center gap-3 px-3 py-2 rounded text-left hov">
      <span>{v.icon}</span>{v.name}
    </button>
  ))
}

export default function Header({ theme, themeKey, setTheme, cur, setCur, count, openCart, setCat, query, setQuery, goShop }) {
  const [side, setSide] = useState(false)
  const [search, setSearch] = useState(false)
  const [col, setCol] = useState(true)
  const [pick, setPick] = useState(false)
  const pickCat = (c) => { setCat(c); setSide(false); goShop() }
  const doSearch = (e) => { e.preventDefault(); setSearch(false); setSide(false); goShop() }
  const icon = 'w-10 h-10 flex items-center justify-center text-xl hov rounded-full'

  return (
    <>
      <div style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="text-center text-[11px] md:text-xs py-2 px-3 tracking-wider">{theme.announce}</div>
      <header style={{ background: 'var(--bg)' }} className="sticky top-0 z-30 border-b line">
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-2 flex items-center justify-between">
          <button onClick={() => setSide(true)} aria-label="Menu" className={icon}>☰</button>
          <a href="#home" className="absolute left-1/2 -translate-x-1/2"><Logo theme={theme} size={38} /></a>
          <div className="flex items-center gap-1 relative">
            <button onClick={() => setPick(!pick)} aria-label="Change theme" title="Change theme" className={icon}>🎨</button>
            {pick && (
              <div style={{ background: 'var(--card)' }} className="absolute right-0 top-12 w-52 rounded-lg border line shadow-2xl p-2 z-50"><ThemeList themeKey={themeKey} setTheme={(k) => { setTheme(k); setPick(false) }} /></div>
            )}
            <button onClick={() => setSearch(true)} aria-label="Search" className={icon}>🔍</button>
            <select value={cur} onChange={(e) => setCur(e.target.value)} aria-label="Currency" style={{ background: 'transparent', color: 'var(--text)' }} className="hidden sm:block text-xs outline-none cursor-pointer">
              {Object.keys(CURRENCIES).map((c) => <option key={c} value={c} style={{ color: '#000' }}>{c}</option>)}
            </select>
            <button onClick={openCart} aria-label="Cart" className={icon + ' relative'}>🛍<span style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="absolute -top-0.5 -right-0.5 text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center">{count}</span></button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {search && (
        <div style={{ background: 'var(--bg)' }} className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <button onClick={() => setSearch(false)} className="absolute top-5 right-5 text-3xl" aria-label="Close">×</button>
          <form onSubmit={doSearch} className="flex w-full max-w-lg">
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our store" style={{ background: 'var(--card)', color: 'var(--text)' }} className="flex-1 px-4 py-3 outline-none border line" />
            <button style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-6">Search</button>
          </form>
        </div>
      )}

      {/* Sidebar menu (hamburger toggle) */}
      {side && <div onClick={() => setSide(false)} className="fixed inset-0 bg-black/60 z-40" />}
      <aside style={{ background: 'var(--bg)', transform: side ? 'none' : 'translateX(-100%)', transition: 'transform .3s' }} className="fixed top-0 left-0 h-full w-72 max-w-[85vw] z-50 border-r line flex flex-col overflow-y-auto">
        <div className="p-4 flex items-center justify-between border-b line"><Logo theme={theme} size={34} showText={false} /><button onClick={() => setSide(false)} className="text-2xl" aria-label="Close menu">×</button></div>
        <form onSubmit={doSearch} className="p-4 flex"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our store" style={{ background: 'var(--card)', color: 'var(--text)' }} className="min-w-0 flex-1 px-3 py-2 text-sm outline-none border line" /><button style={{ background: 'var(--accent)', color: 'var(--onAccent)' }} className="px-3">🔍</button></form>
        <nav className="px-4 pb-4 text-sm uppercase tracking-widest">
          <a href="#home" onClick={() => setSide(false)} className="block py-3 border-b line">Home</a>
          <button onClick={() => setCol(!col)} className="w-full flex justify-between py-3 border-b line uppercase tracking-widest">Collections <span>{col ? '−' : '+'}</span></button>
          {col && <div className="pl-3 normal-case tracking-normal">{CATS.map((c) => <button key={c} onClick={() => pickCat(c)} className="block w-full text-left py-2 opacity-80 hover:opacity-100">{c}</button>)}</div>}
          <a href="#contact" onClick={() => setSide(false)} className="block py-3 border-b line">Contact</a>
        </nav>
        <div className="px-4 pb-4 normal-case">
          <p style={{ color: 'var(--soft)' }} className="text-xs uppercase tracking-[0.3em] mb-2">Theme</p>
          <ThemeList themeKey={themeKey} setTheme={setTheme} />
          <p style={{ color: 'var(--soft)' }} className="text-xs uppercase tracking-[0.3em] mt-4 mb-2">Currency</p>
          <select value={cur} onChange={(e) => setCur(e.target.value)} style={{ background: 'var(--card)', color: 'var(--text)' }} className="w-full px-3 py-2 text-sm border line">{Object.keys(CURRENCIES).map((c) => <option key={c}>{c}</option>)}</select>
        </div>
      </aside>
    </>
  )
}
