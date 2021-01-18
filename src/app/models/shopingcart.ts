import { Item_Master } from './Item_Master';
export class shopingcart {

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
  TotalPrice:number;
  discount:number;
  shippingcharge:number;
  Subtotal:number;
  Grandtotal:number;
  Item_MasterList:Item_Master[];
  CategoryName:string ='';
}
