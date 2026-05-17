import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { Plus, Minus } from 'lucide-react';

export default function QuickTapGrid() {
  const { presets, addTransaction } = useAppContext();
  const [activePreset, setActivePreset] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleTap = (preset) => {
    if (activePreset && activePreset.id === preset.id) {
      // Confirm the add
      addTransaction(preset.baseAmount, preset.title, quantity);
      setActivePreset(null);
      setQuantity(1);
    } else {
      setActivePreset(preset);
      setQuantity(1);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-6 py-4">
      {presets.map(p => {
        const isActive = activePreset && activePreset.id === p.id;
        
        return (
          <button
            key={p.id}
            onClick={() => handleTap(p)}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-200 shadow-sm
              ${isActive ? 'bg-slate-800 text-white scale-105 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50'}
            `}
          >
            <div className="text-3xl mb-2">{p.icon}</div>
            <div className="font-semibold">{p.title}</div>
            
            {isActive ? (
              <div className="flex items-center gap-3 mt-3" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 bg-slate-700 rounded-full hover:bg-slate-600">
                  <Minus size={16} />
                </button>
                <span className="font-bold text-lg w-4">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 bg-slate-700 rounded-full hover:bg-slate-600">
                  <Plus size={16} />
                </button>
                
                {/* Confirm button overlay */}
                <div 
                  className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-lg"
                  onClick={() => handleTap(p)}
                >
                  <Plus size={16} />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 font-medium mt-1">
                {formatCurrency(p.baseAmount)}
              </div>
            )}
          </button>
        )
      })}
    </div>
  );
}
