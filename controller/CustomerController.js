import {customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

// load customer Id
$(document).ready(function (){
   $('#customerId').val(generateCustomerId());
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
