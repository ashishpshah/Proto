
import { BaseModel } from "../baseModel";
export class Subcategoryitem  extends BaseModel  {
    Parent_ID : number;
    Catg_ID : number;
    Sub_Catg_ID : number;
    Sub_Catg_Name : string;
    Sub_Catg_Name_D : string;
    Display_Seq_No : number;
    Status : string;
}
