import { Item_Master } from './../../models/Item_Master';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Client_commonService {

constructor()
{
  let existingCartItems = JSON.parse(localStorage.getItem('products'));
  if (!existingCartItems) {
    existingCartItems = [];
  }
  this.itemsSubject.next(existingCartItems);
 }

 private itemsSubject = new BehaviorSubject<Item_Master[]>([]);
 items$ = this.itemsSubject.asObservable();

 addToCart(product: Item_Master) {
  this.items$.pipe(
    take(1),
    map((products) => {
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
    }),
  ).subscribe();
}

}
