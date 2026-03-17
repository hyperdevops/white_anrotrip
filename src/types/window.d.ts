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
}
