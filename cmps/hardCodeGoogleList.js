export default {
  name:'serviceGoogleList',
  props: ['book'],
  template: `
            <section>
                <h2>{{ book.volumeInfo.title }}</h2>
                <!-- <h4>{{ book.id }}</h4> -->
                <button @click="$emit('addBook' , book)">Add to local library</button>
            </section>
        `,

  methods: {
            // onAddBook(currBook) {
            //     this.$emit('addBook' , currBook)
            // }
  },
 
}
