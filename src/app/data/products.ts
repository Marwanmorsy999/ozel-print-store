export interface PrintArea {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  collection: 'uniform' | 'summer-2026' | 'winter-2026' | 'feedback';
  category: string;
  images: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  material?: string;
  featured?: boolean;
  /** Print area as percentages of the product image (left, top, width, height) */
  printArea?: PrintArea;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1000&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    id: 'uniform-shirt-001',
    name: 'Classic Uniform Shirt',
    price: 450,
    description:
      'Premium cotton uniform shirt with precision tailoring. Made with good hands for professionals who demand excellence.',
    collection: 'uniform',
    category: 'Shirts',
    images: [img('1503341504253-dff4815485f1'), img('1602810318383-e386cc2a3ccf')],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' }
    ],
    featured: true
  },
  {
    id: 'uniform-pants-001',
    name: 'Professional Uniform Pants',
    price: 550,
    description:
      'Tailored uniform pants designed for comfort and durability. Perfect fit for the modern professional.',
    collection: 'uniform',
    category: 'Pants',
    images: [img('1473966968600-fa801b869a1a'), img('1542272604-787c3835535d')],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Navy', value: '#1e3a8a' }
    ],
    featured: true
  },
  {
    id: 'uniform-polo-001',
    name: 'Premium Polo Shirt',
    price: 380,
    description:
      'Elegant polo shirt with fine stitching. Perfect for business casual and service professionals.',
    collection: 'uniform',
    category: 'Shirts',
    images: [img('1626497764746-6dc36546b388'), img('1564584217132-2271feaeb3c5')],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' },
      { name: 'Burgundy', value: '#800020' }
    ]
  },
  {
    id: 'summer-tee-001',
    name: 'Summer Essential Tee',
    price: 280,
    description:
      'Breathable premium cotton tee. Perfect for Cairo summers. Minimalist design, maximum comfort.',
    collection: 'summer-2026',
    category: 'T-Shirts',
    images: [img('1521572163474-6864f9cf17ab'), img('1620799140408-edc6dcb6d633')],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Sand', value: '#C2B280' }
    ],
    featured: true
  },
  {
    id: 'summer-shorts-001',
    name: 'Premium Summer Shorts',
    price: 380,
    description:
      'Lightweight summer shorts crafted from premium materials. Streetwear meets comfort.',
    collection: 'summer-2026',
    category: 'Shorts',
    images: [img('1604644401890-0bd678c83788'), img('1620916566398-39f1143ab7be')],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Khaki', value: '#C3B091' },
      { name: 'Olive', value: '#556B2F' }
    ]
  },
  {
    id: 'summer-tank-001',
    name: 'Athletic Tank Top',
    price: 220,
    description:
      'Lightweight, moisture-wicking tank for the hottest days. Urban athletic style.',
    collection: 'summer-2026',
    category: 'T-Shirts',
    images: [img('1571945153237-4929e783af4a'), img('1578587018452-892bacefd3f2')],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Black', value: '#000000' },
      { name: 'Grey', value: '#808080' }
    ]
  },
  {
    id: 'winter-hoodie-001',
    name: 'Signature Hoodie',
    price: 680,
    description:
      'Premium heavyweight hoodie. ÖZEL signature piece. Made with good hands for those who appreciate quality.',
    collection: 'winter-2026',
    category: 'Hoodies',
    images: [img('1618354691373-d851c5c3a990'), img('1593030761757-71fae45fa0e7')],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Deep Red', value: '#8B0000' }
    ],
    featured: true
  },
  {
    id: 'winter-jacket-001',
    name: 'Urban Winter Jacket',
    price: 950,
    description:
      'Premium winter jacket combining style and functionality. Streetwear aesthetic with Egyptian craftsmanship.',
    collection: 'winter-2026',
    category: 'Jackets',
    images: [img('1551488831-00ddcb6c6bd3'), img('1591195853828-11db59a44f6b')],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' }
    ],
    featured: true
  },
  {
    id: 'winter-sweater-001',
    name: 'Minimalist Crewneck',
    price: 520,
    description:
      'Clean crewneck sweater in premium knit. Timeless design for cold Egyptian nights.',
    collection: 'winter-2026',
    category: 'Sweaters',
    images: [img('1544022613-e87ca75a784a'), img('1607345366928-199ea26cfe3e')],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Cream', value: '#FFFDD0' },
      { name: 'Charcoal', value: '#36454F' }
    ]
  },
  {
    id: 'winter-pants-001',
    name: 'Cargo Winter Pants',
    price: 620,
    description:
      'Functional cargo pants with modern streetwear cut. Multiple pockets, premium fabric.',
    collection: 'winter-2026',
    category: 'Pants',
    images: [img('1517445312882-bc9910d016b7'), img('1574180045827-681f8a1a9622')],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Olive', value: '#556B2F' },
      { name: 'Charcoal', value: '#36454F' }
    ]
  }
];
