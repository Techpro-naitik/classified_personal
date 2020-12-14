import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraionViaOtpComponent } from './registraion-via-otp.component';

describe('RegistraionViaOtpComponent', () => {
  let component: RegistraionViaOtpComponent;
  let fixture: ComponentFixture<RegistraionViaOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraionViaOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraionViaOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
