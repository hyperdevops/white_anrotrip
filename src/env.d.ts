/// <reference types="astro/client" />
/// <reference types="astro/env" />

interface Window {
  /** Детерминированный плавный скролл — одинаковый во всех браузерах (см. Layout.astro) */
  smoothScrollTo: (top: number, onDone?: () => void) => void;
  /** Аналог scrollIntoView({ block: 'start' }) с учётом scroll-margin-top */
  smoothScrollIntoView: (el: Element | null, onDone?: () => void) => void;
}
