class BookService {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }

    getFilms() {
        return axios.get(this.baseUrl + 'books');
    }

    addFilm(book) {
        return axios.post('http://localhost:3000/books', book);
    }
}