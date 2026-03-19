"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { ShoppingBag, Clock, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    // 1. Get IDs from local storage (we'll save them during checkout)
    const savedIds = JSON.parse(localStorage.getItem('my_orders') || '[]')
    
    const fetchMyOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .in('short_id', savedIds)
        .order('created_at', { ascending: false })
      if (data) setOrders(data)
    }

    fetchMyOrders()

    // 2. Listen for the Admin to mark them as "completed"
    const channel = supabase
      .channel('my-orders-status')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'orders' }, 
        (payload) => {
          setOrders((prev) => prev.map(o => o.id === payload.new.id ? payload.new : o))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <main className="max-w-md mx-auto p-6 pt-12 text-black">
      <Link href="/menu" className="flex items-center gap-2 mb-8 text-gray-400">
        <ArrowLeft size={18} /> <span className="text-[10px] font-bold uppercase tracking-widest">Back to Menu</span>
      </Link>

      <h1 className="font-heading text-3xl font-bold uppercase mb-8 italic">My <span className="text-orange-500">Orders</span></h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem]">
          <ShoppingBag className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 text-sm uppercase font-bold tracking-widest">No active orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-heading font-bold text-xl text-orange-500">{order.short_id}</span>
                <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                  order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {order.status === 'pending' ? <Clock size={12}/> : <CheckCircle2 size={12}/>}
                  {order.status === 'pending' ? 'Preparing...' : 'Ready for Pick-up!'}
                </div>
              </div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total: GH₵ {order.total_price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}