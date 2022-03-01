/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import Cart from './Cart'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ productSlug: 'abito-alfa' }),
}))

describe('Cart', () => {
  it('First two products are in page and in detail page too', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )

    expect(getByText(/TOTALE/i)).toBeInTheDocument()
    expect(document.getElementsByClassName('total')[0]).toBeInTheDocument()
  })
})
