import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export default {
  name:'',
  props: [],
  template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>{{(bookToEdit.id)? 'Edit' : 'Add'}} a Book</h2>
            <input type="text" placeholder="Enter title" v-model="bookToEdit.title" />
            <input type="number" v-model.number="bookToEdit.listPrice.amount" />

            <RouterLink to="/book">Cancel</RouterLink>
            <button :disabled="!isValid" >save</button>
        </form>
        `,
  data() {
    return {
      bookToEdit: bookService.getEmptyBook()
    }
  },
  created() {
          const { bookId } = this.$route.params
          if (!bookId) return
          bookService.get(bookId)
            .then(book => {
                this.bookToEdit = book
            })
            .catch(err => {
              showErrorMsg('Cannot load book for edit')
              this.$router.push('/book')
            })

  },
  methods: {
            save() { //add condition if title and price were even added
                bookService.save(this.bookToEdit)
                  .then(savedBook => {
                    console.log(savedBook);
                    showSuccessMsg('Book saved')
                    this.$router.push('/book')
                  })
                  .catch(err => {
                    showErrorMsg('Cannot save book')
                  })
            }
  },
  computed: {
        isValid() {
          return this.bookToEdit.title.length > 0
        }
  },
components:{},
}
