"use client"
import Image from 'next/image'
import { useCartStore } from '../lib/store'

export default function FoodCard({ item }: { item: any }) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="group bg-white rounded-3xl overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-2">
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
            GH₵ {item.price}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="font-heading text-lg font-bold text-gray-800 uppercase leading-none mb-2">
          {item.name}
        </h3>
        <p className="font-body text-gray-500 text-sm line-clamp-2 mb-6">
          {item.description}
        </p>

        <button 
          onClick={() => addToCart(item)}
          className="w-full btn-primary py-4 text-sm tracking-widest"
        >
          Add to Plate
        </button>
      </div>
    </div>
  )
}