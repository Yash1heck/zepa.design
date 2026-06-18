import React from 'react';
import { Plus, ArrowUp } from 'lucide-react';
export function PromptComposer() {
  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <textarea
          placeholder="Create anything..."
          className="w-full min-h-[120px] p-6 text-lg text-gray-800 placeholder-gray-400 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
          spellCheck={false} />
        

        <div className="flex items-center justify-between p-3 bg-white">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
          </button>

          <button className="p-2 bg-gray-100 text-gray-400 rounded-full hover:bg-black hover:text-white transition-colors">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>);

}