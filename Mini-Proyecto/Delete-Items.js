var filepath = "Comics.txt";
fs.exists(filepath, function(exists) {
      if(exists) {
            // El archivo existe, borrar
            
            fs.unlink(filepath,function(err){
                  if(err){
                      alert("Ha ocurrido un error al eliminar el archivo"+ err.message);
                      console.log(err);
                      return;
                  }
              console.log("Archivo satisfactoriamente eliminado");
            });
      } else {
        console.log("El archivo no existe, por lo tanto no se puede borrar");
      }
});