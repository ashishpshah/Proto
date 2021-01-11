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
  private url = window.location.origin;
  private baseUrl : string = this.url.includes('localhost') ? 'https://localhost:44311/Api' :'https://protoapi.padhyasoft.com/Api' ;
  //private baseUrl = 'https://protoapi.padhyasoft.com/Api';

  constructor(private http: HttpClient) { }

/******************************************** Developed by RAJESH GAMI *************************************************/

//#region  Item Master Services
  getItemList(itemId:string): Observable<any> {

    return this.http.get(`${this.baseUrl}/`+'Item/GetItemList?itemId='+itemId);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Item/GetItemById?itemId='+id);
  }

  saveItem(dtl) {
    return this.http.post(this.baseUrl + '/Item/InsertUpdateItem', dtl)
      // .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  deleteItem(itemId :number, userId :string) {
    return this.http.get(this.baseUrl + "/Item/DeleteItemRecord?itemId=" + itemId+'&userId='+userId)
      .catch(this.errorHandler);
  }
  activeItem(itemId :number, userId :string) {
    return this.http.get(this.baseUrl + "/Item/ActiveItem?itemId=" + itemId+'&userId='+userId)
      .catch(this.errorHandler);
  }
//#endregion

//#region Common List Services
  GetLovDetailByColumn(Lov_Column:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Lovmaster/GetLovDetailByColumnAJ?Lov_Column='+Lov_Column);
  }

  GetActiveSubCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Item/GetActiveSubCategoryListAJ?subcatId='+'0');
  }

  GetActiveBrandList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Item/GetActiveBrandListAJ?brandId='+'0');
  }

  GetActiveTypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Item/GetActiveTypeListAJ?typeId='+'0');
  }
//#endregion

//#region Login Services

Login(model) {
  return this.http.post(this.baseUrl + '/Login/CheckAuthentication', model)
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
