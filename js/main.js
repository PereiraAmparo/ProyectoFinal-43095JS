class Prestamo{
    constructor(monto,cantCuotas){
        this.monto = monto;
        this.interesApagar = 0;
        this.cantCuotas = cantCuotas;
        this.amortizacion = 0;
        this.cuotasApagar = cantCuotas;
        this.cuotasPagadas = 0;
        this.id = null;
    }

    getMonto(){
        return this.monto;
    }

    setInteres(interes){
        this.interesApagar = interes; 
    }

    getInteres(){
        return this.interesApagar;
    }

    setAmortizacion(amortizacion){
        this.amortizacion = amortizacion;
    }

    getAmortizacion(){
        return this.amortizacion;
    }

    getCantCuotas(){
        return this.cantCuotas;
    }

    getCuotasApagar(){ 
        return this.cuotasApagar;
    }

    setCuotasPagadas(pagadas){
        this.cuotasPagadas = pagadas;
    }

    getCuotasPagadas(){
        return this.cuotasPagadas;
    }

    setId(id){
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

class Usuario{
    constructor(nombre,apellido,ci,tel,mail){
        this.nombre = nombre;
        this.apellido = apellido;
        this.ci = ci;
        this.tel = tel;
        this.mail = mail;
    }
}

const prestamosUsuario = [];

function calculos(prestamo){
    let monto = prestamo.getMonto();
    let cantCuotas = prestamo.getCantCuotas();
    let tasaMensual = 0.0272 * 1.22;
    let cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, cantCuotas) / (Math.pow(1 + tasaMensual, cantCuotas) - 1)).toFixed(2);
    let interesTotal = (cuota * cantCuotas - monto).toFixed(2);
    let amortizacionPrestamo = (monto/cantCuotas).toFixed(2);
    prestamo.setAmortizacion(amortizacionPrestamo);
    prestamo.setInteres(interesTotal);
    prestamo.setId((prestamosUsuario.length)+1);
}

function ingresoPrestamo(event) {
    event.preventDefault();
    let Monto = parseInt(document.getElementById("inputMonto").value);
    let Cuotas = document.getElementById("selectCuotas").value;
    let prestamo = new Prestamo(Monto,Cuotas);
    calculos(prestamo);
    prestamosUsuario.push(prestamo);
    document.getElementById("confirmPrestamo").innerHTML = "Se ha ingresado el prestamo número " + (prestamosUsuario.indexOf(prestamo) + 1) + " exitosamente";
}

function listarPrestamos(prestamos){
    if (prestamos.length != 0) {
        if (prestamos.length > 1) {
            ordenarPorMonto(prestamos);
        }
        let container = document.getElementById("listaPrestamo");
        container.innerHTML = "";
        
        for (let i = 0; i < prestamos.length; i++) {
            document.getElementById("parrafoPrestamo").innerHTML = "";
            let p = prestamos[i];
        
            let card = document.createElement("div");
            card.classList.add("card", "mb-3");
        
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
        
            let title = document.createElement("h5");
            title.classList.add("card-title");
            title.textContent = "Préstamo número " + p.getId();
        
            let monto = document.createElement("p");
            monto.classList.add("card-text");
            monto.textContent = "Monto total: " + p.getMonto() + " pesos";
        
            let cuotas = document.createElement("p");
            cuotas.classList.add("card-text");
            cuotas.textContent = "Cantidad de cuotas: " + p.getCantCuotas();
        
            let amortizacion = document.createElement("p");
            amortizacion.classList.add("card-text");
            amortizacion.textContent = "Amortización Constante: " + p.getAmortizacion() + " pesos";
        
            let interes = document.createElement("p");
            interes.classList.add("card-text");
            interes.textContent = "Interés total a pagar: " + p.getInteres() + " pesos";
        
            let cuotasRestantes = document.createElement("p");
            cuotasRestantes.classList.add("card-text");
            cuotasRestantes.textContent = "Cantidad de Cuotas: " + (p.getCuotasApagar() - p.getCuotasPagadas());
        
            cardBody.appendChild(title);
            cardBody.appendChild(monto);
            cardBody.appendChild(cuotas);
            cardBody.appendChild(amortizacion);
            cardBody.appendChild(interes);
            cardBody.appendChild(cuotasRestantes);
        
            card.appendChild(cardBody);
            container.appendChild(card);
        } 
    }else{
        parrafo = document.getElementById("parrafoPrestamo");
        parrafo.innerHTML = "No hay prestamos";
        parrafo.classList.add("menu");
        let ul = document.getElementById("listaPrestamo");
        ul.innerHTML = "";
    }
}

