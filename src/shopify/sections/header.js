import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const Header = {
  onLoad() {
    this._init();
    this._initCartToggle();
    // this._showHelper();
  },

  _init() {
    this.sliderWrapper = this.container.querySelector(".swiper");
    if (!this.sliderWrapper) return;

    this.slider = new Swiper(this.sliderWrapper, {
      slidesPerView: 1,
      autoplay: true,
      modules: [Autoplay],
    });
  },

  _initCartToggle() {
    this.cartToggle = this.container.querySelector("[data-cart-open-close]");
    this.cartBody = this.container.querySelector("[data-cart-view]");

    if (!this.cartToggle || !this.cartBody) return;

    this.cartToggle.addEventListener("click", () => {
      this.cartBody.classList.toggle("active");
    });
  },

  _showHelper() {
    this.media = window.matchMedia(Shopify.theme.media.md);
    this.media.addEventListener("change", (ev) =>
      ev.matches ? console.log("Desktop") : console.log("Mobile")
    );
  },
};

export default Header;
