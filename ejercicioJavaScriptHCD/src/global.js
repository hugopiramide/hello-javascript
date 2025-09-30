const columnas = document.getElementById('columnas');
const filas = document.getElementById('filas');
const luces = document.getElementById('luces');
const dificultadFacil = document.getElementById('facil');
const dificultadMedio = document.getElementById('medio');
const dificultadDificil = document.getElementById('dificil');
const dificultadPersonalizado = document.getElementById('personalizado');
const btnSeleccionar = document.getElementById('btnSeleccionar');
const intentos = document.getElementById('intentos');

let contadorIntentos = 0;

const juego = () => {
    const matrizTabla = new Array();
    let columna = parseInt(document.getElementById('columnas').value);
    let fila = parseInt(document.getElementById('filas').value);
    let luces = parseInt(document.getElementById('luces').value);
    
    generarTablero(matrizTabla,columna,fila,luces);
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
        if(matrizTabla[i][j] === 1){
        celda.style.backgroundColor = "black";
        }else{
        celda.style.backgroundColor = "yellow"
        }
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

dificultadFacil.addEventListener('click', () => setDificultad(5, 6, 10));
dificultadMedio.addEventListener('click', () => setDificultad(6, 6, 6));
dificultadDificil.addEventListener('click', () => setDificultad(10, 10, 20));
dificultadPersonalizado.addEventListener('click', () => setDificultad(0, 0, 0, false));


btnSeleccionar.addEventListener('click',(event) => {
    event.preventDefault();
    juego();
})

function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}