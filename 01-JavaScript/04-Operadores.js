const arreglo = ['A', 'b', 'C'];


// forEach

/*
const respuestaForEach = arreglo
    .forEach(
        (valorActual, indiceActual, arreglo) => {
            console.log('valor', valorActual);
            console.log('indice', indiceActual);
            console.log('arreglo', arreglo);
        }
    );
 */

const respuestaForEach = arreglo.forEach((v) => console.log(v));

console.log(respuestaForEach); // undefined

// map

const respuestaMap = arreglo
    .map((v) => v.toUpperCase())
    .forEach((v) => console.log(v));

console.log(arreglo);
console.log(respuestaMap);

const arregloNumeros = [5, 4, 6, 7, 3, 9, 1, 8, 2, 10];

// filter

if (0 === '') { // ==
    console.log('Si');
} else {
    console.log('No');
}

const respuestaFilter = arregloNumeros
    .filter((v) => v % 2 === 0);

console.log(respuestaFilter);

// findIndex -> indice

const respuestaFindIndex = arregloNumeros.findIndex(
    (valorActual) => {
        return valorActual === 7// expression
    }
);
console.log(respuestaFindIndex);

// find -> objeto

const respuestaFind = arregloNumeros.find(
    (valorActual) => {
        return valorActual === 7// expression
    }
);
console.log(respuestaFind);

/*const arregloUsuarios = [
    {
        id: 1,
        nombre: 'adrian'
    },
    {
        id: 2,
        nombre: 'vicente'
    }
]
*/

// some

const respuestaSome = arregloNumeros
    .some(
        (valorActual) => {
            return valorActual > 5; //expresion
        }
    );

console.log(respuestaSome);

// every

const respuestaEvery = arregloNumeros
    .every(
        (valorActual) => {
            return valorActual < 4; //expresion
        }
    );

console.log(respuestaEvery);


// reduce
console.log(arregloNumeros);
const respuestaReduce = arregloNumeros
    .reduce(
        (valorAcumulado, valorActual) => {
            return valorAcumulado - valorActual
        },
        100 // Valor con el que empieza la operacion
    );

const respuestaReduceV2 = arregloNumeros
    .reduceRight((a, b) => a + b, 0);

console.log(respuestaReduce);
console.log(respuestaReduceV2);

// sort

const arregloNumerosClonado1 = JSON.parse(JSON.stringify(arregloNumeros));

const respuestaSort = arregloNumerosClonado1
    .sort(
        (a, b) => b - a
    );
console.log(respuestaSort);
console.log(arregloNumeros);