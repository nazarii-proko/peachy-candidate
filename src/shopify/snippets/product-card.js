import "@/shopify/snippets/dropdown";

class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.variantIdInput = this.querySelector("input[name='variant-id']");
  }
  connectedCallback() {
    this._init();
  }

  _init() {
    const atcButton = this.querySelector(".js-atc-button");
    atcButton.addEventListener("click", this._addToCart.bind(this));

    this.variantIdInput?.addEventListener(
      "change",
      this._onVariantChange.bind(this)
    );
  }

  _addToCart() {
    console.log(this.variantId);
    window.CartJS.addItem(this.variantId, {
      success: function () {
        alert("Added!");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (!errorThrown) return;
        alert("Error: " + errorThrown + "!");
      },
    });
  }

  _onVariantChange(e) {
    if (!this._compareAtPrice) {
      this._compareAtPrice = this.querySelector(".js-compare-at-price");
    }
    if (!this._price) {
      this._price = this.querySelector(".js-price");
    }

    const variant = this.variantsJson[e.target.value];
    this.selectedImage = variant.imagePosition;
    if (variant.compareAtPrice >= variant.price) {
      this._compareAtPrice.innerHTML = window.Shopify.formatMoney(
        variant.compareAtPrice
      );
      this._compareAtPrice.setAttribute("aria-hidden", false);
    } else {
      this._compareAtPrice.setAttribute("aria-hidden", true);
    }
    this._price.innerHTML = window.Shopify.formatMoney(variant.price);
  }

  get variantId() {
    return this.variantIdInput.value;
  }

  get variantsJson() {
    if (!this._variantsJson) {
      this._variantsJson = JSON.parse(
        this.querySelector(".js-variants-json").innerHTML
      );
    }
    return this._variantsJson;
  }

  get images() {
    if (!this._images) {
      this._images = this.querySelectorAll(".js-product-img");
    }
    return this._images;
  }

  get selectedImage() {
    if (!this._selectedImage) {
      this._selectedImagePosition0 = Array.from(this.images).findIndex(
        (image) => image.getAttribute("aria-selected") === "true"
      );
      this._selectedImage = this.images[this._selectedImagePosition0];
    }

    return this._selectedImage;
  }

  set selectedImage(position) {
    const position0 = position - 1;

    if (position0 === this._selectedImagePosition0) {
      console.warn(`The image with position: ${position} is already selected.`);
      return;
    }

    if (position0 >= 0 && position0 < this.images.length) {
      this.selectedImage.setAttribute("aria-selected", "false");
      this._selectedImagePosition0 = position0;
      this._selectedImage = this.images[position0];
      this._selectedImage.setAttribute("aria-selected", "true");
    } else {
      console.error(`There is no image with position: ${position}`);
    }
  }
}

customElements.define("product-card", ProductCard);
