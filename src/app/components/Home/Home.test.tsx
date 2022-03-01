/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './Home'
import '@testing-library/jest-dom'
import { products } from '../Products/products-list'
import { BrowserRouter } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ productSlug: 'abito-alfa' }),
}))

describe('Home', () => {
  it('First two products are in page and in detail page too', () => {
    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(getByText(products[0].description)).toBeInTheDocument()
    expect(getByText(products[1].description)).toBeInTheDocument()

    fireEvent.click(getAllByText('Visualizza')[0])

    expect(getByText(products[0].description)).toBeInTheDocument()
  })
})
