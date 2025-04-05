import Swiper from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "@/shopify/snippets/product-card";

const FeaturedProducts = {
  onLoad() {
    this._init();
  },

  _init() {
    const swiper = this.container.querySelector(".swiper");
    if (!swiper) return;

    const pagination = swiper.querySelector(".swiper-pagination");
    new Swiper(swiper, {
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true
      },
      speed: 300,
      modules: [Autoplay, Pagination, EffectFade],
      pagination: {
        el: pagination,
        clickable: true,
      },
      effect: "fade",
      breakpoints: {
        autoplay: false,
        640: {
          effect: "slide",
          enabled: false
        }
      },
    });
  },
};

export default FeaturedProducts;
