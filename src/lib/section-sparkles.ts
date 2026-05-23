import { destroyCanvasSparkles, initCanvasSparkles } from './canvas-sparkles';

let lifecycleBound = false;

/** После layout / View Transition — слой уже в DOM */
function scheduleSparklesInit(): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initCanvasSparkles();
    });
  });
}

/** Инициализация искр (журнал, награды, /blog/) — один раз на Layout */
export function bindSectionSparklesLifecycle(): void {
  scheduleSparklesInit();

  if (lifecycleBound) return;
  lifecycleBound = true;

  document.addEventListener('astro:page-load', scheduleSparklesInit);
  document.addEventListener('astro:before-swap', destroyCanvasSparkles);
}
