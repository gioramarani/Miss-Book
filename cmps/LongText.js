export default {
    props: ['text'],
    template: `
     <p>{{formatText}}</p>
     <button class="block" v-if="descLength" @click="onToggleText">Read {{displayText}}</button>
      `,
    data() {
      return {
        isMore: false,
      }
    },
    created() { },
    methods: {
      onToggleText() {
        this.isMore = !this.isMore
      },
    },
    computed: {
      formatText() {
        return this.isMore ? this.text : this.text.slice(0, 100)
      },
      displayText() {
        return this.isMore ? 'less' : 'more'
      },
      descLength() {
        return this.text.length > 100
      },
    },
  }
  
  