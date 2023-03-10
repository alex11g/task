const detalies = document.getElementById("filtro-detalies")


const parms = new URLSearchParams(location.search)

const id = parms.get("id")

let persona = data.events.find(elemento => elemento._id === id)

function detalles(obje) {
    const change= obje.estimate ? "estimate" : "assistance"
    return `
    <div class="col-md-8 filtro-detalies d-flex align-items-center">
                    <div class="col-md-4 ">
                        <img src="${obje.image}" class="img-fluid rounded-start " alt="${obje.name} ">
                    </div>
        <div class="card-body">
                        <h5 class="card-title">EVENTS</h5>
                        <p class="card-text-dos">Name: ${obje.name} </p>
                        <p class="card-text-dos">Date: ${obje.date} </p>
                        <p class="card-text-dos">Description: ${obje.description} </p>
                        <p class="card-text-dos">Category: ${obje.category} </p>
                        <p class="card-text-dos">Place: ${obje.place} </p>
                        <p class="card-text-dos">Capacity: ${obje.capacity} </p>
                        <p class="card-text-dos"> ${change} : ${obje[change]} </p>
                        <p class="card-text-dos">Price: ${obje.price} </p>
        </div>
    </div>
    `
}
function renderizar(obje, elemento) {
    let temple = ""
    temple += detalles(obje)
    elemento.innerHTML = temple
}
renderizar(persona, detalies)