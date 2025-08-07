import { TestBed } from '@angular/core/testing';
import { AlertsService } from './alerts.service';
import { NavigationService } from '../navigation/navigation.service';
import Swal from 'sweetalert2';

describe('AlertsService', () => {
  let service: AlertsService;
  let navigationServiceMock: jasmine.SpyObj<NavigationService>;

  // Creamos un mock de Swal para simular el comportamiento de las alertas
  let swalFireSpy: jasmine.Spy;

  beforeEach(() => {
    // Creamos un mock para NavigationService
    navigationServiceMock = jasmine.createSpyObj('NavigationService', ['navigateTo']);

    // Creamos un mock para Swal.fire
    swalFireSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false }));

    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        { provide: NavigationService, useValue: navigationServiceMock }
      ]
    });
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Swal.fire with correct parameters in showBasicIconAlert', () => {
    const icon = 'warning';
    const title = 'Warning';
    const message = 'This is a warning alert';

    service.showBasicIconAlert(icon, title, message);

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#ea580c'
    });
  });

  it('should call NavigationService.navigateTo when user confirms the alert in showConfirmAndNavigate', async () => {
    const icon = 'info';
    const title = 'Info';
    const message = 'Do you want to go to login?';
    const path = '/login';

    await service.showConfirmAndNavigate(icon, title, message, path);

    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#ea580c'
    });

    expect(navigationServiceMock.navigateTo).toHaveBeenCalledWith(path);
  });

  it('should not call NavigationService.navigateTo if user cancels the alert in showConfirmAndNavigate', async () => {
    swalFireSpy.and.returnValue(Promise.resolve({ isConfirmed: false, isDenied: false, isDismissed: false }));

    const icon = 'info';
    const title = 'Info';
    const message = 'Do you want to go to login?';
    const path = '/login';

    await service.showConfirmAndNavigate(icon, title, message, path);

    expect(navigationServiceMock.navigateTo).not.toHaveBeenCalled();
  });
});
