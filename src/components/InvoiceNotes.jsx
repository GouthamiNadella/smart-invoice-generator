import React from 'react';
import { FileText } from 'lucide-react';

export default function InvoiceNotes({ notes, onChange }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800"> 
        <FileText size={22} className="text-gray-600" />
        Additional Notes
      </h3>

      <div>
        <textarea 
          className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[120px] resize-y placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          value={notes} 
          placeholder="Payment terms, additional information, or special instructions..."
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}