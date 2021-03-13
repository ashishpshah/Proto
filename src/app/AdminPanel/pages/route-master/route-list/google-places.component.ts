import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, ElementRef, Attribute } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { } from '@types/googlemaps';

@Component({
    selector: 'google-places-autocomplete',
    template: `
      <input class="form-control {{ErrorClass}}"
        type="text" id="{{ ID }}"
        [(ngModel)]="autocompleteInput"
        #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
        >
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
   @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: ElementRef;

    autocompleteInput: string;
    ID: string;
    ErrorClass: string;
    queryWait: boolean;

    // constructor(@Attribute('attrId') public attrId: string, @Attribute('attrErrorClass') public attrErrorClass: string) {
    constructor(@Attribute('attrId') public attrId: string) {
        debugger;
      this.ID = this.attrId;
      //this.ErrorClass = this.attrErrorClass;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
      debugger;
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'IN' },
                types: [this.adressType],  // 'establishment' / 'address' / 'geocode',
                fields: ["place_id", "formatted_address", "address_components", "geometry", "name"],
            });

            const geocoder = new google.maps.Geocoder();

            // autocomplete.setFields(["place_id","address_components", "geometry", "name"]);

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            debugger;
            const place = autocomplete.getPlace();

            geocoder.geocode({ placeId: place.place_id }, (results, status) => {
              console.log(results[0].formatted_address)
              console.log(results[0].geometry.location.lat());
              console.log(results[0].geometry.location.lng());
            });

            // if(place['formatted_address'] == ''){
            //   this.ErrorClass = 'alert-danger';
            // }

            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
      debugger;
        this.setAddress.emit(place);
    }

}
