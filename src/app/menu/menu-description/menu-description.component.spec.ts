import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDescriptionComponent } from './menu-description.component';

describe('MenuDescriptionComponent', () => {
  let component: MenuDescriptionComponent;
  let fixture: ComponentFixture<MenuDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
