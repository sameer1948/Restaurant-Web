import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwRemoveMemberComponent } from './veiw-remove-member.component';

describe('VeiwRemoveMemberComponent', () => {
  let component: VeiwRemoveMemberComponent;
  let fixture: ComponentFixture<VeiwRemoveMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiwRemoveMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwRemoveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
