import React from 'react';
import { User } from 'lucide-react';

export default function InvoiceClientInfo({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800"> 
        <User size={22} className="text-green-600" /> 
        Client Information
      </h3>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Client Name</label>
          <input 
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter client name"
            value={data.clientName || ''}
            onChange={(e) => updateField('clientName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="client@example.com"
            value={data.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-700">Client Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">Street Address</label>
              <input 
                type="text" 
                placeholder="456 Client Ave" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.street || ''}
                onChange={(e) => updateField('street', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">Suite/Unit</label>
              <input 
                type="text" 
                placeholder="Apt 2B" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.unit || ''}
                onChange={(e) => updateField('unit', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">City</label>
              <input 
                type="text" 
                placeholder="Los Angeles" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.city || ''}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">State</label>
              <input 
                type="text" 
                placeholder="CA" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.state || ''}
                onChange={(e) => updateField('state', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">ZIP Code</label>
              <input 
                type="text" 
                placeholder="90210" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.zipCode || ''}
                onChange={(e) => updateField('zipCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">Country</label>
              <input 
                type="text" 
                placeholder="United States" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={data.country || ''}
                onChange={(e) => updateField('country', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="+1 (555) 987-6543"
            value={data.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}