/** Canvas-эффект «искр» (аналог SparklesCore / tsParticles). */

type Sparkle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  phase: number;
  pulseSpeed: number;
  color: string;
};

type SparkleRuntime = {
  stop: () => void;
};

const SPARKLES_SELECTOR = '.sparkles-atmosphere';
const CANVAS_SELECTOR = '.sparkles-atmosphere__canvas';

const runtimes = new WeakMap<HTMLElement, SparkleRuntime>();

const COLOR_POOLS = {
  default: [
    '0, 171, 179',
    '51, 191, 198',
    '0, 109, 115',
    '255, 255, 255',
    '255, 212, 23',
    '75, 85, 99',
  ],
  /** Награды — преобладание CTA / золотых оттенков */
  awards: [
    '255, 212, 23',
    '255, 212, 23',
    '255, 212, 23',
    '255, 230, 100',
    '255, 193, 7',
    '255, 248, 200',
    '255, 255, 255',
    '0, 171, 179',
    '51, 191, 198',
  ],
} as const;

type SparkleColorKey = keyof typeof COLOR_POOLS;

function pickColor(poolKey: string): string {
  const pool =
    poolKey in COLOR_POOLS
      ? COLOR_POOLS[poolKey as SparkleColorKey]
      : COLOR_POOLS.default;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

function particleCount(width: number, height: number, density: number): number {
  return Math.max(80, Math.round((density * width * height) / (400 * 400)));
}

function mountSparkles(root: HTMLElement): SparkleRuntime | null {
  if (root.dataset.sparklesInit === '1') {
    return runtimes.get(root) ?? null;
  }

  if (!window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  const canvas = root.querySelector<HTMLCanvasElement>(CANVAS_SELECTOR);
  if (!canvas) return null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const density = Number(root.dataset.sparkleDensity ?? 150);
  const speed = Number(root.dataset.sparkleSpeed ?? 5);
  const minSize = Number(root.dataset.sparkleMinSize ?? 0.45);
  const maxSize = Number(root.dataset.sparkleMaxSize ?? 1.8);
  const colorKey = root.dataset.sparkleColors ?? 'default';

  let width = 0;
  let height = 0;
  let particles: Sparkle[] = [];
  let raf = 0;
  let running = true;
  let started = false;

  const spawn = () => {
    particles = [];
    const count = particleCount(width, height, density);
    const drift = 0.08 * speed;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * drift,
        vy: (Math.random() - 0.5) * drift,
        size: minSize + Math.random() * (maxSize - minSize),
        baseOpacity: 0.12 + Math.random() * 0.88,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.4 + Math.random() * speed,
        color: pickColor(colorKey),
      });
    }
  };

  const drawStatic = () => {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color}, ${p.baseOpacity})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const resize = () => {
    const rect = root.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawn();
    if (reducedMotion) {
      drawStatic();
    }
    if (!started) {
      started = true;
      root.dataset.sparklesInit = '1';
      if (!reducedMotion) {
        raf = requestAnimationFrame(tick);
      }
    }
  };

  const tick = (now: number) => {
    if (!running) return;
    const t = now / 1000;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -4) p.x = width + 4;
      if (p.x > width + 4) p.x = -4;
      if (p.y < -4) p.y = height + 4;
      if (p.y > height + 4) p.y = -4;

      const opacity =
        p.baseOpacity * (0.5 + 0.5 * Math.sin(t * p.pulseSpeed + p.phase));
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(tick);
  };

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(root);
  resize();

  const runtime: SparkleRuntime = {
    stop: () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      delete root.dataset.sparklesInit;
      ctx.clearRect(0, 0, width, height);
      runtimes.delete(root);
    },
  };

  runtimes.set(root, runtime);
  return runtime;
}

export function initCanvasSparkles(): void {
  document.querySelectorAll<HTMLElement>(SPARKLES_SELECTOR).forEach((root) => {
    mountSparkles(root);
  });
}

export function destroyCanvasSparkles(): void {
  document.querySelectorAll<HTMLElement>(SPARKLES_SELECTOR).forEach((root) => {
    runtimes.get(root)?.stop();
  });
}
