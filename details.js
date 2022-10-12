let cadenaParametrosUrl = location.search;
let parametros = new URLSearchParams(cadenaParametrosUrl);
let id = parametros.get("id");

let contenedor = document.getElementById("contenedor");

let eventosFiltrados = (data.events).filter((evento) => {
  return evento;
});

let eventoEncontrado = eventosFiltrados.find((evento) => evento._id == id);

pintarEvento(eventoEncontrado);

function pintarEvento(evento) {
  contenedor.innerHTML = "";
    let div = document.createElement('div')
    div.className="container d-flex justify-content-center align-items-center"
  div.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${evento.image}" class="img-fluid rounded-start w-100 h-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${evento.name}</h5>
                            <p class="card-text">${evento.description}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
`;

  contenedor.appendChild(div);
}