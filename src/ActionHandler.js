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
    
       this.processAction(action);
    };

    /**
      * ! Función que cambia la llave actual al esperar 750ms luego de haberse realizado transacciones
      * * Esto se realiza para poder esperar a que la transacción se complete y poder obtener el dato esperado.
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.setKey = () => {
      setTimeout( ()=>{
        //Se obtiene la llave actual al guardarla como nombre de clase en el primer div.
        this.dbHandler.currentKey = parseInt(document.getElementById("controlDIV").className);

        //Imprime este mensaje en consola a manera de asegurarse que el puntero/llave cambió de posición
        console.log(`Llave actual: ${this.dbHandler.currentKey}`);
      }, 750);
    };

    /**
      * ! Función que procesa la acción y llamar al metódo indicado del manejador de indexedDB
      * @param action Cadena que indica cual acción realizar
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.processAction = (action) => {

        //Se utiliza un switch para poder trabajar los distintos casos
        switch (action) {

          /**
           * * Caso Agregar:
           * * Obtiene el valor del control2 y revisa si no se encuentra vacío para luego
           * * llamar al método insert de DataBaseHandler
           */
          case "insert":

            var data = document.getElementById("inputControl2").value;

            if(data === ""){
              alert("Para agregar datos, el área de texto no debe de estar vacio.");
            }else{
              this.dbHandler.insert(data);
            }

            break;

          /**
           * * Caso Eliminar:
           * * Llama el método remove de DataBaseHandler
           */
          case "delete":

            this.dbHandler.remove();
            this.setKey();           
            break;

          /**
           * * Caso Modificar:
           * * Obtiene el valor del control2 y revisa si no se encuentra vacío para luego
           * * llamar al método modify de DataBaseHandler
           */
          case "modify":

            var newData = document.getElementById("inputControl2").value;

            if(newData === ""){
              alert("Para modificar datos, el área de texto no debe de estar vacio.");
            }else{
              this.dbHandler.modify(newData);
            }
            break;

          /**
           * * Caso Siguiente:
           * * Llama al metódo getNext de DataBaseHandler
           */
          case "next":
            this.dbHandler.getNext();
            this.setKey();
            break;
          
          /**
           * * Caso Anterior:
           * * Llama al metódo getPrevious de DataBaseHandler
           */
          case "previous":
            this.dbHandler.getPrevious();
            this.setKey();
            break;

          /**
           * * Caso Primero:
           * * Llama al metódo getFirst de DataBaseHandler
           */
          case "first":
            this.dbHandler.getFirst();
            this.setKey();
            break;

          /**
           * * Caso Último:
           * * Llama al metódo getLast de DataBaseHandler
           */
          case "last":
            this.dbHandler.getLast();
            this.setKey();
            break;
      
          /**
           * * Caso Defecto:
           * * Le alerta al usuario que no ha realizado alguna selección
           */
          default:
            alert("Debe seleccionar una opción.");
            break;
        }
    }
}

