// Every product has its own unique picture (no repeats).
// To add a product: put the picture in public/images/products/ and add one line below.
// tone = colour family (themes use it to show matching pictures first): red, maroon, ivory, pastel, dark
const LIST = [
  ['p01', 'Ivory Gold Embroidered Kameez Set', 'Formals', 'ivory', 42000],
  ['p02', 'Lilac Net Embroidered Anarkali', 'Luxury Pret', 'pastel', 28500],
  ['p03', 'Red Bridal Dupatta & Sharara Set', 'Kashida Kari', 'red', 89000],
  ['p04', 'Maroon Velvet Gharara Suit', 'Formals', 'maroon', 56000],
  ['p05', 'Red Bridal Gharara Shirt', 'Formals', 'red', 74000],
  ['p06', 'Maroon Net & Jamawar Gharara', 'Formals', 'maroon', 68000],
  ['p07', 'Red Net Embroidered Sharara Set', 'Luxury Pret', 'red', 46000],
  ['p08', 'Red Zari Gharara Kameez', 'Kashida Kari', 'red', 79000],
  ['p09', 'Midnight Floral Organza Set', 'Luxury Pret', 'dark', 31500],
  ['p10', 'Plum Kurta with Embroidered Dupatta', 'Luxury Pret', 'maroon', 19500],
  ['p11', 'Powder Blue Embroidered Pret Set', 'Luxury Pret', 'pastel', 34000],
  ['p12', 'Rust Brown Embroidered Lawn Suit', 'Basics', 'ivory', 8900],
  ['p13', 'Black & White Embroidered Lawn Suit', 'Basics', 'dark', 9500],
  ['p14', 'Crimson Embroidered Winter Kurta Set', 'Luxury Pret', 'red', 23500],
  ['p15', 'Pink Floral Embroidered Festive Suit', 'Luxury Pret', 'pastel', 26500],
  ['p16', 'White Organza Dupatta Suit', 'Dupattas & Drapes', 'ivory', 21000],
  ['p17', 'Mocha Kurta & Trouser with Red Embroidery', 'Basics', 'ivory', 7500],
  ['p18', 'Taupe Cape Kurta Set', 'Luxury Pret', 'ivory', 24500],
  ['p19', 'Navy Floral Panel Shirt', 'Basics', 'dark', 5900],
  ['p20', 'Black Cotton Co-ord Shirt Set', 'Basics', 'dark', 6900],
  ['p21', 'Peach Embroidered Party Wear Set', 'Luxury Pret', 'pastel', 32000],
  ['p22', 'White Chikan Shirt with Ombre Dupatta', 'Chikan Kari', 'ivory', 15500],
  ['p23', 'Sky Blue Chikan Sharara Set', 'Chikan Kari', 'pastel', 17500],
  ['p24', 'Wine Net Embroidered Suit', 'Formals', 'maroon', 37500],
  ['p25', 'Teal Net Pant Suit', 'Formals', 'dark', 36000],
  ['p26', 'Teal Ombre Sharara Set', 'Luxury Pret', 'pastel', 29500],
  ['p27', 'Beige Drape Dress with Embroidered Jacket', 'Dupattas & Drapes', 'ivory', 27500],
  ['p28', 'Royal Blue Embroidered Suit', 'Formals', 'dark', 33500],
]
export const PRODUCTS = LIST.map(([id, name, cat, tone, price], n) => ({
  id: n + 1, n, cat, name, tone, price, img: '/images/products/' + id + '.jpg',
  old: n % 4 === 1 ? Math.round((price * 1.2) / 500) * 500 : null, tag: n % 4 === 1 ? 'Sale' : n % 9 === 0 ? 'New' : '',
}))
export const CATS = ['All', ...new Set(PRODUCTS.map((p) => p.cat))]
