export default {
    name:'',
    props: ['reviews'],
    template: `
                <h2>Readers reviews:</h2>
              <section v-for="review in reviews">
                <h5>{{ review.name}}, <span> {{ review.rating }} stars, </span> <span>  {{ review.readAt }}.</span></h5>
                <button @click="onRemove(review.id)">x</button>
              </section>
          `,
  created() {},
    data() {
      return {}
    },
    methods: {
          onRemove(reviewId) {
            console.log(reviewId)
            this.$emit('remove', reviewId)
          }
    },
    computed: {},
  components:{},
  }
  