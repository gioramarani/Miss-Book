
import { utilService } from "../services/util.service.js"

export default {
  name:'BookAddReview',
  props: [],
  template: `
         <form @submit.prevent="addReview" class="add-review">
            <h2>Your review helps our fellow readers</h2>
            <input type="text" v-model="review.name" placeholder="Full Name"/>
            <select v-model.number="review.rating">
              <option value="">Select a rating</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <input type="date" v-model="review.readAt" placeholder="Full Name"/>
            <button>Save</button>
         </form>
        `,
created() {},
  data() {
    return {
        review:
            {
                name: '',
                rating: null,
                readAt: null,
            },
        
    }
  },
  methods: {
            addReview() {
                this.$emit('addToReviews', this.review)
                console.log(this.review)
                //Maybe set back all to null
                this.$router.push('/book/:bookId')
                this.review = {
                name: '',
                rating: null,
                readAt: null,
                }

            }
  },
  computed: {},
components:{},
}
