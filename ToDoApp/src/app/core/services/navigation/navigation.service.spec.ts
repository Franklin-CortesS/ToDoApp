import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        NavigationService,
        provideRouter([]) // 🧪 rutas vacías para prueba
      ]
    }).compileComponents();

    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to the given path', async () => {
    service.navigateTo('/test-path');
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/test-path']);
  });
});
