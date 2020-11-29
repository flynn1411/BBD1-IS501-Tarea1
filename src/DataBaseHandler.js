/**
  * ! Objeto que se comunica con indexedDB
  * * Inicializa indexedDB
  * * Realiza operaciones según las especificaciones de la tarea
  * @author Josué Ariel Izaguirre
  * @date 25/11/2020
  * @version 0.1
  */
function DataBaseHandler(){

    //llave actual
    this.currentKey,

    //objeto de la base de datos
    this.dataBase,

    //nombre de la base de datos
    this.dbName,

    //nombre del object store
    this.storeName;

    /**
      * ! Función que procesa la acción y llamar al metódo indicado del manejador de indexedDB
      * @param name Nombre de la base de datos
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.initializeDB = (name = "Tarea") => {

        this.storeName = `${name}Store`;
        //Llamado a abrir la base de datos
        var request = window.indexedDB.open(name, 1);
    
        request.onsuccess = (event) => {
            this.dataBase = event.target.result;

            //Se obtiene el primer elemento(de existir) para poder mostrarlo en
            //el input del control 2
            var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);

            objectStore.openCursor().onsuccess = (event) =>{
                var cursor = event.target.result;

                if(cursor){
                    this.currentKey = cursor.key;
        
                    document.getElementById("inputControl2").value = cursor.value;
                }
                else{
                    alert("La lista se encuentra vacía.");
                }
            };

        }

        //La base de datos se crea en caso de no existir
        request.onupgradeneeded = (event) => {
            this.dataBase = event.target.result;
            this.dataBase.createObjectStore( this.storeName, {autoIncrement: true});
    
            console.log("Base creada.");
        }

        //De suceder un error, se notifica
        request.onerror = (err) => {
            console.error(`ERROR: ${err.target.errorCode}`);
        }

        return this;
    };

    /**
      * ! Función que agrega datos a la base de datos
      * @param data Dato a guardar
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.insert = (data) => {
        //Se llama en modalidad de escritura para poder colocar datos
        var transaction = this.dataBase.transaction(this.storeName,"readwrite");

        transaction.oncomplete = (event) =>{
            console.log(`Se ha agregado exitosamente: '${data}'.`);
        };

        transaction.onerror = (error) => {
            console.error(`ERROR: ${error.target.errorCode}`);
        };

        transaction.objectStore(this.storeName).add(`${data}`);
    };

    /**
      * ! Función que remueve el elemento con la llave actual
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.remove = () => {
        var objectStore = this.dataBase.transaction(this.storeName, "readwrite").objectStore(this.storeName);

        objectStore.openCursor(this.currentKey).onsuccess = (event) =>{
            var cursor = event.target.result;

            if(cursor){
                cursorValue = cursor.value;

                cursor.delete().onsuccess = (event) => {
                    console.log(`Se ha borrado exitosamente el elemento con valor '${cursorValue}'.`);
                    //document.getElementById("controlDIV").className = 1;
                    document.getElementById("inputControl2").value = "";
                    this.getFirst();
                }
            }

        };
    };

    /**
      * ! Función que modifica el elemento de la llave actual
      * @param newData el nuevo dato ingresado por el usuario
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.modify = (newData) => {
        var objectStore = this.dataBase.transaction(this.storeName, "readwrite").objectStore(this.storeName);

        objectStore.openCursor(this.currentKey).onsuccess = (event) =>{
            var cursor = event.target.result;

            if(cursor){
                var updateRequest = cursor.update(newData);

                updateRequest.onsuccess = (event) => {
                    console.log(`Se han modificado exitosamente los datos en el elemento '${cursor.key}'.`);
                };
            }
            else{
                alert("La lista se encuentra vacía o no hay un cursor actualmente seleccionado.");
            }
        };
    };

    /**
      * ! Función que mueve el cursor un elemento cerca del primer elemento y cambia la llave acorde
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.getNext = () => {

        var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);
        var hasTraversed = false;
        
        objectStore.openCursor().onsuccess = (event) => {
            var cursor = event.target.result;

            if(cursor){
                document.getElementById("inputControl2").value = cursor.value;
                document.getElementById("controlDIV").className = cursor.key;

                if(!hasTraversed){
                    if(cursor.key === this.currentKey) hasTraversed = true;
                    cursor.continue();
                }
            }
        }
    };

    /**
      * ! Función que mueve el cursor un elemento cerca del último elemento y cambia la llave acorde
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.getPrevious = () => {
        var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);
        var hasTraversed = false;
        
        objectStore.openCursor(null,"prev").onsuccess = (event) => {
            var cursor = event.target.result;

            if(cursor){
                document.getElementById("inputControl2").value = cursor.value;
                document.getElementById("controlDIV").className = cursor.key;

                if(!hasTraversed){
                    if(cursor.key === this.currentKey) hasTraversed = true;
                    cursor.continue();
                }
            }
        }
    };

    /**
      * ! Función que obtiene el primer elemento de la tabla y cambia la llave actual acorde
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.getFirst = () => {
        var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);

        objectStore.openCursor().onsuccess = (event) =>{
            var cursor = event.target.result;

            if(cursor){
                document.getElementById("controlDIV").className = cursor.key;
    
                document.getElementById("inputControl2").value = cursor.value;
            }
            else{
                alert("La lista se encuentra vacía.");
            }
        };
    };

    /**
      * ! Función que obtiene el último elemento de la tabla y cambia la llave actual acorde
      * @author: Josué Ariel Izaguirre
      * @date: 28/11/2020
      * @version 0.1
      **/
    this.getLast = () => {
        var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);

        objectStore.openCursor().onsuccess = (event) => {
            cursor = event.target.result;

            if(cursor){
                document.getElementById("inputControl2").value = cursor.value;
                //console.log(cursor);                
                document.getElementById("controlDIV").className = cursor.key;
                cursor.continue();
                
            }
        };

    };
}