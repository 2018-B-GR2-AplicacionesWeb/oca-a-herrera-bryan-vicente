var filepath = "C:/directorio-cualquiera/archivo-existente.txt";
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
           alert("El archivo no existe, por lo tanto no se puede borrar");
      }
});