import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RPassordComponent } from './rpassord.component';

describe('RPassordComponent', () => {
  let component: RPassordComponent;
  let fixture: ComponentFixture<RPassordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPassordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RPassordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
