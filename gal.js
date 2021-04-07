import images from "./gallery-items.js"
console.log(images);

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
    />
  </a>
</li>`
};
// console.log(makeImgListMarkup)
const imgList = document.querySelector('.js-gallery');
// console.log(imgList);

const makeImgListRows = images.map(makeImgListMarkup).join('');
// console.log(makeImgListRows);

imgList.insertAdjacentHTML("afterbegin", makeImgListRows);


imgList.addEventListener('click',onImgListClick)

function onImgListClick(e) {
  // console.log(e.currentTarget);
   e.preventDefault();
  // document.body.style.overflow = 'hidden';
  const isImgListSwach = e.target.classList.contains('gallery__image')
  if (!isImgListSwach) {
    return;
  }

  const cuurentImage = document.querySelector('.js-lightbox.is-open');
  if (cuurentImage) {
    cuurentImage.classList.remove('is-open')
  }

  console.log(e.target.dataset.source);

  const lightbox = document.querySelector('.js-lightbox')

  console.log(lightbox)

  lightbox.classList.add('is-open');

  const lightboxImage = document.querySelector('img.lightbox__image');
  
  console.log(lightboxImage)
  lightboxImage.src = `${e.target.dataset.source}`;
  lightboxImage.alt = `${e.target.alt}`

}
// function setImageAtributes(atribute) {
//   lightboxImage.src = atribute;
//   lightboxImage.alt = atribute
  
// }