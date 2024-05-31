import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPostOfEachUserComponent } from './show-all-post-of-each-user.component';

describe('ShowAllPostOfEachUserComponent', () => {
  let component: ShowAllPostOfEachUserComponent;
  let fixture: ComponentFixture<ShowAllPostOfEachUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllPostOfEachUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPostOfEachUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
