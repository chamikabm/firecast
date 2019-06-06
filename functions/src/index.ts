import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const serviceAccount = require('./../ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}); // Initialize the admin sdk before it use.

export const getBostonWeather = functions.https.onRequest((request, response) => {
  admin.firestore().doc('cities-weather/boston-ma-us').get()
      .then(snapshot => {
        const data = snapshot.data(); // Javascript object
        response.send(data); // response object knows how to do the conversion from JS object to JSON strings.
      })
      .catch(err => {
        const errorMessage = `Error occurred. Due to : ${err}`;
        console.error(errorMessage);
        response.status(500).send(errorMessage);
     });
});
