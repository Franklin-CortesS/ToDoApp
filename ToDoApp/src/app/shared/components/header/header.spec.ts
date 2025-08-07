import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { revokeUserTokenAction } from '../../../state/actions/token.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner and dispatch revokeUserTokenAction on logout', () => {
    component.logout();

    expect(spinnerSpy.show).toHaveBeenCalled();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(revokeUserTokenAction());
  });
});
