import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderListComponent } from './home-slider-list.component';

describe('HomeSliderListComponent', () => {
  let component: HomeSliderListComponent;
  let fixture: ComponentFixture<HomeSliderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSliderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSliderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
