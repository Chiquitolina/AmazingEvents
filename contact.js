let contenedorCarrousel = document.getElementById('contenedor-carr')

for (let i = 0; i < data.events.length; i++) {
    
    let imgcarrousel = document.createElement('div')
    if (i == 0) {
    imgcarrousel.className = "carousel-item active"
    } else {
    imgcarrousel.className = "carousel-item"
    }
    imgcarrousel.innerHTML = `<img src="${data.events[i].image}" class="imgs altcarr d-block w-100 altcarr" alt="...">`

   
    contenedorCarrousel.appendChild(imgcarrousel)


}