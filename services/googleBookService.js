import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


export const googleBookService = {
    query,

}


function query(txt) {
       return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`)
       .then(res=>res.json())
       .then(res => res.items.map(book => ({
        title: book.volumeInfo.title,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'http://coding-academy.org/books-photos/2.jpg'
       })))

}