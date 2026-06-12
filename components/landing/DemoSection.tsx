"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import MainframeHero from "@/content/registry/hero-sections/mainframe-hero/demo"
import VercelHero from "@/content/registry/hero-sections/vercel-hero/demo"
import PosterScrollHero from "@/content/registry/hero-sections/posterscroll-hero/demo"
import DataAnalyticsHero from "@/content/registry/hero-sections/dataanalytics-hero/demo"

const tabs = [
  {
    id: "mainframe",
    label: "Mainframe",
    component: MainframeHero,
  },
  {
    id: "vercel",
    label: "Vercel",
    component: VercelHero,
  },
  {
    id: "peacock",
    label: "Peacock",
    component: PosterScrollHero,
  },
  {
    id: "analytics",
    label: "Analytics",
    component: DataAnalyticsHero,
  },
]

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState("mainframe")
  const [paused, setPaused] = useState(false)

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component ?? MainframeHero

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return

      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === current)
        return tabs[(currentIndex + 1) % tabs.length].id
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [paused])

  return (
    <section id="demo" className="mx-auto w-full max-w-[1400px] bg-landing px-4 py-16 md:px-6 md:py-20">
      <div className="relative z-10 mb-10 text-center md:mb-12">
        <h2
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-normal tracking-tight text-zinc-100"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          <span className="text-3xl sm:text-4xl">See</span>
          <Image
            src="/zzepa.png"
            alt="Zepa"
            width={180}
            height={48}
            className="h-10 w-auto shrink-0 sm:h-12"
          />
          <span className="text-3xl sm:text-4xl">in Action</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
          Explore live, production-ready components built with experience.
        </p>
      </div>

      <div
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* macOS title bar */}
        <div className="relative flex items-center border-b border-white/10 px-6 py-5">
          <div className="flex gap-2.5">
            <div className="h-3.5 w-3.5 rounded-full bg-red-500" />
            <div className="h-3.5 w-3.5 rounded-full bg-yellow-500" />
            <div className="h-3.5 w-3.5 rounded-full bg-green-500" />
          </div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center gap-3">
                {index > 0 && <span className="text-base text-zinc-600">|</span>}
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-5 py-2.5 text-base font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border border-white/15 bg-white/10 text-white"
                      : "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Area */}
        <div className="relative h-[640px] overflow-hidden sm:h-[720px] lg:h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                filter: "blur(20px)",
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                filter: "blur(20px)",
                scale: 0.98,
              }}
              transition={{
                duration: 0.45,
                ease: "easeInOut",
              }}
              className="h-full w-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}