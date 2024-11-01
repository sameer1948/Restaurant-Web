import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxFeeComponent } from './add-tax-fee.component';

describe('AddTaxFeeComponent', () => {
  let component: AddTaxFeeComponent;
  let fixture: ComponentFixture<AddTaxFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaxFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
