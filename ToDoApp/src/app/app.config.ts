import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { ROOT_REDUCER } from './state/root.state';
import { rootEffects } from './state/root.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { metaReducers } from './state/reducers/meta.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    provideStore(ROOT_REDUCER, {metaReducers}),
    provideEffects(rootEffects),
    provideHttpClient(withInterceptors([authInterceptor]))
]
};
