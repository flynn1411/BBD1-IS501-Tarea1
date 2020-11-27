/**
  * * Archivo js principal
  * @author Josué Ariel Izaguirre
  * @date 25/11/2020
  * @version 0.1
  */

var dbHandler = new DataBaseHandler().initializeDB();

var actionHandler = new ActionHandler(dbHandler);

function handleClick(action){
    actionHandler.handleClick(action);
}