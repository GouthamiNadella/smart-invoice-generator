import React, { useState } from 'react';
import { Plus, Filter, Eye, Send, Save } from 'lucide-react';

// Import all components
import InvoiceBusinessInfo from '../components/InvoiceBusinessInfo';
import InvoiceClientInfo from '../components/InvoiceClientInfo';
import InvoiceItems from '../components/InvoiceItems';
import InvoiceMeta from '../components/InvoiceMeta';
import InvoiceNotes from '../components/InvoiceNotes';
import InvoiceSummary from '../components/InvoiceSummary';
import PreviewModal from '../components/PreviewModal';
import FilterModal from '../components/FilterModal';
import InvoiceListModal from '../components/InvoiceListModal';

// Import utilities
import { STORAGE_KEYS, saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

export default function InvoiceBuilder() {
  const [invoiceMeta, setInvoiceMeta] = useState({});
  const [businessInfo, setBusinessInfo] = useState({});
  const [clientInfo, setClientInfo] = useState({});
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0 }
  ]);
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showInvoiceList, setShowInvoiceList] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);

  // Load saved business info and current invoice on component mount
  React.useEffect(() => {
    const savedBusinessInfo = getFromLocalStorage(STORAGE_KEYS.BUSINESS_INFO, {});
    const currentInvoice = getFromLocalStorage(STORAGE_KEYS.CURRENT_INVOICE, null);
    
    if (savedBusinessInfo && Object.keys(savedBusinessInfo).length > 0) {
      setBusinessInfo(savedBusinessInfo);
    }

    if (currentInvoice) {
      loadInvoiceData(currentInvoice);
    }
  }, []);

  // Save business info to localStorage whenever it changes
  React.useEffect(() => {
    if (Object.keys(businessInfo).length > 0) {
      saveToLocalStorage(STORAGE_KEYS.BUSINESS_INFO, businessInfo);
    }
  }, [businessInfo]);

  // Auto-save current work every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentWork = {
        invoiceMeta,
        businessInfo,
        clientInfo,
        items,
        notes,
        taxRate,
        discountRate,
        id: currentInvoiceId,
        savedAt: new Date().toISOString()
      };
      saveToLocalStorage(STORAGE_KEYS.CURRENT_INVOICE, currentWork);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [invoiceMeta, businessInfo, clientInfo, items, notes, taxRate, discountRate, currentInvoiceId]);

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const calculateTotal = () => {
    const subTotal = items.reduce((sum, item) => {
      return sum + ((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0));
    }, 0);
    const taxAmount = (subTotal * (parseFloat(taxRate) || 0)) / 100;
    const discountAmount = (subTotal * (parseFloat(discountRate) || 0)) / 100;
    return subTotal + taxAmount - discountAmount;
  };

  const handleSave = () => {
    if (!invoiceMeta.invoiceNumber) {
      showNotificationMessage('Please add an invoice number before saving.');
      return;
    }

    const invoiceData = {
      id: currentInvoiceId || Date.now().toString(),
      invoiceMeta,
      businessInfo,
      clientInfo,
      items,
      notes,
      taxRate,
      discountRate,
      total: calculateTotal(),
      status: 'saved',
      savedAt: new Date().toISOString()
    };

    const existingInvoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
    const invoiceIndex = existingInvoices.findIndex(inv => inv.id === invoiceData.id);
    
    if (invoiceIndex >= 0) {
      existingInvoices[invoiceIndex] = invoiceData;
    } else {
      existingInvoices.push(invoiceData);
    }

    const success = saveToLocalStorage(STORAGE_KEYS.INVOICES, existingInvoices);
    if (success) {
      setCurrentInvoiceId(invoiceData.id);
      showNotificationMessage('Invoice saved successfully!');
    } else {
      showNotificationMessage('Error saving invoice. Please try again.');
    }
  };

  const handleSend = () => {
    if (!clientInfo.email) {
      showNotificationMessage('Please add client email address to send invoice.');
      return;
    }
    
    // Update status to 'pending' when sent
    const invoiceData = {
      id: currentInvoiceId || Date.now().toString(),
      invoiceMeta,
      businessInfo,
      clientInfo,
      items,
      notes,
      taxRate,
      discountRate,
      total: calculateTotal(),
      status: 'pending',
      savedAt: new Date().toISOString()
    };

    const existingInvoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
    const invoiceIndex = existingInvoices.findIndex(inv => inv.id === invoiceData.id);
    
    if (invoiceIndex >= 0) {
      existingInvoices[invoiceIndex] = invoiceData;
    } else {
      existingInvoices.push(invoiceData);
    }

    saveToLocalStorage(STORAGE_KEYS.INVOICES, existingInvoices);
    setCurrentInvoiceId(invoiceData.id);
    showNotificationMessage(`Invoice sent to ${clientInfo.email}! Status updated to pending.`);
  };

  const loadInvoiceData = (invoiceData) => {
    setInvoiceMeta(invoiceData.invoiceMeta || {});
    setBusinessInfo(invoiceData.businessInfo || {});
    setClientInfo(invoiceData.clientInfo || {});
    setItems(invoiceData.items || [{ id: 1, description: '', quantity: 1, rate: 0 }]);
    setNotes(invoiceData.notes || '');
    setTaxRate(invoiceData.taxRate || 0);
    setDiscountRate(invoiceData.discountRate || 0);
    setCurrentInvoiceId(invoiceData.id || null);
  };

  const handleLoadInvoice = (invoiceData) => {
    loadInvoiceData(invoiceData);
    setShowInvoiceList(false);
    showNotificationMessage('Invoice loaded successfully!');
  };

  const handleNewInvoice = () => {
    setInvoiceMeta({});
    setClientInfo({});
    setItems([{ id: Date.now(), description: '', quantity: 1, rate: 0 }]);
    setNotes('');
    setTaxRate(0);
    setDiscountRate(0);
    setCurrentInvoiceId(null);
    
    // Clear current invoice from localStorage
    localStorage.removeItem(STORAGE_KEYS.CURRENT_INVOICE);
    showNotificationMessage('New invoice created!');
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleFilter = () => {
    setShowInvoiceList(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
            {notificationMessage}
          </div>
        )}

        {/* Enhanced Header with New Invoice button */}
        <div className="mb-8 bg-[oklch(58.8%_0.158_241.966)] text-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Smart Invoice Builder</h1>
              <p className="text-blue-100">Create professional invoices in minutes</p>
              {currentInvoiceId && (
                <p className="text-blue-200 text-sm mt-1">
                  Editing Invoice: {invoiceMeta.invoiceNumber || 'Untitled'}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleNewInvoice}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 border border-white/20"
              >
                <Plus size={16} />
                New Invoice
              </button>

              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 border border-white/20"
              >
                <Filter size={16} />
                View Saved
              </button>

              <button
                onClick={handlePreview}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 border border-white/20"
              >
                <Eye size={16} />
                Preview
              </button>

              <button
                onClick={handleSend}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </button>

              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
        
        <InvoiceMeta 
          data={invoiceMeta} 
          onChange={setInvoiceMeta} 
        />
        
        <InvoiceBusinessInfo 
          data={businessInfo}
          onChange={setBusinessInfo}
        />
        
        <InvoiceClientInfo 
          data={clientInfo}
          onChange={setClientInfo}
        />
        
        <InvoiceItems 
          items={items}
          onChange={setItems}
        />
        
        <InvoiceSummary 
          taxRate={taxRate}
          discountRate={discountRate}
          onTaxChange={setTaxRate}
          onDiscountChange={setDiscountRate}
          items={items}
        />
        
        <InvoiceNotes 
          notes={notes}
          onChange={setNotes}
        />

        {/* Preview Modal */}
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          invoiceData={invoiceMeta}
          businessInfo={businessInfo}
          clientInfo={clientInfo}
          items={items}
          notes={notes}
          taxRate={taxRate}
          discountRate={discountRate}
        />

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          currentFilter={filterStatus}
          onFilterChange={setFilterStatus}
        />

        {/* Invoice List Modal */}
        <InvoiceListModal
          isOpen={showInvoiceList}
          onClose={() => setShowInvoiceList(false)}
          onLoadInvoice={handleLoadInvoice}
          currentFilter={filterStatus}
        />
      </div>
    </div>
  );
}