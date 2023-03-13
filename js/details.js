const detalies = document.getElementById("filtro-detalies")


function detalles(array) {
    const change= array.estimate ? "estimate" : "assistance"
    return `
    <div class="col-md-8 filtro-detalies d-flex align-items-center">
                    <div class="col-md-4 ">
                        <img src="${array.image}" class="img-fluid rounded-start " alt="${array.name} ">
                    </div>
        <div class="card-body">
                        <h5 class="card-title">EVENTS</h5>
                        <p class="card-text-dos">Name: ${array.name} </p>
                        <p class="card-text-dos">Date: ${array.date} </p>
                        <p class="card-text-dos">Description: ${array.description} </p>
                        <p class="card-text-dos">Category: ${array.category} </p>
                        <p class="card-text-dos">Place: ${array.place} </p>
                        <p class="card-text-dos">Capacity: ${array.capacity} </p>
                        <p class="card-text-dos"> ${change} : ${array[change]}</p>
                        <p class="card-text-dos">Price: ${array.price} </p>
        </div>
    </div>
`
}
function renderizar(array, elemento) {
    let temple = ""
    temple += detalles(array)
    elemento.innerHTML = temple
}



//----------------task4------------------//
const url_ = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url_)
    .then(response => response.json())
    .then(datos => {
        let miArray = datos
        const parms = new URLSearchParams(location.search)
        const id = parms.get("id")
        let persona = miArray.events.find(elemento => elemento._id == id)
        renderizar(persona, detalies)
    })
    .catch(error => console.error(error))
 