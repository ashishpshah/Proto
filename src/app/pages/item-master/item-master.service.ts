import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {

  private baseUrl = 'https://localhost:44311/APi/Item';
  constructor(private http: HttpClient) { }
  
  getItemList(itemId:string): Observable<any> {
 
    return this.http.get(`${this.baseUrl}/`+'GetItemList?itemId='+itemId);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'GetItemById?itemId='+id);
  }

  saveItem(dtl) {
    return this.http.post(this.baseUrl + '/InsertUpdateItem', dtl)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  deleteItem(itemId :number, userId :string) {
    return this.http.delete(this.baseUrl + "/DeleteItemRecord?" + itemId+'&userId='+userId)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return 'error';
    // return Observable.throw(error);
  }
  // getItemById(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

}
