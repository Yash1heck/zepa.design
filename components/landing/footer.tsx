"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"

const PORTFOLIO_URL = "https://sameer-shaik.com/"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer ref={ref} role="contentinfo" className="border-t border-zinc-800 bg-landing">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/" className="inline-flex shrink-0 items-center">
            <img
              src="/zzepa.png"
              alt="Zepa UI"
              className="h-7 w-auto max-w-[120px] object-contain"
            />
          </Link>

          <p className="text-base text-zinc-400">
            Made by{" "}
            <span className="group/sameer relative inline-block">
              <Link
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Sameer Shaik portfolio"
                className="absolute bottom-full left-1/2 z-20 mb-2 block w-44 -translate-x-1/2 opacity-0 transition duration-200 group-hover/sameer:opacity-100"
              >
                <span className="block w-44 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 shadow-lg shadow-black/40">
                  <img
                    src="/sameer.png"
                    alt="Sameer Shaik"
                    width={176}
                    height={132}
                    className="block h-[8.5rem] w-44 rounded-md object-cover object-top"
                  />
                </span>
              </Link>
              <Link
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 underline decoration-zinc-500 underline-offset-2 transition hover:text-white hover:decoration-zinc-300"
              >
                Sameer
              </Link>
            </span>{" "}
            with <span aria-hidden="true">❤️</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
