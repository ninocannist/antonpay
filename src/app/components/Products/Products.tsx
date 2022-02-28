import React from 'react'
import Product from '../Product/Product'
import { products } from './products-list'

export default function Products() {
  return (
    <div>
      {products.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
  )
}
