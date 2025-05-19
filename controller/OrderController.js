import {customer_db,item_db,order_db} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";


$(document).ready(function (){
    $('#order_id').val(generateOrderId());
});

function generateOrderId(){
    if (order_db.length === 0){
        return 'O001';
    }
    let lastId = order_db[order_db.length -1].order_id;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "O" + newId.toString().padStart(3,'0');
}