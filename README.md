# Smart Invoice Generator

A modern, responsive React application for creating professional invoices with ease. Built with React, Tailwind CSS, and Lucide React icons.

## 🚀 Features

### Core Functionality
- **Professional Invoice Creation** - Generate clean, professional invoices
- **Real-time Preview** - See your invoice as you build it
- **PDF Export** - Download invoices as PDF documents
- **Auto-save** - Automatic saving every 30 seconds to prevent data loss
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Invoice Management
- **Save & Load Invoices** - Store invoices locally and retrieve them later
- **Status Tracking** - Track invoice status (Saved, Generated, Pending, Paid)
- **Filter & Search** - Filter invoices by status for easy management
- **Business Info Persistence** - Save your business information for future use

### Professional Features
- **Customizable Invoice Details** - Invoice numbers, dates, titles
- **Comprehensive Business & Client Info** - Complete address and contact details
- **Itemized Billing** - Add multiple items with quantity, rate, and automatic calculations
- **Tax & Discount Support** - Apply tax rates and discounts with automatic calculations
- **Additional Notes** - Include payment terms and special instructions

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Local Storage** - Client-side data persistence
- **Print API** - PDF generation and printing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-invoice-generator.git
   cd smart-invoice-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InvoiceBusinessInfo.js    # Business information form
│   ├── InvoiceClientInfo.js      # Client information form
│   ├── InvoiceItems.js           # Invoice items management
│   ├── InvoiceMeta.js            # Invoice metadata (number, dates)
│   ├── InvoiceNotes.js           # Additional notes section
│   ├── InvoiceSummary.js         # Tax, discount, and total calculations
│   ├── PreviewModal.js           # Invoice preview and PDF export
│   ├── FilterModal.js            # Status filter modal
│   └── InvoiceListModal.js       # Saved invoices list
├── pages/
│   └── InvoiceBuilder.js         # Main application page
├── utils/
│   └── localStorage.js           # Local storage utilities
└── App.js                        # Root component
```

## 💡 Usage

### Creating Your First Invoice

1. **Start with Invoice Details**
   - Add invoice title and number (auto-generated)
   - Set invoice and due dates

2. **Add Business Information**
   - Enter your business name and contact details
   - Add complete business address
   - Information is automatically saved for future invoices

3. **Add Client Information**
   - Enter client name and contact details
   - Add client address information

4. **Add Invoice Items**
   - Click "Add Item" to create line items
   - Enter description, quantity, and rate
   - Amounts are automatically calculated

5. **Configure Tax & Discounts**
   - Set tax rate percentage
   - Apply discount percentage if needed
   - View real-time total calculations

6. **Add Notes (Optional)**
   - Include payment terms
   - Add special instructions
   - Include additional information

7. **Preview & Export**
   - Use "Preview" to see the final invoice
   - Click "Download PDF" to generate a PDF
   - Use "Save" to store the invoice locally
   - Use "Send" to mark as sent and update status

### Managing Invoices

- **View Saved** - Access all your saved invoices
- **Filter by Status** - View invoices by status (Saved, Generated, Pending, Paid)
- **Load Previous** - Load and edit existing invoices
- **Status Updates** - Update invoice status as needed
- **Delete Invoices** - Remove invoices you no longer need

## 🎨 Customization

The application uses Tailwind CSS for styling. You can customize:

- **Colors** - Modify the color scheme in Tailwind classes
- **Layout** - Adjust component layouts and spacing
- **Typography** - Change fonts and text styling
- **Components** - Extend or modify existing components

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** - Full featured experience
- **Tablet** - Optimized layout for medium screens
- **Mobile** - Touch-friendly interface for smartphones

## 🔒 Data Storage

- **Local Storage** - All data is stored locally in your browser
- **No Server Required** - Completely client-side application
- **Privacy** - Your invoice data never leaves your device
- **Auto-save** - Automatic saving prevents data loss

## 🚦 Status Management

Invoices support multiple statuses:
- **Saved** - Draft invoices saved locally
- **Generated** - Completed invoices ready to send
- **Pending** - Invoices sent to clients awaiting payment
- **Paid** - Invoices that have been paid

## 🛡️ Browser Compatibility

- **Chrome** - Full support
- **Firefox** - Full support
- **Safari** - Full support
- **Edge** - Full support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

