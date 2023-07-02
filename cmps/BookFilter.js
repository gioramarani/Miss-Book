export default {
  name:'',
  props: [],
  template: `
        <section className="book-filter">
            <h4>Search</h4>
            <input 
            type="text"
            v-model="filterBy.txt"
            @input="onSetFilterBy"
            placeholder="Title" />
            <input 
            type="number"
            v-model="filterBy.price"
            @input="onSetFilterBy"
            placeholder="Max price" />
            <input 
            type="number"
            v-model="filterBy.pageCount"
            @input="onSetFilterBy"
            placeholder="Max Pages" />
           
        </section>
        `,
created() {},
  data() {
    return {
        filterBy: {
            txt: '',
            price: null,
            pageCount: null
        }
    }
  },
  methods: {
            onSetFilterBy() {
                this.$emit('filter', this.filterBy)
            }
  },
  computed: {},
components:{},
}
