
function obtenerTasasDeCambio() {
    const apiKey = '925dc7b83f9e4ca4aa1542aab01dded8'; 
  
    
    fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        
        const rates = data.rates;
       
        const tablaCuerpo = document.getElementById('tablaCuerpo');
  
        tablaCuerpo.innerHTML = '';
  
        const monedasMostrar = ['UYU', 'ARS', 'EUR'];
  
        monedasMostrar.forEach(moneda => {
          
          if (rates.hasOwnProperty(moneda)) {
            
            const fila = document.createElement('tr');
  
            const celdaMoneda = document.createElement('td');
            celdaMoneda.textContent = moneda;
            fila.appendChild(celdaMoneda);
            
            const celdaTasaCambio = document.createElement('td');
            celdaTasaCambio.textContent = rates[moneda].toFixed(2); 
            fila.appendChild(celdaTasaCambio);
            
            celdaMoneda.classList.add('table-primary');
            celdaTasaCambio.classList.add('table-secondary');
           
            tablaCuerpo.appendChild(fila);
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener las tasas de cambio:', error);
      });
  }
  
  obtenerTasasDeCambio();
  
