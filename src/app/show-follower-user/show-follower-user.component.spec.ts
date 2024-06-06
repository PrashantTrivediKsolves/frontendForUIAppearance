import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFollowerUserComponent } from './show-follower-user.component';

describe('ShowFollowerUserComponent', () => {
  let component: ShowFollowerUserComponent;
  let fixture: ComponentFixture<ShowFollowerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFollowerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFollowerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
