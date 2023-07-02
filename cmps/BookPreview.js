export default {
    props: ['book'],
    template: `
        <article class="book-preview">
           <pre>
            <h2>Name: {{ book.title }}</h2>
            <h3>Price: {{ book.listPrice.amount }}</h3>
                <!-- {{book}} -->
               
           </pre>
        </article>
    `,
}