import Link from 'next/link'
import HomeCarousel from '@/components/HomeCarousel' // Import the new carousel

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/*image background with carousel*/}
      <HomeCarousel />
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center text-white">
        <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-2xl">
          K
        </div>
        
        <h1 className="text-7xl font-bold uppercase tracking-tighter">
          KAMARA's <span className="text-orange-400">Special</span>
        </h1>
        
        <p className="mt-4 text-xl font-medium max-w-sm uppercase italic text-gray-100">
          Authentic flavor, instant satisfaction. The best local dishes, cooked with love. Skip the Queue. 
        </p>
        
        <Link href="/menu" className="mt-10 btn-primary hover:btn-primary-hover px-12 py-5 text-xl">
          Order Now
        </Link>
      </div>
    </main>
  )
}