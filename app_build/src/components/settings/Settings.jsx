import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function Settings() {
  const { budget, setBudget, presets, setPresets } = useAppContext();
  
  // Budget Edit State
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget / 1000); // Shorthand

  // Preset Edit State
  const [editingPresetId, setEditingPresetId] = useState(null);
  const [presetForm, setPresetForm] = useState({ title: '', baseAmount: '', icon: '' });

  // Add Preset State
  const [isAddingPreset, setIsAddingPreset] = useState(false);
  const [newPresetForm, setNewPresetForm] = useState({ title: '', baseAmount: '', icon: '🌟' });

  const handleSaveBudget = () => {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) {
      setBudget(val * 1000);
      setIsEditingBudget(false);
    }
  };

  const handleEditPreset = (preset) => {
    setEditingPresetId(preset.id);
    setPresetForm({
      title: preset.title,
      baseAmount: preset.baseAmount / 1000,
      icon: preset.icon
    });
  };

  const handleSavePreset = (id) => {
    const amount = parseFloat(presetForm.baseAmount) * 1000;
    if (presetForm.title && amount >= 0) {
      setPresets(presets.map(p => p.id === id ? { ...p, title: presetForm.title, baseAmount: amount, icon: presetForm.icon } : p));
      setEditingPresetId(null);
    }
  };

  const handleDeletePreset = (id) => {
    setPresets(presets.filter(p => p.id !== id));
  };

  const handleAddPreset = () => {
    const amount = parseFloat(newPresetForm.baseAmount) * 1000;
    if (newPresetForm.title && amount >= 0) {
      setPresets([...presets, { id: uuidv4(), title: newPresetForm.title, baseAmount: amount, icon: newPresetForm.icon }]);
      setIsAddingPreset(false);
      setNewPresetForm({ title: '', baseAmount: '', icon: '🌟' });
    }
  };

  return (
    <div className="pb-8">
      <div className="bg-slate-800 text-white pt-12 pb-8 px-6 text-center">
        <h2 className="text-xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="px-6 py-6 space-y-8">
        
        {/* Budget Settings */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Monthly Budget</h3>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            {isEditingBudget ? (
              <div className="flex gap-2">
                <input 
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-slate-800"
                  placeholder="e.g. 5000"
                />
                <button onClick={handleSaveBudget} className="bg-slate-800 text-white p-2 rounded-lg">
                  <Check size={20} />
                </button>
                <button onClick={() => setIsEditingBudget(false)} className="bg-slate-200 text-slate-600 p-2 rounded-lg">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-slate-800">{formatCurrency(budget)}</div>
                <button onClick={() => setIsEditingBudget(true)} className="text-slate-400 hover:text-slate-800">
                  <Edit2 size={18} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Presets Settings */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quick-Tap Presets</h3>
            {!isAddingPreset && (
              <button onClick={() => setIsAddingPreset(true)} className="text-slate-800 bg-slate-200 p-1.5 rounded-full hover:bg-slate-300">
                <Plus size={16} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* Add New Preset Form */}
            {isAddingPreset && (
              <div className="bg-slate-800 p-4 rounded-2xl shadow-sm text-white">
                <div className="text-xs font-semibold uppercase text-slate-400 mb-2">New Preset</div>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newPresetForm.icon} onChange={e => setNewPresetForm({...newPresetForm, icon: e.target.value})} className="w-12 bg-slate-700 rounded-lg px-2 text-center" placeholder="Icon" />
                  <input type="text" value={newPresetForm.title} onChange={e => setNewPresetForm({...newPresetForm, title: e.target.value})} className="flex-1 bg-slate-700 rounded-lg px-3 py-2 outline-none" placeholder="Name (e.g. Coffee)" />
                </div>
                <div className="flex gap-2">
                  <input type="number" value={newPresetForm.baseAmount} onChange={e => setNewPresetForm({...newPresetForm, baseAmount: e.target.value})} className="flex-1 bg-slate-700 rounded-lg px-3 py-2 outline-none" placeholder="Amount (e.g. 15)" />
                  <button onClick={handleAddPreset} className="bg-green-500 text-white p-2 rounded-lg"><Check size={20} /></button>
                  <button onClick={() => setIsAddingPreset(false)} className="bg-slate-600 text-white p-2 rounded-lg"><X size={20} /></button>
                </div>
              </div>
            )}

            {/* List of Presets */}
            {presets.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm">
                {editingPresetId === p.id ? (
                  <div>
                    <div className="flex gap-2 mb-3">
                      <input type="text" value={presetForm.icon} onChange={e => setPresetForm({...presetForm, icon: e.target.value})} className="w-12 bg-slate-50 border border-slate-200 rounded-lg px-2 text-center" />
                      <input type="text" value={presetForm.title} onChange={e => setPresetForm({...presetForm, title: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none" />
                    </div>
                    <div className="flex gap-2">
                      <input type="number" value={presetForm.baseAmount} onChange={e => setPresetForm({...presetForm, baseAmount: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none" placeholder="Amount (e.g. 15)" />
                      <button onClick={() => handleSavePreset(p.id)} className="bg-slate-800 text-white p-2 rounded-lg"><Check size={20} /></button>
                      <button onClick={() => setEditingPresetId(null)} className="bg-slate-200 text-slate-600 p-2 rounded-lg"><X size={20} /></button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <div className="font-semibold text-slate-800">{p.title}</div>
                        <div className="text-xs text-slate-400 font-medium">{formatCurrency(p.baseAmount)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEditPreset(p)} className="text-slate-300 hover:text-slate-800 transition-colors"><Edit2 size={18} /></button>
                      <button onClick={() => handleDeletePreset(p.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
