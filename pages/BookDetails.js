import { carService } from "../services/car.service.js"


export default {
  name:'',
  props: ['book'],
  template: `
            <section class="book-details">
            <h2>Name: {{ book.title }}</h2>
            <h3>By: {{ book.authors[0] }}</h3>
            <h4>Page Count: {{ book.pageCount }}<span> {{ getBookLevel  }}</span></h4>
            <h4> {{ getBookAge  }}</h4>
            <h4 :class="getBookPriceColor">{{ book.listPrice.amount }}</h4>
            <h4 v-if="book.listPrice.isOnSale" class="nice-sign">On Sale!</h4>
            <h5>Lang: {{ book.language }}</h5>
            <LongText :text="book.description"></LongText>
            <img :src=book.thumbnail alt="" />
            <RouterLink to="/book">Back to List</RouterLink>
            </section>
        `,
  data() {
    return {
      book: null
    }
  },
  created() {
    const { bookId } = this.$route.params
    bookService.get(bookId)
      .then(book => {
          this.book = book
      })
      .catch(err => {
        showErrorMsg('Cannot load book')
        this.$router.push('/book')
      })
  },
  methods: {
      
  },
  computed: {
    getBookLevel() {
      if(this.book.pageCount > 500) return 'Serious Reading'
      if(this.book.pageCount > 200) return 'Descent Reading'
      if(this.book.pageCount < 100) return 'Light Reading'
  },
  getBookAge() {
    const currYear = new Date().getFullYear().toString()
    console.log(currYear); 
    if(currYear - this.book.publishedDate > 10) return 'Vintage'
    if(currYear - this.book.publishedDate < 1) return 'New'
  }, 
  getBookPriceColor() {
    if(this.book.listPrice.amount > 150) return 'red'
    if(this.book.listPrice.amount < 20) return 'green'
  },
  getImg() {
    return './data/'
  }
  },
components:{
    
},
}
