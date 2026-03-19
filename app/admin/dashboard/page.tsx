"use client"
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle2, Clock, Phone, Hash, Package, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // 1. Fetch initial orders from the database
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) console.error("Error fetching:", error)
      if (data) setOrders(data)
      setLoading(false)
    }

    fetchOrders()

    // 2. REAL-TIME: Listen for new orders as they are created
    const channel = supabase
      .channel('realtime-orders')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'orders' }, 
        (payload) => {
          console.log('NEW ORDER RECEIVED:', payload.new)
          setOrders((prev) => [payload.new, ...prev])
          // Optional: Add a sound notification here!
          new Audio('/notification.mp3').play().catch(() => {});
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          setOrders((prev) => prev.map(o => o.id === payload.new.id ? payload.new : o))
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)
    
    if (error) alert("Could not update status")
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="animate-spin text-orange-500" size={32} />
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 pb-24 text-black">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="font-heading text-4xl font-bold uppercase italic tracking-tighter">
            Live <span className="text-orange-500">Queue</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Stall Management</p>
        </div>
        <div className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
          {orders.filter(o => o.status === 'pending').length} Active
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <Package className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-400 uppercase font-bold tracking-widest text-sm">No orders yet</p>
          </div>
        )}

        {orders.map((order) => (
          <div 
            key={order.id} 
            className={`bg-white rounded-[2.5rem] p-8 shadow-sm border-2 transition-all duration-500 ${
              order.status === 'completed' ? 'opacity-40 grayscale border-transparent' : 'border-orange-100 shadow-orange-100/50'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-black text-white px-4 py-2 rounded-2xl flex items-center gap-2">
                <Hash size={16} className="text-orange-500" />
                <span className="font-heading font-bold text-xl">{order.short_id}</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
              }`}>
                {order.status}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-2xl uppercase leading-none mb-1">{order.customer_name}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm italic">
                <Phone size={12} />
                <span>{order.phone}</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 bg-gray-50 p-5 rounded-[1.5rem]">
              {order.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-700">
                    <span className="text-orange-500 mr-2">{item.quantity}x</span> 
                    {item.name}
                  </span>
                  <span className="text-gray-400 font-medium">GH₵{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Total Paid</span>
                <span className="font-heading font-bold text-lg text-black">GH₵{order.total_price}</span>
              </div>
            </div>

            {order.status === 'pending' ? (
              <button 
                onClick={() => updateStatus(order.id, 'completed')}
                className="w-full bg-black text-white py-4 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                <CheckCircle2 size={18} /> Mark as Ready
              </button>
            ) : (
              <div className="text-center py-2 text-green-600 font-bold uppercase text-[10px] tracking-[0.3em]">
                Order Collected
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}