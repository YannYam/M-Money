import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Home, CalendarDays, Calendar, Settings as SettingsIcon } from 'lucide-react';

export default function Navbar() {
  const { activeTab, setActiveTab } = useAppContext();

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={24} /> },
    { id: 'daily', label: 'Daily', icon: <CalendarDays size={24} /> },
    { id: 'monthly', label: 'Monthly', icon: <Calendar size={24} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={24} /> }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 pb-safe">
      <div className="max-w-md mx-auto flex justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors
                ${isActive ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}
              `}
            >
              {tab.icon}
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
