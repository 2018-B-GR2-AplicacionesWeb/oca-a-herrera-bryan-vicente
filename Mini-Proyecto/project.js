const inquirer = require('inquirer');
const rxjs = require('rxjs');
const { Observable } = require('rxjs');
const fs   = require('fs');
const path = require('path');

const observe = Observable.create(function(obs) {
    obs.next({
        type: 'list',
        name: 'accion',
        message: 'Acción a realizar',
        choices: [ 'crear', 'actualizar', 'eliminar','leer'  ],
    });
    obs.next({
        type: 'input',
        name: 'pelicula',
        message: "Cúal es el nombre de la película"
    });
    obs.next({
        type: 'input',
        name: 'actor',
        message: "Cúal es el nombre del actor",
    });
    obs.complete();
});

inquirer.prompt(observe).then(respuesta => {
    if (respuesta.accion == 'crear'){
        mkdirpath(`${respuesta.pelicula}`);
        const promesaEscritura$ = rxjs.from(promesaEscritura(`${respuesta.pelicula}/${respuesta.actor}`, JSON.stringify(respuesta, null, '  ') ));
        promesaEscritura$
            .subscribe((ok) => {
                console.log('Creación Exitosa', ok);
            }, (error) => {
                console.log('Creación Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
    else if (respuesta.accion == 'actualizar'){
        const respuestasJSON = JSON.stringify(respuesta, null, '  ');
        const promesaActualizar$ = rxjs.from(promesaActualizar(`${respuesta.pelicula}/${respuesta.actor}`, respuestasJSON));
        promesaActualizar$
            .subscribe((ok) => {
                console.log('Actualización Exitosa', ok);
            }, (error) => {
                console.log('Actualización Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
    else if (respuesta.accion == 'leer'){
        const respuestasJSON = JSON.stringify(respuesta, null, '  ');
        const promesaLectura$ = rxjs.from(promesaLectura(`${respuesta.pelicula}/${respuesta.actor}`, respuestasJSON));
        promesaLectura$
            .subscribe((ok) => {
                console.log('Lectura Exitosa', ok);
            }, (error) => {
                console.log('LEctura Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
    else if (respuesta.accion == 'eliminar'){
        const respuestasJSON = JSON.stringify(respuesta, null, '  ');
        const promesaEliminar$ = rxjs.from(promesaEliminar(`${respuesta.pelicula}/${respuesta.actor}`));
        promesaEliminar$
            .subscribe((ok) => {
                console.log('Eliminación Exitosa', ok);
            }, (error) => {
                console.log('Eliminación Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
});


function mkdirpath(dirPath)
{
    if(!fs.existsSync(dirPath))
    {
        try
        {
            fs.mkdirSync(dirPath);
        }
        catch(e)
        {
            mkdirpath(path.dirname(dirPath));
            mkdirpath(dirPath);
        }
    }
}
const promesaEscritura = (nombreArchivo, contenidoArchivo) =>{
    return new Promise((resolve, reject) => {
            fs.writeFile(nombreArchivo,contenidoArchivo,
                (error)=>{
                    if(error){
                        reject(error)
                    }
                    else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )};
const promesaActualizar = (nombreArchivo, contenidoArchivo) => {
    return new Promise((resolve, reject) => {
            fs.readFile(nombreArchivo,
                'utf-8',
                (error, contenidoLeidoDelArchivo) => {
                    if (error) {
                        console.log("El archivo no existe, no se puede actualizar");
                        reject(error)
                    } else {
                        var f = new Date();
                        fs.writeFile(
                            nombreArchivo,
                            contenidoArchivo + 'actualizado el: ' +f.getDate() ,
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    // Devolver el contenido
                                    var f = new Date();
                                    resolve(contenidoArchivo )
                                }
                            }
                        )
                    }
                }
            );
        }
    )
};

const promesaLectura = (nombreArchivo) =>{
    return new Promise((resolve, reject) => {
            fs.readFile(nombreArchivo,'utf-8',
                (error, contenidoArchivo)=>{
                    if(error){
                        reject(error)
                    }
                    else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )};
const promesaEliminar = (nombreArchivo) =>{
    return new Promise((resolve, reject) => {
            fs.readFile(nombreArchivo,
                (error)=>{
                    if(error){
                        reject(error)
                        console.log("el archivo no existe no se puede eliminar")
                    }
                    else {
                        resolve(fs.unlinkSync(nombreArchivo))
                    }
                }
            );
        }
    )};