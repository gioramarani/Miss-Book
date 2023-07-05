import { bookService } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { googleBookService } from '../services/googleBookService.js'
import { eventBus, showSuccessMsg } from '../services/event-bus.service.js'

import hardCodeGoogleList from './hardCodeGoogleList.js'


export default {
  name:'AddBook',
  props: [],
  template: `
        <section>
        
            <input type="text" @input="debounceSearch" v-model="txt" />
          
      
          <ul>
            <li v-for="book in bookList">
              <!-- <component
              :is="book"
              :book="book"
              @addBook="addBookToData"
               /> -->
               <h4>{{ book.title }}</h4>
               <button @click="addBookToData(book)">Add to my list</button>

            </li>
          </ul>
        </section>
        `,
created() {
      this.debounceSearch = utilService.debounce(this.searchAPI, 500)

   //  this.loadGoogleList()
      
},
  data() {
    return {
        bookList: null,
        txt: '',
    }
  },
  methods: {
    searchAPI(){
        googleBookService.query(this.txt)
            .then(listFound => {
              console.log(listFound);
              this.bookList = listFound
            })
    },
    addBookToData(book) {
        console.log(book)
        bookService.addGoogleBook(book)
            .then(()=>{
              showSuccessMsg('New book added')
            })
    },
    loadGoogleList() {
    bookService.getGoogleBookList()
        .then(googleList => {
        this.bookList = googleList
    })
  },
  },
  computed: {},
components:{
    hardCodeGoogleList,
},
// @addBook="$emit('add-book', $event)"  //another way to send emit actions
}
