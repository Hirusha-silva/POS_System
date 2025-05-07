import {item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

// load item Id
$(document).ready(function (){
   $('#item_id').val(generateItemId());
});

// generate item Id
function generateItemId(){
    if (item_db.length === 0){
        return 'I001';
    }
    let lastId = item_db[item_db.length -1].item_Id;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "I" + newId.toString().padStart(3,'0');
}