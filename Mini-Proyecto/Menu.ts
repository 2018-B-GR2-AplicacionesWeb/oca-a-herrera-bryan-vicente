// TypeScript
var product: string = 'Book';

//var stdin = process.openStdin();

console.log("Choose a option please!!");
console.log("1.- Insert data");
console.log("2.- Read data");
console.log("3.- Update data");
console.log("4.- Delete data");
//product = ("Enter a product name: ");

switch (product) {
    case 'Book':
        console.log("50% discount.");
        break;
    case 'T-shirt':
        console.log("35% discount.");
        break;
    default:
        console.log("10% discount.");
}