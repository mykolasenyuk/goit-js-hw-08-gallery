import images from "./gallery-items.js"

const imgList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('img.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxCloseBtn= document.querySelector('button[data-action="close-lightbox"]')

const makeImgListMarkup = image => {
    // console.log(image)
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
       loading="lazy"
    />
  </a>
</li>`
};


const makeImgListRows = images.map(makeImgListMarkup).join('');

imgList.insertAdjacentHTML("afterbegin", makeImgListRows);

imgList.addEventListener('click', onImgListClick);
lightbox.addEventListener('click',onModalCloseBtn)

function onImgListClick(e) {
   e.preventDefault();
  // document.body.style.overflow = 'hidden';
  const isImgListSwach = e.target.classList.contains('gallery__image')
  if (!isImgListSwach) {
    return;
  }
 

addLightboxClass()

 addImageAtributes(e)

};

function onModalCloseBtn(e) {
  // const onLightboxOverlay = e.target === lightboxOverlay;
  const onOverlayCloseBtn = e.target === lightboxCloseBtn;
  // console.log(e.currentTarget)
  if (onOverlayCloseBtn) {
    removeLightboxClass();
    removeImageAtributes()

  }
}

// додає атрибути src i alt
function addImageAtributes(atribut) {
  lightboxImage.src = `${atribut.target.dataset.source}`;
  lightboxImage.alt = `${atribut.target.alt}`
  // console.log(lightboxImage)
  // console.log(atribut.target)
};
// очищає атрибути src i alt
function removeImageAtributes() {
  lightboxImage.src = "";
  lightboxImage.alt = "";
};
// додає клас модалці
function addLightboxClass() {
  
  lightbox.classList.add('is-open');
  window.addEventListener('keydown', OnEscKeyPress)
};
// видаляє клас модалці
function removeLightboxClass() {
  window.removeEventListener('keydown',OnEscKeyPress)
  lightbox.classList.remove('is-open');
}


// закриває модалку при кліку на lightboxOverlay
lightboxOverlay.addEventListener('click', onOverlayClick);
function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
removeLightboxClass() 
    
  } 
}
// закриття модалки по ESC
function OnEscKeyPress(evt) {
 
  if (evt.code === 'Escape') {
    removeLightboxClass()
  }
  //  console.log(evt.code)
  
}
