export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>Name: {{ book.title }}</h2>
            <img :src=book.thumbnail alt="" />
            <h3>Price: {{ book.listPrice.amount }}</h3>
            <RouterLink :to="'/car/' + car.id">Details</RouterLink>
            <RouterLink :to="'/car/edit/' + car.id">Edit</RouterLink>
        </article>
    `,
}