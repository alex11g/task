const targetas = document.getElementById("targetas")

function targetasDos(array) {
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
function filterFecha(array){
    return  array.filter(e=> e.date >= data.currentDate)
 }
 

function mensage(){
    return`
    <h2  class="text-center text-dark">No result of your search was found.</h2>`
}

function subirTargeta (array, elemento){
    let template = ''
    if(array.length==0){
        template=mensage()
    }
    for( let valor of array ){
            template += targetasDos( valor )
    }
    elemento.innerHTML = template
}
subirTargeta(filterFecha (data.events),targetas)






let listaCategory= data.events.map(valor=> valor.category)
let setListaCategory= Array.from(new Set(listaCategory))

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
subir(setListaCategory,formCheck)



//////filtrar//////////////

formCheck.addEventListener("change",e =>{
    return subirTargeta(filtroCruzado(),targetas)
 })

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

////// filtrado busqueda


buscador.addEventListener("keyup", e=>{
    return  subirTargeta(filtroCruzado(),targetas)
})

function filtradoBusqueda(array){
    const buscadorValue= buscador.value.toLowerCase()
    if(buscadorValue===0){
        return array
    }
    const filtradoBusquedaDos= array.filter(e=>{
        return e.name.toLowerCase().includes(buscadorValue)
    })
    return filtradoBusquedaDos
}


///////// filtrado cruzadoo///////////

function filtroCruzado(){
    return filtrado( filtradoBusqueda( filterFecha (data.events) ))
}
