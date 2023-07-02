export default {
  name:'',
  props: ['book'],
  template: `
            <section class="book-details">
            <h2>Name: {{ book.title }}</h2>
            <h3>By: {{ book.authors[0] }}</h3>
            <h4>Page Count: {{ book.pageCount }}</h4>
            <h4> {{ getBookLevel  }}</h4>
            <h4> {{ getBookAge  }}</h4>
            <h4 :class="getBookPriceColor">{{ this.bookPrice }}</h4>
            <h4 v-if="this.isOnSale" class="nice-sigh">On Sale</h4>
            <h5>Lang: {{ book.language }}</h5>
            <p>{{ book.description }}</p>
            <img :src=book.thumbnail alt="" />
            <button @click="onClose">close</button>
            </section>
        `,
created() {},
  data() {
    return {
        bookLength: this.book.pageCount,
        publishDate: this.book.publishedDate,
        currTime: Date.now(),
        bookPrice: this.book.listPrice.amount,
        isOnSale: this.book.listPrice.isOnSale,
        
    }
  },
  methods: {
            onClose() {
                this.$emit('close')
            }
  },
  computed: {
    getBookLevel() {
      if(this.bookLength > 500) return 'Serious Reading'
      if(this.bookLength > 200) return 'Descent Reading'
      if(this.bookLength < 100) return 'Light Reading'
  },
  getBookAge() {
    const currYear = new Date(this.currTime).getFullYear().toString()
    console.log(currYear); 
    if(currYear - this.publishDate > 10) return 'Viintage'
    if(currYear - this.publishDate < 1) return 'New'
  }, 
  getBookPriceColor() {
    if(this.bookPrice > 150) return 'red'
    if(this.bookPrice < 20) return 'green'
  },
  getImg() {
    return './data/'
  }
  },
components:{
    
},
}
