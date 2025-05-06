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

// table on click
$("#customer_tbody").on('click','tr',function (){
   let idx = $(this).index();
   let obj = customer_db[idx];

   let id = obj.customerId;
   let name = obj.name;
   let address = obj.address;
   let email = obj.email;
   let number = obj.number;

   $('#customerId').val(id);
   $('#name').val(name);
   $('#address').val(address);
   $('#email').val(email);
   $('#number').val(number);

   $('#customer_save').hide();
   $('#customer_update').show();
   $('#customer_delete').show();
});

// update
$('#customer_update').on('click',function (){
   let id = $('#customerId').val();
   let name = $('#name').val();
   let address = $('#address').val();
   let email = $('#email').val();
   let number = $('#number').val();

   if (id === '' || name === '' || address === '' || email === '' || number === ''){
      Swal.fire({
         icon: "error",
         title: "Oops...",
         text: "select data to update !",
      });
      return;
   }
   const index = customer_db.findIndex(c => c.customerId === id);

   if (index !== -1){
      customer_db[index].name = name;
      customer_db[index].address = address;
      customer_db[index].email = email;
      customer_db[index].number = number;

      console.log(customer_db[index]);

      loadCustomer();
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
         text: "Customer with ID " + id + " does not exist.",
      });
   }
});

// delete
$("#customer_delete").on('click',function (){
   let id = $('#customerId').val();

   if (id === ''){
      Swal.fire({
         icon: "warning",
         title: "No ID",
         text: "Please select a customer to delete.",
      });
      return;
   }
   Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
   }).then((result) => {
      if (result.isConfirmed){
         const index = customer_db.findIndex(c => c.customerId === id);
         if (index !== -1){
            customer_db.splice(index,1);
            loadCustomer();
            clearForm();

            Swal.fire(
                "Deleted!",
                "Customer has been deleted.",
                "success"
            );
         }else {
            Swal.fire({
               icon: "error",
               title: "Not Found",
               text: "Customer with ID " + id + " does not exist.",
            });
         }
      }
   })
});