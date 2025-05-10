export default class OrderModel {
    constructor(order_id,name,item_name,qty,total) {
        this.order_id = order_id;
        this.name = name;
        this.item_name = item_name;
        this.qty = qty;
        this.total = total;
    }
}