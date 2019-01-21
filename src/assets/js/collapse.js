export default class {
  constructor(selector, toggleMaxSize) {
    this.selector = selector || '[data-toggle-element]';
    this.elements = document.querySelectorAll(this.selector);
    this.toggleElements = [];
    this.toggleClass = [];
    this.toggleMaxSizeDefault = toggleMaxSize || 0;
    this.toggleMaxSize = [];

    this.init();
  }

  init() {
    this.elements.forEach((element, i) => {
      this.toggleElements[i] = document.querySelector(element.dataset.toggleElement);
      this.toggleClass[i] = element.dataset.toggleClass || 'show';
      this.toggleMaxSize[i] = element.dataset.toggleMaxSize || this.toggleMaxSizeDefault;

      element.addEventListener('click', () => {
        this.toggleElements[i].classList.toggle(this.toggleClass[i]);
      });
    });
  }
}
