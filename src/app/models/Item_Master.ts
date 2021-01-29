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
  Qty: number= 0;
  Price:number =0;
  Display_Seq_No : number;
  Status : string;
  HedaerName:string;
  TotalPrice:number =0;
  discount:number =0;
  shippingcharge:number =0;
  Subtotal:number =0;
  Grandtotal:number =0;
  CategoryName:string ='';
  showaddbtn:boolean =true;
  showplusebtn:boolean =false;
  OrderQty: number= 1;
  Activewishlist:boolean =false;
  image:string;
  thumbImage: string;
  title: string

}
