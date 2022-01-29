// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'write-my-user-story',
    appId: '1:476787930651:web:b38199f49cf0cc55d16abe',
    storageBucket: 'write-my-user-story.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBi93D714EWZs2jePC6CoWE71si-rBxs1c',
    authDomain: 'write-my-user-story.firebaseapp.com',
    messagingSenderId: '476787930651',
    measurementId: 'G-MGK418H85D',
  },
  production: false,
  apiUrl: "http://localhost:5001/write-my-user-story/europe-west2/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
