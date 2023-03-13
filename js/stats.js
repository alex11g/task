//------------PROMESA-STATS--------------------------//

const $mayorAsistencia = document.getElementById("mayorAsistencia")
const $menorAsistencia = document.getElementById("menorAsistencia")
const $mayorCapacidad = document.getElementById("mayorCapacidad")
const tablaDos = document.getElementById("tabla-2")
const tablaTres= document.getElementById("tabla-3")

const fechafiltrada = (array) => {
    return array.events.filter(e => e.date >= array.currentDate)
}
function asistencia(objeto, elemento) {
    elemento.innerHTML = objeto.name
}
const url3 = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url3)
    .then(response => response.json())
    .then(miArray => {
        const fechaFutura = fechafiltrada(miArray)
        const fechaPasada = miArray.events.filter(e => e.date <= miArray.currentDate)
        const resultado = fechaPasada.sort((event1, event2) => {
            return (
                (event1.assistance / event1.capacity * 100) - (event2.assistance / event2.capacity * 100)
            )
        })
        const eventoMayorAssistencia = resultado.slice(-1)
        asistencia(eventoMayorAssistencia[0], $mayorAsistencia)
        const eventoMenorAsistencia = resultado.slice(0, 1)
        asistencia(eventoMenorAsistencia[0], $menorAsistencia)
        const resultadoMayorCapacidad = fechaPasada.sort((event1, event2) => event1.capacity - event2.capacity).slice(-1)  
        asistencia(resultadoMayorCapacidad[0], $mayorCapacidad)



        //-------------tabla2-----------------//
        const categories = {}
        // Procesamos cada evento
        fechaFutura.forEach(event => {
            // Si la categoría no existe la creamos
            if (!categories[event.category]) {
                categories[event.category] = {
                    price: 0,
                    estimate: 0,
                    capacity: 0
                }
            }
            // Sumamos los ingresos el estimate y la capacity a la categoría correspondiente
            categories[event.category].price += event.price * event.estimate
            categories[event.category].capacity += event.capacity
            categories[event.category].estimate += event.estimate
        })
        // Mostramos la información de cada categoría
        let templeDos=""
        for (const category in categories) {
            const prices = categories[category].price
            const estimate = categories[category].estimate
            const capacity = categories[category].capacity
            const porcentaje = (estimate * 100 / capacity).toFixed(2)
            const temple = () => {
                return `
                <tr>
                    <td>${category} </td>
                    <td>${prices} </td>
                    <td>${porcentaje}%</td>
                </tr>
             `
            }
            templeDos+=temple()
        }
        tablaDos.innerHTML=templeDos


        //------------tabla3-------------//

        const categoriaDos={}
        fechaPasada.forEach(event => {
            // Si la categoría no existe la creamos
            if (!categoriaDos[event.category]) {
                categoriaDos[event.category] = {
                    price: 0,
                    assistance: 0,
                    capacity: 0
                }
            }
            // Sumamos los ingresos la asistencia y la capacity a la categoría correspondiente
            categoriaDos[event.category].price += event.price * event.assistance
            categoriaDos[event.category].capacity += event.capacity
            categoriaDos[event.category].assistance += event.assistance
        })
       
        // Mostramos la información de cada categoría
        let templeTres=""
        for (const category in categoriaDos) {
            const pricesDos = categoriaDos[category].price
            const assistance = categoriaDos[category].assistance
            const capacityDos = categoriaDos[category].capacity
            const porcentajeDos = (assistance * 100 / capacityDos).toFixed(2)
            const templeTablaTres = () => {
                return `
                <tr>
                    <td>${category} </td>
                    <td>${pricesDos} </td>
                    <td>${porcentajeDos}%</td>
                </tr>
             `
            }
            templeTres+=templeTablaTres()
        }
        tablaTres.innerHTML=templeTres
    })
    .catch(error => console.error(error))




