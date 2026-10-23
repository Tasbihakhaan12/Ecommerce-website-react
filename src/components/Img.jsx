import { useState } from 'react'

// Shows a picture. If the file is missing, a placeholder box with the product name is shown.
export default function Img({ src, alt, className = '' }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div style={{ background: 'var(--card)' }} className="w-full h-full flex items-center justify-center text-xs opacity-60 p-2 text-center">{alt}</div>
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} className={'w-full h-full object-cover ' + className} />
}
