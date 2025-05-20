import {order_detail_db} from "../db/db.js";

$(document).ready(function() {
    loadOrderDetailTable();
});
export function loadOrderDetailTable() {
    $('#orderDetailTableBody').empty();
    order_detail_db.map((orderDetails) => {
        let orderId = orderDetails.orderId;
        let customerId = orderDetails.customerId;
        let itemId = orderDetails.item_id;
        let paymentId = orderDetails.paymentId;
        let orderQty = orderDetails.qty;
        let totalAmount = orderDetails.total;
        let data = `<tr>
                       <td>${orderId}</td>
                       <td>${customerId}</td>
                       <td>${itemId}</td>
                       <td>${paymentId}</td>
                       <td>${orderQty}</td>
                       <td>${totalAmount}</td>
                   </tr>`;
        $('#orderDetailTableBody').append(data);
    });
}