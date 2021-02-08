import { Sub_Catg_Master } from './Sub_Catg_Master';
import { BaseModel } from './BaseModel';
export class Catg_Master extends BaseModel {

  Catg_ID : number;
  RCatg_ID: number;
  Catg_Name : string;
  Catg_Name_D : string;
  Display_Seq_No : number;
  Status : string;
  Has_SubCatg : boolean=true;
  Sub_Catg_MasterList:Sub_Catg_Master[];
  Image_Url : string;
}
