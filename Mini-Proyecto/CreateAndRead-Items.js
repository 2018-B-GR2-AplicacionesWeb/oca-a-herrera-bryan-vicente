var fs = require('fs');
var promise = function (nombreArchivo) {
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoLeido) {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoLeido);
                console.log("Data cl: " + contenidoLeido);
            }
        });
    });
};
var promesaEscritura = function (nombreArchivo, contenidoArchivo) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.writeFile(nombreArchivo, contenidoArchivo, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
                console.log("Data ca: " + contenidoArchivo);
            }
        });
    });
};
promise('Insert-Item.txt').then(function (contenido) {
    console.log('Good read data ' + contenido);
    return promesaEscritura('Comics.txt', contenido);
    // Promesa
}).then(function (contenidoCompleto) {
    console.log("Data complete: " + contenidoCompleto);
})["catch"](function (error) {
    console.log('Error', error);
});
