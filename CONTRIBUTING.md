# Contributing to Zepa UI

Thank you for contributing. This repo is a component registry — every addition should be self-contained, installable, and reviewable.

## Requirements

Before opening a PR, make sure your component:

- Has `meta.ts`
- Has `demo.tsx`
- Has `preview.mov` in `public/previews/`, compressed to under 5MB (e.g. `ffmpeg -i preview.mov -vf scale=1280:-2 -r 30 -c:v libx264 -crf 23 -preset fast -movflags +faststart -an preview.mov`)
- Passes `npm run build:registry`
- Passes `npm run lint`
- Passes `npm run test`
- Has no `console.log`
- Has no hardcoded secrets or API keys
- Is responsive (mobile + desktop)
- Uses no hardcoded colors/assets that break theming (prefer design tokens / Tailwind utilities)
- Has no `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, or other network calls
- Has no `dangerouslySetInnerHTML`, `eval`, `new Function`, `document.write`, or inline `<script>` tags
- Uses hosted image URLs only — no local files in `ui/assets/` (see Images below)

## Images

Do not commit image files (svg, png, jpg, etc.) into `content/registry/{category}/{slug}/ui/assets/`. CI rejects any `ui/assets` folder.

Instead, host images externally (Cloudinary or similar) and reference them by URL in `demo.tsx`:

```tsx
const tile1 = "https://res.cloudinary.com/.../tile-1.svg";
```

If you don't have a hosted image yet, use the project default placeholder:

```text
https://res.cloudinary.com/dcsgson45/image/upload/v1781431470/defaultzepa_vqbtvz.png
```

If your image domain isn't `res.cloudinary.com` or `assets.basehub.com`, add it to `images.remotePatterns` in `next.config.ts` as part of your PR.

## Folder structure

Each component lives under:

```text
content/registry/{category}/{slug}/
  meta.ts
  demo.tsx
  ui/          # optional supporting files
```

Example:

```text
content/registry/hero-sections/new-hero/
  meta.ts
  demo.tsx
  ui/
    badge.tsx
    button.tsx
    glow.tsx
    mockup.tsx
```

Preview video path (required):

```text
public/previews/{category}/{slug}/preview.mov
```

Example:

```text
public/previews/hero-sections/new-hero/preview.mov
```

## How to add a component

1. Create the folder: `content/registry/{category}/{slug}/`
2. Add `meta.ts` (slug must match folder name)
3. Add `demo.tsx` (default export — this is what the live demo renders)
4. Add any `ui/*.tsx` helpers your demo needs
5. Add `public/previews/{category}/{slug}/preview.mov`
6. Run:

```bash
npm run build:registry
npm run lint
npm run test
```

7. Open a PR using the PR template

## `meta.ts` example

```ts
export const meta = {
  slug: "new-hero",
  title: "New Hero",
  description: "Premium hero with CTA, glow, and framed mockup.",
  category: "hero-sections",
  preview: "/previews/hero-sections/new-hero/preview.mov",
  github: "your-github-username",
  tags: ["hero", "landing", "cta"],
  dependencies: ["lucide-react"],
  registryDependencies: [],
  version: 1,
  views: 0,
  likes: 0,
  installs: 0,
} as const
```

## Generated files (do not edit manually)

`npm run build:registry` updates:

- `content/registry/items.ts`
- `content/registry/loaders.ts`
- `content/registry/index.ts`
- `lib/registry/code-paths.ts`
- `content/registry/registry.json`
- `public/r/{slug}.json`

## Review criteria

PRs are reviewed for:

- **Security** — no XSS, no unsafe scripts, no secrets
- **Performance** — reasonable bundle impact
- **Accessibility** — semantic HTML, labels, focus states
- **Code quality** — clear structure, no copy-paste bloat
- **Architecture** — follows registry conventions
- **Responsive** — works on small and large screens
- **Dependencies** — only what’s needed

PRs may be rejected if:

- Single file is ~1000+ lines without reason
- Many unnecessary dependencies
- Copied code without adaptation
- Wrong folder structure or missing required files
- Contains network calls, unsafe scripts, or committed local image assets (`ui/assets/`) — these fail CI automatically

## Local checks

```bash
npm run lint
npm run test
npm run build:registry
npm run build
```

## Questions

Use **GitHub Discussions** for questions. Use **Issues** for bugs and component requests.
