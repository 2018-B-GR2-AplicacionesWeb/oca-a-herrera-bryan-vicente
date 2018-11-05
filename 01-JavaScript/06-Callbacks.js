// 06-callbacks.js

const fs = require('fs');

console.log('Inicio');
fs.readFile(
    '06-texto.txt', // nombreArchivo
    'utf-8',
    (error, textoLeidoDelArchivo) => {
        if (error) {
            try{
                throw new Error(error);
            } catch (e) {
                console.log(e)
            }

        } else {
            // AQUI
            console.log('Inicio2');
            fs.writeFile(
                '06-texto.txt',
                textoLeidoDelArchivo + 'Mundo',
                (err)=>{
                    if(err) console.log('Error');
                    console.log('Archivo actualizado');

                    // CALLBACK HELL!!!!

                    fs.writeFile(
                        '06-texto.txt',
                        textoLeidoDelArchivo + 'Mundo',
                        (err)=>{
                            if(err) console.log('Error');
                            console.log('Archivo actualizado');
                            fs.writeFile(
                                '06-texto.txt',
                                textoLeidoDelArchivo + 'Mundo',
                                (err)=>{
                                    if(err) console.log('Error');
                                    console.log('Archivo actualizado');
                                    fs.writeFile(
                                        '06-texto.txt',
                                        textoLeidoDelArchivo + 'Mundo',
                                        (err)=>{
                                            if(err) console.log('Error');
                                            console.log('Archivo actualizado');
                                            fs.writeFile(
                                                '06-texto.txt',
                                                textoLeidoDelArchivo + 'Mundo',
                                                (err)=>{
                                                    if(err) console.log('Error');
                                                    console.log('Archivo actualizado');
                                                    fs.writeFile(
                                                        '06-texto.txt',
                                                        textoLeidoDelArchivo + 'Mundo',
                                                        (err)=>{
                                                            if(err) console.log('Error');
                                                            console.log('Archivo actualizado');
                                                            fs.writeFile(
                                                                '06-texto.txt',
                                                                textoLeidoDelArchivo + 'Mundo',
                                                                (err)=>{
                                                                    if(err) console.log('Error');
                                                                    console.log('Archivo actualizado');
                                                                    fs.writeFile(
                                                                        '06-texto.txt',
                                                                        textoLeidoDelArchivo + 'Mundo',
                                                                        (err)=>{
                                                                            if(err) console.log('Error');
                                                                            console.log('Archivo actualizado');
                                                                            fs.writeFile(
                                                                                '06-texto.txt',
                                                                                textoLeidoDelArchivo + 'Mundo',
                                                                                (err)=>{
                                                                                    if(err) console.log('Error');
                                                                                    console.log('Archivo actualizado');
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );

                }
            );
            console.log('Fin2');
        }
    }
);

console.log('Fin');

