import { supabase } from '@/lib/db'
import FoodCard from '@/components/FoodCard'

export default async function MenuPage() {
  // Fetch data directly from Supabase
  const { data: menuItems, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)

  if (error) return <p>Error loading menu. Please try again.</p>

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mom's Kitchen 🍲</h1>
      
      <div className="grid gap-4">
        {menuItems?.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Floating Cart Button could go here */}
    </main>
  )
}