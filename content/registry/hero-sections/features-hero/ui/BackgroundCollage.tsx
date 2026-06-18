import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  PhysicsCard,
  SneakerCard,
  RealEstateCard,
  FurnitureCard,
  VoxelCard } from
'./MockupCards';
const REPEL_RADIUS = 260;
const REPEL_STRENGTH = 90;
type CollageCardProps = {
  className?: string;
  rotate?: number;
  delay?: number;
  children: React.ReactNode;
};
function CollageCard({
  className = '',
  rotate = 0,
  delay = 0,
  children
}: CollageCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, {
    stiffness: 150,
    damping: 18,
    mass: 0.6
  });
  const y = useSpring(rawY, {
    stiffness: 150,
    damping: 18,
    mass: 0.6
  });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0) {
        // Closer cursor = stronger push (eased)
        const force = (1 - dist / REPEL_RADIUS) ** 1.5;
        rawX.set(dx / dist * REPEL_STRENGTH * force);
        rawY.set(dy / dist * REPEL_STRENGTH * force);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };
    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [rawX, rawY]);
  return (
    <motion.div
      ref={ref}
      className={`absolute ${className}`}
      style={{
        x,
        y,
        rotate
      }}
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 1,
        delay
      }}>
      
      {children}
    </motion.div>);

}
export function BackgroundCollage() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 hidden md:flex items-center justify-center">
      <div className="relative w-full max-w-[1400px] h-full">
        {/* Top Left */}
        <CollageCard
          className="top-[10%] left-[5%] md:left-[10%] opacity-60 blur-[1px]"
          rotate={-8}
          delay={0.2}>
          
          <PhysicsCard />
        </CollageCard>

        {/* Middle Left */}
        <CollageCard
          className="top-[45%] -left-[5%] md:left-[2%] opacity-80"
          rotate={4}
          delay={0.4}>
          
          <RealEstateCard />
        </CollageCard>

        {/* Bottom Left */}
        <CollageCard
          className="bottom-[10%] left-[15%] opacity-50 blur-[2px]"
          rotate={-12}
          delay={0.6}>
          
          <div className="bg-white p-2 rounded-xl shadow-xl w-48">
            <div className="aspect-video bg-gray-100 rounded-lg mb-2" />
            <div className="h-2 w-3/4 bg-gray-200 rounded mb-1" />
            <div className="h-2 w-1/2 bg-gray-200 rounded" />
          </div>
        </CollageCard>

        {/* Top Right */}
        <CollageCard
          className="top-[5%] right-[10%] md:right-[15%] opacity-70 blur-[1px]"
          rotate={6}
          delay={0.3}>
          
          <SneakerCard />
        </CollageCard>

        {/* Middle Right */}
        <CollageCard
          className="top-[40%] -right-[5%] md:right-[5%] opacity-90"
          rotate={-4}
          delay={0.5}>
          
          <FurnitureCard />
        </CollageCard>

        {/* Bottom Right */}
        <CollageCard
          className="bottom-[15%] right-[20%] opacity-60"
          rotate={10}
          delay={0.7}>
          
          <VoxelCard />
        </CollageCard>

        {/* Top Center (Subtle) */}
        <CollageCard
          className="-top-[5%] left-[40%] opacity-30 blur-[3px]"
          rotate={-2}
          delay={0.8}>
          
          <div className="bg-white p-4 rounded-xl shadow-xl w-64">
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-100 rounded" />
              <div className="h-2 w-full bg-gray-100 rounded" />
              <div className="h-2 w-3/4 bg-gray-100 rounded" />
            </div>
          </div>
        </CollageCard>
      </div>
    </div>);

}