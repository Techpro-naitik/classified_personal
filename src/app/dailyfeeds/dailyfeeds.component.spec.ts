import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyfeedsComponent } from './dailyfeeds.component';

describe('DailyfeedsComponent', () => {
  let component: DailyfeedsComponent;
  let fixture: ComponentFixture<DailyfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyfeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
