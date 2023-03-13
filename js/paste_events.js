const tarjetas = document.getElementById("tarjetas")

function tarjetasDos(array) {
    return `
    <div class="card mt-4" >
    <img src="${array.image} " class="card-img-top mt-2" alt="foto-targeta">
    <div class="card-body">
        <h5 class="card-title text-center">${array.name} </h5>
        <p class="card-text ">${array.description} </p>
        <p class="precio">Price <strong class="ms-2">$ ${array.price} </strong> </p>
        <a href="./info.html?id=${array._id}" class="btn btn-primary precio2 ">Go somewhere</a>
    </div>
 </div>
 `
}




function mensage() {
    return `
    <h2  class="text-center text-dark">No result of your search was found.</h2>`
}
function subirTarjeta(array, elemento) {
    let template = ''
    if (array.length == 0) {
        template = mensage()
    }
    for (let valor of array) {
        template += tarjetasDos(valor)
    }
    elemento.innerHTML = template
}






function check(dato) {
    return `
 <div class=" form-check ">
 <input type="checkbox" class="form-check-input" value="${dato}" id="${dato}">
 <label class="form-check-label" for=${dato}>${dato} </label>
 </div>

 `
}
function subir(array, elemento) {
    let resultado = ""
    for (let valor of array) {
        resultado += check(valor)
    }
    elemento.innerHTML = resultado
}




// //////filtrar//////////////



function filtrado(array) {
    const input = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    const nuevoArray = input.map(array => {
        return array.value
    })
    if (nuevoArray.length === 0) {
        return array
    }
    const verificar = array.filter(valor => {
        return nuevoArray.includes(valor.category)
    })
    return verificar
}

//////// filtrado busqueda


buscador.addEventListener("keyup", e => {
    return subirTargeta(filtroCruzado(), targetas)
})

function filtradoBusqueda(array) {
    const buscadorValue = buscador.value.toLowerCase()
    if (buscadorValue === 0) {
        return array
    }
    const filtradoBusquedaDos = array.filter(e => {
        return e.name.toLowerCase().includes(buscadorValue)
    })
    return filtradoBusquedaDos
}


// ///////// filtrado cruzadoo///////////



//-----------task4---------------------------------//

const url = "https://mindhub-xj03.onrender.com/api/amazing"
fetch(url)
    .then(response => response.json())
    .then(datos => {
        let miArray = datos
        function filterFecha(array) {
            return array.filter(e => e.date <= miArray.currentDate)
        }
        subirTarjeta(filterFecha(miArray.events), tarjetas)
        let listaCategory = miArray.events.map(valor => valor.category)
        let setListaCategory = Array.from(new Set(listaCategory))
        subir(setListaCategory, formCheck)
        formCheck.addEventListener("change", e => {
             return subirTarjeta(filtroCruzado(miArray), tarjetas)
        })
        buscador.addEventListener("keyup", e => {
            return subirTarjeta(filtroCruzado(miArray), tarjetas)
        })
        function filtroCruzado(array) {
            return filtrado(filtradoBusqueda(filterFecha(array.events)))
        }
    })
    .catch(error => console.log(error))