import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private url = window.location.origin;
  private baseUrl : string = this.url.includes('localhost') ? 'https://localhost:44311/Api/' :'https://protoapi.padhyasoft.com/Api/' ;
  constructor(private http: HttpClient) { }

  getItemList(Catg_ID:number): Observable<any> {
    return this.http.get(this.baseUrl +'SubCategory/GetItem_MasterList?Catg_ID='+Catg_ID);

  }

  PageLoaditembyRCatg_ID(RCatg_ID:number): Observable<any> {

       return this.http.get(this.baseUrl +'SubCategory/PageLoaditembyRCatg_ID?RCatg_ID='+RCatg_ID);

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
}
