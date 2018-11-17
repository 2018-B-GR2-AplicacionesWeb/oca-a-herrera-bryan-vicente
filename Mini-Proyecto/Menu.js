var expr=window.prompt("Ingrese un nombre: ");

switch(expr) { 
    case "A": { 
       console.log("Excellent"); 
       break; 
    } 
    case "B": { 
       console.log("Good"); 
       break; 
    } 
    case "C": {
       console.log("Fair"); 
       break;    
    } 
    case "D": { 
       console.log("Poor"); 
       break; 
    }  
    default: { 
       console.log("Invalid choice"); 
       break;              
    } 
 }  
  console.log("¿Hay algo más que te quisiera consultar?");