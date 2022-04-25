import './css/styles.css';
import NewsApiService from './api-service';

import SimpleLightbox from "simplelightbox";
// // Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';
// import { galleryItems } from './gallery-items.js';



const input = document.querySelector('input');
const form = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const button = document.querySelector('.form-button')

const newsApiService = new NewsApiService();


button.addEventListener('click', onClickMore);
form.addEventListener('submit', onSubmit);

function onClickMore(e) {

  newsApiService.fetchFoto().then(data => {
      const date = data;
    let { webformatURL, largeImageURL, likes, views, comments, downloads } = date;
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
    let { webformatURL, largeImageURL, likes, views, comments, downloads } = date;
    const markUpInfo = imageMarkup(date);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markUpInfo);
  });

}

function imageMarkup(item) {
    return item
      .map(({ webformatURL, largeImageURL, likes, views, comments, downloads } = foto) => {
        return `
        <a  href="${webformatURL}">
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

  container.addEventListener(`click`, onClick);
function onClick(evt) { 
  evt.preventDefault();
  // lightbox.refresh()
    // if (!evt.target.classList.contains(`gallery__image`)) {
    //     return;
    // }
    let lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: "alt",
        // captionPosition: `top`,
        

    });

 }
//          async function getFoto() {
//            try {
//              newsApiService.fetchFoto().then(data => {
//                const date = data;
//                let { webformatURL, largeImageURL, likes, views, comments, downloads } = date;
//                const markUpInfo = imageMarkup(date);
//                container.insertAdjacentHTML('beforeend', markUpInfo);
    
//              });
//   } catch (error) {}
//      Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again. `);
  
// }      



   
// const imageMarkup = getUser().then(response => createImageItem(response))
// console.log(imageMarkup)
// container.insertAdjacentHTML(`beforeend`, imageMarkup);
// }


//     function createImageItem(item) {
//         return item
//             .map(({ webformatURL, largeImageURL, likes, views, comments, downloads }) => {
//                 return `
//         <div class="photo-card">
//   <img src="${webformatURL}" alt="${largeImageURL}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`
//             }).join(``);
//     }

    // function onFetchRequest() {
    //     Notiflix.Notify.success(`This is a FULFILL`);


    //     const markupNames = getUser(dataInbox)
    //       .map(hits => {
    //         return `
    // <div class="photo-card">
    //   <img src="" alt="" loading="lazy" />
    //   <div class="info">
    //     <p class="info-item">
    //       <b>Likes</b>
    //     </p>
    //     <p class="info-item">
    //       <b>Views</b>
    //     </p>
    //     <p class="info-item">
    //       <b>Comments</b>
    //     </p>
    //     <p class="info-item">
    //       <b>Downloads</b>
    //     </p>
    //   </div>
    // </div>
    //     `;
    //       })
    //         .join('');
    //     container.insertAdjacentHTML('beforeend', markupNames);
    // }
  
 


    // container.addEventListener(`click`, onClick);

    // function onClick(evt) { 
    //      evt.preventDefault();
    //     if (!evt.target.classList.contains(`gallery__image`)) {
    //         return;
    //     }
    //     let lightbox = new SimpleLightbox('.gallery a', {
    //         captionDelay: 250,
    //         captionsData: "alt",
    //         // captionPosition: `top`,
        

    //     });

