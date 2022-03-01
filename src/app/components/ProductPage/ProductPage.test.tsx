/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ProductPage from './ProductPage'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ productSlug: 'abito-alfa' }),
}))

describe('ProductPage', () => {
  it('adds product amount to state when add to cart is clicked', () => {
    const { getByText } = render(<ProductPage />)

    expect(getByText(/Abito Alpha racchiude/i)).toBeInTheDocument()

    expect(getByText(/Aggiungi al carrello/i)).toBeInTheDocument()

    fireEvent.click(getByText('Aggiungi al carrello'))

    expect(getByText('Articolo aggiunto!')).toBeInTheDocument()
  })
})
