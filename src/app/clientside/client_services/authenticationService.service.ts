import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private url = window.location.origin;
  private baseUrl : string = this.url.includes('localhost') ? 'https://localhost:44311/Api/' :'https://protoapi.padhyasoft.com/Api/' ;
  constructor(private http: HttpClient) { }


  Login(model) {
    return this.http.post(this.baseUrl + 'Login/CheckAuthenticationCustmer', model)
      .catch(this.errorHandler)
  }

  CheckPincodeValidation(Pincode :string) {

    return this.http.get(this.baseUrl + 'Login/CheckPincodeValidation?Pincode=' + Pincode)
      .catch(this.errorHandler);
  }

  SaveCustmerdata(dtl) {
    return this.http.post(this.baseUrl + 'Login/InsertUpdateUserCustomer', dtl)
      .catch(this.errorHandler)
  }

  //#region  Error Handler
  errorHandler(error: Response) {
    console.log(error);
    return 'error';
  }
//#endregion
}
