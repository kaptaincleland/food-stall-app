// components/FoodCard.tsx
export default function FoodCard({ item }: { item: any }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <p className="text-orange-600 font-semibold mt-1">GH₵ {item.price}</p>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium">
        Add
      </button>
    </div>
  );
}