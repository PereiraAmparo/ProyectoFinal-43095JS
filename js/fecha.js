const DateTime = luxon.DateTime;

function obtenerFechaHora() {
    return new Promise((resolve, reject) => {
      
      const fechaHoraActual = luxon.DateTime.local().setZone('America/Montevideo');
      const fechaHoraFormateada = fechaHoraActual.toLocaleString(luxon.DateTime.DATETIME_MED);
      
      if (fechaHoraFormateada) {
        resolve(fechaHoraFormateada);
      } else {
        reject('No se pudo obtener la fecha y hora actual.');
      }
    });
  }
  function mostrarFechaHora() {
    const fechaHoraElemento = document.getElementById('fechaHora');
  
    obtenerFechaHora()
      .then(fechaHora => {
        fechaHoraElemento.textContent = fechaHora;
      })
      .catch(error => {
        fechaHoraElemento.textContent = 'Error: ' + error;
      });
  }
  
  mostrarFechaHora();
  