import { ClientCommonHelperComponent, Pagination } from './../../clientCommonHelper/clientCommonHelper.component';
import { AdminCommonHelperComponent } from './../../../AdminPanel/pages/AdminCommonHelper/AdminCommonHelper.component';
import { Catg_Master } from './../../../models/Catg_Master';
import { StreetListComponent } from './../../../AdminPanel/pages/street-master/street-list/street-list.component';
import { brandMasterModule } from './../../../AdminPanel/pages/brand-master/brand-master.module';
import { Client_commonService } from './../../client_services/client_common.service';
import { Item_Master } from './../../../models/Item_Master';
import { CategoryService } from '../../client_services/category.service';
import { Sub_Catg_Master } from '../../../models/Sub_Catg_Master';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { BrandMaster } from 'src/app/models/BrandMaster';
import { TypeMaster } from 'src/app/models/TypeMaster';

declare var $: any;
declare var require: any;
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})

export class SubcategoryComponent implements OnInit {
  errorMessage: string;
  category: string;
  categoryName: string;
  subcategoryName: string;
  _listFilter: string;
  cat_id: any =0;
  RCatg_ID: any =0;
  Root_Header_ID: number=0;
  Item_Masters : any[]=[];
  Catg_Master : any[] =[];
  Sub_Catg_Master  : any[] =[];
  public isCollapsed = true;
  HeaderName:string='';
  shoppingcartlist : Observable<Item_Master[]>;
  BrandMaster_   : any[] = [];
  TypeMaster_  : any[] = [];
  typeObj :any ={};
  tempArrType: any = { "FilterType": [] };
  tempArrBrand: any = { "FilterBrand": [] };
  SubCatFilterArray: any = { "FilterSubCat": [] };
  Type:string='';
  FilterType:string='';
  ID : any;
  FilterID: string='';
  pageOfItems: Array<any>;
  FilterBrandID :string ='';
  FilterTypeID :string = '';
  FilterSubCatID :string = '';
  CatCoverImage : string = '';
  IsSubCategory : boolean = false;

