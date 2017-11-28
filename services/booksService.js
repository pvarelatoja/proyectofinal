class booksService {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }

    getBooks() {
        return axios.get(this.baseUrl + 'books');
    }

    addBook(book) {
        return axios.post('http://localhost:3000/books', book);
    }

    updateBook(book) {
        return axios.put('http://localhost:3000/books/' + book.id, book);
    }
}