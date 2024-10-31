import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponViewRemoveComponent } from './coupon-view-remove.component';

describe('CouponViewRemoveComponent', () => {
  let component: CouponViewRemoveComponent;
  let fixture: ComponentFixture<CouponViewRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponViewRemoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponViewRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
