import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor( public itemsMap: { [productId: string]: ShoppingCartItem }){
    console.log('itemsMap: ', itemsMap);
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity))
    }

  }

  get totalPrice() { 
    let total: number = 0;   
    for (let item in this.items)
      total += this.items[item].totalPrice;
    return total;
  }

  get totalItemsCount() {
    let count = 0;
    for ( let productId in this.items ) 
      count += this.items[productId].quantity; 
    return count;
  }
}