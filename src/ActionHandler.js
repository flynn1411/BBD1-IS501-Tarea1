/**
  * ! Objeto encargado de las acciones del usuario
  * * Maneja las instrucciones que ingresa el usuario
  * @param dbHandler es un objeto que realiza acciones sobre indexedDB
  * @author Josué Ariel Izaguirre
  * @date 25/11/2020
  * @version 0.1
  */
function ActionHandler(dbHandler){
    this.dbHandler = dbHandler;

    /**
      * ! Función que se ejecuta al hacer click en cualquiera de ambos botones de del Control3
      * @param action Cadena que indica cual botón se apretó
      * @author: Josué Ariel Izaguirre
      * @date: 25/11/2020
      * @version 0.1
      **/
    this.handleClick = (action) => {
       action === 'accept' ? this.checkAction() : this.cleanInput();
    };

    /**
      * ! Función que limpia los contenidos del área de texto del Control2
      * @author: Josué Ariel Izaguirre
      * @date: 25/11/2020
      * @version 0.1
      **/
    this.cleanInput = () => {
      document.getElementById("inputControl2").value = "";
    };

    /**
      * ! Función que revisa la acción a realizar
      * * Recorre todos los inputs en control1 y obtiene el valor del input que fue seleccionado para llevarlo a la siguiente función
      * * De no encontrarse un input, se le indicará al usuario por medio de 'alert()'
      * @author: Josué Ariel Izaguirre
      * @date: 25/11/2020
      * @version 0.1
      **/
    this.checkAction = () => {
       var options = document.getElementsByName("control1");
       
       var action = "";
    
       for( let i = 0; i < options.length; i++){
           if(options[i].checked === true) action = options[i].value;
       }
    
       action === "" ? alert("Debe seleccionar una opción."): this.processAction(action);
    };

    this.processAction = (action) => {
        //console.log(action);

        switch (action) {
          case "insert":

            var data = document.getElementById("inputControl2").value;
            console.log(data);

            if(data === ""){
              alert("Para agregar datos, el área de texto no debe de estar vacio.");
            }else{
              this.dbHandler.insert(data);
            }

            break;

          case "next":
            this.dbHandler.getNext();

          case "first":
            console.log(this.dbHandler.getFirst());

            break;
        
          default:
            break;
        }
    }
}

