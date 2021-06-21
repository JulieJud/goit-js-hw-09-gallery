import './sass/main.scss';


import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('ul.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const overlay = document.querySelector('.lightbox__overlay');
const lightboxImgEl = document.querySelector('img.lightbox__image');
const btnCloseEl = document.querySelector('button[data-action="close-lightbox"]',);



const galleryMarkup = makeGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick)
window.addEventListener('click', openModalClick);

window.addEventListener('click', CloseModalClick);



function makeGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return`<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}



function onGalleryContainerClick(event) {
      event.preventDefault();
  
   const galleryImage = event.target;
    if (galleryImage.nodeName !== 'IMG') {
    return

  }
  
  lightboxImgEl.src = event.target.dataset.source;
  lightboxImgEl.alt = event.target.alt;
  lightboxImgEl.dataset.index = event.target.dataset.index

};


function openModalClick(event) {
  window.addEventListener('keyup', EscapeClick);
  window.addEventListener('keyup', scrollImages)

  if (event.target.nodeName === 'IMG') {
    lightbox.classList.add('is-open');
  }
}



function CloseModalClick(event) {
  if (event.target.nodeName !== 'IMG') {
    lightbox.classList.remove('is-open');

    lightboxImgEl.src = '';
    lightboxImgEl.alt = '';
  }
}

function EscapeClick (event) {
  if (event.key === 'Escape') {
    lightbox.classList.remove('is-open');
  }
};

let originImages = [];
galleryItems.forEach(item => {
originImages.push(item.original);
});

function scrollImages(event){
  let index = originImages .indexOf(lightboxImgEl.src);

  if (event.key === 'ArrowRight') {
    if (index < originImages .length - 1) {
     lightboxImgEl.setAttribute("src", originImages [index + 1]);
    } else {
      index = -1;
      lightboxImgEl.setAttribute("src", originImages [index + 1]);
    }
  }

  if (event.key === 'ArrowLeft') {
    if (index === 0) {
      index = originImages .length;
     lightboxImgEl.setAttribute("src",originImages [index - 1]);
    } else lightboxImgEl.setAttribute("src", originImages [index - 1]);
  }
}