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

//#region  Root Header Master Service

getRootHeaderList(rootHeaderId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'RootHeader/GetRootHeaderList?rootHeaderId='+rootHeaderId);
}

getRootHeaderById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'RootHeader/GetRootHeaderById?rootHeaderId='+id);
}

saveRootHeader(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'RootHeader/InsertUpdateRootHeader', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteRootHeader(rootHeaderId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "RootHeader/DeleteRootHeaderRecord?rootHeaderId=" + rootHeaderId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeRootHeader(rootHeaderId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "RootHeader/ActiveRootHeader?rootHeaderId=" + rootHeaderId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region  Root Category Master Service

getRootCategoryList(rootCategoryId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'RootCategory/GetRootCategoryList?rootCategoryId='+rootCategoryId);
}

getRootCategoryById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'RootCategory/GetRootCategoryById?rootCategoryId='+id);
}

saveRootCategory(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'RootCategory/InsertUpdateRootCategory', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteRootCategory(rootCategoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "RootCategory/DeleteRootCategoryRecord?rootCategoryId=" + rootCategoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeRootCategory(rootCategoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "RootCategory/ActiveRootCategory?rootCategoryId=" + rootCategoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region CategoryLevel Master Service

getCategoryList(categoryId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'CategoryLevel/GetCategoryList?categoryId='+categoryId);
}

getCategoryById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'CategoryLevel/GetCategoryById?categoryId='+id);
}

saveCategory(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'CategoryLevel/InsertUpdateCategory', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteCategory(categoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "CategoryLevel/DeleteCategoryRecord?categoryId=" + categoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeCategory(categoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "CategoryLevel/ActiveCategory?categoryId=" + categoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion


//#region SubCategoryLevel Master Service

getSubCategoryList(subCategoryId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'SubCategoryLevel/GetSubCategoryList?subCategoryId='+subCategoryId);
}

getSubCategoryByCategoryId(categoryId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'SubCategoryLevel/GetSubCategoryByCategoryId?categoryId='+categoryId);
}

getSubCategoryById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'SubCategoryLevel/GetSubCategoryById?subCategoryId='+id);
}

saveSubCategory(userId :string,categoryId:string,dtl:any[]) {
  debugger;
  return this.http.post(`${this.baseUrl}/`+ 'SubCategoryLevel/InsertUpdateSubCategory?userId='+userId+'&categoryId=' +categoryId, dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteSubCategory(subCategoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "SubCategoryLevel/DeleteSubCategoryRecord?subCategoryId=" + subCategoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeSubCategory(subCategoryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "SubCategoryLevel/ActiveSubCategory?subCategoryId=" + subCategoryId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region State Master Service

getStateList(State_Id:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'State/GetStateinfo?State_Id='+State_Id);
}

getStateById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'State/GetStateById?State_Id='+id);
}

saveState(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'State/InsertupdateState', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteState(State_Id :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "State/DeleteStateRecord?State_Id=" + State_Id+'&userId='+userId)
    .catch(this.errorHandler);
}
activeState(State_Id :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "State/ActiveState?State_Id=" + State_Id+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion


//#region City Master Service

getCityList(State_Id:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'City/GetCityinfo?State_Id='+State_Id);
}

getCityById(id: number,State_Id : string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'City/GetCityById?State_Id='+State_Id+'&City_Id='+id);
}

saveCity(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'City/InsertUpdateCity', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

saveCityList(userId :string,stateId:string,dtl:any[]) {
  return this.http.post(`${this.baseUrl}/`+ 'City/InsertUpdateCityList?userId='+userId+'&stateId=' +stateId, dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}


deleteCity(State_Id :number, City_Id :string) {
  return this.http.get(`${this.baseUrl}/`+ 'City/DeleteCityRecord?State_Id='+State_Id+'&City_Id='+City_Id)
    .catch(this.errorHandler);
}
//#endregion





//#region Common List Services
  GetLovDetailByColumn(Lov_Column:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Lovmaster/GetLovDetailByColumnAJ?Lov_Column='+Lov_Column);
  }

  GetStreetnamebysearch(search:string,pincode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Lovmaster/GetStreetnamebysearch?search='+search+'&pincode='+pincode);
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

  GetActiveRootList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'RootHeader/GetActiveRootList?rootId='+'0');
  }
  GetActiveRootCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'RootCategory/GetActiveRootCategoryList?rootCategoryId='+'0');
  }
  GetActiveCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'CategoryLevel/GetActiveCategoryList?categoryId='+'0');
  }

  GetCountryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Common/GetCountryListAJ');
  }
  GetStateList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Common/GetStateListAJ');
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
