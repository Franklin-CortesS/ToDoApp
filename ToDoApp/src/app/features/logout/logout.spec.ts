import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logout } from './logout';
import { AlertsService } from '../../core/services/alerts/alerts.service';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;
  let alertsSpy: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {
    alertsSpy = jasmine.createSpyObj('AlertsService', ['showConfirmAndNavigate']);

    await TestBed.configureTestingModule({
      imports: [Logout],
      providers: [
        { provide: AlertsService, useValue: alertsSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call alertsService.showConfirmAndNavigate on ngOnInit', () => {
    fixture.detectChanges(); // Esto dispara ngOnInit

    expect(alertsSpy.showConfirmAndNavigate).toHaveBeenCalledOnceWith(
      'info',
      'Logged Out',
      'You have been logged out successfully.',
      '/login'
    );
  });
});
