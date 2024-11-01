import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwRemoveTaxFeeComponent } from './veiw-remove-tax-fee.component';

describe('VeiwRemoveTaxFeeComponent', () => {
  let component: VeiwRemoveTaxFeeComponent;
  let fixture: ComponentFixture<VeiwRemoveTaxFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiwRemoveTaxFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwRemoveTaxFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
