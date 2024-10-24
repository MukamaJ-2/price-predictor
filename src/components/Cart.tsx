import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface CartProps {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onCheckout: () => void;
}

export default function Cart({ items, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-gray-800">Your Order</span>
        </div>
        <span className="text-sm text-gray-600">{items.length} items</span>
      </div>
      
      <div className="max-h-48 overflow-auto mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              {item.quantity}x {item.name}
            </span>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-green-600">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}