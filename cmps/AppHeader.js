export default {
    template: `
        <header class="app-header">
            <h1>Miss Book</h1>
            <nav>
                <a href="#" @click="setRoute('home')">Home</a>
                <a href="#" @click="setRoute('books')">Books</a>
                <a href="#" @click="setRoute('about')">About</a>
            </nav>
        </header>
    `,
    methods: {
        setRoute(route) {
            this.$emit('change-route', route)
        }
    }
}