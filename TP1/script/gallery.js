const checkNextBackEnabled = (slides, next, back) => {
  const count = parseInt(
    getComputedStyle(slides).getPropertyValue('--slides-count'),
    10);
  const cols = parseInt(
    getComputedStyle(slides).getPropertyValue('--slides-cols'),
    10);
  const rows = parseInt(
    getComputedStyle(slides).getPropertyValue('--slides-rows'),
    10);
  const current = parseInt(
    getComputedStyle(slides).getPropertyValue('--slides-current'),
    10);

  const min = 0;
  const max = Math.ceil(count / rows - cols);

  next.disabled = current >= max;
  back.disabled = current <= min;
};

const createArrowSVG = (back) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', back ? '17 2 7 12 17 22' : '7 2 17 12 7 22');

  svg.appendChild(polyline);
  return svg;
};

const initGallery = (name, count, cols, rows) => {
  // Set the base path for images and find the gallery container element
  const basePath = `assets/gallery/${name}`;
  const container = document.getElementById(`gallery_${name}`);
  container.classList.add('gallery-container');

  // Create the slides elements
  const slides = document.createElement('div');
  slides.id = `gallery_${name}_slides`;
  slides.className = 'gallery-content slides';

  const content = document.createElement('div');
  content.className = 'slides-content';

  // Create the gallery nav elements
  const back = document.createElement('button');
  back.id = `gallery_${name}_back`;
  back.className = 'gallery-nav pattern-diagonal-lines-sm';
  back.appendChild(createArrowSVG(true));

  const next = document.createElement('button');
  next.id = `gallery_${name}_next`;
  next.className = 'gallery-nav pattern-diagonal-lines-sm';
  next.appendChild(createArrowSVG(false));

  // Create the detail view elements
  const detail = document.createElement('div');
  detail.id = `gallery_${name}_detail`;
  detail.className = 'gallery-detail-container';

  const detailImg = document.createElement('img');
  detailImg.id = `gallery_${name}_detailImg`;
  detailImg.className = 'gallery-detail';

  const detailBack = document.createElement('button');
  detailBack.id = `gallery_${name}_detailBack`;
  detailBack.className = 'gallery-nav gallery-detail-close pattern-diagonal-lines-sm';
  detailBack.addEventListener('click', () => detail.style.removeProperty('transform'));
  detailBack.appendChild(createArrowSVG(true));

  // Set the slides CSS properties
  slides.style.setProperty('--slides-count', count);
  slides.style.setProperty('--slides-cols', cols);
  slides.style.setProperty('--slides-rows', rows);

  // Build the gallery structure
  slides.appendChild(content);
  container.appendChild(back);
  container.appendChild(slides);
  container.appendChild(next);
  detail.appendChild(detailImg);
  detail.appendChild(detailBack);
  container.parentElement?.appendChild(detail);

  // Populate the gallery with slides
  for (let i = 1; i <= count; i++) {
    let slideStr = i.toString();
    if (slideStr.length === 1) slideStr = `0${slideStr}`;

    const img = document.createElement('img');
    img.src = `${basePath}/${slideStr}.thumb.jpg`; // Use thumbnails
    img.alt = `img ${slideStr}`;

    const accent = document.createElement('div');
    accent.className = 'gallery-item-accent pattern-diagonal-lines-sm';
    accent.innerHTML = '&nbsp;';

    const number = document.createElement('div');
    number.className = 'gallery-item-number';
    number.innerHTML = slideStr;

    const slide = document.createElement('div');
    slide.className = 'slide gallery-item';
    slide.appendChild(img);
    slide.appendChild(accent);
    slide.appendChild(number);

    content.appendChild(slide);

    // Detail handler
    slide.addEventListener('click',
      () => {
        detailImg.src = `${basePath}/${slideStr}.jpg`;
        detail.style.setProperty('transform', 'translateX(0)');
      }
    );
  }

  // Add next/back handlers
  back.addEventListener('click',
    () => {
      const current = parseInt(
        getComputedStyle(slides).getPropertyValue('--slides-current'),
        10);
      slides.style.setProperty('--slides-current', (current - 1).toString());
      checkNextBackEnabled(slides, next, back);
    }
  );

  next.addEventListener('click',
    () => {
      const current = parseInt(
        getComputedStyle(slides).getPropertyValue('--slides-current'),
        10);
      slides.style.setProperty('--slides-current', (current + 1).toString());
      checkNextBackEnabled(slides, next, back);
    }
  );

  checkNextBackEnabled(slides, next, back);
};

initGallery('photos', 20, 3, 1);
initGallery('sintesis', 8, 2, 2);
initGallery('stencil', 14, 3, 1);