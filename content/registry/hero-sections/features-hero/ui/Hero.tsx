import React from 'react';
import { PromptComposer } from './PromptComposer';
import { SuggestionChips } from './SuggestionChips';
import { motion } from 'framer-motion';
export function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full pt-20 pb-32">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut'
        }}
        className="w-full">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
          Discover your next
          <br />
          breakout feature
        </h1>

        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Go from idea to production, get user feedback, and build prototypes.
          <br className="hidden md:block" />
          The AI design tool for product teams.
        </p>

        <div className="w-full">
          <PromptComposer />
          <SuggestionChips />
        </div>
      </motion.div>
    </div>);

}