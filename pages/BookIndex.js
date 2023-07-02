import { bookService } from '../services/book.service.js'

import BookList from '../cmps/BookList.js'
import BookDetails from '../cmps/BookDetails.js'
import BookFilter from '../cmps/BookFilter.js'
import BookEdit from '../cmps/BookEdit.js'

export default {
  name:'',
  props: [],
  template: `
        <section class="book-index" v-if="books">
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                :books="filteredBooks"
                @select="selectBook"
                @remove="removeBook"
            />
            <BookDetails 
            v-if="selectedBook"
            :book="selectedBook"
            @close="selectedBook = null"/>
            <BookEdit @save="saveBook"/>
        
        </section>

        `,
created() {
    bookService.query()
        .then(books => this.books = books)
},
    
    data() {
    return {
        books: null,
        selectedBook: null,
        filterBy: {}
           
    }
  },
  methods: {
        selectBook(bookId){
                this.selectedBook = this.books.find(book => book.id === bookId)
                console.log(this.selectedBook)
        },
        setFilterBy(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy
        },
        saveBook(bookToSave) {
            bookService.save(bookToSave)
                .then(savedBook => this.books.push(savedBook))
                console.log(bookToSave)
                console.log(books)
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        }
  },
  computed: {
            filteredBooks() {
                let filteredBooks = this.books
                const regex = new RegExp(this.filterBy.txt, 'i')
                filteredBooks = filteredBooks.filter(book => regex.test(book.title))

                if(this.filterBy.price){
                filteredBooks = filteredBooks.filter(book => book.listPrice.amount <= this.filterBy.price)
                }
                if(this.filterBy.pageCount){
                filteredBooks = filteredBooks.filter(book => book.pageCount <= this.filterBy.pageCount)
                }

                return filteredBooks 
            }
  },
components:{
    BookList,
    BookDetails,
    BookFilter,
    BookEdit,
},
}
