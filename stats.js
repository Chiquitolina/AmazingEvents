const URI = 'https://amazing-events.herokuapp.com/api/events'
let contenedorCarrousel = document.getElementById('contenedor-carr')

function traerDatos(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let eventos = data.events;
        renderizarImagenesCarrousel(eventos)
        let eventosUP = eventos.filter(evento => evento.date > data.currentDate)
        let eventosPAST = eventos.filter(evento => evento.date < data.currentDate)
        let eventosnoUP = eventos.filter(evento => evento.date < data.currentDate)
        let eventoMenorPorcentaje = filtrarEventoMenorPorcentaje(eventosnoUP)
        let eventoMayorPocentaje = filtrarEventoMayorPorcentaje(eventosnoUP)
        let eventoMayorCapacidad = filtrarEventoMayorCapacidad(eventos)
        let categoriasFiltradasUP = filtrarCategorias(eventosUP)
        let eventosPorCategoriaUP = filtrareventosporCategoria(categoriasFiltradasUP, eventosUP)
        let revenuesUP = calcularRevenues(eventosPorCategoriaUP)
        let porcentajeAsistenciasUP = calcularAsistenciasporCat(eventosPorCategoriaUP)
        let categoriasFiltradasPAST = filtrarCategorias(eventosPAST)
        let eventosPorCategoriaPAST = filtrareventosporCategoria(filtrarCategorias(eventosPAST), eventosPAST)
        let revenuesPAST = calcularRevenues(eventosPorCategoriaPAST)
        let porcentajeAsistenciaPAST = calcularAsistenciasporCat(eventosPorCategoriaPAST)
        let categoriasCalculadasUP = crearCategoriasCalculadas(categoriasFiltradasUP, revenuesUP, porcentajeAsistenciasUP)
        console.log(categoriasCalculadasUP)
        let categoriasCalculadasPAST = crearCategoriasCalculadas(categoriasFiltradasPAST, revenuesPAST, porcentajeAsistenciaPAST)
        renderizarDatosEnTabla(categoriasCalculadasUP, categoriasCalculadasPAST, eventoMayorPocentaje, eventoMenorPorcentaje, eventoMayorCapacidad)
    })
}

function renderizarDatosEnTabla(arraycategoriascalculadasup, arraycategoriascalculadaspast, eventomenorpor, eventomayorpor, eventomayorcap) {
    let primerosDatos = document.getElementById('contenedordatos')
    let contenedorUP = document.getElementById('contenedorup')
    let contenedorPAST = document.getElementById('contenedorpast')
    let trPrimer = document.createElement('tr')
    trPrimer.innerHTML = `
    <td>${eventomenorpor}</td>
        <td>${eventomayorpor}</td>
        <td>${eventomayorcap}</td>
    `
    primerosDatos.appendChild(trPrimer)

    arraycategoriascalculadasup.forEach(categoria => {
        let trCategoria = document.createElement('tr')
        trCategoria.innerHTML = `
        <td>${categoria.name}</td>
        <td>${categoria.revenues.toLocaleString()}$</td>
        <td>${categoria.porcentaje.toFixed(2)}%</td>`
        contenedorUP.appendChild(trCategoria)
    })
    arraycategoriascalculadaspast.forEach(categoria => {
        let trCategoria = document.createElement('tr')
        trCategoria.innerHTML = `
        <td>${categoria.name}</td>
        <td>${categoria.revenues.toLocaleString()}$</td>
        <td>${categoria.porcentaje.toFixed(2)}%</td>`
        contenedorPAST.appendChild(trCategoria)
    })
    
}

function crearCategoriasCalculadas(arraycategorias, arrayrevenues, arrayporcentajes) {
    let arrayCategoriasCalculadas = []
    for (let i = 0; i < arraycategorias.length; i++) {
        categoriaCalculada = {
            name: arraycategorias[i],
            revenues: arrayrevenues[i],
            porcentaje: arrayporcentajes[i]
        }
        arrayCategoriasCalculadas.push(categoriaCalculada)
    }
    return arrayCategoriasCalculadas;
}

function calcularAsistenciasporCat(arrayeventosporcategoria) {
    let arrayporcentajes = []
    arrayeventosporcategoria.forEach(array => {
        let resultado = 0
        for (let i = 0; i < array.length; i++) {
            resultado = resultado + calculoporcentajeAsistencia(array[i])
        }
        arrayporcentajes.push(resultado / array.length)
    })
    return arrayporcentajes;
}

function calcularRevenues(arrayeventosporcategoria) {
    let arrayrevenues = []
    arrayeventosporcategoria.forEach(array => {
        let revenuescat = []
        for (let i = 0; i < array.length; i++) {
            let revenue;
            if (array[i].hasOwnProperty('estimate')) {
            revenue = array[i].estimate * array[i].price
            } else {
            revenue = array[i].assistance * array[i].price
            }
            revenuescat.push(revenue)
        }
        arrayrevenues.push(revenuescat.reduce((i, e) => i + e))
    })
    return arrayrevenues
}

function filtrareventosporCategoria(arraycategorias, eventosup) {
    let arrayeventosporcategoria = []
    arraycategorias.forEach(categoria => {
        filtradosporcategoria = eventosup.filter(evento => evento.category == categoria)
        arrayeventosporcategoria.push(filtradosporcategoria)
    })
    return arrayeventosporcategoria;
}

function filtrarCategorias(eventos) {
    arrayCategorias = []
    eventos.forEach(evento => {
        if (!arrayCategorias.includes(evento.category)) {
            arrayCategorias.push(evento.category)
        }
    });
    return arrayCategorias;
}

function filtrarEventoMayorCapacidad(eventos) {
    return eventos.sort((a, b)=> b.capacity-a.capacity)[0].name
}

function filtrarEventoMayorPorcentaje(eventos) {
    let eventomayor = eventos[0]
    for (i = 1; i < eventos.length; i++) {
        if (calculoporcentajeAsistencia(eventos[i]) > calculoporcentajeAsistencia(eventomayor)) {
            eventomayor = eventos[i]
        }
    }
    return eventomayor.name;
}

function filtrarEventoMenorPorcentaje(eventos) {
    let eventomenor = eventos[0]
    for (i = 1; i < eventos.length; i++) {
        if (calculoporcentajeAsistencia(eventos[i]) < calculoporcentajeAsistencia(eventomenor)) {
            eventomenor = eventos[i]
        }
    }
    return eventomenor.name;
}

function calculoporcentajeAsistencia(evento) {
        let resultado
        if (evento.hasOwnProperty('assistance')) {
        resultado = ((evento.assistance * 100) / evento.capacity)
        } else {
        resultado = ((evento.estimate * 100) / evento.capacity)
        }
    return resultado;
}

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