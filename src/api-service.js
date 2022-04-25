import Notiflix from 'notiflix';

const button = document.querySelector('.button')

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchFoto() {
       
     return fetch(`https://pixabay.com/api/?key=26970425-ccd1377388b76d413dfca163b&q=${this.searchQuery}&image_type=foto&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        .then(response => response.json())
        .then(data => {
            this.page += 1;
              button. removeAttribute('hidden');
             if (data.total == 0) {
                button.setAttribute('hidden', true);

                 Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again. `);
                 return
            }

            if (this.page * 40 >= data.total) {
             Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }        
            return data.hits
        });
    }


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
