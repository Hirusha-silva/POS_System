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