  //productInfoCart : Observable<Item_Master[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private Client_commonService_: Client_commonService
  ){

  }

  commonHelper = new ClientCommonHelperComponent(this.router,this.Client_commonService_);
  currency : string  = this.commonHelper.currency;

  /*------Start: Pagination Global variable -------*/
  PaginationList : any[] = [];
  pageSize : number = this.commonHelper.pageSize;
  pageNo  : number = this.commonHelper.pageNo;
  sortBy : string = this.commonHelper.sortBy;
  totalItems : any = 0;
  MainId : any = 0; // It's use when need to getitem by page no in pagination
  MainType : any = ''; // It's use when need to getitem by page no in pagination
  IsMultiCategory : boolean = false;
  showingItems : number = 0;
  isFirstPageDisabled : boolean ;
  isLastPageDisabled : boolean;
  firstPageNo : number;
  lastPageNo : number;
  ShowItemList : any[];
  SortByList : any[] =[];
  IsFilterItem : boolean = false;
  /*------End: Pagination Global variable -------*/

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  ngOnInit()
  {


    localStorage.removeItem('CategoryId');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.subcategoryName = this.route.snapshot.paramMap.get('string');
      this.typeObj = typeFun();
      this.Root_Header_ID=parseInt(this.subcategoryName);
      this.RCatg_ID=parseInt(this.subcategoryName);
      this.GetitemByCategoryType(this.RCatg_ID,'RootHeader');
      this.GetCatg_MasterList(this.Root_Header_ID);
      this.GetBrandByType(this.RCatg_ID,'RootHeader','','','N');
      this.GetTypeByType(this.RCatg_ID,'RootHeader','','','N');
  }
  onChangeTypeCategory(isChecked: boolean, type_: any)
  {
    this.pageNo = this.firstPageNo;
    this.MainId = type_.ID;
    if(isChecked) {
      this.tempArrType.FilterType.push(type_.Type_ID);
    } else {
      let index = this.tempArrType.FilterType.indexOf(type_.Type_ID);
      this.tempArrType.FilterType.splice(index,1);
    }
    if(this.BrandMaster_.length > 0){
      let tempArray:any = { "FilterBrand": [] };
      this.BrandMaster_.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArray.FilterBrand.push(dtVal.Brand_ID);
        }
    });
    this.tempArrBrand = tempArray;
    }

    if(this.Sub_Catg_Master.length > 0){
      let tempArrays:any = { "FilterSubCat": [] };
      this.Sub_Catg_Master.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArrays.FilterSubCat.push(dtVal.Sub_Catg_ID);
        }
    });
      this.SubCatFilterArray = tempArrays;
    }

    this.FilterBrandID = this.tempArrBrand.FilterBrand.join(",");
    this.FilterTypeID = this.tempArrType.FilterType.join(",");
    if(this.FilterTypeID == '')
    {
      this.ClearbrandFilter(this.Sub_Catg_Master.length > 0 ? 'Y' :'N' );
    }else{
      this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
    }
  }

  onChangeBrandCategory(isChecked: boolean, Brand_: any){
    this.pageNo = this.firstPageNo;
    this.MainId = Brand_.ID;
    if(isChecked) {
      this.tempArrBrand.FilterBrand.push(Brand_.Brand_ID);
    } else {
      let index = this.tempArrBrand.FilterBrand.indexOf(Brand_.Brand_ID);
      this.tempArrBrand.FilterBrand.splice(index,1);
    }
    if(this.TypeMaster_.length > 0){
      let tempArray:any = { "FilterType": [] };
      this.TypeMaster_.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArray.FilterType.push(dtVal.Type_ID);
        }
    });
      this.tempArrType = tempArray;
    }

    if(this.Sub_Catg_Master.length > 0){
      let tempArrays:any = { "FilterSubCat": [] };
      this.Sub_Catg_Master.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArrays.FilterSubCat.push(dtVal.Sub_Catg_ID);
        }
    });
      this.SubCatFilterArray = tempArrays;
    }

    this.FilterBrandID = this.tempArrBrand.FilterBrand.join(",");
    this.FilterTypeID = this.tempArrType.FilterType.join(",");
    if(this.FilterBrandID == '')
    {
      this.ClearTypeFilter(this.Sub_Catg_Master.length > 0 ? 'Y' :'N');
    }else{
      this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
    }
  }

  onChangeSubCategoryList(isChecked: boolean, SubCat: any){
    this.pageNo = this.firstPageNo;
    this.MainId = SubCat.Catg_ID;
    debugger;
    if(isChecked) {
       this.SubCatFilterArray.FilterSubCat.push(SubCat.Sub_Catg_ID);
    } else {
      let index = this.SubCatFilterArray.FilterSubCat.indexOf(SubCat.Sub_Catg_ID);
      this.SubCatFilterArray.FilterSubCat.splice(index,1);
    }

     if(this.TypeMaster_.length > 0){
      let tempArray:any = { "FilterType": [] };
      this.TypeMaster_.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArray.FilterType.push(dtVal.Type_ID);
        }
    });
      this.tempArrType = tempArray;
    }

    if(this.BrandMaster_.length > 0){
      let tempArray:any = { "FilterBrand": [] };
      this.BrandMaster_.forEach(function (dtVal) {
        if(dtVal.IsChecked){
          tempArray.FilterBrand.push(dtVal.Brand_ID);
        }
    });
    this.tempArrBrand = tempArray;
    }
    this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
  }

  ClearbrandFilter(IsHasSubCategory : any){
    this.tempArrBrand.FilterBrand = [];
    let IsSubCatClearBrand= IsHasSubCategory == 'Y' ?'Y': 'N';

    this.BrandMaster_.map(row => {
      row.IsChecked = false;
    });

      this.GetGetitemByFilterType('Brand','Type','SubCategory','Y',IsSubCatClearBrand,'N');
  }
  ClearTypeFilter(IsHasSubCategory : any)
  {
    let IsSubCatClearType= IsHasSubCategory == 'Y' ?'Y': 'N';
    this.tempArrType.FilterType = [];
    this.TypeMaster_.map(row => {
      row.IsChecked = false;
    });

      this.GetGetitemByFilterType('Brand','Type','SubCategory','Y','N',IsSubCatClearType);
    //GetAllFilterList(catId:any,type :any, filterSubCatId : any, filterBrandId :any, filterTypeId:any,IsBrandClear :any,IsTypeClear :any)
  }

  GetGetitemByFilterType(FilterBrand,FilterType,FilterSubCat,IsClear,IsSubCatClearBrand,IsSubCatClearType)
  {
    debugger;
    if(this.TypeMaster_.length >0){
      this.Type = this.TypeMaster_[0].Type;
      this.ID = this.TypeMaster_[0].ID;
    }
    this.ID = this.MainId;
    this.FilterSubCatID = this.SubCatFilterArray.FilterSubCat.join(",");
    this.FilterBrandID = this.tempArrBrand.FilterBrand.join(",");
    this.FilterTypeID = this.tempArrType.FilterType.join(",");
    this.Type = FilterSubCat =='SubCategory' ? this.FilterSubCatID != "" ? 'SubCategory' : 'Category' :this.Type;

    this.ID = this.ID == undefined || this.ID == null ? localStorage.getItem('CategoryId') : this.ID;
    if(this.Sub_Catg_Master.length > 0){
        this.GetAllFilterList(this.ID,this.Type,this.FilterSubCatID,this.FilterBrandID,this.FilterTypeID,IsSubCatClearBrand,IsSubCatClearType);
    }else{
      if(FilterBrand =='Brand')
      {
          this.GetTypeByType(this.ID,this.Type,FilterBrand,this.FilterBrandID,IsClear);
      }

      if(FilterType =='Type')
      {
          this.GetBrandByType(this.ID,this.Type,FilterType,this.FilterTypeID,IsClear);
      }
    }

    this.Client_commonService_.GetGetitemByFilterType(this.ID,this.Type,this.FilterBrandID,FilterBrand,this.FilterTypeID,FilterType,this.FilterSubCatID,FilterSubCat,'0','10000','0','100',this.pageSize,this.pageNo,this.sortBy).subscribe(
      (data) =>
       {
         this.IsFilterItem =true;
         this.Item_Masters = data;
         this.totalItems = data != null && this.Item_Masters.length > 0 ? this.Item_Masters[0].TotalCount : 0;
         this.GeneratePaginationNo(this.totalItems,this.pageSize,this.pageNo);
         this.IsMultiCategory = false;
         this.MainId = this.ID;
         this.MainType = this.Type;
         this.CheckshopingcartQty()
      }
    )
  }

  GetAllFilterList(catId:any,type :any, filterSubCatId : any, filterBrandId :any, filterTypeId:any,IsBrandClear :any,IsTypeClear :any){

    this.Client_commonService_.GetFilter_Brand_Type_SubCategory(catId,type, filterSubCatId, filterBrandId, filterTypeId).subscribe(
      (data) =>{
        let dataSubCatMaster   : any[] = [];
        let ArraySubCat  : any[] = [];
        let dataBrandMaster   : any[] = [];
        let ArrayBrand  : any[] = [];
        let dataTypeMaster   : any[] = [];
        let ArrayType  : any[] = [];

        if(data != null){
        /********* Start : Sub Category Filter *********/
          dataSubCatMaster = this.Sub_Catg_Master;
          if(dataSubCatMaster.length > 0 ){
            if(data.Sub_Catg_MasterList != null){
              data.Sub_Catg_MasterList.filter(function (dtVal, index) {
                    dataSubCatMaster.forEach(function (value) {
                      if(value.Sub_Catg_ID == dtVal.Sub_Catg_ID){
                        if(value.IsChecked){
                          dtVal = value;
                        }
                      }
                    });
                    ArraySubCat.push(dtVal);
                 });
            }
          this.Sub_Catg_Master = ArraySubCat;
         }else{
          this.Sub_Catg_Master = data.Sub_Catg_MasterList;
         }
        this.IsSubCategory = this.Sub_Catg_Master != null && this.Sub_Catg_Master.length > 0 ? true:false;
        /********** End : Sub Category Filter **********/

        /********* Start : Brand Filter *********/
        dataBrandMaster = this.BrandMaster_;
         if(dataBrandMaster.length > 0  && IsBrandClear != 'Y'){
            if(data.Brand_MasterList != null){
              data.Brand_MasterList.filter(function (dtVal, index) {
                    dataBrandMaster.forEach(function (value) {
                      if(value.Brand_ID == dtVal.Brand_ID){
                        if(value.IsChecked){
                          dtVal = value;
                        }
                      }
                    });
                    ArrayBrand.push(dtVal);
                 });
            }
          this.BrandMaster_ = ArrayBrand;
         }else{
          this.BrandMaster_ = data.Brand_MasterList;
         }
        /********* End : Brand Filter **********/

         /********* Start : Type Filter *********/

         dataTypeMaster = this.TypeMaster_;

         if(dataTypeMaster.length > 0 && IsTypeClear != 'Y'){
            if(data.Type_MasterList != null){
              data.Type_MasterList.filter(function (dtVal, index) {
                  dataTypeMaster.forEach(function (value) {
                    if(value.Type_ID == dtVal.Type_ID){
                      if(value.IsChecked){
                        dtVal = value;
                      }
                    }
                  });
                  ArrayType.push(dtVal);
              });
            }
          this.TypeMaster_ = ArrayType;
         }else{
          this.TypeMaster_ = data.Type_MasterList;
         }
        /********* End : Type Filter **********/
        }
      }
      )

  }

  GetSubCategoryByCatId(categoryId : any, IsClear){
     let catID :any= localStorage.getItem('CategoryId');

     categoryId = categoryId == '' || categoryId == 0 || categoryId == '0' ? catID == null ?"0":catID:categoryId

     this.Client_commonService_.SubCategoryList(categoryId).subscribe(
      (data) =>
       {
        let dataMaster   : any[] = [];
        let ArrayBrand  : any[] = [];
        dataMaster = this.Sub_Catg_Master;
         if(dataMaster.length > 0  && IsClear != 'Y'){
            if(data != null){
                  data.filter(function (dtVal, index) {
                    dataMaster.forEach(function (value) {
                      if(value.Sub_Catg_ID == dtVal.Sub_Catg_ID){
                        if(value.IsChecked){
                          dtVal = value;
                        }
                      }
                    });
                    ArrayBrand.push(dtVal);
                 });
            }
          this.Sub_Catg_Master = ArrayBrand;
         }else{
          this.Sub_Catg_Master = data;
         }
        this.IsSubCategory = this.Sub_Catg_Master != null && this.Sub_Catg_Master.length > 0 ? true:false;
      }
    )
  }

  GetBrandByType(ID :string,Type: string,FilterType :string,FilterID :string, IsClear :string){
    this.Client_commonService_.GetBrandByType(ID,Type,FilterType,FilterID).subscribe(
      (data) =>
       {
        let dataMaster   : any[] = [];
        let ArrayBrand  : any[] = [];

        dataMaster = this.BrandMaster_;
         if(dataMaster.length > 0  && IsClear != 'Y'){
            if(data != null){
                  data.filter(function (dtVal, index) {
                    dataMaster.forEach(function (value) {
                      if(value.Brand_ID == dtVal.Brand_ID){
                        if(value.IsChecked){
                          dtVal = value;
                        }
                      }
                    });
                    ArrayBrand.push(dtVal);
                 });
            }
          this.BrandMaster_ = ArrayBrand;
         }else{
          this.BrandMaster_ = data;
         }
      }
    )
  }

  GetTypeByType(ID :string,Type: string,FilterType :string,FilterID :string, IsClear :string){
    this.Client_commonService_.GetTypeByType(ID,Type,FilterType,FilterID).subscribe(
      (data) =>
       {
        let dataMaster   : any[] = [];
        let ArrayType : any[] = [];
        dataMaster = this.TypeMaster_;

         if(dataMaster.length > 0 && IsClear != 'Y'){
          // this.TypeMaster_.forEach(function (value) {

            if(data != null){
              // data.forEach(function (dtVal) {
                data.filter(function (dtVal, index) {
                  dataMaster.forEach(function (value) {
                    if(value.Type_ID == dtVal.Type_ID){
                      if(value.IsChecked){
                        dtVal = value;
                        // dtVal.IsChecked = true;
                      }
                      // else{dtVal.IsChecked = false;}
                      // dtVal = value;
                      // ArrayType.push(dtVal);
                    }
                    // else{
                    //   ArrayType.push(dtVal);
                    // }
                  });
                  ArrayType.push(dtVal);
                  // return dtVal;
              });
            }
          // });
          // ArrayType = data;
          this.TypeMaster_ = ArrayType;
         }else{
          this.TypeMaster_ = data;
         }
        //  this.TypeMaster_.map(row => {
        //   row.IsChecked =row.IsChecked == true? true: false;
        // });
      }
    )
  }
  toggleShow(Item_Masters)
  {

   Item_Masters.showaddbtn = false;
   Item_Masters.showplusebtn = true;

  }
  PluseQty(item)
  {

    this.Client_commonService_.addQty(item);
    item.OrderQty += 1

  }

  minuseQty(item){

    this.Client_commonService_.minuseQty(item);
    item.OrderQty -= 1

    if(item.OrderQty <= 0)
    {
      item.OrderQty=1
      this.Client_commonService_.deleteItem(item);
      item.showaddbtn = true;
      item.showplusebtn = false;
    }
  }

  addToCart(Item_Mastercart) {
    this.Client_commonService_.addToCart1(Item_Mastercart);
  }


  GetitemByCategoryType(ID :number,Type: string){
    this.Client_commonService_.GetitemByCategoryType(ID,Type,this.pageSize,this.pageNo,this.sortBy).subscribe(
      (data) =>
       {

         this.IsFilterItem =false;
         this.Item_Masters = data;
         this.totalItems = data != null && this.Item_Masters.length > 0 ? this.Item_Masters[0].TotalCount : 0;
         this.GeneratePaginationNo(this.totalItems,this.pageSize,this.pageNo);
         this.IsMultiCategory = false;
         this.MainId = ID;
         this.MainType = Type;
         this.CheckshopingcartQty()
      }
    )
  }
  GetitemByCategoryTypeMulti(ID :string,Type: string){
    let ids : string = '';
    ids = this.SubCatFilterArray.FilterSubCat.length > 0? this.SubCatFilterArray.FilterSubCat.join(",") : ID;

    this.Client_commonService_.GetitemByCategoryTypeMulti(ids,Type,this.pageSize,this.pageNo,this.sortBy).subscribe(
      (data) =>
       {
         this.IsFilterItem =false;
         this.Item_Masters = data;
         this.totalItems = data != null && this.Item_Masters.length > 0 ? this.Item_Masters[0].TotalCount : 0;
         this.GeneratePaginationNo(this.totalItems,this.pageSize,this.pageNo);
         this.IsMultiCategory = true;
         this.MainId = ID;
         this.MainType = Type;
         this.CheckshopingcartQty()
      }
    )
  }

  /****--- Get Pagination no from common helper ----***/
  GeneratePaginationNo(totalItems,pageSize,pageNo){
    this.PaginationList =  this.commonHelper.GeneratePaginationNo(totalItems,pageSize,pageNo);
    this.showingItems = this.commonHelper.showingItems;
    this.isFirstPageDisabled = this.commonHelper.isFirstPageDisabled;
    this.isLastPageDisabled = this.commonHelper.isLastPageDisabled;
    this.firstPageNo = this.commonHelper.firstPageNo;
    this.lastPageNo = this.commonHelper.lastPageNo;
    this.ShowItemList = this.commonHelper.displayItems;
    //this.SortByList = this.commonHelper.GetSortByList();
    this.GetSortByList();

  }
  GetSortByList(){
    this.Client_commonService_.GetLovDetailByColumn("SORTBY").subscribe(
      (data) =>
       {

          this.SortByList = data;
      }
    )
  }
  GetItemByPageNo(pageNo : any){
    this.pageNo = pageNo;
    if(this.IsFilterItem ){
      this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
    }else{
      if (this.IsMultiCategory) {
        this.GetitemByCategoryTypeMulti(this.MainId,this.MainType);
      }else{
        this.GetitemByCategoryType(this.MainId,this.MainType);
      }
    }
  }
  GetItemByPageSize(pageSize : any){
    debugger;
    this.pageSize = pageSize;
    this.pageNo = this.firstPageNo;
    if(this.IsFilterItem ){
      this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
    }else{
      if (this.IsMultiCategory) {
        this.GetitemByCategoryTypeMulti(this.MainId,this.MainType);
      }else{
        this.GetitemByCategoryType(this.MainId,this.MainType);
      }
    }

  }
  GetItemSortBy(sortBy : any){
    this.sortBy = sortBy;
    this.pageNo = this.firstPageNo;
    if(this.IsFilterItem ){
      this.GetGetitemByFilterType('Brand','Type','SubCategory','N','N','N');
    }else{
      if (this.IsMultiCategory) {
        this.GetitemByCategoryTypeMulti(this.MainId,this.MainType);
      }else{
        this.GetitemByCategoryType(this.MainId,this.MainType);
      }
    }
  }

  getItemList(cat_ids :string){

    this.GetitemByCategoryTypeMulti(cat_ids,'Category')
    this.GetBrandByType(cat_ids,'Category','','','N');
    this.GetTypeByType(cat_ids,'Category','','','N');
  }

  CheckshopingcartQty()
  {
    this.shoppingcartlist = this.Client_commonService_.getItems();

    for (var index in this.Item_Masters)
    {
         for (var index1 in this.shoppingcartlist)
         {
             if(this.Item_Masters[index].Item_ID == this.shoppingcartlist[index1].Item_ID)
             {
               this.Item_Masters[index].OrderQty=this.shoppingcartlist[index1].OrderQty
               this.Item_Masters[index].showaddbtn=false
               this.Item_Masters[index].showplusebtn=true
             }

         }
    }

  }

  GetCatg_MasterList(Root_Header_ID :number){

    this.Client_commonService_.GetCatg_MasterList(Root_Header_ID).subscribe(
      (data) =>
       {
         this.Catg_Master = data;
         this.CatCoverImage = this.Catg_Master.length > 0 ? this.Catg_Master[0].Image_Url:'';
      }
    )
  }

  filterByCategory(cat_ids)
  {
    this.GetitemByCategoryType(cat_ids,'Category')
    this.GetBrandByType(cat_ids,'Category','','','N');
    this.GetTypeByType(cat_ids,'Category','','','N');
  }
  getItemListBysubcategory(Sub_Catg_ID)
  {

    this.GetitemByCategoryType(Sub_Catg_ID,'SubCategory')
    this.GetBrandByType(Sub_Catg_ID,'SubCategory','','','N');
    this.GetTypeByType(Sub_Catg_ID,'SubCategory','','','N');
  }



  onClickwhishlist(Item_Masters)
  {
    Item_Masters.Activewishlist = !Item_Masters.Activewishlist;
    if(Item_Masters.Activewishlist)
    {
      this.Client_commonService_.addwishlist(Item_Masters);
    }else{
      this.Client_commonService_.removewhishlist(Item_Masters);
    }
  }

  ngAfterViewInit() {
    $('#carouselExample').on('slide.bs.carousel', function (e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 7;
      var totalItems = $('.carousel-item').length;
      if (idx >= totalItems-(itemsPerSlide-1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i=0; i<it; i++) {
              //append slides to end
              if (e.direction=="left") {
                  $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                  $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
          }
      }
  });
  }

  SubCategoryList(cat_ids,index)
  {

    let img = '';
    this.IsSubCategory = false;
    if(this.Catg_Master != null){
      this.Catg_Master.forEach(function (value) {
        if(value.Catg_ID == cat_ids)
         img = value.Image_Url;
      });
      this.Sub_Catg_Master = this.Catg_Master[index].Sub_Catg_MasterList;
      this.IsSubCategory = this.Sub_Catg_Master != null && this.Sub_Catg_Master.length > 0 ? true:false;
    }
    this.CatCoverImage = img;
    this.MainId = cat_ids;
    this.filterByCategory(cat_ids);

    localStorage.setItem('CategoryId',cat_ids);
  }

  GetItemListBysubcategory_List(Sub_Catg_ID)
  {
    this.getItemListBysubcategory(Sub_Catg_ID)
  }
}

function typeFun() {

  let obj ={
    Type_ID :'',
    Type_Name : '',
    Type_NameD : '',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : '',
  StatusDesc:'',
  editable: false,
  IsChecked : false
};
  return obj;
}
function PaginationFun(){
  let obj ={
    Value : '',
    IsActive: false,
  };
}
function BrandFun() {

  let obj ={
    Brand_ID :'',
    Brand_Name : '',
    Brand_NameD : '',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : '',
  StatusDesc:'',
  editable: false,
  IsChecked : false
};
  return obj;
}
