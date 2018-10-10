var arreglo = [
    1,
    2.2,
    "Hello",
    true,
    false,
    {},
    undefined,
    null,
    []
];

var arregloNumeros = [1, 2, 3];
arregloNumeros[0]; // 1
arregloNumeros[1]; // 2
arregloNumeros[2]; // 3

console.log('arregloNumeros[4]', arregloNumeros[4]);

arregloNumeros.push(4);
console.log(arregloNumeros);
arregloNumeros.pop();
console.log(arregloNumeros);
arregloNumeros.splice(0, 1);
console.log(arregloNumeros);
arregloNumeros.splice(0, 0, 0);
console.log(arregloNumeros);
arregloNumeros.splice(2, 0, 1.5);
console.log(arregloNumeros);

var usuario = 1.5;

var indiceUsuario = arregloNumeros.indexOf(usuario);
arregloNumeros.splice(indiceUsuario, 1);
console.log(arregloNumeros);

//arregloNumeros.slice(1,4);
console.log(arregloNumeros.slice(1, 4));

var arregloNotasPrimerBimestre = [8.5, 9, 4];
var arregloNotasSegundoBimestre = [8.5, 9, 10];

//Destructuracion de arreglos
var arregloNotas2018B = [...arregloNotasPrimerBimestre, ...arregloNotasSegundoBimestre];

console.log(arregloNotas2018B);


//Destuvturacion de objeetos

var bryan2018A = {
    sexualidad: 0,
    web: 10,
};

var bryan2018B = {
    cine: 10,
    moviles: 9,
};

var bryan = {
    ...bryan2018A,
    ...bryan2018B,
};

console.log('bryan', bryan);











