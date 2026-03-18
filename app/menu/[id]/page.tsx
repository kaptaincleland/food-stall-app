import { createClient } from '@/utils/supabase/server'
import FoodCard from '@/components/FoodCard'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetching menu items from db
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('category_slug', id) 
    .order('price', { ascending: false })

  //fetching extras for db
  const { data: extras, error: extrasError } = await supabase
    .from('category_extras')
    .select('food_extras(id,name,price)')
    .eq('category_slug', id)

  const availableExtras = extras? extras.map((e: any) => e.food_extras).filter(Boolean) .sort((a: any, b: any) => a.price - b.price): [];
  return (
    <main className="p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/menu" className="text-gray-400 font-body text-xs uppercase tracking-widest hover:text-orange-500 transition-colors">
          ← Back to Selection
        </Link>
        
        <h1 className="text-2xl lg:text-5xl font-heading font-bold uppercase mt-4 mb-10">
          Delicious <span className="text-orange-500">{id.replace('-', ' ')}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Only use ONE map here and pass the extras correctly */}
          {items?.map((item) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              dbExtras={availableExtras} 
            />
          ))}
        </div>
      </div>
    </main>
  )
}