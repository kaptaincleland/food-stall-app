import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image_url?: string
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: any) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (item) => {
    const currentCart = get().cart
    const existingItem = currentCart.find((i) => i.id === item.id)

    if (existingItem) {
      set({
        cart: currentCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ cart: [...currentCart, { ...item, quantity: 1 }] })
    }
  },

  removeFromCart: (id) => {
    const currentCart = get().cart
    const item = currentCart.find((i) => i.id === id)
    
    if (item && item.quantity > 1) {
      set({
        cart: currentCart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      })
    } else {
      set({ cart: currentCart.filter((i) => i.id !== id) })
    }
  },

  clearCart: () => set({ cart: [] }),

  totalPrice: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))