import React from 'react';
import {
  Image as ImageIcon,
  Linkedin,
  Sparkles,
  Layout,
  Presentation } from
'lucide-react';
const SUGGESTIONS = [
{
  icon: ImageIcon,
  label: 'Recreate a screenshot'
},
{
  icon: Linkedin,
  label: 'Clone LinkedIn'
},
{
  icon: Sparkles,
  label: 'Landing page'
},
{
  icon: Layout,
  label: 'Redesign this'
},
{
  icon: Presentation,
  label: 'Create a slide deck'
}];

export function SuggestionChips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-3xl mx-auto">
      {SUGGESTIONS.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm hover:border-gray-300 hover:shadow-md hover:text-gray-900 transition-all duration-200">
            
            <Icon className="w-4 h-4 text-gray-400" />
            {suggestion.label}
          </button>);

      })}
    </div>);

}