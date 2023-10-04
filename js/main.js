let vehiculos = [
    { id: 1, nombre: "BMW M3", año: "2015", categoria: "Sport", precio: 119000, stock: 1 , imagen: "bmw-M3-prima.jpeg"},
    { id: 2, nombre: "Shelby Cobra", año: "1968", categoria: "Classic", precio: 73500, stock: 0, imagen: "cobra-prima.jpeg" },
    { id: 3, nombre: "Fiat 147 cs", año: "1989", categoria: "Street", precio: 5400, stock: 1, imagen: "fiat-147-prima.jpeg"},
    { id: 4, nombre: "Fiat Marea", año: "2002", categoria: "Street", precio: 12300, stock: 1, imagen: "fiat-marea-prima.jpg"},
    { id: 5, nombre: "Volkswagen Fusca", año: "1974", categoria: "Classic", precio: 15800, stock: 1, imagen: "fusca-conver-prima.jpeg"},
    { id: 6, nombre: "GM chevette V6", año: "1977", categoria: "Racing", precio: 19300, stock: 0, imagen: "gm-chevetteV6-prima.jpg"},
    { id: 7, nombre: "Volkswagen Gol G1T", año: "1989", categoria: "Racing", precio: 13000, stock: 1, imagen: "gol-g1T-prima.jpeg"},
    { id: 8, nombre: "Jaguar Hot Rod", año: "1954", categoria: "Classic", precio: 68000, stock: 0, imagen: "hotrod-coupe-prima.jpeg"},
    { id: 9, nombre: "Mazda MX-5", año: "2017", categoria: "Street", precio: 14300, stock: 1, imagen: "mazda-newmx5-prima.jpeg"},
    { id: 10, nombre: "Volkswagen Passat ts", año: "1981", categoria: "Street", precio: 68000, stock: 1, imagen: "passat-ts-prima.jpeg"},
    { id: 11, nombre: "Mini Cooper S", año: "2010", categoria: "Street", precio: 23000, stock: 1, imagen: "mini-cooper-prima.jpeg"},
    { id: 12, nombre: "Porsche 911 carrera", año: "2017", categoria: "Sport", precio: 133000, stock: 1, imagen: "porsche-911-prima.jpeg"},
    { id: 13, nombre: "Subaru WRX", año: "2006", categoria: "Racing", precio: 63500, stock: 0, imagen: "subaru-wrx-prima.jpeg"},
    { id: 14, nombre: "Ford Escort XR", año: "1992", categoria: "Street", precio: 8600, stock: 0, imagen: "escort-ford-prima.jpeg"},
    { id: 15, nombre: "Audi TT", año: "2010", categoria: "Sport", precio: 31000, stock: 1, imagen: "Audi-tt-prima.jpg"},
]


let carrito = []
let carritoRecuperado = localStorage.getItem("carrito")
if (carritoRecuperado) {
  carrito = JSON.parse(carritoRecuperado)
}
renderizarCarrito(carrito) 

renderizarVehiculos(vehiculos, carrito)

let buscador = document.getElementById("buscador")

let botonBuscar = document.getElementById("buscar")
botonBuscar.addEventListener("click", () => filtrarYRenderizar(vehiculos))

function filtrarYRenderizar(vehiculos) {
  let vehiculoSFiltrados = vehiculos.filter(vehiculo => vehiculo.nombre.includes(buscador.value))
  renderizarVehiculos(vehiculoSFiltrados)
}

let btnFiltrarStreet = document.getElementById("filtrarStreet")
btnFiltrarStreet.addEventListener("click", () => filtrarStreet(vehiculos))

function filtrarStreet(vehiculos) {
    let filtroStreet = vehiculos.filter(vehiculo => vehiculo.categoria.includes("Street"))
    renderizarVehiculos(filtroStreet)
}

let btnFiltrarSport = document.getElementById("filtrarSport")
btnFiltrarSport.addEventListener("click", () => filtrarSport(vehiculos))

function filtrarSport(vehiculos) {
    let filtroSport = vehiculos.filter(vehiculo => vehiculo.categoria.includes("Sport"))
    renderizarVehiculos(filtroSport)
}

let btnFiltrarRacing = document.getElementById("filtrarRacing")
btnFiltrarRacing.addEventListener("click", () => filtrarRacing(vehiculos))

function filtrarRacing(vehiculos) {
    let filtroRacing = vehiculos.filter(vehiculo => vehiculo.categoria.includes("Racing"))
    renderizarVehiculos(filtroRacing)
}

let btnFiltrarClassic = document.getElementById("filtrarClassic")
btnFiltrarClassic.addEventListener("click", () => filtrarClassic(vehiculos))

function filtrarClassic(vehiculos) {
    let filtroClassic = vehiculos.filter(vehiculo => vehiculo.categoria.includes("Classic"))
    renderizarVehiculos(filtroClassic)
}

function renderizarVehiculos(vehiculos, carrito) {
    let contenedor = document.getElementById("contenedorVehiculos")
    contenedor.innerHTML = ""
    
    vehiculos.forEach(vehiculo => {
      let tarjeta = document.createElement("div")
      tarjeta.className = "tarjeta col-md-2 "
    
      tarjeta.innerHTML = `
        <h3>${vehiculo.nombre}</h3>
        <img class=imagenProducto src=./img/${vehiculo.imagen} />
        <p>${vehiculo.categoria}</p>
        <p>${vehiculo.año}</p>
        <p>$${vehiculo.precio}</p>
        <button id=${vehiculo.id}>Agregar al carrito</button>
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
          unidades: 1,
          subtotal: productoBuscado.precio
        })
      }
      productoBuscado.stock--
      localStorage.setItem("carrito", JSON.stringify(carrito))
      swal("¡Excelente!", "Producto agregado al carrito", "success")
    } else {
      swal("Error", "No hay más stock del producto seleccionado", "error",)
    }
  
    renderizarCarrito(carrito)
  }
  
  function renderizarCarrito(productosEnCarrito) {
    console.log(productosEnCarrito)
    if (productosEnCarrito.length > 0) {
      let divCarrito = document.getElementById("carrito")
      divCarrito.innerHTML = ""
  
      productosEnCarrito.forEach(vehiculo => {
        let tarjProdCarrito = document.createElement("div")
        tarjProdCarrito.className = "tarjProdCarrito"
        tarjProdCarrito.innerHTML = `
          <p>${vehiculo.nombre}</p>
          <p>${vehiculo.unidades}</p>
          <p>$${vehiculo.subtotal}</p>
        `
    
        divCarrito.appendChild(tarjProdCarrito)
      })
  
      let boton = document.createElement("button")
      boton.className = "col-md-1"
      boton.innerHTML = "Finalizar compra"
      boton.addEventListener("click", finalizarCompra)
      divCarrito.appendChild(boton)
    }
  }
  
  function finalizarCompra() {
    let carrito = document.getElementById("carrito")
    carrito.innerHTML = ""
    localStorage.removeItem("carrito")
    swal("¡Enhorabuena!", "Su compra ha sido procesada con éxito.", "success")
  }
  
  let botonquitarFiltro = document.getElementById("quitarFiltro")
  botonquitarFiltro.addEventListener("click", eliminarFiltro)
  
  function eliminarFiltro() {
    renderizarVehiculos(vehiculos)
  }

























