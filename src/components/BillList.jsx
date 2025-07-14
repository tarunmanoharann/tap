import React, { forwardRef } from 'react';
import { Eye, EyeOff, Circle } from 'lucide-react';
import BillItem from './BillItem';

const BillList = forwardRef(({ 
  bills, 
  onMarkAsPaid, 
  onDeleteBill, 
  isProcessing, 
  showInsights, 
  onToggleInsights,
  loadingMore,
  onLoadMore 
}, ref) => {
  return (
    <div className="lg:col-span-2">
      <div id="bills-section" ref={ref} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Bills Overview</h2>
          <button
            onClick={onToggleInsights}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showInsights ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showInsights ? 'Hide' : 'Show'} Insights</span>
          </button>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {bills.length === 0 ? (
            <div className="text-center py-12">
              <Circle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bills added yet</p>
              <p className="text-sm text-gray-400 mt-1">Start by adding your first bill</p>
            </div>
          ) : (
            bills
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map(bill => (
                <BillItem
                  key={bill.id}
                  bill={bill}
                  onMarkAsPaid={onMarkAsPaid}
                  onDelete={onDeleteBill}
                  isProcessing={isProcessing}
                />
              ))
          )}
        </div>
        
        {bills.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {loadingMore ? 'Loading...' : 'Load More Bills'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

BillList.displayName = 'BillList';

export default BillList;
