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

promesa('Update-Items.txt').then((contenido) => {
  console.log('Good read data update: ' + contenido);
      return promesaUpdateData('Comics.txt', contenido);
  // Promesa
          }).then((contenidoCompleto) => {
              console.log("Data complete: " + contenidoCompleto);
          }).catch((error) => {
              console.log('Error', error);
          });