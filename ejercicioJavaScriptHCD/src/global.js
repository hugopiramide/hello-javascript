const ganadorId = document.getElementById('ganador');
const columnasId = document.getElementById('columnas');
const filasId = document.getElementById('filas');
const lucesId = document.getElementById('luces');
const dificultadFacil = document.getElementById('facil');
const dificultadMedio = document.getElementById('medio');
const dificultadDificil = document.getElementById('dificil');
const dificultadPersonalizado = document.getElementById('personalizado');
const btnSeleccionar = document.getElementById('btnSeleccionar');
const tmpTranscurrido = document.getElementById('tmpTranscurrido');
const intentos = document.getElementById('intentos');
const tablaHTML = document.getElementById("mainTable");
const INTERVALO_CRONOMETRO_MS = 1000;

let matrizTabla;
let horas;
let minutos;
let segundos;
let intervalo;
let columna;
let fila;
let luces;

dificultadFacil.addEventListener('click', () => setDificultad(5, 6, 10));
dificultadMedio.addEventListener('click', () => setDificultad(6, 6, 6));
dificultadDificil.addEventListener('click', () => setDificultad(10, 10, 20));
dificultadPersonalizado.addEventListener('click', () => setDificultad(0, 0, 0, false));

function setDificultad(filasVal = undefined, columnasVal = undefined, lucesVal = undefined, disabled = true) {
    filasId.disabled = disabled;
    filasId.value = filasVal;
    columnasId.disabled = disabled;
    columnasId.value = columnasVal;
    lucesId.disabled = disabled;
    lucesId.value = lucesVal;
}

btnSeleccionar.addEventListener('click',(event) => {
    event.preventDefault();
    iniciarJuego();
})

const iniciarJuego = () => {

    matrizTabla = new Array();
    contadorIntentos = 0; 
    horas = 0,
     minutos = 0, 
     segundos = 0;
    columna = parseInt(columnasId.value);
    fila = parseInt(filasId.value);
    luces = parseInt(lucesId.value);
    
    if(comprobarRequisitosPrograma()){

        reestablecerCronometro();
        actualizarContador(0);
        generarTablero();
        generarLuces();
        contruirTableroHTML();

    }
}

const generarTablero = () => {
    for (let i = 0; i < fila; i++) {
        matrizTabla[i] = new Array(columna).fill(0);
    }
}

const generarLuces = () => {

    let luz = 0;
    let row, col;

    while(luz < luces) {
        row = getRandomArbitrary(0, fila); 
        col = getRandomArbitrary(0, columna); 
        if(matrizTabla[row][col] == 0){
            matrizTabla[row][col] = 1;
            luz++;
        }
    }
}

const contruirTableroHTML = () => {

    tablaHTML.innerHTML = "";
    console.log(matrizTabla);

    for (let i = 0; i < fila; i++) {
        let filaTabla = document.createElement("tr");

        for (let j = 0; j < columna; j++) {
            let celdaTabla = document.createElement("td");
            celdaTabla.id = i + "_" + j;
            if(matrizTabla[i][j] === 1){
            celdaTabla.style.backgroundColor = "yellow"
            }else{
            celdaTabla.style.backgroundColor = "black";
            }
            celdaTabla.addEventListener('click', () => accionCeldaClick(celdaTabla,i,j, matrizTabla));
            filaTabla.appendChild(celdaTabla);
        }

        tablaHTML.appendChild(filaTabla);
    }
}

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}


function actualizarDisplayCronometro() {
    let h = horas < 10 ? "0" + horas : horas;
    let m = minutos < 10 ? "0" + minutos : minutos;
    let s = segundos < 10 ? "0" + segundos : segundos;
    tmpTranscurrido.innerText = `${h}:${m}:${s}`;
;}

function contar() {
    segundos++;
    if (segundos >= 60) {
    segundos = 0;
    minutos++;
    }
    if (minutos >= 60) {
    minutos = 0;
    horas++;
    }
    actualizarDisplayCronometro();
}

function generarCronometro(){
    horas = 0;
    minutos = 0;
    segundos = 0;
    intervalo = setInterval(contar, INTERVALO_CRONOMETRO_MS);
}

function reestablecerCronometro() {
    clearInterval(intervalo);
    tmpTranscurrido.innerHTML = '00:00:00';
}

function detenerCronometro(){
    clearInterval(intervalo);
}

function actualizarContador(start = null){
    if(start != null){
    contadorIntentos = start;
    intentos.value = contadorIntentos;
    intentos.innerText = contadorIntentos;
    }else{
    intentos.innerText = '';
    contadorIntentos++;
    intentos.value = contadorIntentos;
    intentos.innerText = contadorIntentos;
    }
}

function accionCeldaClick(celda,i,j,tabla){
    actualizarContador();
    if(intentos.value <= 1){
        generarCronometro();
    }
    encenderApagarLuces(tabla,i,j,celda);
    if(comprobarGanador()){
        ganadorId.innerHTML += 'Enorabuena, has conseguido encender todas la luces!'; 
        detenerCronometro();
    }

    console.log(tabla);
    console.log(contadorIntentos);
}

function encenderApagarLuces(tabla, i, j, celda) {

    function toggleCelda(x, y) {
        if (tabla[x] && tabla[x][y] !== undefined) {
            let celdaAdyacente = document.getElementById(x + "_" + y);
            if (tabla[x][y] === 1) {
                celdaAdyacente.style.backgroundColor = 'black';
                tabla[x][y] = 0;
            } else {
                celdaAdyacente.style.backgroundColor = 'yellow';
                tabla[x][y] = 1;
            }
        }
    }

    if (tabla[i][j] === 1) {
        celda.style.backgroundColor = 'black';
        tabla[i][j] = 0;
    } else {
        celda.style.backgroundColor = 'yellow';
        tabla[i][j] = 1;
    }

    toggleCelda(i - 1, j);
    toggleCelda(i + 1, j); 
    toggleCelda(i, j - 1);
    toggleCelda(i, j + 1);
    toggleCelda(i - 1, j - 1);
    toggleCelda(i + 1, j - 1);
    toggleCelda(i - 1, j + 1);
    toggleCelda(i + 1, j + 1);
}

const comprobarRequisitosPrograma = () => {
    if (columna * fila < luces){tablaHTML.innerText = 'Tabla no generarda, indique bien la cantidad de luces en el tablero';return false;}
    if (isNaN(columna) || isNaN(fila) || isNaN(luces)) {tablaHTML.innerText = 'Tabla no generada, instancia de manera correcta los valores fila/columna/luces';return false;}
    return true;
}

const comprobarGanador = () => {
    return matrizTabla.flat().every(elemento => elemento === 1);
}