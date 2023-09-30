import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import { ClientService } from 'src/app/features/clients/services/client.service';

declare var google;
@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputAddressComponent,
      multi: true
    }]
})
export class InputAddressComponent implements ControlValueAccessor {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput') inputNativeElement: any;

  // directionForm: FormGroup;

  onChange: any = () => {}
  onTouch: any = () => {}
  field= "";

  set value(val: string){

    this.field = val
    this.onChange(val)
    this.onTouch(val)
  }

  constructor(private fb: FormBuilder,
      public clientService:ClientService
    ) {
    this.createDirectionForm();
  }

  writeValue(value: any){
    this.value = value
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any){
    this.onChange = fn
  }

  // When the element is touched, this method will get called
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit() {
  }

  createDirectionForm() {

  }

  ngAfterViewInit(): void {
    /*const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });*/
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    /*const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });*/
    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
     // marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: ' + place.name );
        return;
      }
     /* if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);*/
      let address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || ''),
          (place.address_components[3] && place.address_components[2].short_name || ''),
          (place.address_components[4] && place.address_components[2].short_name || '')
        ].join(' ');
      }


      this.value = address;


      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      //infowindow.open(map, marker);
    });

  }

}
