import React from 'react';
export function PhysicsCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 w-64 select-none">
      <h3 className="font-bold text-sm mb-4 text-center">
        Physics Volume Controls
      </h3>
      <div className="flex justify-between gap-2">
        {[
        {
          color: 'bg-pink-400',
          height: 'h-12'
        },
        {
          color: 'bg-blue-400',
          height: 'h-20'
        },
        {
          color: 'bg-purple-400',
          height: 'h-16'
        },
        {
          color: 'bg-orange-400',
          height: 'h-8'
        }].
        map((item, i) =>
        <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-8 h-32 bg-gray-50 rounded-full relative overflow-hidden border border-gray-100">
              <div
              className={`absolute bottom-0 left-0 right-0 ${item.height} ${item.color} opacity-20`} />
            
              <div
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${item.color}`} />
            
            </div>
          </div>
        )}
      </div>
    </div>);

}
export function SneakerCard() {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-72 overflow-hidden select-none">
      <div className="bg-black text-white text-[10px] uppercase font-bold p-2 flex justify-between">
        <span>SoleStyle</span>
        <div className="flex gap-2">
          <span>New Arrivals</span>
          <span>Men</span>
        </div>
      </div>
      <div className="p-3 flex gap-3">
        <div className="w-1/3 space-y-2">
          <div className="h-2 w-12 bg-gray-200 rounded" />
          <div className="space-y-1">
            {[1, 2, 3, 4].map((i) =>
            <div key={i} className="h-2 w-8 bg-gray-100 rounded" />
            )}
          </div>
        </div>
        <div className="w-2/3 grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="aspect-square bg-red-50 rounded-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                alt="Sneaker"
                className="object-cover w-full h-full" />
              
            </div>
            <div className="h-2 w-16 bg-gray-200 rounded" />
            <div className="h-2 w-8 bg-red-500 rounded" />
          </div>
          <div className="space-y-1">
            <div className="aspect-square bg-gray-100 rounded-lg" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
            <div className="h-2 w-8 bg-gray-400 rounded" />
          </div>
        </div>
      </div>
    </div>);

}
export function RealEstateCard() {
  return (
    <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 w-80 select-none">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-blue-500 rounded-full" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) =>
        <div key={i} className="space-y-1">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              {i === 1 &&
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80"
              alt="Cabin"
              className="object-cover w-full h-full" />

            }
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded" />
            <div className="h-1.5 w-2/3 bg-gray-200 rounded" />
          </div>
        )}
      </div>
    </div>);

}
export function FurnitureCard() {
  return (
    <div className="bg-[#1a2e25] text-white p-4 rounded-xl shadow-xl w-96 flex gap-4 select-none">
      <div className="flex-1 space-y-4">
        <h3 className="text-xl font-serif leading-tight">
          Master the art of furniture and interior design.
        </h3>
        <div className="space-y-2">
          <div className="h-1 w-full bg-white/20 rounded" />
          <div className="h-1 w-4/5 bg-white/20 rounded" />
          <div className="h-1 w-3/5 bg-white/20 rounded" />
        </div>
        <div className="inline-block px-3 py-1 bg-emerald-500 text-[10px] rounded uppercase tracking-wider font-bold">
          Start Designing
        </div>
      </div>
      <div className="w-32 aspect-[3/4] bg-blue-900 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80"
          alt="Chair"
          className="object-cover w-full h-full opacity-80 mix-blend-luminosity" />
        
      </div>
    </div>);

}
export function VoxelCard() {
  return (
    <div className="bg-[#7ec8c9] p-2 rounded-xl shadow-xl w-64 select-none border-4 border-white">
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <span className="text-[8px] font-bold text-white/80 uppercase tracking-widest">
          Lego Builder
        </span>
      </div>
      <div className="aspect-video bg-[#65a3a4] rounded-lg relative overflow-hidden flex items-center justify-center">
        <div className="w-16 h-16 bg-[#4a7a7b] transform rotate-45 skew-x-12 skew-y-12 relative">
          <div className="absolute -top-4 left-4 w-8 h-8 bg-red-500 transform -rotate-45 -skew-x-12 -skew-y-12" />
        </div>
      </div>
    </div>);

}