import { Swal } from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { ProtoServicesService } from 'src/app/AdminPanel/Services/proto-services.service';
import { AdminCommonHelperComponent } from '../../AdminCommonHelper/AdminCommonHelper.component';

@Component({
  selector: 'app-home-slider-list',
  templateUrl: './home-slider-list.component.html',
  styleUrls: ['./home-slider-list.component.css']
})
export class HomeSliderListComponent implements OnInit {


  loading: boolean = true;
  IsAddEdit = false;
  sliderImageMaster: [];
  userId: string = localStorage.getItem('userId');
  msgType: string = '';
  message: string = '';
  @ViewChild('dt') table: Table;

  //----------- Add Edit
  sliderImageObj: any = {};

  title: string = "Create";
  sliderImageId: number;
  errorMessage: any = '';
  isInserted: string = 'I';
  //-----------------

  Image_File: File;
  Image_Path: string = "assets/images/no-image-available.jpg";

  constructor(private _commonService: ProtoServicesService, private _router: Router, private primengConfig: PrimeNGConfig, private renderer: Renderer2) {

    this.Image_Path = null;

  }
  commonHelper = new AdminCommonHelperComponent(this._router);
  warningMessage: string = this.commonHelper.commonWarningMessage;
  deleteTooltip: string = this.commonHelper.deleteTooltip;
  restoreTooltip: string = this.commonHelper.restoreTooltip;
  required: string = this.commonHelper.required;
  ngOnInit(): void {
    debugger;
    this.getList();
    this.previewImage();
  }



  getList() {
    debugger;
    this.loading = true;
    this._commonService.getSliderImage(0).subscribe(
      (data) => {
        this.sliderImageMaster = data;
        this.loading = false;
      }
    );
  }


  addEditOpen(id: any): void {
    debugger;
    this.errorMessage = '';
    this.IsAddEdit = true;
    this.sliderImageId = id;

    if (this.sliderImageId > 0) {
      this.title = "Edit";
      this._commonService.getSliderImage(this.sliderImageId)
        .subscribe((resp) => {

          this.sliderImageObj = resp
          this.previewImage()
            , error => this.errorMessage = error
        });
    } else {
      this.title = "Create";
      this.sliderImageObj = SliderImageOBJ(this.isInserted);
      this.previewImage();
    }
  }

  saveSliderImage() {
    debugger;
    if (this.Image_File != null) {

      const formData = new FormData();

      formData.append('file', this.Image_File, this.Image_File.name);

      this.sliderImageObj.Created_By = this.userId;

      formData.append('jsonObj', JSON.stringify(this.sliderImageObj));

      this._commonService.saveSliderImage(formData)
        .subscribe((data) => {

          if(this.sliderImageObj.sliderImageId == 0){
            this.commonHelper.commonAlerts('Inserted', data, '/master/category-master', '/master/add-edit-category')
          }
          else{
            this.commonHelper.commonAlerts('Updated', data, '/master/category-master', '/master/add-edit-category')
          }

        }, error => this.errorMessage = error)

    }
  }

  previewImage() {

    debugger;

    this.Image_Path = null;

    if (this.sliderImageObj.Image_Path == "" || this.sliderImageObj.Catg_ID == 0) {
      this.Image_Path = environment.Default_Image_Path;
    }
    else {
      this.Image_Path = environment.Api_Host + this.sliderImageObj.Image_Path;
    }
  }


  ChangeImage(event) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Image_File = file;

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.Image_Path = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      if (!this.validateFile(this.Image_File.name)) {
        alert('Selected file format is not supported');
        this.Image_File = null;
        return false;
      }
    }
  }

  validateFile(name: String) {

    let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'bpg'];

    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (allImages.indexOf(ext.toLowerCase()) === -1) {
      return false;
    }
    else {
      return true;
    }
  }

  cancel() {
    debugger;
    this.errorMessage = '';
    this.IsAddEdit = false;
    // this._router.navigate(['/master/category-master']);
  }


  deleteItem(rootHeaderId) {
    // var ans = confirm("Are you sure ? You want to delete it?");
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete?',
      text:"You won't be able to revert this!",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      // denyButtonText: 'Cancel',
    }).then((result) => {

      if (result.isConfirmed) {
        this._commonService.deleteSliderImage(rootHeaderId,this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Deleted',data);
            if (ret == 'S') {
              this.getList();
            }
      }, error => console.error(error))
      }
    })
  }

  activateItem(rootHeaderId) {
        this._commonService.activeSliderImage(rootHeaderId,this.userId).subscribe((data) => {
          let ret = this.commonHelper.activeInactiveAlert('Activated',data);
          if (ret == 'S') {
            this.getList();
          }
        }, error => console.error(error))
  }

}




function SliderImageOBJ(isInserted) {

  let obj = {
    SliderImageId: '',
    AttachmentId: '',
    Sequence: '',
    Header: '',
    Discription: '',
    Created_By: '',
    Created_Date: '',
    Modified_By: '',
    Modified_Date: '',
    IsDeleted: '',
    Image_Path: environment.Default_Image_Path
  };
  return obj;
}
