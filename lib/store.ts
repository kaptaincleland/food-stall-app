import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  image_url?: string
  quantity: number
  category_slug: string
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (newItem) =>
        set((state) => {
          // Check if the exact same item (with same extras/name) exists
          const existingItemIndex = state.cart.findIndex(
            (item) => item.name === newItem.name && item.id === newItem.id
          )

          if (existingItemIndex > -1) {
            const newCart = [...state.cart]
            newCart[existingItemIndex].quantity += 1
            return { cart: newCart }
          }
          return { cart: [...state.cart, { ...newItem, quantity: 1 }] }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'food-stall-cart' } // This saves the cart in the browser's LocalStorage
  )
)