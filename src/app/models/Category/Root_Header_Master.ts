import { Root_Catg_Master } from './../Category/Root_Catg_Master';

import { BaseModel } from "../baseModel";
export class Root_Header_Master extends BaseModel {
  Root_Header_ID : number;
  Root_Name : string;
  Root_Name_D : string;
  Display_Seq_No : number;
  Status : string;
  rootcat: Root_Catg_Master[];
}
