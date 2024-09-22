import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMenuComponent } from './remove-menu.component';

describe('RemoveMenuComponent', () => {
  let component: RemoveMenuComponent;
  let fixture: ComponentFixture<RemoveMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
