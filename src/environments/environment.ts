// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  
  production: false,
  
};

export const firebase = {
  apiKey: "AIzaSyAYT0KHoycSbXjXuiAOuMststABdUW0-y0",
  authDomain: "angular-sistema-cadastro.firebaseapp.com",
  projectId: "angular-sistema-cadastro",
  storageBucket: "angular-sistema-cadastro.appspot.com",
  messagingSenderId: "250257850731",
  appId: "1:250257850731:web:6897d34cf518d26d158c2e",
  measurementId: "G-T6ZQ87R2ZS"
};

const app = initializeApp(firebase);


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
