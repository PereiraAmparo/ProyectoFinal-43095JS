
function renderProducto() {
    const producto = JSON.parse(localStorage.getItem("producto"));
        let contenido = `<div class="col-md-6 ">
        <img src="${producto.img}" class="img-fluid border border-0 " alt="${producto.nombre}">
        </div>
        <div class="col-md-4 card">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text"><b>$${producto.prestamo}</b></p>
            <p> en cuotas fijas de $${producto.cuotas}</p>  
            <p class="my-5"><button class="btn btn-info" onclick="agregarPrestamo(${producto.id});">Agregar Prestamo</button></p>
            <button class="btn btn-info btn-sm mb-3" onclick="window.location.href='./cartera.html'">Volver</button>
            </div>`;
       
            document.getElementById("contenido").innerHTML = contenido;
   
}

renderProducto();
renderBotonCarrito();