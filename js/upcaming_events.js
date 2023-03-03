const targetas = document.getElementById("targetas")

function targetasDos   (array) {
   return `
<div class="card mt-4" >
                <img src="${array.image} " class="card-img-top mt-2" alt="foto-targeta">
                <div class="card-body">
                    <h5 class="card-title text-center">${array.name} </h5>
                    <p class="card-text ">${array.description} </p>
                    <p class="precio">Price <strong >$ ${array.price} </strong> </p>
                    <a href="./info.html" class="btn btn-primary precio2 ">Go somewhere</a>
                </div>
 </div>
`
} 

function subirTargeta (array, elemento){
    let template = ''
    for( let valor of array ){
        if(valor.date >= "2022-01-01"){
            template += targetasDos( valor )
        }
    }
    elemento.innerHTML = template
}
subirTargeta(data.events,targetas)