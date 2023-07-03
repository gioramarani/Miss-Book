import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookList from '../cmps/BookList.js'
import BookFilter from '../cmps/BookFilter.js'


export default {
  name:'BookIndex',
  props: [],
  template: `
        <section class="book-index" v-if="books">
            <RouterLink to="/book/edit">Add Book</RouterLink>

            <BookFilter @filter="setFilterBy"/>
            <BookList 
            
                :books="filteredBooks"
                @remove="removeBook"
            />
        </section>

        `,
created() {
    bookService.query()
        .then(books => this.books = books)
},
    
    data() {
    return {
        books: [],
        filterBy: {}
           
    }
  },
  methods: {
        setFilterBy(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy
        },
      
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove book')
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
    BookFilter,
},
}
