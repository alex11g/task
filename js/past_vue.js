const { createApp } = Vue


const app = createApp({

    data() {

        return {
            datos: [],
            categoriaFiltrada: [],
            checks : [],
            filtrado:[undefined],
            filtroText : ""
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then((dato) => {
                this.datos = dato.events.filter(key => key.date < dato.currentDate)
                console.log(this.datos)
                this.categoriaFiltrada = [...new Set(this.datos.map(key => key.category))]
                this.filtrado = this.datos
 


            })
            .catch(error => console.log(error))

    },
    methods:{
        filtro(){
            this.filtrado = this.datos.filter(key => {
                return key.name.toLowerCase().includes(this.filtroText.toLowerCase())
                && (this.checks.includes(key.category) || this.checks.length == 0)
            })
        }
    },
})

app.mount("#tarjetas")