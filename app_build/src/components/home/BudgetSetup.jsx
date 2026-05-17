import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { Check } from 'lucide-react';

export default function BudgetSetup() {
  const { setBudget } = useAppContext();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(input);
    if (!isNaN(val) && val > 0) {
      setBudget(val * 1000); // Shorthand x1000
    }
  };

  const parsed = parseFloat(input) * 1000 || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-6">🛋️</div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome to LazySpend</h1>
      <p className="text-slate-500 mb-8 max-w-xs">Enter your monthly budget to start tracking effortlessly.</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs relative">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 5000"
          className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 px-5 text-xl font-bold outline-none focus:border-slate-800 transition-colors shadow-sm text-center"
          autoFocus
        />
        
        <div className="text-sm font-semibold text-slate-500 mt-3 h-6">
          {parsed > 0 ? `= ${formatCurrency(parsed)}` : ''}
        </div>

        <button 
          type="submit" 
          disabled={parsed <= 0}
          className="w-full mt-6 bg-slate-800 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-30 disabled:bg-slate-300 transition-all active:scale-95"
        >
          <Check size={20} /> Let's Go
        </button>
      </form>
    </div>
  );
}
