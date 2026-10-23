// 5 THEMES - each theme has its own colours, fonts, copy and shows pictures of its own colour family first (tones)
export const THEMES = {
  red: {
    name: 'Velvet Red', icon: '🌹', dark: true,
    bg: '#16050a', card: '#26090f', text: '#fbeaea', accent: '#e11d48', soft: '#ff8fa3', line: 'rgba(255,255,255,.12)', onAccent: '#fff',
    body: "'Playfair Display',serif", logo: "'Cinzel',serif",
    tagline: 'Bridal & Festive Couture', announce: 'For custom orders, call or WhatsApp us: +92 1122233389',
    tones: ['red','maroon','dark','pastel','ivory'],
    slides: [
      { title: 'Velvet Nights', text: 'Bridal & festive couture' },
      { title: 'Red Bridal Gharara', text: 'Hand embroidered with zari & dabka' },
      { title: 'Shaadi Season', text: 'Barat, mehndi and walima edits' },
    ],
  },
  maroon: {
    name: 'Royal Maroon', icon: '🍷', dark: false,
    bg: '#ffffff', card: '#faf3f5', text: '#2b0a14', accent: '#8a0f3c', soft: '#8a0f3c', line: 'rgba(138,15,60,.2)', onAccent: '#fff',
    body: "'Cormorant Garamond',serif", logo: "'Playfair Display',serif",
    tagline: 'Luxury Pret & Formals', announce: 'For custom orders, call or WhatsApp us: +92 1122233389',
    tones: ['maroon','red','dark','ivory','pastel'],
    slides: [
      { title: 'A Saree, A Story', text: 'Maroon velvet and rich zari' },
      { title: 'Royal Formals', text: 'Heirloom embroidery, made to last' },
      { title: 'Kashida Kari', text: 'Every stitch made by hand' },
    ],
  },
  ivory: {
    name: 'Ivory Cream', icon: '🤍', dark: false,
    bg: '#fbf6ec', card: '#f3e9d6', text: '#3b2a17', accent: '#a8742a', soft: '#8a5a1d', line: 'rgba(120,80,30,.22)', onAccent: '#fff',
    body: "'Cormorant Garamond',serif", logo: "'Great Vibes',cursive",
    tagline: 'Soft Neutrals & Pastels', announce: 'Free delivery on orders above Rs 15,000',
    tones: ['ivory','pastel','maroon','red','dark'],
    slides: [
      { title: 'Ivory Elegance', text: 'Soft cream tones for day events' },
      { title: 'Nikkah Neutrals', text: 'Light, graceful and timeless' },
      { title: 'Chikan Kari', text: 'Airy fabrics, delicate threadwork' },
    ],
  },
  lilac: {
    name: 'Lilac Dream', icon: '💜', dark: false,
    bg: '#f7f2ff', card: '#ece2ff', text: '#2a1647', accent: '#7c3aed', soft: '#6d28d9', line: 'rgba(124,58,237,.22)', onAccent: '#fff',
    body: "'Poppins',sans-serif", logo: "'Dancing Script',cursive",
    tagline: 'Pastel Pret & Party Wear', announce: 'New lilac and pastel collection is live',
    tones: ['pastel','ivory','dark','maroon','red'],
    slides: [
      { title: 'Lilac Dreams', text: 'Net, organza and pearl details' },
      { title: 'Eid Pastels', text: 'Fresh colours for happy days' },
      { title: 'Party Pret', text: 'Light embroidery, easy to wear' },
    ],
  },
  gold: {
    name: 'Golden Night', icon: '👑', dark: true,
    bg: '#130f08', card: '#221a0d', text: '#f8efd9', accent: '#d4a62a', soft: '#f0cf72', line: 'rgba(240,207,114,.2)', onAccent: '#1a1306',
    body: "'Marcellus',serif", logo: "'Playfair Display',serif",
    tagline: 'Evening Wear & Statement Pieces', announce: 'Cash on Delivery available all over Pakistan',
    tones: ['dark','red','maroon','ivory','pastel'],
    slides: [
      { title: 'Golden Hour', text: 'Statement pieces for grand evenings' },
      { title: 'Luxury Formals', text: 'Gold work on rich fabrics' },
      { title: 'The Royal Edit', text: 'Dress like the main event' },
    ],
  },
}

export const CURRENCIES = {
  PKR: { rate: 1, sym: 'Rs ' }, USD: { rate: 0.0036, sym: '$' }, GBP: { rate: 0.0028, sym: '£' },
  EUR: { rate: 0.0033, sym: '€' }, CAD: { rate: 0.0049, sym: 'C$' }, AUD: { rate: 0.0055, sym: 'A$' },
  SAR: { rate: 0.0135, sym: 'SAR ' }, JPY: { rate: 0.54, sym: '¥' },
}
export const money = (pkr, cur) => CURRENCIES[cur].sym + Math.round(pkr * CURRENCIES[cur].rate).toLocaleString()

// Orders products for a theme: pictures matching the theme colour come first, the rest follow (no picture is repeated)
export const orderProducts = (list, theme) => [...list].sort((a, b) => theme.tones.indexOf(a.tone) - theme.tones.indexOf(b.tone) || a.n - b.n)
