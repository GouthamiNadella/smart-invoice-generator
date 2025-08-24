import React from 'react';
import { FileText, Save, Check, Clock } from 'lucide-react';

export default function FilterModal({ isOpen, onClose, currentFilter, onFilterChange }) {
  if (!isOpen) return null;

  const filters = [
    { value: 'all', label: 'All Invoices', icon: FileText, color: 'text-gray-600' },
    { value: 'saved', label: 'Saved', icon: Save, color: 'text-blue-600' },
    { value: 'generated', label: 'Generated', icon: FileText, color: 'text-purple-600' },
    { value: 'paid', label: 'Paid', icon: Check, color: 'text-green-600' },
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filter Invoices</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.value}
                onClick={() => {
                  onFilterChange(filter.value);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  currentFilter === filter.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={filter.color} />
                <span className="font-medium">{filter.label}</span>
                {currentFilter === filter.value && (
                  <Check size={16} className="text-blue-600 ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}