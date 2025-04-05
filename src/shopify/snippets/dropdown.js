class Dropdown extends HTMLElement {
  static instances = new Set();
  static handleClickOutside(e) {
    Dropdown.instances.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.close();
      }
    });
  }

  constructor() {
    super();

    this.input = this.querySelector("input");
    this._selected = this.querySelector(".js-selected")
  }

  connectedCallback() {
    this._init();
  }

  disconnectedCallaback() {
    Dropdown.instances.delete(this);

    if (Dropdown.instances.size === 0) {
      window.removeEventListener("click", Dropdown.handleClickOutside);
    }
  }

  _init() {
    // click outside
    if (Dropdown.instances.size === 0) {
      window.addEventListener("click", Dropdown.handleClickOutside);
    }
    Dropdown.instances.add(this);

    const toggleBtn = this.querySelector(".js-toggle");

    toggleBtn.addEventListener("click", (e) => {
      if (!this.expanded) {
        this.open();
      } else {
        this.close();
      }
    });

    const items = this.querySelectorAll("[data-value]");

    items.forEach((item) =>
      item.addEventListener("click", (e) => {
        this.value = item.dataset.value;
        this.close();
      })
    );
  }

  open() {
    this.expanded = true;
  }

  close() {
    this.expanded = false;
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(expanded) {
    this.setAttribute("aria-expanded", Boolean(expanded));
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    if (value === this.input.value) {
      return;
    }
    const item = this.querySelector(`[data-value="${value}"]`);
    if (item) {
      this.querySelector(`[data-value="${this.input.value}"]`).setAttribute(
        "aria-selected",
        "false"
      );
      item.setAttribute("aria-selected", "true");
      this._selected.innerHTML = item.innerHTML;
      this.input.value = value;
      this.input.dispatchEvent(new Event("change"));
    } else {
      console.error(`There is no item with value: ${value}`);
    }
  }
}

customElements.define("custom-dropdown", Dropdown);
