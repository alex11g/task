const { createApp } = Vue
const app = createApp({
    data() {
        return {
            datos: [],
            name1: "",
            name2: "",
            name3: "",
            resultadoTipoOrden: [],
            fechaPasada: [],
            fechaFutura : [],
            objeto: {},
            objeto2: {},
            prices: {},
            estimate : {},
            capacity : {},
            assistance : {}
        }
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then(response => response.json())
            .then((dato) => {
                this.datos = dato.events.filter(valor => valor.date < dato.currentDate)
                this.fechaFutura = dato.events.filter(valor => valor.date > dato.currentDate)
                this.fechaPasada = dato.events.filter(valor => valor.date < dato.currentDate)
                this.resultadoTipoOrden = this.datos.sort((a, b) => {
                    return (
                        (a.assistance / a.capacity * 100) - (b.assistance / b.capacity * 100)
                    )
                })
                this.name1 = this.resultadoTipoOrden.slice(-1)[0].name
                this.name2 = this.resultadoTipoOrden.slice(0, 1)[0].name
                this.name3 = this.resultadoTipoOrden.sort((a, b) => a.capacity - b.capacity).slice(-1)[0].name

                 this.fechaFutura.forEach(key => {
                    if (!this.objeto[key.category]) {
                        this.objeto[key.category] = {
                            price: 0,
                            estimate: 0,
                            capacity: 0
                        }
                    }
                    this.objeto[key.category].price += key.price * key.estimate
                    this.objeto[key.category].capacity += key.capacity
                    this.objeto[key.category].estimate += key.estimate
                })
                this.fechaPasada.forEach(value => {
                    if (!this.objeto2[value.category]) {
                        this.objeto2[value.category] = {
                            price: 0,
                            assistance: 0,
                            capacity: 0
                        }
                    }
                    this.objeto2[value.category].price += value.price * value.assistance
                    this.objeto2[value.category].capacity += value.capacity
                    this.objeto2[value.category].assistance += value.assistance
                })
            })
            .catch(error => console.log(error))
    }
})
app.mount("#tabla")