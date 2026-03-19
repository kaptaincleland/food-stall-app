"use client"
import Image from 'next/image'
import { useCartStore } from '../lib/store'
import { useState } from 'react'

export default function FoodCard({ item,dbExtras }: { item: any, dbExtras: any[] }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [customPrice, setCustomPrice] = useState(item.price || 10)
  const [isAdding, setIsAdding] = useState(false)
  const [showAllExtras, setShowAllExtras] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])

  const extrasTotal = selectedExtras.reduce((total, id) => {
    const extra = dbExtras.find(e => e.id === id)
    return total + (extra?.price || 0)
  }, 0)
  const finalPrice = (item.is_flexible ? customPrice : item.price) + extrasTotal

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    const extraNames = selectedExtras
    .map(id => dbExtras.find(e => e.id === id)?.name)
    .filter(Boolean)
    const displayName = `${item.name}${extraNames.length > 0 ? ` (${extraNames.join(', ')})` : ''}`
    addToCart({ 
      ...item, 
      price: finalPrice,
      name: displayName
    })
    setTimeout(() => setIsAdding(false), 1000) 
  }
  return (
    <div className="group bg-white rounded-3xl overflow-x-hidden card-shadow transition-all duration-300 hover:-translate-y-2">
      {/* Food Image Container */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={item.image_url || '/images/placeholder.jpg'} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="font-heading font-bold text-orange-600">
            GH₵ {finalPrice}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-gray-800 uppercase mb-1">{item.name}</h3>
        <p className="font-body text-gray-500 text-xs mb-6">{item.description}</p>

        {/* --- waakye--- */}
        {item.is_flexible && (
          <div className="mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block mb-3">Base Food Amount</span>
            <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm">
              <button type='button' className="h-8 w-8 rounded-lg bg-orange-500 text-white font-bold" 
                onClick={() => setCustomPrice((prev: number) => Math.max(item.price, prev - 1))}>-</button>
              <span className="font-heading font-bold text-lg text-gray-700">GH₵ {customPrice}</span>
              <button type="button" className="h-8 w-8 rounded-lg bg-orange-500 text-white font-bold"
                onClick={() => setCustomPrice((prev: number) => Math.min(item.max_price, prev + 1))}>+</button>
            </div>
          </div>
        )}

        {/* --- extras --- */}
      {(!item.category_slug.includes('waakye-main')) && dbExtras && dbExtras.length > 0 && (
        <div className="relative mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-4 text-center">
            Add Toppings
          </span>

          {/* 1. The Scroll/Height Container */}
          <div 
            className={`space-y-3 transition-all duration-500 overflow-hidden ${
              showAllExtras ? 'max-h-[1000px]' : 'max-h-48'
            }`}
          >
            {dbExtras.map((availableExtra) => (
              <label key={availableExtra.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedExtras.includes(availableExtra.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                    {selectedExtras.includes(availableExtra.id) && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedExtras.includes(availableExtra.id)}
                    onChange={() => toggleExtra(availableExtra.id)}
                  />
                  <span className={`text-sm font-body ${selectedExtras.includes(availableExtra.id) ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                    {availableExtra.name}
                  </span>
                </div>
                <span className="text-[11px] font-heading text-orange-600">+ GH₵ {availableExtra.price}</span>
              </label>
            ))}
          </div>

          {/* 2. The Gradient Overlay & Toggle Button */}
          {dbExtras.length > 4 && !showAllExtras && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-2">
              <button 
                type="button"
                onClick={() => setShowAllExtras(true)}
                className="btn-primary px-4 py-1.5  text-[10px] transition-colors"
              >
                Show more
              </button>
            </div>
          )}
          {showAllExtras && (
            <div className="flex justify-center mt-4">
              <button 
                type="button"
                onClick={() => setShowAllExtras(false)}
                className="px-4 py-1.5  text-[10px] btn-primary uppercase tracking-widest"
              >
                Show Less ↑
              </button>
            </div>
          )}
        </div>
      )}
        <button 
          onClick={handleAddToCart}
          className={`w-full btn-primary uppercase tracking-widest py-3 text-sm transition-all shadow-lg ${
            isAdding ? 'opacity-70 grayscale cursor-not-allowed' :  'active:scale-95'
          }`}
        >
          {isAdding ? 'Successfully Added!' : 'Add to Plate'}
        </button>
      </div>
    </div>)
}