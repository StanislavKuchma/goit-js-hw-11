import Notiflix from 'notiflix';

const button = document.querySelector('.button')
const axios = require('axios').default;
const container = document.querySelector('.gallery');

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.total = 0;
     }
     async fetchFoto() {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=26970425-ccd1377388b76d413dfca163b&q=${this.searchQuery}&image_type=foto&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
                     this.page += 1;
            button.removeAttribute('hidden');
            // this.total = response.data.total 
                    if (response.data.total == 0) {
                        button.setAttribute('hidden', true);
                        container.innerHTML = '';
                        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again. `);
                        } else
                    if (this.page * 40 >response.data.total) {
                            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                    }
                    return response.data.hits
        }catch (error) {
      Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again. `);
    }
    }
    // informTotalFoto() {
    //     Notiflix.Notify.info(`Hooray! We found ${this.total} images.`);
    // }
    resetPage() {
        this.page = 1;
    }
    get query() {
       return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
