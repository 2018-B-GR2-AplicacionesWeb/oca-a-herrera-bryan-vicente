//02-observables.ts
const rxjs = require('rxjs');
const numeros$ = rxjs.of(1, 2, 3, 4, 5, 6);
numeros$
    .subscribe((ok) => {
    console.log('En pk', ok);
}, (error) => {
    console.log('Error', error);
}, () => {
    console.log('Complete');
});
