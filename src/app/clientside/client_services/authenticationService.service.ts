import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }


  Login(model) {
    return this.http.post(environment.server + 'Login/CheckAuthenticationCustmer', model)
      .catch(this.errorHandler)
  }

  CheckPincodeValidation(Pincode :string) {
    debugger;
    return this.http.get(environment.server + 'Login/CheckPincodeValidation?Pincode=' + Pincode)
      .catch(this.errorHandler);
  }

  SaveCustmerdata(dtl) {
    return this.http.post(environment.server + 'Login/InsertUpdateUserCustomer', dtl)
      .catch(this.errorHandler)
  }

  //#region  Error Handler
  errorHandler(error: Response) {
    console.log(error);
    return 'error';
  }
//#endregion
}
