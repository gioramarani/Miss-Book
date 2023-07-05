import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import gBooks from '../assets/data/books.json' assert {type: 'json'}

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'
console.log(gBooks);
var gFilterBy = { title: '', amount: 0 }

const GoogleList = [

    {
        type: 'hardCodeGoogleList',
        title: 'book1',
        id: utilService.makeId()
    },
    {
        type: 'hardCodeGoogleList',
        title: 'book2',
        id: utilService.makeId()
    },
    {
        type: 'hardCodeGoogleList',
        title: 'book3',
        id: utilService.makeId()
    },
    {
        type: 'hardCodeGoogleList',
        title: 'book4',
        id: utilService.makeId()
    },
]
_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview,
    getGoogleBookList,
    addGoogleBook,
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
            .then(book => _setNextPrevBookId(book))
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(currBook => currBook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1]
                ? books[bookIdx - 1].id
                : books[books.length - 1].id
            return book
        })
}

function getGoogleBookList() {
    return Promise.resolve(GoogleList)
}


function addGoogleBook(item) {
    console.log(item);
    // const book= GoogleList.find(book=> book.id === item.id)
    // console.log(book);
    save(item)
    return Promise.resolve()
    // return save(item)
    //         .then(GoogleList.pop(item))   //??//

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

function addReview(bookId, review){
    return get(bookId).then(book => {
        if(!book.reviews) book.reviews = []
        review.id = utilService.makeId()
        book.reviews.push(review)
        return save(book)
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return save(book)
        })
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
    // fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=harry%20potter').then(res=>res.json()).then(console.log)
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

// https://www.googleapis.com/books/v1/volumes?printType=books&q=harry%20javascript