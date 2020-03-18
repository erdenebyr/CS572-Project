import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTweetComponent } from './home-tweet.component';

describe('HomeTweetComponent', () => {
  let component: HomeTweetComponent;
  let fixture: ComponentFixture<HomeTweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
