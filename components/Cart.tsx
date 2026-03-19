"use client"
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBasket, Trash } from 'lucide-react'

export default function Cart() {
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const pathname = usePathname()

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (totalItems === 0 || pathname === '/' || pathname === '/menu' || pathname ==='/checkout') return null

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault
    if (confirm("Are you sure you want to clear your plate?")) {
      clearCart()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-300">
      <div className="flex items-stretch bg-black text-white rounded-3xl shadow-2xl borer border-white/20 overflow-hidden">
        <button 
          onClick={handleClear}
          className="px-4 flex items-center justify-center bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all border-r border-white/10"
          title="Clear Plate"
        >
          <Trash size={18} />
        </button>
      <Link 
        href="/checkout" 
        className="flex items-center gap-3 p-3 md:p-3 hover:bg-orange-600 transition-all active:scale-95"
      >
        <div className="relative bg-orange-500 p-2 md:p3 rounded-2xl group-hover:bg-white transition-colors">
          <ShoppingBasket size={20} className="text-white" />
          <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
            {totalItems}
          </span>
        </div>
          <div className="pr-2">
            <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold leading-none mb-1">Your Plate</p>
            <p className="font-heading font-bold text-lg leading-none">GH₵ {totalPrice}</p>
          </div>
          <div className="hidden md:block border-l border-white/10 pl-3 ml-1 ">
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">
              Check Out →
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}