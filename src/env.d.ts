/// <reference types="astro/client" />
/// <reference types="astro/env" />

interface ImportMetaEnv {
  /** mtime og-image.* (сек), задаётся в astro.config.mjs при сборке / старте dev */
  readonly OG_IMAGE_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Детерминированный плавный скролл — одинаковый во всех браузерах (см. Layout.astro) */
  smoothScrollTo: (top: number, onDone?: () => void) => void;
  /** Аналог scrollIntoView({ block: 'start' }) с учётом scroll-margin-top */
  smoothScrollIntoView: (el: Element | null, onDone?: () => void) => void;
}
