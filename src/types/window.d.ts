interface Window {
  openGiftModal: () => void;
  closeGiftModal: () => void;
  openCallbackModal: () => void;
  closeCallbackModal: (event?: Event) => void;
  initScrollReveal: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  changeSlide: (direction: number) => void;
  toggleZoom: (event: Event) => void;
  closeReviewForm: () => void;
  openFavoritesWidget?: () => void;
  /** Переключение вкладки поиска («nemo» | «tourvisor»); задаётся в SearchWidget.astro */
  switchSearchTab?: (targetId: string, focus?: boolean) => void;
  /** Визуальная подсказка страны над виджетом Tourvisor (программный выбор недоступен) */
  tvSelectCountry?: (countryName: string) => void;
  loadTourvisor?: (showLoading?: boolean) => void;
  initNemoWidget?: () => void;
  __nemoAssetsPromise?: Promise<void>;
  __tourvisorScriptAdded?: boolean;
  __tourvisorReady?: boolean;
}
