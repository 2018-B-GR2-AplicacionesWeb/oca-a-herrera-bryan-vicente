
declare var require:any;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: '¿Que quiere hacer?',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Ingrese ID'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nombre'
    },
];

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese ID a buscar',
    }
];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese nuevo nombre'
    },
];

main()

async function main() {

    // 1) Inicializar bdd -- DONE
    // 2) Preguntas Menu -- DONE
    // 3) Opciones de Respuesta --  DONE
    // 4) ACCCION!!!!  -- DONE
    // 5) Guardar BDD --

    const respuestaBDD$ = rxjs.from(inicialiarBDD());

    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}

function inicialiarBDD() {

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"usuarios":[],"perros":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[],"perros":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}

function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}

function preguntarOpcionesMenu() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map(
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD

                        }
                    )
                );

        }
    )
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (usuario: any) => {
                                return usuario.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(
                                    (nombre:{nombre:string})=>{
                                        respuestaBDD.usuario ={
                                            id:null,
                                            nombre:nombre.nombre
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );
                    }
                }
            )
        );
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (usuario: Usuario) => { // resp ant OBS
                                    respuestaBDD.usuario = usuario;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return consultarid(respuestaBDD);
                    break;
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                    break;
                case 'Borrar':
                    return consultarid(respuestaBDD);

                    break;
            }
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const usuario = respuestaBDD.usuario;
                    respuestaBDD.bdd.usuarios.push(usuario);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice = respuestaBDD.indiceUsuario;
                    respuestaBDD.bdd.usuarios[indice].nombre = respuestaBDD.usuario.nombre;
                    return respuestaBDD;
                case 'Buscar':
                    const indiceb = respuestaBDD.indiceUsuario;
                    if(indiceb ===-1){
                        console.error('error')
                    }else{
                        console.log('Usuario Buscado',respuestaBDD.bdd.usuarios[indiceb])
                    }
                    return respuestaBDD;
                case 'Borrar':
                    const indicebor = respuestaBDD.indiceUsuario;
                    if(indicebor === -1){
                        console.error('error')
                    }else{

                        console.log('Usuario Buscado',respuestaBDD.bdd.usuarios[indicebor]);
                        const user = respuestaBDD.bdd.usuarios
                        user.splice(indicebor,1)
                    }
                    return respuestaBDD;

            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function consultarid(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (usuario: any) => {

                                return usuario.id === respuesta.idUsuario

                            }
                        );

                    respuestaBDD.indiceUsuario = indiceUsuario;

                    return respuestaBDD;


                }
            )
        );
}

interface BDD {
    usuarios: Usuario[] | any;
    mascotas: Perro[];
}

interface Usuario {
    id: number;
    nombre: string;
}

interface Perro {
    id: number;
    nombre: string;
    idUsuario: number;
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    usuario?: Usuario;
    indiceUsuario?: number;
}

interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}