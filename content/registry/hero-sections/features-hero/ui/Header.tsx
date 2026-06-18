import React from 'react';
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <span className="font-bold text-lg tracking-tight">Magic Patterns</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-black transition-colors">
          Templates
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Pricing
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Enterprise
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Blog
        </a>
      </nav>

      <div className="flex items-center gap-4 text-sm font-medium">
        <a
          href="#"
          className="text-gray-600 hover:text-black transition-colors hidden sm:block">
          
          Log in
        </a>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Get started
        </button>
      </div>
    </header>);

}