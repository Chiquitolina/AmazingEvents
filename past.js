let titulopagina = document.title;
const URI = "https://amazing-events.herokuapp.com/api/events";
let buscador = document.getElementById('search');

let contenedorDatos = document.getElementById('contenedor-datos')
let contenedorCarrousel = document.getElementById('contenedor-carr')
let contenedorCategorias = document.getElementById('contenedor-checks')

function traerDatos(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let eventos = data.events.filter((evento) => evento.date < data.currentDate);
        desplegarCards(eventos, contenedorDatos)
        let categoriasFiltradas = filtrarCategorias();
        desplegarCategorias(categoriasFiltradas, contenedorCategorias)
buscador.addEventListener("keyup", ()=> {
    let eventsFiltrados1 = filtrarporTexto(eventos)
    let eventsFiltrados2 = filtrarporCategoria(eventsFiltrados1)
    desplegarCards(eventsFiltrados2, contenedorDatos)
})

contenedorCategorias.addEventListener('change', () => {

    let arrayFiltrados = filtrarporCategoria(eventos)
    desplegarCards(arrayFiltrados, contenedorDatos)

})
    })
}


function filtrarCategorias() {

    let arrayCategorias = []

    data.events.forEach(evento => {
    if (!arrayCategorias.includes(evento.category)) {
        arrayCategorias.push(evento.category)
    }
});

    return arrayCategorias;

}

function desplegarCategorias(cat, contenedorCategorias) {

    for (let i = 0; i < cat.length; i++) { 

        let label = document.createElement('label')
        label.innerHTML = `<input type="checkbox" id="cbox1" value="${cat[i]}">${cat[i]}`
        
        contenedorCategorias.appendChild(label)
    
    }

}

function desplegarCards(eventos, contenedorDatos) {

    contenedorDatos.innerHTML = "";

    eventos.forEach((evento) => {

        let card = document.createElement('div')
    card.className = "col-12 col-md-3"
    card.innerHTML=`<div class="card h-100">
    <img src="${evento.image}" class="card-img-top h-50 rounded" alt="...">
    <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
            <div class="d-flex justify-content-between">
                <span>Price: ${evento.price} </span><a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
            </div>
    </div>
</div>`
    contenedorDatos.appendChild(card)

    })

}

function filtrarporTexto(eventos) {

    let palabra = buscador.value.toLowerCase();
    let eventsFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(palabra))

    return eventsFiltrados

}

function filtrarporCategoria(eventos) {
    let checksBoxs = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckBoxs = Array.from(checksBoxs)
    console.log(arrayCheckBoxs)

    let checkedCheks = arrayCheckBoxs.filter(check => check.checked)
    let valoresChecks = checkedCheks.map(check => check.value)

    if (valoresChecks.length == 0) {
        return eventos
    }

    let eventsFiltrados = eventos.filter(evento => valoresChecks.includes(evento.category))

    return eventsFiltrados;
}

traerDatos(URI)



