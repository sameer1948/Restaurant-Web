import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponHomeComponent } from './coupon-home.component';

describe('CouponHomeComponent', () => {
  let component: CouponHomeComponent;
  let fixture: ComponentFixture<CouponHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
