import { stringify } from '@angular/compiler/src/util';
import { Item_Master } from './../../models/Item_Master';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';


let itemsInCart = [];
let cart = [];
@Injectable({
  providedIn: 'root'
})
export class Client_commonService {

  private url = window.location.origin;

  private baseUrl : string = this.url.includes('localhost') ? 'https://localhost:44311/Api/' :'https://protoapi.padhyasoft.com/Api/' ;
  public originUrl : string = this.baseUrl.replace('/Api/','');
  Item_MasterList  = new BehaviorSubject<Item_Master[]>([]);
  whislistItem_Master  = new BehaviorSubject<Item_Master[]>([]);
  username:any ={};
  private currentUserNameStore = new BehaviorSubject<string>("");
  public currentUserName$ = this.currentUserNameStore.asObservable();

  setCurrentUserName(userName: string) {
    this.currentUserNameStore.next(userName);
  }
constructor(private http: HttpClient)
{

  //localStorage.clear();
  let existingCartItems = JSON.parse(localStorage.getItem('protoCart'));
  if (!existingCartItems) {
    existingCartItems = [];
  }
  this.itemsSubject.next(existingCartItems);

  let existingwhishlistItems = JSON.parse(localStorage.getItem('whishlist'));
  if (!existingwhishlistItems) {
    existingwhishlistItems = [];
  }
  this.itemsWhishlist.next(existingwhishlistItems);

  //this.username = localStorage.getItem('Cust_userName');
  this.username = this.getWithExpiryLocalStorage('Cust_userName')
  this.currentUserNameStore.next(this.username);


 }

 private itemsSubject = new BehaviorSubject<Item_Master[]>([]);
 private itemsWhishlist = new BehaviorSubject<Item_Master[]>([]);
 items$ = this.itemsSubject.asObservable();
 itemswhish$ = this.itemsWhishlist.asObservable();

 addToCart(product: Item_Master) {
  this.items$.pipe(
    take(1),
    map((products) => {
      products.push(product);
      localStorage.setItem('protoCart', JSON.stringify(products));
    }),
  ).subscribe();
}

clearCart()
{
  localStorage.clear();
}

addToCart1(product: Item_Master) {

  let local_storage;

  product.TotalPrice=product.Price;
  if(localStorage.getItem('protoCart')  == null)
  {
    this.items$.pipe(
      take(1),
      map((products) => {
        products.push(product);
        localStorage.setItem('protoCart', JSON.stringify(products));
      }),
    ).subscribe();
  }
  else
  {

    var protoCart = JSON.parse(localStorage.getItem('protoCart'));

    if(protoCart.length  == null || protoCart.length  == undefined || protoCart.length == 0)
    {
      this.items$.pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem('protoCart', JSON.stringify(products));
        }),
      ).subscribe();
    }else
    {
      var isadd= true;
      for (var i = 0; i < protoCart.length; i++) {
        if(product.Item_ID === protoCart[i].Item_ID){  //look for match with name
         protoCart[i].OrderQty += 1;
         protoCart[i].TotalPrice = protoCart[i].Price * protoCart[i].Qty;
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
          localStorage.setItem('protoCart', JSON.stringify(products));
        }),
      ).subscribe();
     }
     else{
      localStorage.setItem("protoCart", JSON.stringify(protoCart));
     }

    }

  }
}



minuseQty(product: Item_Master)
{
      var protoCart = JSON.parse(localStorage.getItem('protoCart'));
      var isadd= true;
      for (var i = 0; i < protoCart.length; i++)
      {
        if(product.Item_ID === protoCart[i].Item_ID){
        protoCart[i].OrderQty -= 1;
        protoCart[i].TotalPrice = protoCart[i].Price * protoCart[i].OrderQty;
        isadd= false;
            break;
        }
     }
      localStorage.setItem("protoCart", JSON.stringify(protoCart));

}

addQty(product: Item_Master)
{

  var protoCart = JSON.parse(localStorage.getItem('protoCart'));
  var isadd= true;
  for (var i = 0; i < protoCart.length; i++)
  {
    if(product.Item_ID === protoCart[i].Item_ID){
     protoCart[i].OrderQty += 1;
     protoCart[i].TotalPrice = protoCart[i].Price * protoCart[i].OrderQty;
     isadd= false;
        break;
    }
  }
  localStorage.setItem("protoCart", JSON.stringify(protoCart));

}

