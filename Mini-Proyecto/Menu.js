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
    else if(d.toString().trim() == "3"){
        console.log("Tu nombre: " + d.toString().trim());
    }
    else if(d.toString().trim() == "4"){
        var myJSONObject ={"name": "Bryan", "LastName": "Ocaña", "age": "24"};
        console.log(myJSONObject);
        console.log(myJSONObject.name);
        delete myJSONObject.name;
        delete myJSONObject.age;
        console.log(myJSONObject);
    }

    options();
});

