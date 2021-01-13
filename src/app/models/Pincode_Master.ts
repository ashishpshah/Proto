export class Pincode_Master
{
	private _Pin_Id: number;
	public get Pin_Id(): number
	{
		return this._Pin_Id;
	}
	public set Pin_Id(val: number)
	{
		this._Pin_Id = val;
	}

	private _Pincode: number;
	public get Pincode(): number
	{
		return this._Pincode;
	}
	public set Pincode(val: number)
	{
		this._Pincode = val;
	}

	private _Status: string;
	public get Status(): string
	{
		return this._Status;
	}
	public set Status(val: string)
	{
		this._Status = val;
	}

	private _Created_By: string;
	public get Created_By(): string
	{
		return this._Created_By;
	}
	public set Created_By(val: string)
	{
		this._Created_By = val;
	}

	private _Created_Date: Date;
	public get Created_Date(): Date
	{
		return this._Created_Date;
	}
	public set Created_Date(val: Date)
	{
		this._Created_Date = val;
	}

	private _Modified_By: string;
	public get Modified_By(): string
	{
		return this._Modified_By;
	}
	public set Modified_By(val: string)
	{
		this._Modified_By = val;
	}

	private _Modified_Date: Date;
	public get Modified_Date(): Date
	{
		return this._Modified_Date;
	}
	public set Modified_Date(val: Date)
	{
		this._Modified_Date = val;
	}

	private _IsDeleted: boolean;
	public get IsDeleted(): boolean
	{
		return this._IsDeleted;
	}
	public set IsDeleted(val: boolean)
	{
		this._IsDeleted = val;
	}
}
