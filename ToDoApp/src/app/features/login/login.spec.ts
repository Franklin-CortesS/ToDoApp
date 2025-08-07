import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { loadUserTokenAction } from '../../state/actions/token.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, Button],
      providers: [
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should validate email input', () => {
    const emailControl = component.inputEmail;

    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();

    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('test@example.com');
    expect(emailControl.valid).toBeTrue();
  });

  it('should dispatch loadUserTokenAction and show spinner on login()', () => {
    const email = 'test@example.com';
    component.inputEmail.setValue(email);

    component.login();

    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      loadUserTokenAction({ userCredentials: { email } })
    );
  });
});
