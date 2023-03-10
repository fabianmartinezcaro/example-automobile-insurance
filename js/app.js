// Variables
const formulario = document.querySelector('#cotizar-seguro');
const resultado = document.querySelector('#resultado');

// Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizar = function () {

    let cantidad;
    const precioBase = 2000;

    switch(this.marca){

        case '1':
            cantidad = precioBase * 1.15;
            break;

        case '2':
            cantidad = precioBase * 1.05;
            break;

        case '3':
            cantidad = precioBase * 1.35;
            break;

        default:
            break;
    }

    // Leer año
    const diferencia = new Date().getFullYear() - this.year;
    
    // Calculo - 3% segun el año del vehiculo
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI(){

}

// Instanciación
const ui = new UI();
console.log(!ui.cargarSelect ? 'Necesitas poner informacion' : 'Completado');

// Prototypes
UI.prototype.cargarSelect = function () {

    const max = new Date().getFullYear();
    const min = max - 15;

    const inputYear = document.querySelector('#year');

    for(i = max; i >= min; i--){
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;
        inputYear.appendChild(opcion);
    }
}


UI.prototype.mostrarAlerta = function (mensaje, tipo) {

    const divMensaje = document.createElement('DIV');

    if(tipo === 'error'){
        divMensaje.classList.add('error');
    }else{
        divMensaje.classList.add('correcto');
    }

    divMensaje.classList.add('mensaje', 'mt-10');
    divMensaje.textContent = mensaje;

    formulario.insertBefore(divMensaje, resultado);

    setTimeout(() => {
        divMensaje.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = function (seguro, total) {

    const {marca, year, tipo} = seguro;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiático';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    const divResultado = document.createElement('DIV');
    divResultado.classList.add('mt-10');

    divResultado.innerHTML = `
        <p class="header">Resumen cotización</p>
        <p class="font-bold">TOTAL: <span class="font-normal">$${total}</span></p>
        <p class="font-bold">MARCA: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">AÑO: <span class="font-normal">${year}</span></p>
        <p class="font-bold">TIPO DE SEGURO: <span class="font-normal">${tipo}</span></p>

    `

    // Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.appendChild(divResultado);
    }, 3000);

}

UI.prototype.limpiarAlerta = function () {
    
}


cargarAddEventListeners();

function cargarAddEventListeners(){
    formulario.addEventListener('submit', cotizarSeguro);
    
    document.addEventListener('DOMContentLoaded', () => {
        ui.cargarSelect();
    })
}


function cotizarSeguro(evento){
    evento.preventDefault();

    const inputMarca = document.querySelector('#marca').value;
    const inputYear = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(inputMarca === '' || inputYear === '' || tipo === ''){
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarAlerta('Cotizando...', 'correcto');

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    // Instanciación de seguro
    const seguro = new Seguro(inputMarca, inputYear, tipo);
    const total = seguro.cotizar();

    // Utilizar prototype de cotización
    ui.mostrarResultado(seguro, parseInt(total));

}



