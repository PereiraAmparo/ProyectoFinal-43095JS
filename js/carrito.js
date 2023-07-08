
function renderProductos(){
    let productos = cargarCarritoLS();
    let contenido = "";

    if (cantidadTotalPrestamos() <= 3 && cantidadTotalPrestamos() > 0) {
       contenido +=`<table class="table">`;
       contenido += `<tr>
        <td colspan="3">&nbsp;></td>
        <td class="text-end"><button class="btn bg-light btn-sm" onclick="vaciarCarrito();" title="Vaciar Carrito">Vaciar Carrito ❌</button></td>
        <td colspan="3">&nbsp;></td>
        </tr>`;
      
        productos.forEach(producto => {
            contenido += `<tr>
            <td><img src="${producto.img}" alt="${producto.nombre}" width="48"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle"><b>$${producto.prestamo}</b></td>
            <td class="align-middle">${producto.cuotas}</td>
            <td class="align-middle text-end"><img src="./imagenes/trash.svg" alt="Eliminar" title="Eliminar Prestamo" width="20" onclick="eliminarPrestamo(${producto.id});"></td>
            </tr>`;

            contenido += `<tr>
            <td colspan="3">&nbsp;></td>
            <td class="text-end"><button class="btn bg-light btn-sm" onclick="solicitarPrestamo(${producto.id});" title="Enviar Solicitud" width="20">Enviar SOLICITUD ✅</button></td>
            <td colspan="3">&nbsp;></td>
            </tr>`;
        });
          
        contenido += `<tr>
        <td>&nbsp;</td
        <td>&nbsp;</td>
        <td>Total cuota a pagar</td>
        <td>$${sumaTotalPrestamos()}</td>
        <td>&nbsp;</td>
        </tr>
        </table>`;   
    } else if(cantidadTotalPrestamos() > 3){
       contenido +=`<table class="table">`;
       contenido += `<tr>
        <td colspan="3">&nbsp;></td>
        <td class="text-end"><button class="btn bg-light btn-sm" onclick="vaciarCarrito();" title="Vaciar Carrito">Vaciar Carrito ✖️</button></td>
        </tr>`;
      
        productos.forEach(producto => {
            contenido += `<tr>
            <td><img src="${producto.img}" alt="${producto.nombre}" width="40"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle"><b>$${producto.prestamo}</b></td>
            <td class="align-middle">${producto.cuotas}</td>
            <td class="align-middle text-end"><img src="./imagenes/trash.svg" alt="Eliminar" title="Eliminar Prestamo" width="20" onclick="eliminarPrestamo(${producto.id});"></td>
            </tr>`;
        });
          
        contenido += `<tr>
        <td>&nbsp;</td
        <td>&nbsp;</td>
        <td>Total cuota a pagar</td>
        <td>$${sumaTotalPrestamos()}</td>
        <td>&nbsp;</td>
        </tr>
        </table>`;
        Swal.fire({
            title: 'Atención',
            text: "No se puede solicitar mas de 3 prestamos-preaprobados por socio!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: 'rgb(32, 156, 156)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Entendido!'
          })
    } else if (cantidadTotalPrestamos() == 0){
        Swal.fire({
            title: 'No hay Prestamos Solicitados, por favor seleccione el Prestamo deseado.',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          contenido +=`<table class="table">`;
          contenido += `<tr>
           <td colspan="3">&nbsp;></td>
           <td class="text-end"><button class="btn bg-light btn-sm" onclick="vaciarCarrito();" title="Vaciar Carrito">Vaciar Carrito ✖️</button></td>
           </tr>`;
           contenido += `<tr>
           <td>&nbsp;</td
           <td>&nbsp;</td>
           <td>Total cuota a pagar</td>
           <td>$${sumaTotalPrestamos()}</td>
           <td>&nbsp;</td>
           </tr>
           </table>`;
    }
   
    document.getElementById("contenido").innerHTML = contenido;
};
  
 renderProductos();
 renderBotonCarrito();

   