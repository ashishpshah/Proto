import { BaseModel } from "src/app/models/BaseModel";

export class Root_Catg_Master extends BaseModel {
  RCatg_ID : number;
  Root_Header_ID: number;
  RCatg_Name : string;
  RCatg_Name_D : string;
  Display_Seq_No : number;
  Status : string;
}