getItems(){
  // console.log("Cart: ", JSON.parse(localStorage.getItem('protoCart')));
  return this.Item_MasterList = JSON.parse(localStorage.getItem('protoCart'));

  //return this.items =
 }

deleteItem(item)
{
  item = item;
  console.log("Deleting : ",item);
  let shopping_cart;
  let index;
  shopping_cart = JSON.parse(localStorage.getItem('protoCart'));
  for(let i in shopping_cart){
    if (item.Item_ID == shopping_cart[i].Item_ID)
    {
      index = i;
      console.log(index);
    }
  }
  shopping_cart.splice(index, 1);
  console.log("shopping_cart ", shopping_cart);
  localStorage.setItem('protoCart', JSON.stringify(shopping_cart));

  let existingCartItems = JSON.parse(localStorage.getItem('protoCart'));
  if (!existingCartItems) {
    existingCartItems = [];
  }
  this.itemsSubject.next(existingCartItems);

}
getwhislistItems(){
 // console.log("Cart: ", JSON.parse(localStorage.getItem('protoCart')));
  return this.whislistItem_Master = JSON.parse(localStorage.getItem('whishlist'));

  //return this.items =
 }

addwishlist(whislistitem: Item_Master) {


  //localStorage.removeItem('whishlist');

  if(localStorage.getItem('whishlist')  == null)
  {
    this.itemswhish$.pipe(
      take(1),
      map((whislist) => {
        whislist.push(whislistitem);
        localStorage.setItem('whishlist', JSON.stringify(whislist));
      }),
    ).subscribe();
  }
  else
  {

    var whishlistcount = JSON.parse(localStorage.getItem('whishlist'));

    if(whishlistcount.length  == null || whishlistcount.length  == undefined || whishlistcount.length == 0)
    {
      this.itemswhish$.pipe(
        take(1),
        map((whislist) => {
          whislist.push(whislistitem);
          localStorage.setItem('whishlist', JSON.stringify(whislist));
        }),
      ).subscribe();
    }else
    {
      var isadd= true;
      for (var i = 0; i < whishlistcount.length; i++) {
        if(whislistitem.Item_ID === whishlistcount[i].Item_ID){
         isadd= false;
            break;
        }
     }

     if(isadd)
     {
      this.itemswhish$.pipe(
        take(1),
        map((whislist) => {
          whislist.push(whislistitem);
          localStorage.setItem('whishlist', JSON.stringify(whislist));
        }),
      ).subscribe();
     }

    }
  }
}

removewhishlist(item)
{
  console.log("Deleting : ",item);
  let whislist_cart;
  let index;
  whislist_cart = JSON.parse(localStorage.getItem('whishlist'));
  for(let i in whislist_cart)
  {
    if (item.Item_ID == whislist_cart[i].Item_ID)
    {
      index = i;
      whislist_cart.splice(index, 1);
    }
  }

  console.log("whislist_cart ", whislist_cart);
  localStorage.setItem('whishlist', JSON.stringify(whislist_cart));

  let existingwhishlistItems = JSON.parse(localStorage.getItem('whishlist'));
  if (!existingwhishlistItems) {
    existingwhishlistItems = [];
  }
  this.itemsWhishlist.next(existingwhishlistItems);



}

