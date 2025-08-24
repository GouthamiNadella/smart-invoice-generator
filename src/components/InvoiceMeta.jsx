import React from 'react';
import { FileText } from 'lucide-react';

export default function InvoiceMeta({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Generate invoice number if not exists
  React.useEffect(() => {
    if (!data.invoiceNumber) {
      const invoiceNum = `INV-${Date.now().toString().slice(-6)}`;
      updateField('invoiceNumber', invoiceNum);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800"> 
        <FileText size={22} className="text-indigo-600" /> 
        Invoice Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Invoice Title</label>
          <input 
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Professional Services Invoice"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Invoice Number</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="INV-001"
            value={data.invoiceNumber || ''}
            onChange={(e) => updateField('invoiceNumber', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Invoice Date</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={data.invoiceDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => updateField('invoiceDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Due Date</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={data.dueDate || ''}
            onChange={(e) => updateField('dueDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}