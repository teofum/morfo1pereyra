const nextRotation = '-90deg';
const moreRotation = '-90deg';
const lastRotation = '90deg';
const prevRotation = '90deg';

const check3dNextBackEnabled = (container, images, next, back) => {
  const count = images.length;
  const index = parseInt(
    getComputedStyle(container).getPropertyValue('--g3d-index'),
    10);

  next.disabled = index >= (count - 1);
  back.disabled = index <= 0;
};

const update3dGalleryTransforms = (images, index) => {
  images.forEach((img, i) => {
    // Translate 50% away from center, plus 5% per image in each direction
    let translatePercent = 65 * (i < index ? -1 : i > index ? 1 : 0);
    translatePercent += ((i - index) * 5);
    
    const depth = (i === index ? 0 : -500);

    let rotation = '0deg';
    if (i === index - 1) rotation = lastRotation;
    else if (i < index) rotation = prevRotation;
    else if (i === index + 1) rotation = nextRotation;
    else if (i > index) rotation = moreRotation;

    const transform = `translateZ(${depth}px) translateX(${translatePercent}%) rotateY(${rotation})`;
    img.style.setProperty('transform', transform);
  });
}

const init3dGallery = (name, count) => {
  // Set the base path for images and find the gallery container element
  const basePath = `assets/gallery3d/${name}`;
  const container = document.getElementById(`gallery3d_${name}`);
  container.classList.add('gallery-3d-container');

  // Create inner container
  const content = document.createElement('div');
  content.className = 'gallery-3d-content';

  // Create the gallery nav elements
  const back = document.createElement('button');
  back.id = `gallery_3d_${name}_back`;
  back.className = 'gallery-nav pattern-diagonal-lines-sm';
  back.appendChild(createArrowSVG(true));

  const next = document.createElement('button');
  next.id = `gallery_3d_${name}_next`;
  next.className = 'gallery-nav pattern-diagonal-lines-sm';
  next.appendChild(createArrowSVG(false));

  // Build the gallery structure
  container.appendChild(back);
  container.appendChild(content);
  container.appendChild(next);

  // Populate the gallery with images
  const images = [];
  for (let i = 1; i <= count; i++) {
    let istr = i.toString();
    if (istr.length === 1) istr = `0${istr}`;

    const img = document.createElement('img');
    img.className = 'gallery-3d-image';
    img.src = `${basePath}/${istr}.jpg`;
    img.alt = `img ${istr}`;

    images.push(img);
    content.appendChild(img);
  }

  // Add next/back handlers
  back.addEventListener('click',
    () => {
      const index = parseInt(
        getComputedStyle(container).getPropertyValue('--g3d-index'),
        10);
      container.style.setProperty('--g3d-index', (index - 1).toString());
      update3dGalleryTransforms(images, index - 1);
      check3dNextBackEnabled(container, images, next, back);
    }
  );

  next.addEventListener('click',
    () => {
      const index = parseInt(
        getComputedStyle(container).getPropertyValue('--g3d-index'),
        10);
      container.style.setProperty('--g3d-index', (index + 1).toString());
      update3dGalleryTransforms(images, index + 1);
      check3dNextBackEnabled(container, images, next, back);
    }
  );

  const index = 0;
  container.style.setProperty('--g3d-index', index.toString());
  update3dGalleryTransforms(images, index);

  check3dNextBackEnabled(container, images, next, back);
};

init3dGallery('entrega', 6);