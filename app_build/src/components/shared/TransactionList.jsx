import React from 'react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { RotateCcw } from 'lucide-react';

export default function TransactionList({ transactions, onUndo, limit }) {
  const displayTx = limit ? transactions.slice(0, limit) : transactions;

  if (displayTx.length === 0) {
    return (
      <div className="text-center text-slate-400 text-sm py-8">
        No recent expenses.
      </div>
    );
  }

  return (
    <div className="space-y-3 px-6 py-4">
      {displayTx.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
          <div>
            <div className="font-semibold text-slate-800">
              {tx.title} {tx.quantity > 1 && <span className="text-slate-400 text-sm ml-1">x{tx.quantity}</span>}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{formatDate(tx.timestamp)}</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="font-bold text-slate-800">
              {formatCurrency(tx.amount * (tx.quantity || 1))}
            </div>
            {onUndo && (
              <button 
                onClick={() => onUndo(tx.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                aria-label="Undo transaction"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
