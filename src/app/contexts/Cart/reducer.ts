import { Product as ProductType } from '../../components/Products/products-list'
interface ProductWithQuantity {
  product: ProductType
  quantity: number
}
export interface CartState {
  total: number
  items: ProductWithQuantity[]
}

export const reducer = (
  state: CartState,
  action: { type: string; product: any }
) => {
  const existingItemIndex = (oldState: CartState, product: ProductType) => {
    return oldState.items.findIndex(
      (productWithQuantity: ProductWithQuantity) => {
        return product.slug === productWithQuantity.product.slug
      }
    )
  }
  const index = existingItemIndex(state, action.product)
  if (action.type === 'add_item') {
    if (index > -1) {
      const newItems = [...state.items]
      newItems[index] = {
        product: action.product,
        quantity: state.items[index].quantity + 1,
      }
      const newState = {
        ...state,
        total: state.total + action.product.price,
        items: [...newItems],
      }
      return newState
    } else {
      const newItems = [
        ...state.items,
        { product: action.product, quantity: 1 },
      ]
      const newState = {
        ...state,
        total: state.total + action.product.price,
        items: [...newItems],
      }
      return newState
    }
  }
  if (action.type === 'remove_item') {
    if (state.items[index].quantity > 1) {
      const newItems = [...state.items]
      newItems[index] = {
        product: action.product,
        quantity: state.items[index].quantity - 1,
      }
      const newState = {
        ...state,
        total: state.total - action.product.price,
        items: [...newItems],
      }
      return newState
    } else {
      const newItems = state.items
        .slice(0, index)
        .concat(state.items.slice(index + 1))
      const newState = {
        ...state,
        total: state.total - action.product.price,
        items: [...newItems],
      }
      return newState
    }
  }
  switch (action.type) {
    default:
      return state
  }
}

export const initialState = {
  total: 0,
  items: [],
}
