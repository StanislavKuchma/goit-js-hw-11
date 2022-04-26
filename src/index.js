import './css/styles.css';
import NewsApiService from './api-service';
import SimpleLightbox from "simplelightbox";
// // Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const button = document.querySelector('.form-button')

const newsApiService = new NewsApiService();

button.addEventListener('click', onClickMore);
form.addEventListener('submit', onSubmit);
container.addEventListener(`click`, onClick); 

function onClickMore(e) {

   newsApiService.fetchFoto().then(data => {
      const date = data;
    // let { webformatURL, largeImageURL, likes, views, comments, downloads } = date;
    const markUpInfo = imageMarkup(date);
    console.log(markUpInfo)
    container.insertAdjacentHTML('beforeend', markUpInfo);
    })
}
function onSubmit(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;
  
  newsApiService.resetPage();
  newsApiService.fetchFoto().then(data => {
    const date = data;

    // let { webformatURL, largeImageURL, likes, views, comments, downloads } = date;
    const markUpInfo = imageMarkup(date);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markUpInfo);
  });
  //  newsApiService.informTotalFoto();
}

function imageMarkup(item) {
    return item
      .map(({ webformatURL, largeImageURL, likes, views, comments, downloads } = foto) => {
        return `
        <a class="gallery__image" href="${webformatURL}">
   <div class="photo-card">
   <img src="${webformatURL}" alt="${largeImageURL}" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>likes: ${likes}</b>
     </p>
     <p class="info-item">
       <b>views: ${views}</b>
     </p>
     <p class="info-item">
       <b>comments: ${comments}</b>
     </p>
     <p class="info-item">
       <b>downloads: ${downloads}</b>
     </p>
   </div>
   </div>
   </a>
  `
         }).join(``);
}

function onClick(evt) { 
  evt.preventDefault();

    let lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: "alt",
        // captionPosition: `top`,
    });
 }


