import React from 'react';
import { DollarSign } from 'lucide-react';

export default function InvoiceSummary({ taxRate, discountRate, onTaxChange, onDiscountChange, items }) {
  const subTotal = items.reduce((sum, item) => {
    return sum + ((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0));
  }, 0);

  const taxAmount = (subTotal * (parseFloat(taxRate) || 0)) / 100;
  const discountAmount = (subTotal * (parseFloat(discountRate) || 0)) / 100;
  const total = subTotal + taxAmount - discountAmount;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800"> 
        <DollarSign size={22} className="text-green-600" />
        Invoice Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Tax Rate (%)</label>
          <input 
            type="number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0"
            value={taxRate}
            onChange={(e) => onTaxChange(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Discount Rate (%)</label>
          <input 
            type="number" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="0"
            value={discountRate}
            onChange={(e) => onDiscountChange(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3 text-lg">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span className="font-medium">${subTotal.toFixed(2)}</span>
          </div>
          
          {taxRate > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Tax ({taxRate}%):</span>
              <span className="font-medium">${taxAmount.toFixed(2)}</span>
            </div>
          )}
          
          {discountRate > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount ({discountRate}%):</span>
              <span className="font-medium">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between font-bold text-2xl">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}