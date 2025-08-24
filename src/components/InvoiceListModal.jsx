import React, { useState } from 'react';
import { FileText } from 'lucide-react';

// localStorage utilities
const STORAGE_KEYS = {
  INVOICES: 'smart_invoices',
};

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export default function InvoiceListModal({ isOpen, onClose, onLoadInvoice, currentFilter }) {
  const [savedInvoices, setSavedInvoices] = useState([]);

  React.useEffect(() => {
    if (isOpen) {
      const invoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
      setSavedInvoices(invoices);
    }
  }, [isOpen]);

  const filteredInvoices = savedInvoices.filter(invoice => {
    if (currentFilter === 'all') return true;
    return invoice.status === currentFilter;
  });

  const deleteInvoice = (invoiceId) => {
    const updatedInvoices = savedInvoices.filter(inv => inv.id !== invoiceId);
    setSavedInvoices(updatedInvoices);
    saveToLocalStorage(STORAGE_KEYS.INVOICES, updatedInvoices);
  };

  const updateInvoiceStatus = (invoiceId, newStatus) => {
    const updatedInvoices = savedInvoices.map(inv => 
      inv.id === invoiceId ? { ...inv, status: newStatus } : inv
    );
    setSavedInvoices(updatedInvoices);
    saveToLocalStorage(STORAGE_KEYS.INVOICES, updatedInvoices);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Saved Invoices ({filteredInvoices.length})
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No invoices found for "{currentFilter}" filter</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{invoice.invoiceMeta.title || 'Untitled Invoice'}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          invoice.status === 'generated' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">#{invoice.invoiceMeta.invoiceNumber}</p>
                      <p className="text-sm text-gray-600 mb-1">Client: {invoice.clientInfo.clientName || 'No client'}</p>
                      <p className="text-sm text-gray-600 mb-2">Total: ${invoice.total.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Saved: {new Date(invoice.savedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onLoadInvoice(invoice)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Load
                      </button>
                      <select
                        value={invoice.status}
                        onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="saved">Saved</option>
                        <option value="generated">Generated</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}