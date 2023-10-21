fetch("./info.json") // retorna objeto Response
  .then(respuesta => respuesta.json()) // pasar de Response a JS 
  .then(vehiculos => principal(vehiculos))
  .catch(error => console.log(error))

function principal(vehiculos) {
  let carritoRecuperado = localStorage.getItem("carrito")
  let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : []

renderizarCarrito(carrito)
renderizarVehiculos(vehiculos, carrito)

let buscador = document.getElementById("buscador")

let botonBuscar = document.getElementById("buscar")
botonBuscar.addEventListener("click", () => filtrarYRenderizar(vehiculos, buscador))

}

function renderizarVehiculos(vehiculos, carrito) {
  let contenedor = document.getElementById("contenedorVehiculos")
  contenedor.innerHTML = ""

  vehiculos.forEach(vehiculo => {
    let tarjeta = document.createElement("div")
    tarjeta.className = "card col-md-2 mt-3"
    tarjeta.style = "width: 18rem; "

    tarjeta.innerHTML = `
        <img class="card-img-top" src=./img/coches/${vehiculo.imagen} />
        <div class="card-body" >
        <h5 class="card-title" >${vehiculo.nombre}</h5>
        <p class="card-text" >${vehiculo.categoria}</p>
        <p class="card-text" >${vehiculo.año}</p>
        <p class="card-text card-price" >$${vehiculo.precio}</p>
        <button class="btn-agregar btn" id=${vehiculo.id}>Agregar al carrito</button>
        </div>
      `

    contenedor.appendChild(tarjeta)

    let botonAgregarAlCarrito = document.getElementById(vehiculo.id)
    botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(vehiculos, carrito, e))
  })
}

function agregarProductoAlCarrito(vehiculos, carrito, e) {
  let productoBuscado = vehiculos.find(vehiculo => vehiculo.id === Number(e.target.id))
  let productoEnCarrito = carrito.find(vehiculo => vehiculo.id === productoBuscado.id)

  if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
      productoEnCarrito.unidades++
      productoEnCarrito.subtotal = productoEnCarrito.unidades
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        img: productoBuscado.imagen,
        unidades: 1,
        subtotal: productoBuscado.precio
      })
    }
    productoBuscado.stock--
    localStorage.setItem("carrito", JSON.stringify(carrito))
    tostadaAccepted()
  } else {
    tostadaRejected()
  }

  renderizarCarrito(carrito)
}

function renderizarCarrito(productosEnCarrito) {
  if (productosEnCarrito.length > 0) {
    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML = ""

    productosEnCarrito.forEach(({nombre, imagen, unidades, subtotal, año}) => {

      let tarjProdCarrito = document.createElement("div")
      tarjProdCarrito.className = "tarjProdCarrito"
      tarjProdCarrito.innerHTML = `

          <h1 class="tarj-title"> Carrito </h1>
          
          <img src=./img/coches/${imagen} />
          <p class="modelo-title">${nombre}</p>
          <p class="precio-title">$${subtotal}</p>
          <h5 class="tarj-subtitle"> Verifique que los datos del vehiculo a comprar sean correctos </h5>
          <button id="finalizarCompra" class="boton btn-fn-compra col-md-1"> Finalizar compra</button>
        `

      divCarrito.appendChild(tarjProdCarrito)
    })

    let boton = document.getElementById("finalizarCompra")
    boton.addEventListener("click", finalizarCompra)
  }
}

function finalizarCompra() {
  let carrito = document.getElementById("carrito")
  carrito.innerHTML = ""
  localStorage.removeItem("carrito")
  swal("¡Enhorabuena!", "Su compra ha sido procesada con éxito.", "success")
  recargarPag()
}


function tostadaAccepted() {
  Toastify({
    text: "Vehiculo agregado al carrito",
    className: "accepted",
    gravity: "bottom",
    style: {
      background: "linear-gradient(to right, #27374d, #020024)",
    }
  }).showToast();
}

function tostadaRejected() {
  Toastify({
    text: "No hay stock del producto",
    className: "rejected",
    gravity: "bottom",
    style: {
      background: "linear-gradient(to right, #ff6800, #f21600)",
    }
  }).showToast();
}

function recargarPag() {
  setTimeout("window.location.reload()", 2000)
}

















