import { bookService } from '../services/book.service.js'

export default {
  name:'',
  props: [],
  template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>Add a Book</h2>
            <input type="text" placeholder="Enter title" v-model="book.title" />
            <input type="number" v-model.number="book.price" />

            <button >save</button>
        </form>
        `,
created() {},
  data() {
    return {
        book: bookService.getEmptyBook()
    }
  },
  methods: {
            save() {
                this.$emit('save', this.book)
                console.log(this.book);
                this.book = bookService.getEmptyBook()
            }
  },
  computed: {},
components:{},
}
