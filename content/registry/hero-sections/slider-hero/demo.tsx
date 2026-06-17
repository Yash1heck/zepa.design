"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
  import {
    ChevronUp,
    ChevronDown,
  } from "lucide-react";
  import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
  } from "react";
  
  const CARD_IMAGES = [
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781518882/WhatsApp_Image_2024-12-11_at_14.19.21_mpsdlf.jpg",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781518647/main-sample.png",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781705173/yash_u2hx6k.png",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781705172/han_chmdo4.jpg",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781705172/samevans_hf73xr.jpg",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781705173/anaad_p4ghtg.png",
    "https://res.cloudinary.com/dakrfj1oh/image/upload/v1781705172/vivek_i01gjp.png",
  ];

  const CARD_NAMES = [
    "sameer",
    "sofia",
    "yash",
    "han",
    "evans",
    "anaad",
    "vivek",
  ];

  const CARD_TAG_COLORS = [
    "#4D7EFF",
    "#3DBF7A",
    "#C0392B",
    "#111827",
    "#7C3AED",
    "#0D9488",
    "#EA580C",
  ];

  /** Pop up @name tags when hero intro finishes — sameer (0) & evans (4) */
  const PINNED_TAG_INDICES = new Set([0, 4]);
  
  const CARD_SIZE = 220;
  const HERO_ROW_Y = 522;
  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const hoverEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
  
  type Slot = { x: number; y: number; rotate: number; scale: number; z: number };
  const SLOTS: Slot[] = [
    { x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
    { x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
    { x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
    { x: 0, y: -8, rotate: 0, scale: 1, z: 4 },
    { x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
    { x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
    { x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
  ];
  
  const CASCADE = Array.from({ length: 7 }, (_, i) => ({
    top: 300 + i * 70,
    left: 20 + i * 150,
    rotate: -3 + i * 3,
    z: 7 - i,
  }));
  
  // cubic-bezier helpers
  function bezierY(t: number, p1: number, p2: number) {
    const u = 1 - t;
    return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
  }
  function getTimeForProgress(progress: number, ease: [number, number, number, number]) {
    // ease = [x1, y1, x2, y2]; we want t such that bezier(t).y = progress; approximate by t directly via x mapping
    // simpler: invert ease as function of normalized time t -> y(t). Find t in [0,1] s.t. y(t)=progress.
    let lo = 0,
      hi = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      const y = bezierY(mid, ease[1], ease[3]);
      if (y < progress) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }
  
  function useViewport(containerRef?: React.RefObject<HTMLDivElement | null>) {
    const [vp, setVp] = useState({
      w: 1280,
      h: 800,
      centerX: 640,
      slotScale: 1,
    });

    useEffect(() => {
      const measure = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isTablet = w >= 768 && w < 1280;

        if (isTablet && containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // Fixed cards are positioned relative to the transformed demo frame,
          // so center on the hero container — not the window.
          setVp({
            w: rect.width,
            h,
            centerX: rect.width / 2,
            slotScale: Math.min(1, Math.max(0.74, rect.width / 1280)),
          });
          return;
        }

        setVp({
          w,
          h,
          centerX: w / 2,
          slotScale: 1,
        });
      };

      measure();
      window.addEventListener("resize", measure);

      const el = containerRef?.current;
      const ro =
        el && typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(measure)
          : null;
      if (el && ro) ro.observe(el);

      return () => {
        window.removeEventListener("resize", measure);
        ro?.disconnect();
      };
    }, [containerRef]);

    return vp;
  }

  function scaledSlotX(x: number, slotScale: number) {
    return x * slotScale;
  }
  
  function CardNameTag({
    name,
    color,
    visible,
    popup = false,
    popupDelay = 0,
  }: {
    name: string;
    color: string;
    visible: boolean;
    popup?: boolean;
    popupDelay?: number;
  }) {
    return (
      <motion.div
        initial={popup ? { opacity: 0, y: 16, scale: 0.82 } : false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 10,
          scale: visible ? 1 : 0.9,
        }}
        transition={{
          duration: popup && visible ? 0.5 : 0.28,
          ease: hoverEase,
          delay: popup && visible ? popupDelay : 0,
        }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "100%",
          transform: "translateX(-50%)",
          marginBottom: 12,
          background: color,
          padding: "8px 18px",
          borderRadius: 9999,
          fontFamily: "Inter Tight, sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: "#fff",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 40,
        }}
      >
        @{name}
        <span
          style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `10px solid ${color}`,
          }}
        />
      </motion.div>
    );
  }

  function CardBox({
    src,
    name,
    tagColor,
    showPinnedTag = false,
    pinnedPopupDelay = 0,
    onHover,
  }: {
    src: string;
    name: string;
    tagColor: string;
    showPinnedTag?: boolean;
    pinnedPopupDelay?: number;
    onHover: (v: boolean) => void;
  }) {
    const [hovered, setHovered] = useState(false);
    const tagVisible = hovered || showPinnedTag;

    return (
      <motion.div
        onMouseEnter={() => {
          setHovered(true);
          onHover(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          onHover(false);
        }}
        style={{
          position: "relative",
          width: CARD_SIZE,
          height: CARD_SIZE,
        }}
      >
        <CardNameTag
          name={name}
          color={tagColor}
          visible={tagVisible}
          popup={showPinnedTag}
          popupDelay={pinnedPopupDelay}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: hovered
              ? "0 28px 70px rgba(0,0,0,0.28)"
              : "0 20px 60px rgba(0,0,0,0.20)",
            background: "#ddd",
            transition: "box-shadow 0.35s ease",
          }}
        >
          <motion.img
            src={src}
            alt=""
            draggable={false}
            animate={
              hovered
                ? { scale: [1, 1.06, 1.03, 1.06] }
                : { scale: 1 }
            }
            transition={
              hovered
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.35, ease: hoverEase }
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </motion.div>
    );
  }
  
  function IntroCard({
    slot,
    src,
    cardIndex,
    vp,
    revealDelay,
    revealDuration,
    onDone,
    hovered,
    onHover,
  }: {
    slot: Slot;
    src: string;
    cardIndex: number;
    vp: { w: number; h: number; centerX: number; slotScale: number };
    revealDelay: number;
    revealDuration: number;
    onDone?: () => void;
    hovered: boolean;
    onHover: (v: boolean) => void;
  }) {
    const x = vp.centerX + scaledSlotX(slot.x, vp.slotScale);
    const y = HERO_ROW_Y + slot.y;
    return (
      <motion.div
        initial={{ opacity: 0, x, y, rotate: slot.rotate, scale: slot.scale }}
        animate={{ opacity: 1, x, y, rotate: slot.rotate, scale: slot.scale }}
        transition={{ delay: revealDelay, duration: revealDuration, ease: "easeOut" }}
        onAnimationComplete={onDone}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: hovered ? 30 : slot.z,
        }}
      >
        <CardBox
          src={src}
          name={CARD_NAMES[cardIndex]}
          tagColor={CARD_TAG_COLORS[cardIndex]}
          onHover={onHover}
        />
      </motion.div>
    );
  }
  
  function LeadIntroCard({
    vp,
    src,
    onComplete,
    hovered,
    onHover,
  }: {
    vp: { w: number; h: number; centerX: number; slotScale: number };
    src: string;
    onComplete: () => void;
    hovered: boolean;
    onHover: (v: boolean) => void;
  }) {
    const introDelay = 0.8;
    const introDuration = 0.72;
    const travelToRightDuration = 0.6;
    const sweepLeftDuration = 1.6;
    const total = introDuration + travelToRightDuration + sweepLeftDuration;
    const slot6 = SLOTS[6];
    const slot0 = SLOTS[0];
    return (
      <motion.div
        initial={{ opacity: 0, x: vp.centerX, y: vp.h / 2 + 180, rotate: 0, scale: 0.3 }}
        animate={{
          opacity: [0, 1, 1, 1],
          x: [
            vp.centerX,
            vp.centerX,
            vp.centerX + scaledSlotX(slot6.x, vp.slotScale),
            vp.centerX + scaledSlotX(slot0.x, vp.slotScale),
          ],
          y: [vp.h / 2 + 180, HERO_ROW_Y, HERO_ROW_Y + slot6.y, HERO_ROW_Y + slot0.y],
          rotate: [0, 0, slot6.rotate, slot0.rotate],
          scale: [0.3, 1, slot6.scale, slot0.scale],
        }}
        transition={{
          delay: introDelay,
          duration: total,
          times: [
            0,
            introDuration / total,
            (introDuration + travelToRightDuration) / total,
            1,
          ],
          ease: [smoothEase, smoothEase, smoothEase],
        }}
        onAnimationComplete={onComplete}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: hovered ? 30 : 50,
        }}
      >
        <CardBox
          src={src}
          name={CARD_NAMES[0]}
          tagColor={CARD_TAG_COLORS[0]}
          onHover={onHover}
        />
      </motion.div>
    );
  }
  
  function ScrollLinkedCard({
    i,
    src,
    vp,
    clamped,
    lockProgress,
    hovered,
    onHover,
  }: {
    i: number;
    src: string;
    vp: { w: number; h: number; centerX: number; slotScale: number };
    clamped: MotionValue<number>;
    lockProgress: number;
    hovered: boolean;
    onHover: (v: boolean) => void;
  }) {
    const slot = SLOTS[i];
    const cascade = CASCADE[i];
    const lp = Math.max(lockProgress, 0.05);
    const p1 = lp * 0.33;
    const p2 = lp * 0.66;
    const cascadeLeftRef = vp.w * 0.4;
    const s1Cx = vp.centerX + scaledSlotX(slot.x, vp.slotScale);
    const s1Cy = HERO_ROW_Y + slot.y;
    const stackCx = vp.centerX;
    const stackCy = vp.h / 2;
    const s2Cx = cascadeLeftRef + cascade.left + CARD_SIZE / 2;
    const s2Cy = cascade.top + CARD_SIZE / 2;
  
    const x = useTransform(clamped, [0, p1, p2, lp], [s1Cx, stackCx, stackCx, s2Cx]);
    const y = useTransform(clamped, [0, p1, p2, lp], [s1Cy, stackCy, s2Cy, s2Cy]);
    const rotate = useTransform(clamped, [0, p1, lp], [slot.rotate, 0, cascade.rotate]);
    const scale = useTransform(clamped, [0, p1, lp], [slot.scale, 1, 1]);
  
    return (
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          rotate,
          scale,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: hovered ? 30 : cascade.z,
        }}
      >
        <CardBox
          src={src}
          name={CARD_NAMES[i]}
          tagColor={CARD_TAG_COLORS[i]}
          showPinnedTag={PINNED_TAG_INDICES.has(i)}
          pinnedPopupDelay={i === 4 ? 0.2 : 0.05}
          onHover={onHover}
        />
      </motion.div>
    );
  }
  
  function ScrollCardsOverlay({
    containerRef,
  }: {
    containerRef: React.RefObject<HTMLDivElement | null>;
  }) {
    const vp = useViewport(containerRef);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"],
    });
    const [introDone, setIntroDone] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [lockProgress, setLockProgress] = useState(0.5);
    const [scrollableHeight, setScrollableHeight] = useState(0);
  
    useMotionValueEvent(scrollYProgress, "change", (v) => setCurrentProgress(v));
  
    useLayoutEffect(() => {
      const measure = () => {
        const el = containerRef.current;
        if (!el) return;
        const sec2 = el.querySelector('[data-section="two"]') as HTMLElement | null;
        if (!sec2) return;
        const containerTop = el.getBoundingClientRect().top + window.scrollY;
        const sectionTwoTop = sec2.getBoundingClientRect().top + window.scrollY;
        const scrollable = el.scrollHeight - window.innerHeight;
        setScrollableHeight(scrollable);
        const lp = Math.min(0.99, Math.max(0.05, (sectionTwoTop - containerTop) / scrollable));
        setLockProgress(lp);
      };
      measure();
      const t = setTimeout(measure, 300);
      window.addEventListener("resize", measure);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", measure);
      };
    }, [containerRef, vp.w, vp.h]);
  
    // clamped progress motion value
    const clamped = useMotionValue(0);
    useMotionValueEvent(scrollYProgress, "change", (v) => {
      clamped.set(Math.min(v, lockProgress));
    });
    useEffect(() => {
      clamped.set(Math.min(scrollYProgress.get(), lockProgress));
    }, [lockProgress, clamped, scrollYProgress]);
  
    // reveal timings for intro
    const reveals = useMemo(() => {
      const introDelay = 0.8;
      const introDuration = 0.72;
      const travelToRightDuration = 0.6;
      const sweepLeftDuration = 1.6;
      const sweepStart = introDelay + introDuration + travelToRightDuration;
      const slot6x = SLOTS[6].x;
      const slot0x = SLOTS[0].x;
      return SLOTS.map((s, i) => {
        if (i === 0) return { delay: 0, duration: 0 };
        const progress = (s.x - slot6x) / (slot0x - slot6x);
        const t = getTimeForProgress(progress, smoothEase);
        const delay = sweepStart + t * sweepLeftDuration;
        const duration = i <= 3 ? 0.06 : 0.18;
        return { delay, duration };
      });
    }, []);
  
    const isLocked = currentProgress >= lockProgress;
    const wrapperStyle: CSSProperties = isLocked
      ? {
          position: "absolute",
          top: lockProgress * scrollableHeight,
          left: 0,
          width: "100%",
          height: vp.h,
          zIndex: 5,
          pointerEvents: "none",
        }
      : { position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" };

    return (
      <>
        {/* intro overlay - only while intro plays */}
        {!introDone && (
          <div style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}>
            {SLOTS.map((slot, i) => {
              if (i === 0) return null;
              return (
                <div key={`intro-${i}`} style={{ pointerEvents: "auto" }}>
                  <IntroCard
                    slot={slot}
                    src={CARD_IMAGES[i]}
                    cardIndex={i}
                    vp={vp}
                    revealDelay={reveals[i].delay}
                    revealDuration={reveals[i].duration}
                    hovered={hoveredIdx === i}
                    onHover={(v) => setHoveredIdx(v ? i : null)}
                  />
                </div>
              );
            })}
            <div style={{ pointerEvents: "auto" }}>
              <LeadIntroCard
                vp={vp}
                src={CARD_IMAGES[0]}
                onComplete={() => setIntroDone(true)}
                hovered={hoveredIdx === 0}
                onHover={(v) => setHoveredIdx(v ? 0 : null)}
              />
            </div>
          </div>
        )}
  
        {/* scroll-linked overlay - mounted once intro done, stays mounted */}
        {introDone && (
          <div style={wrapperStyle}>
            {SLOTS.map((_, i) => (
              <div key={`s-${i}`} style={{ pointerEvents: "auto" }}>
                <ScrollLinkedCard
                  i={i}
                  src={CARD_IMAGES[i]}
                  vp={vp}
                  clamped={clamped}
                  lockProgress={lockProgress}
                  hovered={hoveredIdx === i}
                  onHover={(v) => setHoveredIdx(v ? i : null)}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
  
  function ScrollIndicator() {
    const scrollBy = (dir: 1 | -1) =>
      window.scrollBy({ top: dir * window.innerHeight, behavior: "smooth" });
    const btnStyle: CSSProperties = {
      width: 36,
      height: 36,
      border: "1.5px solid rgba(0,0,0,0.15)",
      borderRadius: 8,
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.2s",
    };
    return (
      <div
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          style={btnStyle}
          onClick={() => scrollBy(-1)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronUp size={16} color="#111" />
        </button>
        <button
          style={btnStyle}
          onClick={() => scrollBy(1)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronDown size={16} color="#111" />
        </button>
      </div>
    );
  }
  
  function AnimatedWords({
    lines,
    style,
    baseDelay = 0,
    step = 0.08,
    blur = false,
  }: {
    lines: { text: string; color?: string }[];
    style: CSSProperties;
    baseDelay?: number;
    step?: number;
    blur?: boolean;
  }) {
    let gi = 0;
    return (
      <h1 style={style}>
        {lines.map((ln, li) => (
          <span key={li} style={{ display: "block", color: ln.color }}>
            {ln.text.split(" ").map((w, wi) => {
              const d = baseDelay + gi * step;
              gi++;
              return (
                <motion.span
                  key={`${li}-${wi}`}
                  initial={
                    blur
                      ? { opacity: 0, y: 20, filter: "blur(10px)" }
                      : { opacity: 0, y: 28 }
                  }
                  animate={
                    blur
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut", delay: d }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                  {w}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>
    );
  }
  
  function PrimaryBtn({ label = "Join for $9.99/m" }: { label?: string }) {
    return (
      <button
        style={{
          background: "#111",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          padding: "14px 28px",
          borderRadius: 9999,
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
      >
        {label}
      </button>
    );
  }
  function SecondaryBtn({ label = "Read more", outline = false }: { label?: string; outline?: boolean }) {
    return (
      <button
        style={{
          background: "transparent",
          color: "#111",
          fontSize: 15,
          fontWeight: 500,
          padding: "14px 20px",
          borderRadius: 9999,
          border: outline ? "1.5px solid rgba(0,0,0,0.15)" : "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = outline ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.06)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {label}
      </button>
    );
  }
  
  function HeroSection() {
    return (
      <section style={{ minHeight: "100vh", overflow: "hidden", position: "relative" }}>
        <main
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            paddingTop: 140,
            paddingLeft: 32,
            paddingRight: 32,
            textAlign: "center",
          }}
        >
          <AnimatedWords
            lines={[
              { text: "A place to discover" },
              { text: "you'r community." },
            ]}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-3px",
              color: "#111",
              maxWidth: 1100,
              margin: "0 auto",
              textAlign: "center",
            }}
          />
          {/* Reserve space for the card row overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              width: "100%",
              height: 260,
              marginTop: 40,
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.6,
              maxWidth: 480,
              marginTop: 48,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Artists can display their masterpieces, and buyers can discover and purchase
            works that resonate with them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              paddingBottom: 80,
              justifyContent: "center",
            }}
          >
            <PrimaryBtn />
            <SecondaryBtn />
          </motion.div>
        </main>
      </section>
    );
  }
  
  function SectionTwo() {
    const ref = useRef<HTMLElement | null>(null);
    return (
      <section
        ref={ref}
        data-section="two"
        style={{
          background: "#F2F2F0",
          minHeight: "calc(100vh - 30px)",
          padding: "80px 64px 0",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ width: 520, paddingTop: 32 }}>
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "2.5px",
              color: "rgba(0,0,0,0.45)",
              marginBottom: 20,
            }}
          >
            E-COMMERCE
          </motion.div>
          <AnimatedWords
            lines={[
              { text: "Showcase, Sell", color: "#111" },
              { text: "& acquire arts to", color: "#C0392B" },
              { text: "our marketplace.", color: "#111" },
            ]}
            step={0.06}
            blur
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          />
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            style={{
              fontFamily: "Inter Tight, sans-serif",
              marginTop: 28,
              fontSize: 15,
              fontWeight: 400,
              color: "rgba(0,0,0,0.55)",
              lineHeight: 1.65,
              maxWidth: 340,
            }}
          >
            Dynamic community where artists and buyers seamlessly merge. ArtFusion brings
            together creators and enthusiasts to share creativity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ display: "flex", marginTop: 48, gap: 12 }}
          >
            <PrimaryBtn />
            <SecondaryBtn outline />
          </motion.div>
        </div>
      </section>
    );
  }
  
  function BackgroundBlobs() {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "8%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(180,180,180,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "10%",
            width: 250,
            height: 250,
            background:
              "radial-gradient(circle, rgba(180,180,180,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background:
              "radial-gradient(circle, rgba(160,160,160,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    );
  }
  
export default function SliderHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="slider-hero-root"
      style={{
        background: "#F2F2F0",
        position: "relative",
        fontFamily: "Inter Tight, sans-serif",
      }}
    >
        <BackgroundBlobs />
        <ScrollIndicator />
        <ScrollCardsOverlay containerRef={containerRef} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <SectionTwo />
        </div>
      </div>
    );
  }