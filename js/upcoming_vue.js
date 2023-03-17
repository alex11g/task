const { createApp } = Vue

let appDos = createApp({

    data() {

        return {
            fechaFiltrada: [undefined],
            categorias: [],
            categoriasCkecked: [],
            filtroBusqueda: "",
            cards:[]
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then((datos) => {
                this.cards = datos.events.filter(valor => valor.date > datos.currentDate)
                this.datosFiltrados= datos
                this.fechaFiltrada = this.cards
                this.categorias = [...new Set(this.fechaFiltrada.map(fecha => fecha.category))]
            })
            .catch(error => console.log(error))
    },
    methods:{
        filtroCheck() {
            this.fechaFiltrada= this.cards.filter(key=> {
             return key.name.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
             && (this.categoriasCkecked.includes(key.category) || this.categoriasCkecked.length == 0 ) 
            })
         }
    },
})
appDos.mount("#tarjetas")