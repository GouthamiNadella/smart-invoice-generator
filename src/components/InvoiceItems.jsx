import React from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';

export default function InvoiceItems({ items, onChange }) {
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0,
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updatedItems);
  };

  const removeItem = (id) => {
    onChange(items.filter(item => item.id !== id));
  };

  const calculateAmount = (quantity, rate) => {
    return (parseFloat(quantity) || 0) * (parseFloat(rate) || 0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800"> 
        <Calculator size={22} className="text-purple-600" /> 
        Invoice Items
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-12 md:col-span-5">
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                />
              </div>

              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="col-span-4 md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Rate ($)</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="col-span-3 md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700">Amount ($)</label>
                <div className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 font-medium">
                  {calculateAmount(item.quantity, item.rate).toFixed(2)}
                </div>
              </div>

              <div className="col-span-1 md:col-span-1 flex items-end justify-center">
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={addItem}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all shadow-md"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>
    </div>
  );
}