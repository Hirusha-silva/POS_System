export default class OrderDetailModel {
    constructor(orderId,customerId,itemId,paymentId,qty,total) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.item_id = itemId;
        this.paymentId = paymentId;
        this.qty = qty;
        this.total = total;
    }
}