export default class {
  constructor(selector, max = 0) {
    this.maxItems = max;
    this.element = document.querySelector(selector);
    this.content = [];
    this.renederedContent = [];
    this.fragment = document.createDocumentFragment();
  }

  // sets content which should be rendered
  set setContent(val) {
    this.content = val;
  }

  createPreviewContent() {
    for (let i = 0; i < this.maxItems; i++) {
      this.fragment.appendChild(document.createElement('article'));

      const img = this.fragment.children[i].appendChild(document.createElement('div'));
      img.classList.add('img');
      img.style.height = '150px';

      const headline = this.fragment.children[i].appendChild(document.createElement('h1'));
      headline.style.backgroundColor = '#e5e5e5';
    }
    this.element.appendChild(this.fragment);
  }

  // render content and saves rendered content in this.renederedContent
  renderAsyncContent() {
    while (this.content.length) {
      this.renederedContent.push(this.content[0]);

      const { title, img } = this.content[0];

      const imgNode = this.element.childNodes[this.renederedContent.length - 1].querySelector(
        'div'
      );
      imgNode.style.height = 'auto';
      imgNode.appendChild(document.createElement('img')).src = img;

      const headNode = this.element.childNodes[this.renederedContent.length - 1].querySelector(
        'h1'
      );
      headNode.style.backgroundColor = '#fff';
      headNode.appendChild(document.createTextNode(title));

      this.content.splice(0, 1);
    }
  }
}
