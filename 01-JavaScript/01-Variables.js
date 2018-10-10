var nombreVariable = 'valorVariable';
var edad = 1; //number
var edad1 = 1.1; //number
var edad2 = '1'; //string
var casado = false; //booelan
var amigable = null; //object
var exiteONo; //undefined TIPO: undefined
var fechaDeNacimiento = new Date('1994-07-05');

console.log('edad', typeof edad);
console.log('edad 2', typeof edad2);
console.log('casado', typeof casado);
console.log('amigable', typeof amigable);
console.log('fechaDeNacimiento', typeof fechaDeNacimiento);
console.log(10 + 10);
if (-31) {
    //Si - thruty
} else {
    //No  falsy
}

if ('bryan') {
    //Si -
} else {
    //No
}

if (true) {
    //Si -
} else {
    //No
}

if (false) {
    //Si
} else {
    //No -
}

if (0) {
    //Si
} else {
    //No -
}

if (null) {
    //Si
} else {
    //No -
}
//NO TIPADO -> no tiene tipos
// var age = 10;


//TIPADO -> types
// int age = 10

var bryan = {
    nombre: 'Bryan',
    edad: '24',
    hijos: undefined,
    llave: 'valor',
};

var bryanJSON = {
    "llave": "valor",
};

console.log(bryan.nombre);  //'bryan'
console.log(bryan.edad); // 24
console.log(typeof bryan); // object