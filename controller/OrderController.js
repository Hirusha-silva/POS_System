import {customer_db,item_db,order_db} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";


$(document).ready(function (){
    $('#order_id').val(generateOrderId());
});
// Generate OrderId
function generateOrderId(){
    if (order_db.length === 0){
        return 'O001';
    }
    let lastId = order_db[order_db.length -1].order_id;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "O" + newId.toString().padStart(3,'0');
}
// Search Customer
$('#customer_search_btn').on('click',function (){
    let id = $('#search_customer').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    const c = customer_db.find(cu => cu.customerId === id);
    if (c){
        $('#loadCId').val(c.customerId);
        $('#loadCName').val(c.name);
        $('#loadCAddress').val(c.address);
        $('#loadCPhone').val(c.number);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
});

// Reset Customer
$('#customer_reset_btn').on('click',function (){
    $('#search_customer').val('');
    $('#loadCId').val('');
    $('#loadCName').val('');
    $('#loadCAddress').val('');
    $('#loadCPhone').val('');
});

// Search Item
$('#item_search_btn').on('click',function (){
    let id = $('#search_item').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return;
    }

    const i = item_db.find(i => i.item_Id === id);
    if (i){
        $('#loadItemId').val(i.item_Id);
        $('#loadIName').val(i.item_name);
        $('#loadQHand').val(i.qty);
        $('#loadIPrice').val(i.price);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
});

// Reset Item
$('#item_reset_btn').on('click',function (){
    $('#search_item').val('');
    $('#loadItemId').val('');
    $('#loadIName').val('');
    $('#loadQHand').val('');
    $('#loadIPrice').val('');
    $('#itemQTY').val('');
});
