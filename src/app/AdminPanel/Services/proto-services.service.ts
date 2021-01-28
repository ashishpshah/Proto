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

//#region Country Master Service

getCountryList(): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Country/GetCountryinfo?');
}

getCountryById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Country/GetCountryById?countryId='+id);
}

saveCountry(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Country/InsertupdateCountry', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteCountry(countryId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Country/DeleteCountryRecord?countryId=" + countryId+'&userId='+userId)
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

//#region Street Master Service

getStreetList(streetId:string,isActive : string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Street/GetStreetList?streetId='+streetId+'&isActive='+isActive);
}

getStreetById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Street/GetStreetById?streetId='+id);
}

saveStreet(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Street/InsertUpdateStreet', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteStreet(streetId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Street/DeleteStreetRecord?streetId=" + streetId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeStreet(streetId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "Street/ActiveStreet?streetId=" + streetId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region Country Master Service

getRouteList(): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Route/GetRouteList?routeId='+'0');
}

getRouteById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Route/GetRouteById?routeId='+id);
}

saveRoute(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Route/InsertUpdateRoute', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteRoute(routeId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Route/DeleteRouteRecord?routeId=" + routeId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeRoute(routeId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "Route/ActiveRoute?routeId=" + routeId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region Department Master Service

getDepartmentList(deptCode:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Department/GetDepartmentList?deptCode='+deptCode);
}

getDepartmentById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Department/GetDepartmentById?deptCode='+id);
}

saveDepartment(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Department/InsertUpdateDepartment', dtl)
    .catch(this.errorHandler)
}

deleteDepartment(deptCode :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Department/DeleteDepartmentRecord?deptCode=" + deptCode+'&userId='+userId)
    .catch(this.errorHandler);
}

activeDepartment(deptCode :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "Department/ActiveDepartment?deptCode=" + deptCode+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion


//#region Type Master Service

gettypeById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Type_Master/GetType_MasterById?Type_ID='+id);
}

gettypeList(): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Type_Master/GetType_Masternfo');
}

savetype(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Type_Master/InsertUpdateType_Master', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deletetype(Type_ID :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Type_Master/DeleteType_MasterRecord?Type_ID=" + Type_ID+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region Brand Master Service

getBrandById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Route/GetBrand_MasterById?Brand_ID='+id);
}

getbrandList(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'BrandMaster/GetBrand_Masternfo?Brand_ID='+id);
}

savebrand(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'BrandMaster/InsertUpdateBrand_Master', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deletebrand(brandId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "BrandMaster/DeleteBrand_MasterRecord?Brand_ID=" + brandId+'&userId='+userId)
    .catch(this.errorHandler);
}
activebrand(brandId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "BrandMaster/ActiveRoute?Brand_ID=" + brandId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region Vehicle Master Service

getVehicleList(vehicleId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Vehicle/GetVehicleList?vehicleId='+vehicleId);
}
getVehicleById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Vehicle/GetVehicleById?vehicleId='+id);
}
saveVehicle(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Vehicle/InsertUpdateVehicle', dtl)
    .catch(this.errorHandler)
}
deleteVehicle(vehicleId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Vehicle/DeleteVehicleRecord?vehicleId=" + vehicleId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeVehicle(vehicleId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "Vehicle/ActiveVehicle?vehicleId=" + vehicleId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region Pincode Master Service

getPincodeList(pincodeId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Pincode/GetPincodeList?pincodeId='+pincodeId);
}

getPincodeById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'Pincode/GetPincodeById?pincodeId='+id);
}

savePincode(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'Pincode/InsertUpdatePincode', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deletePincode(pincodeId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "Pincode/DeletePincodeRecord?pincodeId=" + pincodeId+'&userId='+userId)
    .catch(this.errorHandler);
}
activePincode(pincodeId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "Pincode/ActivePincode?pincodeId=" + pincodeId+'&userId='+userId)
    .catch(this.errorHandler);
}
//#endregion

//#region CategoryLevel Master Service

getVehicleRouteList(mapId:string): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'VehicleRouteMapping/GetVehicleRouteList?mapId='+mapId);
}

getVehicleRouteById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/`+'VehicleRouteMapping/GetVehicleRouteById?mapId='+id);
}

saveVehicleRoute(dtl) {
  return this.http.post(`${this.baseUrl}/`+ 'VehicleRouteMapping/InsertUpdateVehicleRoute', dtl)
    // .map((response: Response) => response.json())
    .catch(this.errorHandler)
}

deleteVehicleRoute(mapId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/`+ "VehicleRouteMapping/DeleteVehicleRouteRecord?mapId=" + mapId+'&userId='+userId)
    .catch(this.errorHandler);
}
activeVehicleRoute(mapId :number, userId :string) {
  return this.http.get(`${this.baseUrl}/` + "VehicleRouteMapping/ActiveVehicleRoute?mapId=" + mapId+'&userId='+userId)
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
  GetAllCityList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Common/GetAllCityList');
  }

  getActiveRouteList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Route/GetActiveRouteList?routeId='+'0');
  }

  GetActiveDepartmentList(deptCode:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Department/GetActiveDepartmentList?deptCode='+deptCode);
  }

  GetVehicleCategoryList(vehicleId :string): Observable<any>  {
    return this.http.get(`${this.baseUrl}/` + "Vehicle/GetVehicleCategoryListAJ?vehicleId=" + vehicleId)
      .catch(this.errorHandler);
  }
  GetDepartmentByCatId(categoryId :string) {
    return this.http.get(`${this.baseUrl}/` + "SubCategoryLevel/GetDepartmentByCatId?categoryId=" + categoryId)
      .catch(this.errorHandler);
  }

  GetPincodesFromCity(): Observable<any>  {
    return this.http.get(`${this.baseUrl}/` + "Pincode/GetPincodesFromCity")
      .catch(this.errorHandler);
  }

  GetActiveVehicleList(vehicleId :string): Observable<any>  {
    return this.http.get(`${this.baseUrl}/` + "Vehicle/GetActiveVehicleListAJ?vehicleId=" + vehicleId)
      .catch(this.errorHandler);
  }

  GetActiveRouteDropDownList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`+'Route/GetActiveRouteListAJ?routeId='+'0');
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
