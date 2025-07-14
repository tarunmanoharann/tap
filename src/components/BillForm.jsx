import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const BillForm = ({ locationData, onAddBill, isProcessing }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: 'utilities'
  });

  const getLocationBasedSuggestions = () => {
    const suggestions = {
      Mumbai: ['BEST Electricity', 'Reliance Gas', 'Tata Power'],
      Delhi: ['BSES Electricity', 'Indraprastha Gas', 'Delhi Jal Board'],
      Bangalore: ['BESCOM', 'Bwssb Water', 'Airtel Broadband'],
      Chennai: ['TNEB', 'Metro Water', 'ACT Fibernet'],
      Kolkata: ['CESC', 'KMC Water', 'Vodafone'],
      Hyderabad: ['TSSPDCL', 'HMWS&SB', 'Jio Fiber']
    };
    return suggestions[locationData.city] || ['Local Utility Provider'];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.dueDate) return;

    const newBill = {
      id: Date.now(),
      name: formData.name,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      category: formData.category,
      paid: false,
      location: locationData.city,
      createdAt: new Date().toISOString()
    };

    onAddBill(newBill);
    setFormData({ name: '', amount: '', dueDate: '', category: 'utilities' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Add New Bill</h2>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-800 mb-2">Popular in {locationData.city}:</p>
          <div className="flex flex-wrap gap-2">
            {getLocationBasedSuggestions().map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, name: suggestion }))}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Bill Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Electricity Bill"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1500"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="utilities">Utilities</option>
              <option value="insurance">Insurance</option>
              <option value="subscription">Subscription</option>
              <option value="loan">Loan/EMI</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Bill</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillForm;
