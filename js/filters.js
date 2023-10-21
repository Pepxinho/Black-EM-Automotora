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

  let botonquitarFiltro = document.getElementById("quitarFiltro")
botonquitarFiltro.addEventListener("click", eliminarFiltro)

function eliminarFiltro() {
  renderizarVehiculos(vehiculos)
}