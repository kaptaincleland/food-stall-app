import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

export default async function MenuPage() {
const supabase = await createClient()
  const { count: friedRiceCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('category_slug', 'fried-rice')
  const { count: jollofCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('category_slug', 'jollof')
  const { count: waakyeCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('category_slug', 'waakye')
  const { count: riceCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('category_slug', 'plain-rice')
  const { count: yamCount } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('category_slug', 'yam')

const categories = [
  { id: 'fried-rice', name: 'Fried Rice', image: '/images/fried-rice.jpg', count: friedRiceCount },
  { id: 'jollof', name: 'Jollof', image: '/images/jollof.jpg', count: jollofCount },
  { id: 'waakye', name: 'Waakye', image: '/images/wakye.jpg', count: waakyeCount },
  { id: 'plain-rice', name: 'Plain Rice', image: '/images/rice.jpg', count: riceCount },
  { id: 'yam', name: 'Yam', image: '/images/yam.jpg', count: yamCount },
]

  return (
    <main className="p-6 md:p-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 lg:mb-16">
          <h1 className="text-xl lg:text-5xl font-heading font-bold uppercase tracking-tighter text-gray-900 leading-none">
            What are you <br/> <span className="text-orange-500">Craving?</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/menu/${cat.id}`} 
              className="group relative h-80 rounded-3xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1"
            >
              {/* Background Image */}
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-8 left-8">
                <p className="font-body lg:text-sm text-orange-400 text-xs uppercase tracking-[0.2em] mb-1">
                  {cat.count} {cat.count === 1 ? 'Variety' : 'Varieties'}
                </p>
                <h2 className="text-2xl lg:text-5xl font-heading font-bold text-white uppercase tracking-tighter">
                  {cat.name}
                </h2>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
