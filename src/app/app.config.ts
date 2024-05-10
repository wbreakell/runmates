import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: "runmates-529cd",
          appId: "1:730012581671:web:7b0978e85b2195d0e5b302",
          storageBucket: "runmates-529cd.appspot.com",
          apiKey: "AIzaSyDEfK9SOm0y8RfULU8axlRtxqlcXiNE6VM",
          authDomain: "runmates-529cd.firebaseapp.com",
          messagingSenderId: "730012581671",
          measurementId: "G-PRYEN8YJJR",
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
