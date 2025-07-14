import React from 'react';
import { Check, AlertCircle, Circle, Trash2 } from 'lucide-react';

const BillItem = ({ bill, onMarkAsPaid, onDelete, isProcessing }) => {
  const dueDate = new Date(bill.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today && !bill.paid;
  
  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${
      bill.paid ? 'bg-green-50 border-green-200' : 
      isOverdue ? 'bg-red-50 border-red-200' : 
      'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{bill.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <span>Due: {dueDate.toLocaleDateString()}</span>
            <span>•</span>
            <span className="capitalize">{bill.category}</span>
            <span>•</span>
            <span>{bill.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">₹{bill.amount.toFixed(2)}</div>
          <div className="flex items-center space-x-1 text-sm">
            {bill.paid ? (
              <><Check className="w-3 h-3 text-green-600" /> <span className="text-green-600">Paid</span></>
            ) : isOverdue ? (
              <><AlertCircle className="w-3 h-3 text-red-600" /> <span className="text-red-600">Overdue</span></>
            ) : (
              <><Circle className="w-3 h-3 text-gray-400" /> <span className="text-gray-600">Pending</span></>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        {!bill.paid && (
          <button
            onClick={() => onMarkAsPaid(bill.id)}
            disabled={isProcessing}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            <Check className="w-3 h-3" />
            <span>Mark Paid</span>
          </button>
        )}
        <button
          onClick={() => onDelete(bill.id)}
          disabled={isProcessing}
          className="flex items-center space-x-1 px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 disabled:bg-gray-100 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BillItem;
