import { Item_Master } from './../../models/Item_Master';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


let itemsInCart = [];
let cart = [];
@Injectable({
  providedIn: 'root'
})
export class Client_commonService {

  Item_MasterList  = new BehaviorSubject<Item_Master[]>([]);
constructor(private http: HttpClient)
{
  let existingCartItems = JSON.parse(localStorage.getItem('shopcart'));
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
      localStorage.setItem('shopcart', JSON.stringify(products));
    }),
  ).subscribe();
}

clearCart()
{
  localStorage.clear();
}

addToCart1(product: Item_Master) {
  debugger;
  let local_storage;

  product.TotalPrice=product.Price;
  if(localStorage.getItem('shopcart')  == null)
  {
    this.items$.pipe(
      take(1),
      map((products) => {
        products.push(product);
        localStorage.setItem('shopcart', JSON.stringify(products));
      }),
    ).subscribe();
  }
  else
  {

    var shopcart = JSON.parse(localStorage.getItem('shopcart'));

    if(shopcart.length  == null || shopcart.length  == undefined || shopcart.length == 0)
    {
      this.items$.pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem('shopcart', JSON.stringify(products));
        }),
      ).subscribe();
    }else
    {
      var isadd= true;
      for (var i = 0; i < shopcart.length; i++) {
        if(product.Item_ID === shopcart[i].Item_ID){  //look for match with name
         shopcart[i].Qty += 1;
         shopcart[i].TotalPrice = shopcart[i].Price * shopcart[i].Qty;
         isadd= false;
            break;  //exit loop since you found the person
        }
     }

     if(isadd)
     {
      this.items$.pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem('shopcart', JSON.stringify(products));
        }),
      ).subscribe();
     }
     else{
      localStorage.setItem("shopcart", JSON.stringify(shopcart));
     }

    }

  }
}

minuseQty(product: Item_Master)
{
  var shopcart = JSON.parse(localStorage.getItem('shopcart'));
  var isadd= true;
  for (var i = 0; i < shopcart.length; i++) {
    if(product.Item_ID === shopcart[i].Item_ID){  //look for match with name
     shopcart[i].Qty -= 1;
     shopcart[i].TotalPrice = shopcart[i].Price * shopcart[i].Qty;
     isadd= false;
        break;  //exit loop since you found the person
    }
 }
  localStorage.setItem("shopcart", JSON.stringify(shopcart));

}

addQty(product: Item_Master)
{
  debugger;
  var shopcart = JSON.parse(localStorage.getItem('shopcart'));
  var isadd= true;
  for (var i = 0; i < shopcart.length; i++) {
    if(product.Item_ID === shopcart[i].Item_ID){  //look for match with name
     shopcart[i].Qty += 1;
     shopcart[i].TotalPrice = shopcart[i].Price * shopcart[i].Qty;
     isadd= false;
        break;  //exit loop since you found the person
    }
 }
  localStorage.setItem("shopcart", JSON.stringify(shopcart));

}

getItems(){
  console.log("Cart: ", JSON.parse(localStorage.getItem('shopcart')));
  return this.Item_MasterList = JSON.parse(localStorage.getItem('shopcart'));

  //return this.items =
 }

deleteItem(item)
{
  item = item;
  console.log("Deleting : ",item);
  let shopping_cart;
  let index;
  shopping_cart = JSON.parse(localStorage.getItem('shopcart'));
  for(let i in shopping_cart){
    if (item.Item_ID == shopping_cart[i].Item_ID)
    {
      index = i;
      console.log(index);
    }
  }
  shopping_cart.splice(index, 1);
  console.log("shopping_cart ", shopping_cart);
  localStorage.setItem('shopcart', JSON.stringify(shopping_cart));

}


getItemList(Catg_ID:number): Observable<any> {
  return this.http.get(environment.server +'SubCategory/GetItem_MasterList?Catg_ID='+Catg_ID);
  debugger;
}

PageLoaditembyRCatg_ID(RCatg_ID:number): Observable<any> {
  debugger;
     return this.http.get(environment.server +'SubCategory/PageLoaditembyRCatg_ID?RCatg_ID='+RCatg_ID);
     debugger;
   }

getItemListBysubcategory(Sub_Catg_ID:number): Observable<any> {
     return this.http.get(environment.server +'SubCategory/GetItemListBysubcategory?Sub_Catg_ID='+Sub_Catg_ID);
   }

SubCategoryList(Catg_ID:number): Observable<any> {
     return this.http.get(environment.server +'SubCategory/GetSub_Catg_MasterList?Catg_ID='+Catg_ID);
   }

GetCatg_MasterList(Root_Header_ID:number): Observable<any> {
     return this.http.get(environment.server+'SubCategory/GetCatg_MasterList?Root_Header_ID='+Root_Header_ID);
   }

GetRoot_Catg_MasterList(Root_Header_ID:number): Observable<any> {
     return this.http.get(environment.server +'SubCategory/GetRoot_Catg_MasterList?Root_Header_ID='+Root_Header_ID);
   }

GetRootHeaderDataList(): Observable<any> {
     return this.http.get(environment.server +'SubCategory/GetRoot_Header_MasterList');
   }

   GetProductItem(): Observable<any> {
    return this.http.get(environment.server +'SubCategory/GetProductItemList');
  }

}
