import './assets/scss/loading.scss';
import './assets/scss/style.scss';

import Coll from './assets/js/collapse';
import Modal from './assets/js/modal';
import Preview from './assets/js/preview';

async function getContent(url = '') {
  try {
    let res = await fetch(url);
    res = await res.json();
    return res;
  } catch (err) {
    return err;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  // set-up collapse menu button
  const collapse = new Coll(null, 989);
  // set-up ajax preview and render class
  const preview = new Preview('#blog', 24);

  const contentToRender = [];

  // create preview for ajax content
  preview.createPreviewContent();

  // Fetch ajax content
  const content = await getContent('https://jsonplaceholder.typicode.com/posts');

  for await (const { id, title, body } of content) {
    const image = await getContent(`https://jsonplaceholder.typicode.com/photos/${id}`);

    const { thumbnailUrl: img } = image;
    contentToRender.push({ id, title, body, img });

    if (id >= preview.maxItems) break;
  }

  // set ajax content
  preview.setContent = contentToRender;
  // render ajax content
  preview.renderAsyncContent();

  // set-up modal window class
  const modal = new Modal('#blog article', preview.renederedContent);
});

// Checks if window is loaded and remove then the loading div
window.addEventListener('load', () => {
  const element = document.querySelector('#loading');
  document.body.removeChild(element);
});
