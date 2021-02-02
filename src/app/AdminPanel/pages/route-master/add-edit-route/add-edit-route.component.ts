import { AdminCommonHelperComponent } from './../../AdminCommonHelper/AdminCommonHelper.component';
import { ProtoServicesService } from './../../../Services/proto-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, Renderer2,ViewChild,NgZone  } from '@angular/core';
import { DropdownList } from 'src/app/models/DropdownList';
import { Observable } from 'rxjs';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-edit-route',
  templateUrl: './add-edit-route.component.html',
  styleUrls: ['./add-edit-route.component.scss']
})
/************************************* Developed By RAJESH *******************************/
export class AddEditRouteComponent implements OnInit {
  routeObj :any ={};

  title: string = "Create";
  routeId: number;
  errorMessage: any ='';
  StatusList : Observable<DropdownList[]>;
  RouteList : Observable<DropdownList[]>;
  SelectedStatus : string = 'A';
  userId : string = localStorage.getItem('userId');
  isInserted : string = 'I';
  msgType : string = '';
  message : string = '';


  //------- Google MAP ------
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;


  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;
  public waypoints :any;
  //----------------------
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _commonService : ProtoServicesService, private _router: Router, private el : ElementRef, private renderer: Renderer2) { //,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone
      if (this._avRoute.snapshot.params["id"]) {
        this.routeId = this._avRoute.snapshot.params["id"];
        this.isInserted = 'U';
      }
    }
    commonHelper = new AdminCommonHelperComponent(this._router);
    warningMessage : string  = this.commonHelper.commonWarningMessage;
    deleteTooltip : string  = this.commonHelper.deleteTooltip;
  restoreTooltip : string  = this.commonHelper.restoreTooltip;
  required : string  = this.commonHelper.required;

    ngOnInit():void {
      this.getCommonList();
      if (this.routeId > 0) {
        this.title = "Edit";
        this._commonService.getRouteById(this.routeId)
          .subscribe((resp) =>
          {
            this.routeObj = resp
            , error => this.errorMessage = error
          });
      }else {
        this.routeObj = RouteFun(this.isInserted);
      }
      //this.getDirection();
      // this.ngOnInit2();

    }

    getCommonList(){
       this._commonService.GetLovDetailByColumn("ACTIVEINACTIVE").subscribe(
        (data) =>
         {
            this.StatusList = data;
        }
      )
    }

    validate(){
      if(this.routeObj.Route_From == ''){
        this.errorMessage = "Please Enter Route From";
        this.renderer.selectRootElement('#Route_From').focus();
        return false;
      }else if(this.routeObj.Route_To == ''){
        this.errorMessage = "Please Enter Route To";
        this.renderer.selectRootElement('#Route_To').focus();
        return false;
      }
      else{
        return true;
      }
    }

    saveRoute() {
      if(this.validate()){
        this.routeObj.Created_By = this.userId;
        if (this.title == "Create") {
          this.routeObj.IsInserted = 'I';
          this._commonService.saveRoute(this.routeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Inserted', data, '/master/route-master')

            }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
          this.routeObj.IsInserted = 'U';
          this._commonService.saveRoute(this.routeObj)
            .subscribe((data) => {
              this.commonHelper.commonAlert('Updated', data, '/master/route-master')
            }, error => this.errorMessage = error)
        }
      }

    }

    cancel() {
      this._router.navigate(['/master/route-master']);
    }

    // longitude = 20.728218;
    // latitude = 52.128973;

    // markers = [
    // { latitude: 52.228973, longitude: 20.728218 }
    // ];

    // placeMarker(position: any) {
    // const lat = position.coords.lat;
    // const lng = position.coords.lng;

    // this.markers.push({ latitude: lat, longitude: lng });
    // }

    // ngOnInit2() {
    //   this.mapsAPILoader.load().then(() => {
    //     this.setCurrentLocation();
    //     this.geoCoder = new google.maps.Geocoder;

    //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    //     autocomplete.addListener("place_changed", () => {
    //       this.ngZone.run(() => {
    //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //         if (place.geometry === undefined || place.geometry === null) {
    //           return;
    //         }
    //         this.latitude = place.geometry.location.lat();
    //         this.longitude = place.geometry.location.lng();
    //         this.zoom = 12;
    //       });
    //     });
    //   });
    // }

    // // Get Current Location Coordinates
    // private setCurrentLocation() {
    //   if ('geolocation' in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.latitude = position.coords.latitude;
    //       this.longitude = position.coords.longitude;
    //       this.zoom = 8;
    //       this.getAddress(this.latitude, this.longitude);
    //     });
    //   }
    // }


    // markerDragEnd($event: any) { //google.maps.MouseEvent
    //   console.log($event);
    //   this.latitude = $event.coords.lat;
    //   this.longitude = $event.coords.lng;
    //   this.getAddress(this.latitude, this.longitude);
    // }

    // getAddress(latitude, longitude) {
    //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    //     console.log(results);
    //     console.log(status);
    //     this.zoom = 15;
    //     if (status === 'OK') {
    //       if (results[0]) {

    //         this.address = results[0].formatted_address;
    //       } else {
    //         window.alert('No results found');
    //       }
    //     } else {
    //       window.alert('Geocoder failed due to: ' + status);
    //     }

    //   });
    // }

    // getDirection() {
    //   this.origin = { lat: 23.2156, lng: 72.6369 };
    //   this.destination = { lat: 23.0225, lng: 72.5714 };
    //   this.waypoints = [
    //     {location: { lat: 39.0921167, lng: -94.8559005 }},
    //     {location: { lat: 41.8339037, lng: -87.8720468 }}
    //  ];
    //   // Location within a string
    //   // this.origin = 'Taipei Main Station';
    //   // this.destination = 'Taiwan Presidential Office';
    // }
//---------------------------------
}


function RouteFun(isInserted) {

  let obj ={
    Route_ID :'',
    Route_Name : '',
    Route_From : '',
    Route_To : '',
    RouteDetailCount : '',
    RouteInfo : '',
  Status : 'A',
  Created_By :'',
  Created_Date :'',
  Modified_By :'',
  Modified_Date :'',
  IsDeleted :'',
  IsInserted : isInserted
};
  return obj;
}
