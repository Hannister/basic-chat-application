import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'basic-chat-application-58fbd',
          appId: '1:13566651780:web:6bd9c41c82c89e94ecc1d1',
          storageBucket: 'basic-chat-application-58fbd.appspot.com',
          apiKey: 'AIzaSyBoD_7KKJBE1n4etTtEt-pnx0pWvB7r45A',
          authDomain: 'basic-chat-application-58fbd.firebaseapp.com',
          messagingSenderId: '13566651780',
          measurementId: 'G-K6CYYMP86N',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