getWithExpiryLocalStorage(key) {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

setWithExpiryLocalStorage(key, value, ttl) {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}
errorHandler(error: Response) {
  console.log(error);
  return 'error';
}

SaveCustmerdata(dtl) {
  return this.http.post(this.baseUrl + 'Customer/InsertUpdateUserCustomerAddress', dtl)
    .catch(this.errorHandler)
}

GetAddressList(CustId:string): Observable<any> {
  return this.http.get(this.baseUrl +'Customer/GetAddressListByCustomer?Cust_Id='+CustId);

}

getItemList(Catg_ID:number): Observable<any> {
  return this.http.get(this.baseUrl +'SubCategory/GetItem_MasterList?Catg_ID='+Catg_ID);

}

GetitemByCategoryType(ID:number,Type:string,PageSize :number ,PageNo : number,SortBy : string): Observable<any> {

     return this.http.get(this.baseUrl +'SubCategory/GetitemByCategoryType?ID='+ID+'&Type='+Type+'&PageSize='+PageSize+'&PageNo='+PageNo+'&SortBy='+SortBy);

   }

GetitemByCategoryTypeMulti(ID:string,Type:string,PageSize :number ,PageNo : number,SortBy : string): Observable<any> {

    return this.http.get(this.baseUrl +'SubCategory/GetitemByCategoryTypeMulti?ID='+ID+'&Type='+Type+'&PageSize='+PageSize+'&PageNo='+PageNo+'&SortBy='+SortBy);

  }

getItemListBysubcategory(Sub_Catg_ID:number): Observable<any> {
     return this.http.get(this.baseUrl +'SubCategory/GetItemListBysubcategory?Sub_Catg_ID='+Sub_Catg_ID);
   }

SubCategoryList(Catg_ID:number): Observable<any> {
     return this.http.get(this.baseUrl +'SubCategory/GetSub_Catg_MasterList?Catg_ID='+Catg_ID);
   }

GetCatg_MasterList(Root_Header_ID:number): Observable<any> {
     return this.http.get(this.baseUrl+'SubCategory/GetCatg_MasterList?Root_Header_ID='+Root_Header_ID);
   }

GetRoot_Catg_MasterList(Root_Header_ID:number): Observable<any> {
     return this.http.get(this.baseUrl +'SubCategory/GetRoot_Catg_MasterList?Root_Header_ID='+Root_Header_ID);
   }

GetRootHeaderDataList(): Observable<any> {
     return this.http.get(this.baseUrl +'SubCategory/GetRoot_Header_MasterList');
   }

   GetProductItem(): Observable<any> {
    return this.http.get(this.baseUrl +'SubCategory/GetProductItemList');
  }

GetBrandByType(ID:string,Type: string ,FilterType :string,FilterID :string): Observable<any>
{
      return this.http.get(this.baseUrl +'BrandMaster/GetBrandByType?ID='+ID+'&Type='+Type+'&FilterID='+FilterID+'&FilterType='+FilterType);
}

GetTypeByType(ID:string,Type: string,FilterType :string,FilterID :string): Observable<any>
{
      return this.http.get(this.baseUrl +'Type_Master/GetTypeByType?ID='+ID+'&Type='+Type+'&FilterID='+FilterID+'&FilterType='+FilterType);
}

// GetGetitemByFilterType(ID:number,Type: string,FilterType :string,FilterID :string ): Observable<any>
// {
//       return this.http.get(this.baseUrl +'SubCategory/GetGetitemByFilter?ID='+ID+'&Type='+Type+'&FilterID='+FilterID+'&FilterType='+FilterType);
// }
GetGetitemByFilterType(ID:number,Type: string,FilterBrandID :string,FilterBrand :string,FilterTypeID :string,FilterType :string ,FilterSubCatId: string,FilterSubCat :string,FilterMinPrice :string,FilterMaxPrice :string,FilterMinDiscount :string,FilterMaxDiscount:string,PageSize :number ,PageNo : number,SortBy : string): Observable<any>
{
      return this.http.get(this.baseUrl +'SubCategory/GetGetitemByFilter?ID='+ID+'&Type='+Type+'&FilterBrandID='+FilterBrandID+'&FilterBrand='+FilterBrand+'&FilterTypeID='+FilterTypeID+'&FilterType='+FilterType+'&FilterSubCatId='+FilterSubCatId+'&FilterSubCat='+FilterSubCat+'&FilterMinPrice='+FilterMinPrice+'&FilterMaxPrice='+FilterMaxPrice+'&FilterMinDiscount='+FilterMinDiscount+'&FilterMaxDiscount='+FilterMaxDiscount+'&PageSize='+PageSize+'&PageNo='+PageNo+'&SortBy='+SortBy);
}
  groupBy<T, K>(list: T[], getKey: (item: T) => K) {
    const map = new Map<K, T[]>();
    list.forEach((item) => {
        const key = getKey(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return Array.from(map.values());
}


GetFilter_Brand_Type_SubCategory(CatId:string,MainType: string ,FilterSubCatId :string,FilterBrandId :string,FilterTypeId:string): Observable<any>
{
      return this.http.get(this.baseUrl +'Common/GetAllFilter_Brand_Type_SubCategory?CatId='+CatId+'&MainType='+MainType+'&FilterSubCatId='+FilterSubCatId+'&FilterBrandId='+FilterBrandId+'&FilterTypeId='+FilterTypeId);
}

GetLovDetailByColumn(Lov_Column:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Lovmaster/GetLovDetailByColumnAJ?Lov_Column='+Lov_Column);
}

}
