import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { parseShorthand, formatCurrency } from '../../utils/helpers';
import { Plus } from 'lucide-react';

export default function SmartInput() {
  const { addTransaction } = useAppContext();
  const [input, setInput] = useState('');

  const parsed = parseShorthand(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsed.amount > 0) {
      addTransaction(parsed.amount, parsed.text, 1, parsed.type);
      setInput('');
    }
  };

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 15 lunch or +100 salary"
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 px-5 text-lg outline-none focus:border-slate-800 transition-colors shadow-sm placeholder-slate-300 font-medium text-slate-800"
        />
        
        {parsed.amount > 0 && (
          <div className={`absolute top-full left-0 mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm ml-2 ${parsed.type === 'income' ? 'bg-emerald-500' : 'bg-slate-500'}`}>
            {parsed.type === 'income' ? '+ ' : ''}{formatCurrency(parsed.amount)} for {parsed.text}
          </div>
        )}

        <button 
          type="submit" 
          disabled={parsed.amount === 0}
          className={`absolute right-2 top-2 bottom-2 text-white rounded-xl aspect-square flex items-center justify-center disabled:opacity-30 disabled:bg-slate-300 transition-all ${parsed.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
}
