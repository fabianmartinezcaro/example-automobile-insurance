// Variables
const formulario = document.querySelector('#cotizar-seguro');
const inputMarca = document.querySelector('#marca');

// Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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

UI.prototype.marcaSeguro = function () {
    
}

UI.prototype.tipoSeguro = function () {

}

// Cuando los tres campos estén completos se validará el formulario
UI.prototype.validarCampos = function () {

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
    console.log(inputMarca)
}

