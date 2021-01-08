export class BaseModel {
  Created_By : string ='';
  Created_Date :Date = new Date();
  Modified_By : string='';
  Modified_Date :Date = new Date();
  IsDeleted : boolean;
  IsInserted : string;
}
