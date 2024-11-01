import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFeeComponent } from './tax-fee.component';

describe('TaxFeeComponent', () => {
  let component: TaxFeeComponent;
  let fixture: ComponentFixture<TaxFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
