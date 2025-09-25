const columnas = document.getElementById('columnas');
const filas = document.getElementById('filas');
const lucesEncendidas = document.getElementById('lucesEncendidas');
const personalizado = document.getElementById('personalizado');
const dificultadFacil = document.getElementById('facil');
const dificultadMedio = document.getElementById('medio');
const dificultadDificil = document.getElementById('dificil');
const dificultadPersonalizado = document.getElementById('personalizado');
const btnSeleccionar = document.getElementById('btnSeleccionar');
const intentos = document.getElementById('intentos');
const EMPTY = 0;

let tabla = [[EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY]];  
let contadorIntentos = 0;

const modoJuego = () => {
tabla = [[EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY],
            [EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY]];
 
}

const clickTd = event => {
const [, row, column] = event.currentTarget.id.split('_');

}

function setDificultad(filasVal = undefined, columnasVal = undefined, lucesVal = undefined, disabled = true) {
    filas.disabled = disabled;
    filas.value = filasVal;
    columnas.disabled = disabled;
    columnas.value = columnasVal;
    lucesEncendidas.disabled = disabled;
    lucesEncendidas.value = lucesVal;
}

dificultadFacil.addEventListener('click', () => setDificultad(5, 6, 10));
dificultadMedio.addEventListener('click', () => setDificultad(6, 6, 6));
dificultadDificil.addEventListener('click', () => setDificultad(10, 10, 20));
dificultadPersonalizado.addEventListener('click', () => setDificultad(0, 0, 0, false));


btnSeleccionar.addEventListener('click',(event) => {
    event.preventDefault();
    modoJuego();
})