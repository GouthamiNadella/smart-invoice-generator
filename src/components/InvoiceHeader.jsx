import { useEffect, useState } from "react";
import { Plus, Trash2, Download, Save, Eye, Calculator, User, Building } from 'lucide-react';

export default function InvoiceHeader () {

  return (
    <div className="mb-6 flex justify-between items-center">
      <h3 className="text-3xl font-bold text-gray-800"> 
        Smart Invoice Builder
      </h3>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          Preview
        </button>

        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Save size={16} />
          Save
        </button>
      </div>


    </div>
  );
}