import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFollowingUserComponent } from './show-following-user.component';

describe('ShowFollowingUserComponent', () => {
  let component: ShowFollowingUserComponent;
  let fixture: ComponentFixture<ShowFollowingUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFollowingUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFollowingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
