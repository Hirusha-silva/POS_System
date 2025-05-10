import {item_db} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

// load item Id
$(document).ready(function (){
   $('#item_id').val(generateItemId());
   loadItem();
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

// load table data
function loadItem(){
    $('#item_tbody').empty();
    item_db.map((item,index) => {
       let item_id = item.item_Id;
       let item_name = item.item_name;
       let qty = item.qty;
       let price = item.price;

       let data = `<tr>
                            <td>${item_id}</td>
                            <td>${item_name}</td>
                            <td>${qty}</td>
                            <td>${price}</td>
                        </tr>`

        $('#item_tbody').append(data);
    });
}
// save
$('#item_save').on('click',function (){
   let item_id = $('#item_id').val();
    let item_name = $('#item_name').val();
    let qty = $('#qty').val();
    let price = $('#price').val();

    if (item_id === '' || item_name === '' || qty === '' || price === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Inputs",
        });
    }else {
        Swal.fire({
            title: " Item Saved !",
            icon: "success",
            draggable: true
        });
        let item_id = generateItemId();
        let item_data = new ItemModel(item_id,item_name,qty,price);
        item_db.push(item_data);

        loadItem();
        clearForm();
    }
});

// clear form
function clearForm() {
    $('#item_id').val(generateItemId());
    $('#item_name').val('');
    $('#qty').val('');
    $('#price').val('');

    $('#item_save').show();
    $('#item_update').hide();
    $('#item_delete').hide();
}

// table on click
$('#item_tbody').on('click','tr',function (){
    let idx = $(this).index();
    let obj = item_db[idx];

    let id = obj.item_Id;
    let name = obj.item_name;
    let qty = obj.qty;
    let price = obj.price;

    $('#item_id').val(id);
    $('#item_name').val(name);
    $('#qty').val(qty);
    $('#price').val(price);

    $('#item_save').hide();
    $('#item_update').show();
    $('#item_delete').show();
});
// update
$('#item_update').on('click',function (){
    let item_id = $('#item_id').val();
    let item_name = $('#item_name').val();
    let qty = $('#qty').val();
    let price = $('#price').val();

    if (item_id === '' || item_name === '' || qty === '' || price === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "select data to update !",
        });
        return;
    }
    const index = item_db.findIndex((i => i.item_Id === item_id));
    if (index !== -1){
        item_db[index].item_name = item_name;
        item_db[index].qty = qty;
        item_db[index].price = price;

        loadItem();
        clearForm();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });
    }else {
        Swal.fire({
            icon: "error",
            title: "Not Found",
            text: "Item with ID " + id + " does not exist.",
        });
    }
});
