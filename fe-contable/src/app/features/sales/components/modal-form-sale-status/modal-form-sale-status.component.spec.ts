import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFormSaleStatusComponent } from './modal-form-sale-status.component';

describe('ModalFormSaleStatusComponent', () => {
  let component: ModalFormSaleStatusComponent;
  let fixture: ComponentFixture<ModalFormSaleStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormSaleStatusComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFormSaleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
