"use client"

import Link from "next/link"
import { useRef } from "react"

interface ComponentPreviewProps {
  slug: string
  title: string
  preview: string
}

export function ComponentPreview({
  slug,
  title,
  preview,
}: ComponentPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <Link
      href={`/components/${slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-video overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={preview}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/40" />

      <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0">
        <div className="w-fit rounded-md bg-white px-2.5 py-1 text-xs font-medium text-black">
          {title}
        </div>
      </div>
    </Link>
  )
}
