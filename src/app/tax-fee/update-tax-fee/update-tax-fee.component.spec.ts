import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxFeeComponent } from './update-tax-fee.component';

describe('UpdateTaxFeeComponent', () => {
  let component: UpdateTaxFeeComponent;
  let fixture: ComponentFixture<UpdateTaxFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaxFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTaxFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
