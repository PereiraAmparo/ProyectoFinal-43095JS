
function guardarPrestamosLS(){
    localStorage.setItem("productos", JSON.stringify(productos));
  }
 
  function cargarPrestamosLS(){
    return JSON.parse(localStorage.getItem("productos"));
  }
 
  function guardarCarritoLS(carrito){
   localStorage.setItem("carrito", JSON.stringify(carrito));
 }
 
 function cargarCarritoLS(){
   return JSON.parse(localStorage.getItem("carrito")) || [];
 }
  
  function buscarPrestamo(id){
    const productos = cargarPrestamosLS();
  
    return productos.find(item => item.id === id);
  }
   function agregarPrestamo(id){
    const carrito = cargarCarritoLS();
    const producto = buscarPrestamo(id);
    const hay = false;
    for(let p in carrito){
      if(producto.id === carrito[p].id){
        Swal.fire(
          'Error',
          'No se puede solicitar multiples prestamos del mismo tipo.',
          'error'
        )
        hay = true;
      }
    }
    if(!hay){
      carrito.push(producto);
      guardarCarritoLS(carrito);
      renderBotonCarrito();
    }
   }
  
  function eliminarPrestamo(id){
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id != id)
    guardarCarritoLS(nuevoCarrito);
    renderBotonCarrito();
    renderProductos();
  }

  function vaciarCarrito(){
    localStorage.removeItem("carrito");
    renderBotonCarrito();
    renderProductos();
  }

  function solicitarPrestamo(id){
    Toastify({
      text: "Solicitud enviada.",
      duration: 1500,
      gravity: "bottom", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "rgb(30, 184, 184)",
      },
      onClick: function(){} 
    }).showToast();
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id != id)
    guardarCarritoLS(nuevoCarrito);
    renderBotonCarrito();
    renderProductos();
  }

function cantidadTotalPrestamos(){
  const carrito = cargarCarritoLS();
  return carrito.length;
}

function sumaTotalPrestamos(){
  const carrito = cargarCarritoLS();
  return carrito.reduce((acumulador, item)=> acumulador += item.cuotas, 0);
}

function verCartera(id){
  const producto = buscarPrestamo(id);
  localStorage.setItem("producto", JSON.stringify(producto));
}
function renderBotonCarrito(){
  let botonCarrito = document.getElementById("botonCarrito");
  let contenido = `<button type="button" class="btn bg-light position-relative">
  <img src="imagenes/cart4.svg" alt="carrito" width="20">
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
    ${cantidadTotalPrestamos()}
  </span>
  </button>`;
  botonCarrito.innerHTML = contenido;
}