import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen pb-24 bg-slate-50">
      <div className="max-w-md mx-auto">
        {children}
      </div>
      <Navbar />
    </div>
  );
}
