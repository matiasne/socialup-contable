import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  @Input() label = '';
  @Input() items: any = [];
  @Input() keyValue = '';
  @Input() keyLabel = '';

  public inputTextValue = '';
  public filteredItems = [];
  // public keyboard = Keyboard;
  public field = '';
  public selectedItem: any;
  public isListOpen = false;
  public isDesktop = true;

  constructor(public plt: Platform) {
    this.isDesktop = this.plt.is('desktop');
  }

  set value(val: string) {
    this.field = val;
    this.onChange(val);
    this.onTouch(val);
  }

  ngOnInit() {
    this.filteredItems = this.items;
  }

  onChange: any = (data: any) => {};
  onTouch: any = (data: any) => {};

  writeValue(value: any) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: Function) {
    this.filteredItems = [];
    this.onTouch = onTouched;
  }

  search() {
    if (!this.inputTextValue.trim().length) {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.items.filter((item) => {
      if (item[this.keyLabel]) {
        return item[this.keyLabel]
          .toUpperCase()
          .includes(this.inputTextValue.toUpperCase());

        //true o false
      } else {
        return false;
      }
    });
  }

  removeFocus() {
    if (!this.selectedItem) {
      this.inputTextValue = '';
    }
  }
  addFocus() {
    this.search();
  }

  add(item: string) {
    this.value = item[this.keyValue];
    console.log(item[this.keyValue]);
    this.inputTextValue = item[this.keyLabel];
    this.selectedItem = item;
    this.selectedItem = '';
    this.filteredItems = [];
  }

  handleInputClick() {
    console.log(this.isListOpen);
    if (this.isListOpen) {
      if (!this.selectedItem) {
        this.inputTextValue = '';
      }
      this.filteredItems = [];
    } else {
      this.filteredItems = this.items;
    }
    this.isListOpen = !this.isListOpen;
  }

  handleKeypreesed(data: any) {
    console.log(data);
    this.inputTextValue += data.key;
  }
}
