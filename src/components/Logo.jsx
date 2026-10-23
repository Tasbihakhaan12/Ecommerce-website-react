export default function Logo({ theme, size = 40, showText = true }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div style={{ width: size, height: size, background: 'var(--accent)', color: 'var(--onAccent)', fontFamily: theme.logo, fontSize: size * 0.46 }} className="rounded-full flex items-center justify-center font-bold shrink-0">TS</div>
      {showText && (
        <div style={{ fontFamily: theme.logo, color: 'var(--text)' }} className="leading-none">
          <div style={{ fontSize: size * 0.5 }} className="font-bold tracking-wide">Velvet Room</div>
          <div style={{ fontSize: Math.max(8, size * 0.2), color: 'var(--soft)', fontFamily: theme.body }} className="tracking-[0.3em] uppercase mt-1">{theme.tagline}</div>
        </div>
      )}
    </div>
  )
}
