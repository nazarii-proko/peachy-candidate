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
    console.log("change");
    if (!this._compareAtPrice) {
      this._compareAtPrice = this.querySelector(".js-compare-at-price");
    }
    if (!this._price) {
      this._price = this.querySelector(".js-price");
    }

    const variant = this.variantsJson[e.target.value];
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
}

customElements.define("product-card", ProductCard);
