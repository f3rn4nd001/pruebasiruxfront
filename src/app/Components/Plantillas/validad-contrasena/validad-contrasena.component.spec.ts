import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadContrasenaComponent } from './validad-contrasena.component';

describe('ValidadContrasenaComponent', () => {
  let component: ValidadContrasenaComponent;
  let fixture: ComponentFixture<ValidadContrasenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidadContrasenaComponent]
    });
    fixture = TestBed.createComponent(ValidadContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
