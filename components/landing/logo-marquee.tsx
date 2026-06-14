"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

const logos = [
  { src: "/l1.png", alt: "Logo 1" },
  { src: "/l2.png", alt: "Logo 2" },
  { src: "/l3.png", alt: "Logo 3" },
  { src: "/l4.png", alt: "Logo 4" },
  { src: "/l5.png", alt: "Logo 5" },
  { src: "/l6.png", alt: "Logo 6" },
  { src: "/l7.png", alt: "Logo 7" },
  { src: "/l8.png", alt: "Logo 8" },
] as const

export function LogoMarquee() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="overflow-hidden py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          Trusted by People who work at
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl overflow-hidden px-4 md:max-w-4xl">
        <div className="relative">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-landing to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-landing to-transparent" />

          <div className="flex animate-marquee">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="mx-5 flex h-20 min-w-[150px] items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  className="h-11 w-auto max-w-[160px] flex-none object-contain px-2 brightness-0 invert opacity-50 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
