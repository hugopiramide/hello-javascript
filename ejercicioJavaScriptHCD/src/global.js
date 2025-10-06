const columnas = document.getElementById('columnas');
const filas = document.getElementById('filas');
const luces = document.getElementById('luces');
const dificultadFacil = document.getElementById('facil');
const dificultadMedio = document.getElementById('medio');
const dificultadDificil = document.getElementById('dificil');
const dificultadPersonalizado = document.getElementById('personalizado');
const btnSeleccionar = document.getElementById('btnSeleccionar');
const tmpTranscurrido = document.getElementById('tmpTranscurrido');
const intentos = document.getElementById('intentos');
const INTERVALO_CRONOMETRO_MS = 1000;

let horas;
let minutos;
let segundos;
let intervalo;

dificultadFacil.addEventListener('click', () => setDificultad(5, 6, 10));
dificultadMedio.addEventListener('click', () => setDificultad(6, 6, 6));
dificultadDificil.addEventListener('click', () => setDificultad(10, 10, 20));
dificultadPersonalizado.addEventListener('click', () => setDificultad(0, 0, 0, false));

btnSeleccionar.addEventListener('click',(event) => {
    event.preventDefault();
    iniciarJuego();
})

const iniciarJuego = () => {
    reestablecerCronometro();
    actualizarContador(0);

    const matrizTabla = new Array();
    contadorIntentos = 0; horas = 0, minutos = 0, segundos = 0;
    let columna = parseInt(document.getElementById('columnas').value);
    let fila = parseInt(document.getElementById('filas').value);
    let luces = parseInt(document.getElementById('luces').value);
    
    if(columna * fila >= luces){
        generarTablero(matrizTabla,columna,fila,luces);
    }
}

const generarTablero = (matrizTabla,columna,fila,luces) => {

    for (let i = 0; i < fila; i++) {
        matrizTabla[i] = new Array(columna).fill(0);
    }
    generarLuces(matrizTabla, luces, columna, fila);
}

const generarLuces = (matriz,luces,columna,fila) => {
    let luz = 0;
    while(luz < luces) {
        let row = getRandomArbitrary(0, fila); 
        let col = getRandomArbitrary(0, columna); 
        if(matriz[row][col] == 0){
            matriz[row][col] = 1;
            luz++;
        }
    }
    contruirTableroHTML(matriz, luces, columna, fila);
}

const contruirTableroHTML = (matrizTabla, luces, columnas, filas) => {

    const tabla = document.getElementById("mainTable");

    tabla.innerHTML = "";
    console.log(matrizTabla);

for (let i = 0; i < filas; i++) {
    const fila = document.createElement("tr");
    for (let j = 0; j < columnas; j++) {
        const celda = document.createElement("td");
        celda.id = i + "_" + j;

        if(matrizTabla[i][j] === 1){
        celda.style.backgroundColor = "yellow"
        }else{
        celda.style.backgroundColor = "black";
        }

        celda.addEventListener('click', () => accionCeldaClick(celda,i,j, matrizTabla));
        fila.appendChild(celda);
    }

    tabla.appendChild(fila);
}

}

function setDificultad(filasVal = undefined, columnasVal = undefined, lucesVal = undefined, disabled = true) {
    filas.disabled = disabled;
    filas.value = filasVal;
    columnas.disabled = disabled;
    columnas.value = columnasVal;
    luces.disabled = disabled;
    luces.value = lucesVal;
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