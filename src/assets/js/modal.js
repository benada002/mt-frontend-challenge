import DOMPurify from 'dompurify';

export default class {
  constructor(selector = '', content = []) {
    this.content = content;
    this.modalElement = document.createDocumentFragment();
    this.element = {};
    this.elements = document.querySelectorAll(selector);

    window.addEventListener('load', this.init());
  }

  init() {
    if (typeof this.elements !== 'object') {
      throw new Error('No selector setted');
    }

    this.createModalContainer();

    this.elements.forEach((ele, i) =>
      ele.addEventListener('click', () => {
        this.element = {
          ele,
          i
        };

        this.render();
      })
    );
  }

  createModalContainer() {
    // Create outer container with a blurry background
    const bulrDiv = this.modalElement.appendChild(document.createElement('div'));
    bulrDiv.style.position = 'fixed';
    bulrDiv.style.display = 'none';
    bulrDiv.style.top = 0;
    bulrDiv.style.left = 0;
    bulrDiv.style.width = '100%';
    bulrDiv.style.height = '100%';
    bulrDiv.style.backgroundColor = 'rgba(0,0,0,0.6)';
    bulrDiv.id = 'modal-outer';

    // Create content wrapper
    const contentWrapper = bulrDiv.appendChild(document.createElement('div'));
    contentWrapper.style.backgroundColor = '#fff';
    contentWrapper.style.position = 'absolute';
    contentWrapper.style.height = 'auto';
    contentWrapper.style.width = 'auto';
    contentWrapper.style.top = '10%';
    contentWrapper.style.left = '10%';
    contentWrapper.style.bottom = '10%';
    contentWrapper.style.right = '10%';
    contentWrapper.style.borderRadius = '3px';
    contentWrapper.style.padding = '10px';
    contentWrapper.id = 'modal-wrapper';

    // Create content container
    const contentDiv = contentWrapper.appendChild(document.createElement('div'));
    contentDiv.style.backgroundColor = '#fff';
    contentDiv.style.position = 'relative';
    contentDiv.style.height = 'auto';
    contentDiv.style.maxHeight = '100%';
    contentDiv.style.width = 'auto';
    contentDiv.style.maxWidth = '100%';
    contentDiv.style.borderRadius = '3px';
    contentDiv.style.overflow = 'auto';
    contentDiv.id = 'modal-inner';

    // Create close icon container
    const closeIcon = contentWrapper.appendChild(document.createElement('div'));
    closeIcon.style.position = 'absolute';
    closeIcon.style.height = '30px';
    closeIcon.style.width = '30px';
    closeIcon.style.top = '-15px';
    closeIcon.style.right = '-15px';
    closeIcon.style.borderRadius = '50%';
    closeIcon.style.background = '#3f51b5';
    closeIcon.style.cursor = 'pointer';
    closeIcon.id = 'modal-close';

    // Create close icon using svg
    closeIcon.appendChild(
      document.createRange().createContextualFragment(
        `<svg id="modal-icon" height="30" width="30" style="pointer-events: none;">
          <line y1="9" x1="9" y2="21" x2="21" style="stroke:#aeea00; stroke-width:3; stroke-linecap:round;"/>
          <line y1="21" x1="9" y2="9" x2="21" style="stroke:#aeea00; stroke-width:3; stroke-linecap:round;"/>
        </svg>`
      )
    );

    document.body.appendChild(this.modalElement);
    
    this.modalElement = document.querySelector('#modal-outer');

    document.body.addEventListener('click', e => {
      if (e.target.id === 'modal-close') this.close();
    });
  }

  open() {
    this.modalElement.style.display = 'block';
  }

  render() {
    const { i } = this.element;

    const html = `
      <div class="container-full">
        <h1>${this.content[i].title}</h1>
        <div class="row">
          <div class="col-12 col-l-4">
            <img src="${this.content[i].img}" />
          </div>
          <div class="col-12 col-l-8">
            <p>${this.content[i].body}</p>
          </div>
        </div>
      </div>
    `;

    const renderContent = document.createRange().createContextualFragment(DOMPurify.sanitize(html));

    this.modalElement.querySelector('#modal-inner').appendChild(renderContent);

    this.open();
  }

  close() {
    this.modalElement.style.display = 'none';
    
    // Remove previous content
    this.modalElement
      .querySelector('#modal-inner')
      .removeChild(this.modalElement.querySelector('#modal-inner').firstElementChild);
  }
}
