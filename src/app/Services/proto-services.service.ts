import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class ProtoServicesService {
  //private baseUrl = 'https://localhost:44311';
  private baseUrl = 'https://protoapi.padhyasoft.com';// 'https://protoapi.padhyasoft.com'
  private url = window.location.origin;
  constructor(private http: HttpClient) { }

/******************************************** Developed by RAJESH GAMI *************************************************/

//#region  Item Master Services
  getItemList(itemId:string): Observable<any> {

    return this.http.get(`${this.baseUrl}/`+'Api/Item/GetItemList?itemId='+itemId);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Api/Item/GetItemById?itemId='+id);
  }

  saveItem(dtl) {
    return this.http.post(this.baseUrl + '/Api/Item/InsertUpdateItem', dtl)
      // .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  deleteItem(itemId :number, userId :string) {
    return this.http.get(this.baseUrl + "/Api/Item/DeleteItemRecord?itemId=" + itemId+'&userId='+userId)
      // .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  activeItem(itemId :number, userId :string) {
    return this.http.get(this.baseUrl + "/Api/Item/ActiveItem?itemId=" + itemId+'&userId='+userId)
      // .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
//#endregion

//#region Common List Services
  GetLovDetailByColumn(Lov_Column:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Api/Lovmaster/GetLovDetailByColumnAJ?Lov_Column='+Lov_Column);
  }

  GetActiveSubCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Api/Item/GetActiveSubCategoryListAJ?subcatId='+'0');
  }

  GetActiveBrandList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Api/Item/GetActiveBrandListAJ?brandId='+'0');
  }

  GetActiveTypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Api/Item/GetActiveTypeListAJ?typeId='+'0');
  }
//#endregion

//#region Login Services

Login(model) {
  return this.http.post(this.baseUrl + '/Api/Login/CheckAuthentication', model)
    .catch(this.errorHandler)
}

//#endregion

//#region  Error Handler
  errorHandler(error: Response) {
    console.log(error);
    return 'error';
  }
//#endregion
}
