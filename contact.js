const URI = 'https://amazing-events.herokuapp.com/api/events'
let contenedorCarrousel = document.getElementById('contenedor-carr')

function traerDatos(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    let eventos = data.events
    console.log(eventos)
    renderizarImagenesCarrousel(eventos)
    })}

function renderizarImagenesCarrousel(eventos) {
    for (let i = 0; i < eventos.length; i++) {

        let imgcarrousel = document.createElement('div')
        if (i == 0) {
        imgcarrousel.className = "carousel-item active text-center text-black"
        } else {
        imgcarrousel.className = "carousel-item text-center text-black"
        }
        imgcarrousel.innerHTML = `<p style="background-black: red">"${document.title}"</p><img src="${eventos[i].image}" class="imgs altcarr d-block w-100 altcarr" alt="...">`
    
    
        contenedorCarrousel.appendChild(imgcarrousel)
    }
}

traerDatos(URI)