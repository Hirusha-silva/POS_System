export default class OrderDetailModel {
    constructor(orderId,customerId,item_id,paymentId,qty,total) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.item_id = item_id;
        this.paymentId = paymentId;
        this.qty = qty;
        this.total = total;
    }
}