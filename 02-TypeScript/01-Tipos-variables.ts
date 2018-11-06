// 01-tipos-variables.ts

// DUCK TYPING -> DUCK
let nombre:any = 'Bryan';
nombre = '1';
let edad:number | string = 21.2;
edad = '12';
let casado = false;
casado = true;
casado = null;
casado = undefined;

let arregloNumeros:number[] = [1,2,3];
arregloNumeros.push(3);

const bryan = {
    nombre:'Bryan',
    edad:21,
    casado:false,
    fechaNaciemiento: new Date(),
    saludar:()=>{
        return '';
    }
};

