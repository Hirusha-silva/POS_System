import {customer_db,item_db,order_db} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";
import {loadItem} from "../controller/ItemController.js";
import OrderDetailModel from "../model/OrderDetailModel.js";


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
    itemReset();
});

function itemReset(){
    $('#search_item').val('');
    $('#loadItemId').val('');
    $('#loadIName').val('');
    $('#loadQHand').val('');
    $('#loadIPrice').val('');
    $('#itemQTY').val('');
}

// Add to order
$('#addToOrder').on('click',function (){
    let itemCode = $('#loadItemId').val();
    let itemName = $('#loadIName').val();
    let price = parseFloat($('#loadIPrice').val());
    let needQty = parseInt($('#itemQTY').val());
    let item = item_db.find(item => item.item_Id === itemCode);

    if (!item) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No Item Found",
        });
        return;
    }
    if (item.qty < needQty) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough Quantity",
        });
        return;
    }
    let index = order_db.findIndex(item => item.item_Id === itemCode);
    if (index !== -1) {

        order_db[index].qty += needQty;
        order_db[index].total = order_db[index].qty * order_db[index].price;
    } else {

        let total = price * needQty;
        let order_data = new OrderModel(itemCode, itemName, needQty, price, total);
        order_db.push(order_data);
    }
    item.qty -= needQty;

    loadItem();
    setDisableCustomer();
    itemReset();
    loadOrderTable();
    updateTotalAmount();

});

// load Order table
function loadOrderTable(){
    $('#order_tbody').empty();
    order_db.map((orderDetail) => {
        let itemCode = orderDetail.item_Id;
        let itemName = orderDetail.item_name;
        let qty = orderDetail.qty;
        let price = orderDetail.price;
        let total = orderDetail.total;

        let data = `<tr>
                       <td>${itemCode}</td>
                       <td>${itemName}</td>
                       <td>${qty}</td>
                       <td>${price}</td>
                       <td>${total}</td>
                   </tr>`;
        $('#order_tbody').append(data);
    });
}
// disable search and rest
function setDisableCustomer() {
    $('#customer_search_btn').prop('disabled', true);
    $('#customer_reset_btn').prop('disabled', true);
    $('#search_customer').prop('readonly', true);
}

// update total amount
function updateTotalAmount() {
    let total = 0;
    order_db.forEach(entry => {
        total += entry.total;
    });
    $('#loadTotal').text(total.toFixed(2));
    $('#loadSubTotal').text(total.toFixed(2));
}
