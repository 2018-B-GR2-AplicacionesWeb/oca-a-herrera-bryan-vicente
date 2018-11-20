// TypeScript

var fs = require('fs');
var data = fs.readFileSync('Comics.json');
var movies = JSON.parse(data);

function options(){
    console.log("ORDER YOUR FAVORITE MOVIES!!.");
    console.log("Choose a option, please!!.");
    console.log("........................");
    console.log("1.- Insert a movie.");
    console.log("2.- Read all movies");
    console.log("3.- Update a movie.");
    console.log("4.- Delete a movie.");
    console.log("........................");
}

options();

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    if(d.toString().trim() == "1"){

        console.log("Insert the new movie: ");
        var insert = process.openStdin();

        insert.addListener("data", function (i) {
            var reply = JSON.stringify(data + i, null, 6);
                console.log(reply);
            return new Promise((resolve, reject) => {
                fs.writeFile('Comics.json', reply, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(reply);
                        console.log("Data ca: " + reply);
                    }
                });
            });
        });
    }
    else if(d.toString().trim() == "2"){

        console.log("Tha information is: ");

        return new Promise((resolve, reject) => {
            fs.readFile('Comics.json', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(data));
                    console.log("Read: " + data);

                }
            });
        });

    }
    else if(d.toString().trim() == "3") {
        var myJSONObject = {"movie": "Iron Man 1", "actor": "Robert Downey Jr.", "movies": "6"};
        console.log(myJSONObject);
            var clienteMod = myJSONObject;
            return new Promise((resolve, reject) => {
                fs.readFile('Comics.json', 'utf-8', (err, contenido) => {
                    if (err) {
                        reject("Don't changes the movies");
                    }
                    else {
                        const baseClientes = JSON.parse(contenido);
                        var aux = baseClientes.movies = 3;
                        //baseClientes.push(clienteMod);
                        fs.writeFile('Comics.json', JSON.stringify(aux), (error) => {
                            if (error) {
                                reject("Error al change the movie");
                            }
                            else {
                                resolve("Movie changed successful");
                            }
                        });
                    }
                });
            });

    }
    else if(d.toString().trim() == "4"){
        var myJSONObject ={"movie": "Iron Man 1", "actor": "Robert Downey Jr.", "movies": 6};
        console.log(myJSONObject);
        //console.log(myJSONObject.movie);
        delete myJSONObject.movie;
        delete myJSONObject.movies;
        console.log(myJSONObject);
    }

    options();
});

