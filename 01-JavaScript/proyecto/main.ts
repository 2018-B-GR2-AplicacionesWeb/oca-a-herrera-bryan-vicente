const inquirer = require('inquirer');
const fs = require('fs');
 const preguntaMenu = {
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
 const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es tu nombre'
    },
];
 function inicialiarBDD() {
     return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                         fs.writeFile(
                            'bdd.json',
                            '{"usuarios":[],"mascotas":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[],"mascotas":[]}')
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
 async function main() {
    try {
        const respuestaInicializarBDD:RespuestaBDD = <RespuestaBDD> await inicialiarBDD();
        const bdd = respuestaInicializarBDD.bdd;
        const respuestaMenu = await inquirer.prompt(preguntaMenu);
         switch (respuestaMenu.opcionMenu) {
            case 'Crear':
                 // Preguntar datos del nuevo Usuario
                const usuario = await inquirer.prompt(preguntaUsuario);
                 // CREAR USUARIO
                bdd.usuarios.push(usuario);
                 const respuestaGuardado = await guardarBDD(bdd);
                main();
                 break;
         }
     } catch (e) {
     }
}
 function guardarBDD(bdd) {
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
 main();
 interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
}
 interface BDD {
    usuarios: Usuario[];
    mascotas: Mascota[];
}
 interface Usuario {
    id: number;
    nombre: string;
}
 interface Mascota {
    id: number;
    nombre: string;
    idUsuario: number;
}
