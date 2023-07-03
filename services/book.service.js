import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import gBooks from '../assets/data/books.json' assert {type: 'json'}

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'
console.log(gBooks);
var gFilterBy = { title: '', amount: 0 }
// var gSortBy = { vendor: 1 }
// var gPageIdx

_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    // getFilterBy,
    // setFilterBy,
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (gFilterBy.title) {
            //     const regex = new RegExp(gFilterBy.title, 'i')
            //     books = books.filter(book => regex.test(book.title))
            // }
            // if (gFilterBy.amount) {
            //     books = books.filter(book => book.amount >= gFilterBy.amount)
            // }
            // if (gPageIdx !== undefined) {
            //     const startIdx = gPageIdx * PAGE_SIZE
            //     books = books.slice(startIdx, startIdx + PAGE_SIZE)
            // }
            // if (gSortBy.amount !== undefined) {
            //     books.sort((c1, c2) => (c1.amount - c2.amount) * gSortBy.amount)
            // } else if (gSortBy.title !== undefined) {
            //     books.sort((c1, c2) => c1.title.localeCompare(c2.title) * gSortBy.title)
            // }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', title = '', amount) {
    return { id, title, listPrice:{amount} }
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
//     if (filterBy.listPrice.amount !== undefined) gFilterBy.amount = filterBy.listPrice.amount
//     return gFilterBy
// }

// function getNextbookId(bookId) {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             var idx = books.findIndex(book => book.id === bookId)
//             if (idx === books.length - 1) idx = -1
//             return books[idx + 1].id
//         })
// }

// function getbookCountBySpeedMap() {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             const bookCountBySpeedMap = books.reduce((map, book) => {
//                 if (book.maxSpeed < 120) map.slow++
//                 else if (book.maxSpeed < 200) map.normal++
//                 else map.fast++
//                 return map
//             }, { slow: 0, normal: 0, fast: 0 })
//             return bookCountBySpeedMap
//         })
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        // books = []
        // books.push(_createBook('Harry Poter', 300))
        // books.push(_createBook('Great Jiants', 720))
        // books.push(_createBook('Looloo Land', 100))
        utilService.saveToStorage(BOOK_KEY, gBooks)
        console.log(books)
    }
}

// function _createBook(title, {amount}) {
//     const book = getEmptyBook(title, amount)
//     return book
// }