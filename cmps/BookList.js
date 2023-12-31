import BookPreview from './BookPreview.js'


export default {
  name:'',
  props: ['books'],
  template: `
  <section className="book-list">
    <ul>
        <li v-for="book in books" :key="book.id">
            <BookPreview :book="book"/>
            <button @click="onRemoveBook(book.id)" class="close">x</button>
        </li>
    </ul>
  </section>
        `,
created() {},
  data() {
    return {}
  },
  methods: {
            onRemoveBook(bookId) {
                this.$emit('remove', bookId)
            }
  },
  computed: {},
components:{
    BookPreview,

},
}
