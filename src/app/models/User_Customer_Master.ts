import { BaseModel } from './BaseModel';
export class User_Customer_Master  extends BaseModel{

  Cust_Id : number;
  User_Id : string;
  Password : string;
  ReapeatPassword : string;
  Customer_Type : string;
  Email : string;
  FirstName : string;
  MiddleName : string;
  LastName : string;
  Zipcode : number;
  Town : string;
  StreetName : string;
  StreetNo : string;
  Letter : string;
  Floor : string;
  Page : string;
  DoorNo : string;
  MobileNo : string;
  AltMobileNo : string;
  CVR : string;
  EANNo : string;
  Compuny_Name:string;
}
