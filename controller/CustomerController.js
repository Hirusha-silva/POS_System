import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

// load customer Id
$(document).ready(function (){
   $('#customerId').val(generateCustomerId());
   loadCustomer();
});

// generate customer Id
function generateCustomerId(){
   if (customer_db.length === 0) {
      return 'C001';
   }
   let lastId = customer_db[customer_db.length - 1].customerId;
   let numberPart = parseInt(lastId.substring(1));
   let newId = numberPart + 1;
   return "C" + newId.toString().padStart(3,'0');
}

// load table data
function loadCustomer() {
   $('#customer_tbody').empty();
   customer_db.map((customer,index) => {
      let customerId = customer.customerId;
      let name = customer.name;
      let address = customer.address;
      let email = customer.email;
      let number = customer.number;

      let data = `<tr>
                            <td>${customerId}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${email}</td>
                            <td>${number}</td>
                        </tr>`

      $('#customer_tbody').append(data);
   });
}
// save
$('#customer_save').on('click',function (){
   let customerId = $('#customerId').val();
   let name = $('#name').val();
   let address = $('#address').val();
   let email = $('#email').val();
   let number = $('#number').val();

   if (customerId === '' || name === '' || address === '' || email === '' || number === ''){
      Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "Invalid Inputs",
      });
   }else {

      Swal.fire({
         title: " Customer Saved !",
         icon: "success",
         draggable: true
      });

      let customerId =generateCustomerId();
      let customer_data = new CustomerModel(customerId,name,address,email,number);
      customer_db.push(customer_data);

      loadCustomer();
      clearForm();
   }
});

// clear form
function clearForm(){
   $('#customerId').val(generateCustomerId());
   $('#name').val('');
   $('#address').val('');
   $('#email').val('');
   $('#number').val('');

   $('#customer_save').show();
   $('#customer_update').hide();
   $('#customer_delete').hide();
}

