import { createApp } from './lib/vue.js'

import AppHeader from './cmps/AppHeader.js'

import HomePage from './pages/HomePage.js'
import BookIndex from './pages/BookIndex.js'
import AboutPage from './pages/AboutPage.js'


const options = {
    template: `
    <div>
        <AppHeader @change-route="route = $event"/>
        <section class="main-route">
            <HomePage v-if="route === 'home'"/>
            <BookIndex v-if="route === 'books'" />
            <AboutPage v-if="route === 'about'" />
        </section>
    </div>
    `,
    data() {
        return {
            route: 'books'
        }
    },
    components: {
        AppHeader,
        HomePage,
        BookIndex,
        AboutPage
    }
}




const app = createApp(options)

app.mount('#app')