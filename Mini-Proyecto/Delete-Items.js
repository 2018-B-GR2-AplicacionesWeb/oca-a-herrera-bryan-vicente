<<<<<<< HEAD
var filepath = "Comics.txt";
=======
/*var filepath = "C:/directorio-cualquiera/archivo-existente.txt";
>>>>>>> b7ed7b831a1fcbf12ab2a2d89f9a990fcf0952fe
fs.exists(filepath, function(exists) {
      if(exists) {
            // El archivo existe, borrar
            
            fs.unlink(filepath,function(err){
                  if(err){
                      alert("Ha ocurrido un error al eliminar el archivo"+ err.message);
                      console.log(err);
                      return;
                  }
              console.log("Archivo satisfactoriamente eliminado");
            });
      } else {
        console.log("El archivo no existe, por lo tanto no se puede borrar");
      }
});*/
var fs = require('fs');

const promesa = (nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo,'utf-8', (error, contenidoLeido) => {
            if (error) {
                reject(error);
            } else {resolve(contenidoLeido);
                console.log("Data cl: " + contenidoLeido);}});
    });
};

const promesaUpdateData = (nombreArchivo, contenidoArchivo) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(nombreArchivo, contenidoArchivo, (error) => {
            if (error) {
                reject(error);
            } else {resolve(contenidoArchivo);
                console.log("Data ca: " + contenidoArchivo);}});
    });
};

promesa('Delete.txt').then((contenido) => {
    console.log('Good read data update: ' + contenido);
    return promesaUpdateData('Comics.txt', contenido);
    // Promesa
}).then((contenidoCompleto) => {
    console.log("Data complete: " + contenidoCompleto);
}).catch((error) => {
    console.log('Error', error);
});