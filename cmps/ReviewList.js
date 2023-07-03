export default {
    name:'',
    props: ['reviews'],
    template: `
                <h2>Readers reviews:</h2>
              <section v-for="review in reviews">
                <h5>{{ review.name}}, <span> {{ review.rating }} stars, </span> <span>  {{ review.readAt }}.</span></h5>
              
              </section>
          `,
  created() {},
    data() {
      return {}
    },
    methods: {},
    computed: {},
  components:{},
  }
  