function mostrarPorCuotas(cant){
    let prestamos = [];
    if(cant == 0){
        prestamos = prestamosUsuario;
        listarPrestamos(prestamos);
    } else if(cant == 6 || cant == 12 || cant == 24){
        for(let i = 0; i < prestamosUsuario.length; i++){
            if(prestamosUsuario[i].cantCuotas == cant){
                prestamos.push(prestamosUsuario[i]);
            }
        }
    }
    listarPrestamos(prestamos);
}

function ingresoUsuario(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre");
    let nombreError = document.getElementById("nombreError");
    let apellido = document.getElementById("apellido");
    let apellidoError = document.getElementById("apellidoError");
    let email = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let telefono = document.getElementById("telefono");
    let telefonoError = document.getElementById("telefonoError");
    let cedula = document.getElementById("cedula");
    let cedulaError = document.getElementById("cedulaError");
    chequearFormUsuario(nombre, nombreError);
    chequearFormUsuario(apellido, apellidoError);
    chequearFormUsuario(email, emailError);
    chequearFormUsuario(cedula, cedulaError);
    chequearFormUsuario(telefono, telefonoError);
    if(nombre.value != "" && apellido.value != "" && email.value != "" && cedula.value != "" && telefono.value != ""){
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let tel = document.getElementById("telefono");
        new Usuario(nombre.value, apellido.value, tel.value, email.value, cedula.value);
        nombreError.innerHTML = "";
        apellidoError.innerHTML = "";
        emailError.innerHTML = "";
        cedulaError.innerHTML = "";
        telefonoError.innerHTML = "";
        Swal.fire(
            'Usuario Registrado',
            'Se ha registrado el usuario exitosamente',
            'success');
    }else{
        Swal.fire(
            'error',
            'Faltan datos por ingresar',
            'error');
    }
}

function chequearFormUsuario(elemento, elementoError) {
    if(elemento.value == ""){
        elementoError.className = "text-danger";
        elementoError.innerHTML = "Porfavor rellene con los datos apropiados.";
    } else {
        elementoError.innerHTML = "";
    }
}


function ordenarPorMonto(prestamos) {
    let orden = document.getElementById("orden").value;
    if(orden == "descendiente"){
        prestamos.sort(function(a, b) {
        return b.monto - a.monto;
        });
    }else if (orden == "ascendiente"){
        prestamos.sort(function(a, b) {
            return a.monto - b.monto;
        });
    }
    else if (orden == "Id"){
        prestamos.sort(function(a, b) {
            return a.id - b.id;
        });
    }
}

function showPrestamo(event) {
    event.preventDefault();
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "block";
    ingresoUsuario.style.display = "none";
    listaPrestamos.style.display = "none";
}
function showUsuario(event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "none";
    ingresoUsuario.style.display = "block";
    listaPrestamos.style.display = "none";
}
function showListaPrestamo(event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("secIngresoUsuario");
    let ingresoPrestamo = document.getElementById("secIngresoPrestamo");
    let listaPrestamos = document.getElementById("secListarPrestamos");
    ingresoPrestamo.style.display = "none";
    ingresoUsuario.style.display = "none";
    listaPrestamos.style.display = "block";
}

function cambioDeOrdenyBusqueda () {
    radio = document.getElementById("todos");
    radio.checked = true;
}

document.getElementById("btnUsuario").addEventListener("click", ingresoUsuario);
document.getElementById("menuSocio").addEventListener("click", showUsuario);
document.getElementById("menuPrestamo").addEventListener("click", showPrestamo);
document.getElementById("formPrestamo").addEventListener("submit", ingresoPrestamo);
document.getElementById("menuMostrar").addEventListener("click", showListaPrestamo);
document.getElementById("menuMostrar").addEventListener("click", (event) => {listarPrestamos(prestamosUsuario);});  
document.getElementById("todos").addEventListener("click", (event) => {mostrarPorCuotas(0);});
document.getElementById("6cuotas").addEventListener("click", (event) => {mostrarPorCuotas(6);});
document.getElementById("12cuotas").addEventListener("click", (event) => {mostrarPorCuotas(12);});
document.getElementById("24cuotas").addEventListener("click", (event) => {mostrarPorCuotas(24);});






