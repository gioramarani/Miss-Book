import RateBySelect from "./RateBySelect.js"
import RateByTextbox from "./RateByTextbox.js"
import RateByStars from "./RateByStars.js"

import { utilService } from "../services/util.service.js"

export default {
  name:'BookAddReview',
  props: [],
  template: `
            <!-- <fieldset>   -->
              <!-- <legend>Please choose a rating format</legend>
          <input type="radio" value="RateBySelect" v-model="rateType" id="select" />
          <label for="select">select</label>
          <input type="radio" value="RateByTextbox" v-model="rateType" id="textbox" />
          <label for="textbox">textbox</label>
          <input type="radio" value="RateByStars" v-model="rateType" id="stars" />
          <label for="stars">stars</label>
          </fieldset>  -->

          <!-- <component
          :is="rateType"
          @submit-review="addReview"
          />
         -->

         <form @submit.prevent="$emit.submit-review" class="add-review">
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
            rateType: '',
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
components:{
  RateBySelect,
  RateByTextbox,
  RateByStars
},
}
