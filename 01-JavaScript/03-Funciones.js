function sumarDosNumeros(numeroUno, numeroDos) {
    //validations
    var numeroUnoEsNumber = typeof numeroUno == "number"; // true
    var numerodosEsNumber = typeof numeroDos == "number"; // true
    if (numeroUnoEsNumber && numerodosEsNumber) {
        return numeroUno + numeroDos;
    } else {
        return 'ERROR';
    }

}

sumarDosNumeros('a', null);

//envio otros parametros
console.log(sumarDosNumeros('a', null));

//no envio otros parametros
console.log(sumarDosNumeros());

//envio mas parametros
console.log(sumarDosNumeros('a', null, 1));

//envio parametros correctos
console.log(sumarDosNumeros(2, 1));

function saludar() {
    console.log("Hello Word!");
}

console.log(saludar()); //undefined void

function sumarNumeros(...parametros) {

}

console.log(sumarNumeros(1, 2, 3, 4));

//"Bryan", "hola Adrian"


function saludar(nombre) {
    return "Hola " + nombre;
}

function saludar2(nombre, functionMessage) {
    var saludo = `Hola ${nombre.toUpperCase()}`;
    functionMessage(saludo);
    return saludo;
}















