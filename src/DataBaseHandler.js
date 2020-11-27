/**
  * ! Objeto que se comunica con indexedDB
  * * Inicializa indexedDB
  * * Realiza operaciones según las especificaciones de la tarea
  * @author Josué Ariel Izaguirre
  * @date 25/11/2020
  * @version 0.1
  */
function DataBaseHandler(){

    this.currentKey,
    this.dataBase,
    this.dbName,
    this.storeName;

    this.initializeDB = (name = "Tarea") => {

        this.storeName = `${name}Store`;
        //Llamado a abrir la base de datos
        var request = window.indexedDB.open(name, 1);
    
        request.onsuccess = (event) => {
            this.dataBase = event.target.result;
        }

        request.onupgradeneeded = (event) => {
            this.dataBase = event.target.result;
            this.dataBase.createObjectStore( this.storeName, {autoIncrement: true});
    
            console.log("Base creada.");
        }
    
        request.onerror = (err) => {
            console.error(`ERROR: ${err.target.errorCode}`);
        }

        return this;
    };

    this.insert = (data) => {
        var transaction = this.dataBase.transaction(this.storeName,"readwrite");

        transaction.oncomplete = (event) =>{
            console.log(`Se ha agregado exitosamente: ${data}`);
        };

        transaction.onerror = (error) => {
            console.error(`ERROR: ${error.target.errorCode}`);
        };

        transaction.objectStore(this.storeName).add(`${data}`);
    };

    this.getFirst = () => {
        var objectStore = this.dataBase.transaction(this.storeName).objectStore(this.storeName);

        objectStore.openCursor().onsuccess = (event) =>{
            this.cursor = event.target.result;
            console.log(this.cursor);
            document.getElementById("inputControl2").value = this.cursor.value;
        };
    };

    this.getNext = () => {
        if(this.cursor){
            this.cursor = this.cursor.continue();
            if(this.cursor) document.getElementById("inputControl2").value = this.cursor.value;
        }

    };
}