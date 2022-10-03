import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputAutocompleteClientComponent } from './input-autocomplete-client.component';

describe('InputAutocompleteClientComponent', () => {
  let component: InputAutocompleteClientComponent;
  let fixture: ComponentFixture<InputAutocompleteClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAutocompleteClientComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputAutocompleteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
