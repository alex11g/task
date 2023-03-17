const { createApp } = Vue
const app = createApp({
    data() {
        return {
            cards: [],
            valueBusqueda: "",
            categorias: [],
            check: [],
            categoriasFiltradas: [undefined]
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then(({ events }) => {
                this.cards = events
                this.categorias = [... new Set(events.map(event => event.category))]
                this.categoriasFiltradas = events

            })
            .catch(error => console.log(error))
    },
    methods:{
        filtro() {
            this.categoriasFiltradas = this.cards.filter(card => {
                return card.name.toLowerCase().includes(this.valueBusqueda.toLowerCase())
                    && (this.check.includes(card.category) || this.check.length == 0)
            })
        }
    },
})
app.mount("#tarjetas")