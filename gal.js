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
  document.body.style.overflow = 'hidden';
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
  document.body.removeAttribute('Style');
};

// додає клас модалці
function addLightboxClass() {
  lightbox.classList.add('is-open');
  window.addEventListener('keydown', OnEscKeyPress);
  window.addEventListener('keydown', changeOriginImageByKeys);
};

// видаляє клас модалці
function removeLightboxClass() {
  window.removeEventListener('keydown', OnEscKeyPress);
   window.removeEventListener('keydown',changeOriginImageByKeys)
  lightbox.classList.remove('is-open');
}


// закриває модалку при кліку на lightboxOverlay
lightboxOverlay.addEventListener('click', onOverlayClick);
function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    removeLightboxClass();
    removeImageAtributes()
  } 
}

// закриття модалки по ESC
function OnEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    removeLightboxClass();
    removeImageAtributes();
     console.log(evt.code)
  }
}
// переключає картинки при нажиманні на ArrowLeft і ArrowRight
  let currentImg = 0
function changeOriginImageByKeys(evt) {
  const onArrowRight = evt.code === "ArrowRight"
  const onArrowLeft = evt.code === "ArrowLeft"
  if (!onArrowRight && !onArrowLeft) {
    return;
  }
  if (onArrowRight) {
    currentImg += 1;
  }
  if (onArrowLeft) {
    currentImg -= 1;
  }
  // з
  if (currentImg > images.length - 1) {
    currentImg = 0;
  };
  if (currentImg < 0) {
    currentImg=images.length-1
  }
    setModalImg(currentImg)
  // console.log(currentImg)
}
function setModalImg(index) {
  // console.log(images[index]);
  const oriImg = images[index]
  lightboxImage.src = oriImg.original
}
