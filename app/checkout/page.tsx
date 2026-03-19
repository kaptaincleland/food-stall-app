"use client"
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client' 
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Trash2, ArrowLeft, ShoppingBag, User, Phone, Wallet, CheckCircle2 } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState<{id: string, shortId: string} | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    payment: 'Cash on Delivery'
  })

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number!")
      return
    }

    setLoading(true)

    // 1. Generate a simple short ID (e.g., FS-42)
    const shortId = `FS-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Save to Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: formData.name,
          phone: formData.phone,
          items: cart,
          total_price: totalPrice,
          payment_method: formData.payment,
          short_id: shortId,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error(error)
      alert("Something went wrong saving your order.")
      setLoading(false)
      return
    }

    // 3. Success! Show the Order ID
    setOrderComplete({ id: data[0].id, shortId: shortId })
    clearCart()
    setLoading(false)
    
    if (data) {
  const newOrder = data[0];
  // Save to local storage so they can find it on the "My Orders" page
  const existingOrders = JSON.parse(localStorage.getItem('my_orders') || '[]')
  localStorage.setItem('my_orders', JSON.stringify([newOrder.short_id, ...existingOrders]))
  
  setOrderComplete({ id: newOrder.id, shortId: shortId })
  clearCart()
}
  }

  // --- Success View ---
  if (orderComplete) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in text-black">
      <CheckCircle2 size={80} className="text-green-500 mb-6" />
      <h1 className="font-heading text-4xl font-bold uppercase mb-2 italic">Order <span className="text-orange-500">Placed!</span></h1>
      
      <div className="bg-black text-white px-10 py-6 rounded-3xl my-8 shadow-2xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Your ID</p>
        <p className="text-5xl font-heading font-bold text-orange-500">{orderComplete.shortId}</p>
      </div>

      <div className="flex flex-col w-full max-w-xs gap-4">
        <Link href="/orders" className="bg-orange-500 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg">
          Track My Order Live
        </Link>
        <Link href="/menu" className="bg-gray-100 text-gray-500 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs">
          Order More Food
        </Link>
      </div>
    </div>
  )
}
  // --- Empty Cart View ---
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-2 uppercase text-black">Your plate is empty</h1>
        <p className="text-gray-500 mb-8">Go back to the menu to add some food!</p>
        <Link href="/menu" className="bg-black text-white px-8 py-4 rounded-2xl uppercase tracking-widest text-xs font-bold">
          Go back to Menu
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6 pt-12 pb-24">
      <div className="flex items-center justify-between mb-10">
        <Link href="/menu" className="flex items-center gap-2 text-gray-400 hover:text-black">
          <ArrowLeft size={18} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Back to Selection</span>
        </Link>
        <button
          onClick={() => confirm("Empty your plate?") && clearCart()}
          className="text-red-400 hover:text-red-600"
          aria-label="Empty your plate"
          title="Empty your plate"
        >
          <Trash2 size={18} />
          <span className="sr-only">Empty your plate</span>
        </button>
      </div>

      <h1 className="font-heading text-4xl font-bold uppercase mb-8 italic">Review <span className="text-orange-500">Plate</span></h1>
      <section className="bg-white rounded-3xl border border-gray-100 p-6 mb-8 shadow-sm">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm uppercase">{item.name}</h3>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">GH₵ {item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-dashed mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-xl text-orange-600">GH₵ {totalPrice}</span>
        </div>
      </section>
      <section className="bg-white rounded-3xl border border-gray-100 p-6 mb-8 shadow-sm space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Customer Info</h2>
        
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="text" 
            placeholder="Your Name"
            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            type="tel" 
            placeholder="Phone Number"
            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </section>
      <button 
        onClick={handleSubmitOrder}
        disabled={loading}
        className={`w-full bg-black text-white py-5 rounded-3xl uppercase tracking-[0.3em] font-bold text-sm shadow-xl ${loading ? 'opacity-50' : 'hover:bg-orange-600'}`}
      >
        {loading ? 'Submitting Order...' : 'Confirm Order & Get ID'}
      </button>
    </main>
  )
}