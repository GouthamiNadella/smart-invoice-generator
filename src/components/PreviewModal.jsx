import React from 'react';
import { Download } from 'lucide-react';

export default function PreviewModal({ isOpen, onClose, invoiceData, businessInfo, clientInfo, items, notes, taxRate, discountRate }) {
  if (!isOpen) return null;

  const subTotal = items.reduce((sum, item) => {
    return sum + ((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0));
  }, 0);

  const taxAmount = (subTotal * (parseFloat(taxRate) || 0)) / 100;
  const discountAmount = (subTotal * (parseFloat(discountRate) || 0)) / 100;
  const total = subTotal + taxAmount - discountAmount;

  const downloadPDF = () => {
    try {
      // Simple HTML to canvas approach for PDF generation
      const printContent = document.createElement('div');
      printContent.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div>
              <h1 style="font-size: 32px; margin: 0 0 10px 0; color: #333;">${invoiceData.title || 'INVOICE'}</h1>
              <p style="margin: 0; color: #666;">#${invoiceData.invoiceNumber}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-size: 12px; color: #666;">Invoice Date</p>
              <p style="margin: 0 0 10px 0; font-weight: bold;">${invoiceData.invoiceDate}</p>
              ${invoiceData.dueDate ? `
                <p style="margin: 0; font-size: 12px; color: #666;">Due Date</p>
                <p style="margin: 0; font-weight: bold;">${invoiceData.dueDate}</p>
              ` : ''}
            </div>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div style="width: 45%;">
              <h3 style="margin: 0 0 10px 0; color: #333;">From:</h3>
              <div style="font-size: 14px; line-height: 1.6; color: #666;">
                <p style="margin: 0; font-weight: bold; color: #333;">${businessInfo.businessName || ''}</p>
                <p style="margin: 0;">${businessInfo.email || ''}</p>
                <p style="margin: 0;">${businessInfo.street || ''} ${businessInfo.unit || ''}</p>
                <p style="margin: 0;">${businessInfo.city || ''}, ${businessInfo.state || ''} ${businessInfo.zipCode || ''}</p>
                <p style="margin: 0;">${businessInfo.country || ''}</p>
                <p style="margin: 0;">${businessInfo.phone || ''}</p>
              </div>
            </div>
            <div style="width: 45%;">
              <h3 style="margin: 0 0 10px 0; color: #333;">To:</h3>
              <div style="font-size: 14px; line-height: 1.6; color: #666;">
                <p style="margin: 0; font-weight: bold; color: #333;">${clientInfo.clientName || ''}</p>
                <p style="margin: 0;">${clientInfo.email || ''}</p>
                <p style="margin: 0;">${clientInfo.street || ''} ${clientInfo.unit || ''}</p>
                <p style="margin: 0;">${clientInfo.city || ''}, ${clientInfo.state || ''} ${clientInfo.zipCode || ''}</p>
                <p style="margin: 0;">${clientInfo.country || ''}</p>
                <p style="margin: 0;">${clientInfo.phone || ''}</p>
              </div>
            </div>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Description</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Qty</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Rate</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td style="border: 1px solid #dee2e6; padding: 12px;">${item.description || ''}</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">${item.quantity || ''}</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">${parseFloat(item.rate || 0).toFixed(2)}</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">${((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
            <div style="width: 250px;">
              <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              ${taxRate > 0 ? `
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between;">
                  <span>Tax (${taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              ` : ''}
              ${discountRate > 0 ? `
                <div style="margin-bottom: 10px; display: flex; justify-content: space-between; color: #dc3545;">
                  <span>Discount (${discountRate}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              ` : ''}
              <hr style="margin: 10px 0;" />
              <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          ${notes ? `
            <div style="border-top: 1px solid #dee2e6; padding-top: 20px;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Notes:</h3>
              <p style="margin: 0; white-space: pre-wrap; color: #666; font-size: 14px;">${notes}</p>
            </div>
          ` : ''}
        </div>
      `;
      
      // Open print dialog
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice ${invoiceData.invoiceNumber}</title>
            <style>
              @media print {
                body { margin: 0; }
                @page { margin: 0.5in; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Invoice Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 bg-white">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {invoiceData.title || 'INVOICE'}
              </h1>
              <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Invoice Date</p>
              <p className="font-semibold">{invoiceData.invoiceDate}</p>
              {invoiceData.dueDate && (
                <>
                  <p className="text-sm text-gray-600 mt-2">Due Date</p>
                  <p className="font-semibold">{invoiceData.dueDate}</p>
                </>
              )}
            </div>
          </div>

          {/* Business and Client Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">From:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{businessInfo.businessName}</p>
                <p>{businessInfo.email}</p>
                <p>{businessInfo.street} {businessInfo.unit}</p>
                <p>{businessInfo.city}, {businessInfo.state} {businessInfo.zipCode}</p>
                <p>{businessInfo.country}</p>
                <p>{businessInfo.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">To:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-800">{clientInfo.clientName}</p>
                <p>{clientInfo.email}</p>
                <p>{clientInfo.street} {clientInfo.unit}</p>
                <p>{clientInfo.city}, {clientInfo.state} {clientInfo.zipCode}</p>
                <p>{clientInfo.country}</p>
                <p>{clientInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Qty</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Rate</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">${parseFloat(item.rate || 0).toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">${((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({taxRate}%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                )}
                {discountRate > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount ({discountRate}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {notes && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Notes:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}