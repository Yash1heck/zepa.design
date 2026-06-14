"use client"

import { useState } from "react"

import { ComponentDemo } from "./component-demo"
import type { DemoTheme } from "./demo-toolbar"

interface PlaygroundDemoProps {
  slug: string
}

/** Fullscreen registry demo with persistent theme overlay — for local component testing. */
export function PlaygroundDemo({ slug }: PlaygroundDemoProps) {
  const [theme, setTheme] = useState<DemoTheme>("dark")

  return (
    <ComponentDemo
      key={slug}
      slug={slug}
      theme={theme}
      fullscreen
      onThemeChange={setTheme}
    />
  )
}
