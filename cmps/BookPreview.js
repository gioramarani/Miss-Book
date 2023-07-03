export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>Name: {{ book.title }}</h2>
            <img :src=book.thumbnail alt="" />
            <h3>Price: {{ book.listPrice.amount }}</h3>
            <RouterLink :to="'/book/' + book.id">Details</RouterLink> | |
            <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
        </article>
    `,
}