import { initializeApp } from "firebase/app";

export const environment = {
    production: false,
    firebase : {
      apiKey: "AIzaSyAYT0KHoycSbXjXuiAOuMststABdUW0-y0",
      authDomain: "angular-sistema-cadastro.firebaseapp.com",
      projectId: "angular-sistema-cadastro",
      storageBucket: "angular-sistema-cadastro.appspot.com",
      messagingSenderId: "250257850731",
      appId: "1:250257850731:web:6897d34cf518d26d158c2e",
      measurementId: "G-T6ZQ87R2ZS"
    }
  };



const app = initializeApp(environment.firebase);


