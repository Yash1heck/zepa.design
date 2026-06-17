# Contributing to Zepa UI

Thank you for contributing. Zepa is a component registry — every addition should be self-contained, installable, and reviewable.

Contributing is simple: add your folder, run one command, verify on `/components`. Full docs also live at [zepa.design/docs](https://zepa.design/docs).

## Quick checklist

Run through this before you open a PR:

- [ ] Added `meta.ts`
- [ ] Added `demo.tsx`
- [ ] Added `ui/` folder (if the component has local UI files)
- [ ] Added preview at `public/previews/{category}/{slug}/preview.mov` (compressed to under 5MB)
- [ ] Ran `npm run build:registry`
- [ ] Ran `npm run lint`
- [ ] Ran `npm run test`
- [ ] Responsive on mobile and desktop
- [ ] No `console.log`
- [ ] No hardcoded secrets or API keys
- [ ] No unnecessary dependencies
- [ ] Tested on `localhost:3000/components` before pushing

## Example: sameer-hero

### 1. Create the component folder

Create a folder under `content/registry/hero-sections/sameer-hero`.

### 2. Add your source files

- `meta.ts` in the `sameer-hero` folder
- `demo.tsx` in the same folder
- `ui/` — add any local UI files inside `sameer-hero/ui/`

### 3. Add the gallery preview video

Add `public/previews/hero-sections/sameer-hero/preview.mov`.

### 4. Build the registry

```bash
npm run build:registry
```

### 5. Verify it appears

Open `/components` and confirm your card shows up.

### 6. Test locally before pushing

Check `localhost:3000/components/sameer-hero` — live demo, install command, and code tabs should all work.

## Folder structure

```text
content/registry/
└ hero-sections/
  └ sameer-hero/
    ├ meta.ts
    ├ demo.tsx
    └ ui/
      └ (optional local components)

public/previews/
└ hero-sections/
  └ sameer-hero/
    └ preview.mov
```

## Naming rules

- Use lowercase kebab-case (e.g. `sameer-hero`).
- `meta.slug` must match the folder name exactly.
- Category today is `hero-sections` — more categories will appear in the sidebar as they are added.

## Preview video

Every component needs a lightweight `preview.mov` (or `.mp4`). The gallery at `/components` plays it on hover — no live WebGL in the grid. Full demo runs on the detail page.

Keep the video under **5MB**. Compress with:

```bash
ffmpeg -i preview.mov -vf scale=1280:-2 -r 30 -c:v libx264 -crf 23 -preset fast -movflags +faststart -an preview.mov
```

## Example `meta.ts`

```ts
export const meta = {
  slug: "sameer-hero",
  title: "Sameer Hero",
  description: "Your one-line description for the gallery and detail page.",
  category: "hero-sections",
  preview: "/previews/hero-sections/sameer-hero/preview.mov",
  github: "your-github-username",
  tags: ["hero", "motion"],
  dependencies: ["framer-motion"],
  registryDependencies: [],
  version: 1,
} as const
```

## Commands

**Install component (shadcn CLI)**

```bash
npx shadcn@latest add https://zepa.design/r/amero-hero.json
```

**Install dependencies** (if listed in `meta.ts`)

```bash
npm install framer-motion lucide-react
```

**After adding or updating a component**

```bash
npm run build:registry
```

**Local dev**

```bash
npm run dev
```

**Lint & test**

```bash
npm run lint
npm run test
```

**Playground (optional)**

```text
/playground/hero?slug=sameer-hero
```

## What gets generated for you

Never edit these by hand — `npm run build:registry` overwrites them:

- `content/registry/items.ts`
- `content/registry/loaders.ts`
- `content/registry/index.ts`
- `lib/registry/code-paths.ts`
- `content/registry/registry.json`
- `public/r/{slug}.json`

## Common mistakes

- `meta.slug` does not match folder name
- Missing `demo.tsx` → demo not found
- Missing preview → card hidden from `/components`
- Skipping `npm run build:registry` before pushing
- Using `position: fixed` in demos — breaks the split layout on the detail page (use `absolute` inside a relative root)

## After deploy

Users can install via shadcn once `public/r/your-slug.json` is deployed:

```bash
npx shadcn@latest add https://zepa.design/r/your-slug.json
```

## Security & assets

Before opening a PR, also make sure your component:

- Uses no hardcoded colors/assets that break theming (prefer design tokens / Tailwind utilities)
- Has no `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, or other network calls
- Has no `dangerouslySetInnerHTML`, `eval`, `new Function`, `document.write`, or inline `<script>` tags

### Images

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

## Review criteria

PRs are reviewed for:

- **Security** — no XSS, no unsafe scripts, no secrets
- **Performance** — reasonable bundle impact
- **Accessibility** — semantic HTML, labels, focus states
- **Code quality** — clear structure, no copy-paste bloat
- **Architecture** — follows registry conventions
- **Responsive** — works on small and large screens
- **Dependencies** — only what's needed

PRs may be rejected if:

- Single file is ~1000+ lines without reason
- Many unnecessary dependencies
- Copied code without adaptation
- Wrong folder structure or missing required files
- Contains network calls, unsafe scripts, or committed local image assets (`ui/assets/`) — these fail CI automatically

## Questions

Use **GitHub Discussions** for questions. Use **Issues** for bugs and component requests.
