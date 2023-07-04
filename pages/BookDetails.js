import { bookService } from "../services/book.service.js"

import LongText from '../cmps/LongText.js'
import BookAddReview from '../cmps/BookAddReview.js'
import ReviewList from '../cmps/ReviewList.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
  name:'BookDetails',
  template: `
            <section v-if="book" class="book-details">
              <h2>Name: {{ book.title }}</h2>
              <h3>By: {{ book.authors[0] }}</h3>
              <h4>{{ book.pageCount }} Pages</h4>
              <h4>Reading Level: {{ getBookLevel  }}</h4>
              <h4 :class="getBookPriceColor">Price: {{ book.listPrice.amount }} <span>{{ book.listPrice.currencyCode}}</span> </h4>
              <h5>Language: {{ book.language }}</h5>
              <h4>Longlivity: {{ getBookAge  }}</h4>
              <h4 v-if="book.listPrice.isOnSale" class="nice-sign">On Sale!</h4>
              <LongText :text="book.description"></LongText>
              <img :src=book.thumbnail alt="" />
              <BookAddReview @addToReviews="addToReviews"  />
              <ReviewList v-if="book.reviews" :reviews="book.reviews" @remove="remove"/>
              
              <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink> |
              <RouterLink :to="'/book/' + book.prevBookId">Prev Book</RouterLink> |
              
              <RouterLink to="/book">Back to List</RouterLink>
            </section>
        `,
  data() {
    return {
      book: null,
      // reviews: []
    }
  },
  created() {
      this.loadBook()
  },
  methods: {
    addToReviews(review){
      // this.reviews.push(review)
      bookService.addReview(this.book.id, review)
      .then(book => {
        this.book = book
        showSuccessMsg('Thank you for your review!')

        // book.reviews = this.reviews
      })
      console.log(this.reviews)
      
    },
    remove(reviewId) {
        console.log(reviewId)
        bookService.removeReview(this.book.id, reviewId)
            .then(book => this.book = book)
    },
    loadBook() {
      const { bookId } = this.$route.params
      bookService.get(bookId)
        .then(book => {
            this.book = book
        })
        .catch(err => {
          showErrorMsg ('Cannot load book')
          this.$router.push('/book')
        })
    }
  },
  watch: {
      bookId() {
        this.loadBook()
      }
  },
  computed: {
    getBookLevel() {
      if(this.book.pageCount > 500) return 'Serious Reading'
      if(this.book.pageCount > 200) return 'Descent Reading'
      if(this.book.pageCount < 100) return 'Light Reading'
  },
  getBookAge() {
    const currYear = new Date().getFullYear().toString()
    if(currYear - this.book.publishedDate > 10) return 'Vintage'
    if(currYear - this.book.publishedDate < 1) return 'New'
  }, 
  getBookPriceColor() {
    if(this.book.listPrice.amount > 150) return 'red'
    if(this.book.listPrice.amount < 20) return 'green'
  },
  bookId() {
    return this.$route.params.bookId
  }
  
  },
components:{
  LongText,
  BookAddReview,
  ReviewList
},
}
