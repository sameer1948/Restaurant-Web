import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCancelOrderComponent } from './view-cancel-order.component';

describe('ViewCancelOrderComponent', () => {
  let component: ViewCancelOrderComponent;
  let fixture: ComponentFixture<ViewCancelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCancelOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
