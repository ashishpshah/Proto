import { BaseModel } from 'src/app/models/BaseModel';
export class Customer_Address  extends BaseModel {

  public Address_Id: number;
	public Cust_Id: number;
	public FirstName: string;
	public MiddleName: string;
	public LastName: string;
	public Zipcode: number;
	public Town: string;
	public StreetName: string;
	public StreetNo: string;
	public Letter: string;
	public Floor: string;
	public Page: string;
	public DoorNo: string;
	public MobileNo: string;
  public IsDefault: boolean;
  public AddressLine1:string;
  public AddressLine2:string;
}
