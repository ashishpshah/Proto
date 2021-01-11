import { BaseModel } from './BaseModel';

export class Item_Master extends BaseModel {

  Item_ID : number;
  Sub_Catg_ID : number;
  SR_NO : number;
  Catg_Id : number;
  Item_Name : string;
  Item_Name_D : string;
  Type_ID : number;
  Brand_ID : number;
  UOM: string;
  Qty: number;
  Price:number;
  Display_Seq_No : number;
  Status : string;
  HedaerName:string;
}
