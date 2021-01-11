import { BaseModel } from '../../../models/BaseModel';


export class Sub_Catg_Master extends BaseModel {
  Sub_Catg_ID : number;
  Catg_ID:number;
  Sub_Catg_Name : string;
  Sub_Catg_Name_D : string;
  Display_Seq_No : number;
  Status : string;
}
