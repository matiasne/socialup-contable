import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Platform } from '@ionic/angular';

import { BusinessService } from 'src/app/features/business/service/business.service';
import { InputAutocompleteComponent } from 'src/app/shared/components/input-autocomplete/input-autocomplete.component';
import { Client } from '../../models/client';

@Component({
  selector: 'app-input-autocomplete-client',
  templateUrl: './input-autocomplete-client.component.html',
  styleUrls: ['./input-autocomplete-client.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteClientComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteClientComponent extends InputAutocompleteComponent {
  @Output() emitClient = new EventEmitter<any[]>();
  public searchWord = '';

  constructor(public plt: Platform, public businessService: BusinessService) {
    super(plt);
  }

  ngOnInit() {
    this.businessService.getBusinessClient(0, 0, this.searchWord).subscribe({
      next: (response) => {
        this.items = response.data;
      },
    });
  }
}
