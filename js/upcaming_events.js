//------------------------------------task2---------------------------------
const tarjetas = document.getElementById("tarjetas")



///////////////tarjetas dinamicas////////////////////////////////////7

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



function mensage(){
    return`
    <h2  class="text-center text-dark">No result of your search was found.</h2>`
}

function subirTarjeta (array, elemento){
    let template = ''
    if(array.length==0){
        template=mensage()
    }
    for( let valor of array ){
        template += tarjetasDos( valor )
    }
    elemento.innerHTML = template
}


//--------------------------task3---------------------------------

///////checkbox dinamicos///////////////////////////////////////
const formCheck= document.getElementById("formCheck")

function check(dato){
return `
<div class=" form-check ">
<input type="checkbox" class="form-check-input" value="${dato}" id="${dato}">
<label class="form-check-label" for=${dato}>${dato} </label>
</div>
`
}
function subir(array,elemento){
    let resultado= ""
    for( let valor of array){
        resultado+= check(valor)
    }
    elemento.innerHTML = resultado
}


//////filtrar-checks/////////////////////////

function filtrado(array){
    const input= Array.from(document.querySelectorAll("input[type='checkbox']:checked")) 
    const nuevoArray= input.map(array =>{
        return array.value
    })
    if(nuevoArray.length===0){
        return array
    }
    const verificar= array.filter(valor=>{
        return nuevoArray.includes(valor.category)
    })
    return verificar
}

////// filtrado busqueda/////////

function filtradoBusqueda(array){
    const buscadorValue= buscador.value.toLowerCase()
    if(buscadorValue===0){
        return array
    }
    const filtradoBusquedaDos= array.filter(valor=>{
        return valor.name.toLowerCase().includes(buscadorValue)
    })
    return filtradoBusquedaDos
    
}


///////// filtrado cruzadoo///////////

function filtroCruzado(array){
    return filtrado(filtradoBusqueda(array))
}


//-----------task4---------------------------------//
const fechafiltrada=(array)=>{
    return array.events.filter(e => e.date >= array.currentDate)
}


const url= "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
    .then(response => response.json())
    .then(datos =>{
        let miArray=datos
        const fecha= fechafiltrada(miArray)
        subirTarjeta(fechafiltrada(miArray) ,tarjetas)
        let listaCategory= fecha.map(valor=> valor.category)
        let setListaCategory= Array.from(new Set(listaCategory))
        console.log(setListaCategory)
        subir(setListaCategory,formCheck)
        buscador.addEventListener("keyup", e=>{
         return  subirTarjeta(filtroCruzado(fecha),tarjetas)
        })
        formCheck.addEventListener("change",e =>{
             return subirTarjeta(filtroCruzado(fecha),tarjetas)
         })
    } )
    .catch(error => console.error(error))
    



