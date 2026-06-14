"use client"

import { cn } from "@/lib/utils"

import { DemoToolbar, type DemoTheme } from "./demo-toolbar"
import { RegistryDemo } from "./registry-demo"

interface ComponentDemoProps {
  slug: string
  theme: DemoTheme
  refreshKey?: number
  fullscreen?: boolean
  onThemeChange?: (theme: DemoTheme) => void
}

export function ComponentDemo({
  slug,
  theme,
  refreshKey = 0,
  fullscreen = false,
  onThemeChange,
}: ComponentDemoProps) {
  return (
    <>
      {fullscreen && onThemeChange ? (
        <DemoToolbar
          slug={slug}
          theme={theme}
          onThemeChange={onThemeChange}
          showOpenInNewTab={false}
          showRefresh={false}
          variant="overlay"
        />
      ) : null}

      <div
        className={cn(
          "relative isolate flex flex-1 flex-col overflow-hidden border transition-colors [transform:translateZ(0)]",
          fullscreen
            ? "min-h-screen rounded-none border-0"
            : "min-h-[70vh] rounded-[32px]",
          theme === "light"
            ? "border-zinc-200 bg-white"
            : "border-white/10 bg-zinc-950/60"
        )}
      >
        <div
          data-theme={theme}
          className={cn(
            "relative z-0 flex min-h-0 flex-1 flex-col",
            fullscreen ? "min-h-screen" : "min-h-[70vh]"
          )}
        >
          <RegistryDemo slug={slug} refreshKey={refreshKey} />
        </div>
      </div>
    </>
  )
}
