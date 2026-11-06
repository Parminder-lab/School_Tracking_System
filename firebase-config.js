// 1) Create a Firebase project and register a Web App.
// 2) Paste the Firebase web app configuration below.
// 3) Enable Email/Password Authentication and Cloud Firestore.
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// School location is used for management distance and ETA.
// Replace with the school's exact latitude and longitude.
export const SCHOOL_LOCATION = { lat: 31.0, lng: 75.0 };
export const SCHOOL_NAME = "Amardeep Public Senior Secondary School";
