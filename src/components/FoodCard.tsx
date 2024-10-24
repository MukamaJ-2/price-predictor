import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface FoodCardProps {
  food: FoodItem;
  quantity: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function FoodCard({ food, quantity, onAdd, onRemove }: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">{food.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">${food.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRemove(food.id)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={quantity === 0}
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => onAdd(food.id)}
              className="p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            >
              <Plus className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}