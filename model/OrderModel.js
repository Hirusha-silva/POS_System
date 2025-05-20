export default class OrderModel {
    constructor(item_Id,item_name,qty,price,total) {
        this.item_Id = item_Id ;
        this.item_name = item_name;
        this.qty = qty;
        this.price = price;
        this.total = total;
    }
}