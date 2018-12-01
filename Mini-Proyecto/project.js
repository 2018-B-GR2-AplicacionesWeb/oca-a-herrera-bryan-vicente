const inquirer = require('inquirer');
const rxjs = require('rxjs');
const { Observable } = require('rxjs');
const fs   = require('fs');

/*const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

function main() {
    preguntarOpcionesMenu();opcionesRespuesta();
}

main();

function preguntarOpcionesMenu() {
            return rxjs.from(inquirer.prompt(preguntaMenu))
                .pipe(map((respuesta) => {
                        return respuesta;
                    }));
}

function opcionesRespuesta() {
        switch (opcion) {
            case 'Crear':
                break;
            case 'Buscar':
                break;
            case 'Actualizar':
                break;
            case 'Borrar':
                break;
        }
}*/


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
        name: 'archivo',
        message: "Cúal es el nombre del archivo",
    });
    obs.complete();
});

/*const observe2 = Observable.create(function(obs) {
    obs.next({
        type: 'list',
        name: 'accion',
        message: 'Acción a realizar',
        choices: [ 'crear', 'actualizar', 'eliminar','leer'  ],
    });
    obs.next({
        type: 'input',
        name: 'archivo',
        message: "Cúal es el nombre del archivo"
    });
    obs.next({
        type: 'input',
        name: 'pelicula',
        message: "Cúal es el nombre de la nueva pelicula",
    });
    obs.complete();
});

const observe3 = Observable.create(function(obs) {
    obs.next({
        type: 'list',
        name: 'accion',
        message: 'Acción a realizar',
        choices: [ 'crear', 'actualizar', 'eliminar','leer'  ],
    });
    obs.next({
        type: 'input',
        name: 'archivo',
        message: "Cúal es el nombre del archivo a leer"
    });
    obs.complete();
});

const observe4 = Observable.create(function(obs) {
    obs.next({
        type: 'list',
        name: 'accion',
        message: 'Acción a realizar',
        choices: [ 'crear', 'actualizar', 'eliminar','leer'  ],
    });
    obs.next({
        type: 'input',
        name: 'archivo',
        message: "Cúal es el nombre del archivo a eliminar"
    });
    obs.complete();
});*/

inquirer.prompt(observe).then(respuesta => {
    if (respuesta.accion == 'crear') {
        const promesaEscritura$ = rxjs.from(promesaEscritura(`${respuesta.archivo}`, JSON.stringify(respuesta, null, '  ')));
        promesaEscritura$
            .subscribe((ok) => {
                console.log('Creación Exitosa', ok);
            }, (error) => {
                console.log('Creación Fallida', error);
            }, () => {
                console.log('completado');
                observe;
            });
    }
//});

//inquirer.prompt(observe2).then(respuesta => {
  else  if (respuesta.accion == 'actualizar'){
        const respuestasJSON = JSON.stringify(respuesta, null, '  ');
        const promesaActualizar$ = rxjs.from(promesaActualizar(`${respuesta.pelicula}/${respuesta.archivo}`, respuestasJSON));
        promesaActualizar$
            .subscribe((ok) => {
                console.log('Actualización Exitosa', ok);
            }, (error) => {
                console.log('Actualización Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
//});

//inquirer.prompt(observe3).then(respuesta => {
   else if (respuesta.accion == 'leer'){
        const respuestasJSON = JSON.stringify(respuesta, null, '  ');
        const promesaLectura$ = rxjs.from(promesaLectura(`${respuesta.pelicula}/${respuesta.archivo}`, respuestasJSON));
        promesaLectura$
            .subscribe((ok) => {
                console.log('Lectura Exitosa', ok);
            }, (error) => {
                console.log('Lectura Fallida', error);
            }, () => {
                console.log('completado');
            });
    }
//});

//inquirer.prompt(observe4).then(respuesta =>{
    if (respuesta.accion == 'eliminar'){
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
            fs.readFile('Comics.json',
                'utf-8',
                (error, contenidoLeidoDelArchivo) => {
                    if (error) {
                        console.log("El archivo no existe, no se puede actualizar");
                        reject(error)
                    } else {
                        var f = new Date();
                        fs.writeFile(
                            'Comics.json',
                            contenidoArchivo,
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
            fs.readFile('Comics.json','utf-8',
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
            fs.readFile('Comics.json',
                (error)=>{
                    if(error){
                        reject(error)
                        console.log("el archivo no existe no se puede eliminar")
                    }
                    else {
                        resolve(fs.unlinkSync('Comics.json'))
                    }
                }
            );
        }
    )};
