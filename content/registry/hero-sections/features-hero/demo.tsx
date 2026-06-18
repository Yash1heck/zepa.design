import React from 'react';
import { Hero } from './ui/Hero';
import { BackgroundCollage } from './ui/BackgroundCollage';
export function Demo() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col selection:bg-black selection:text-white">
      <main className="flex-1 flex items-center justify-center relative w-full min-h-screen">
        <BackgroundCollage />
        <Hero />
      </main>
    </div>);

}
