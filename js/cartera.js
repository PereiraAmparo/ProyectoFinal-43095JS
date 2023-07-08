
function renderProductos(){
    let productos = cargarPrestamosLS();
    let contenido = "";
   
    productos.forEach(producto => {
           contenido += `<div class="col-md-3 mb-5">
         <div class="card text-center border border-0">
             <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
           <div class="card-body">
               <h5 class="card-title">${producto.nombre}</h5>
               <p class="card-text"><b>$${producto.prestamo}</b></p>
               <a href="verCartera.html" class="btn btn-info" onClick="verCartera(${producto.id});">Quiero Información</a>
             </div>
         </div>
    </div>`;
  });
 
    document.getElementById("contenido").innerHTML = contenido;
};



 renderProductos();
 renderBotonCarrito();


 