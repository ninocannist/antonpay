export interface Product {
  name: string
  price: number
  description: string
  image: string
  slug: string
  category: 'clothes' | 'accessories'
  currency: 'EUR' | 'USD'
  sku: string
}

export const products: Product[] = [
  {
    name: 'Abito Alpha',
    price: 12750,
    currency: 'EUR',
    description:
      'Abito Alpha racchiude la semplicita e la bellezza con pregiati materiali di alta classe.',
    image:
      'https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    slug: 'abito-alfa',
    category: 'clothes',
    sku: 'Bor/L/Lea/Gre',
  },
  {
    name: 'Borsa Beta',
    price: 6430,
    currency: 'EUR',
    description: 'Una borsa per portare ogni vostro accessorio con eleganza',
    image:
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3871&q=80',
    slug: 'borsa-beta',
    category: 'accessories',
    sku: 'Abi/58/Cot/Gre',
  },
]
