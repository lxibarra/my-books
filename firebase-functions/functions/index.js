// follow this
// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js

const cors = require('cors')({origin: true});
const functions = require('firebase-functions');
const validateFireBaseIdToken = require('./authentication-helper');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
admin.initializeApp();
const app = express();

app.use(cors);
app.use(cookieParser);
app.use(validateFireBaseIdToken(admin));
app.post('/checkRepeatedProfile', (request, response) => {

  const fn = { fn: 'cors-user-info(response.end!)' };
  console.log('request.body.data', request.body.data);
  const profileUrl = request.body.data.profileUrl;

  response.setHeader('Content-Type', 'application/json');
  console.log('profileUrl', profileUrl);
  if (request.user && profileUrl) {
      admin.database().ref('/').orderByChild('profile/profileUrl')
      .equalTo(profileUrl)
      .once('value')
      .then(snapShot => {
        const value = snapShot.val();
        console.log('Cheked db', value);
        let isSameUser = false;
        for (key in value) {
          if (request.user.uid === key) {
            isSameUser = true;
          }
        }

        if (isSameUser) {
          // change the profile here that means write into firebase
          // send response back
          response.status(200).send(JSON.stringify({ data: { validRequest:true, profileUrl: profileUrl, exists: false, fn: fn.fn }}));
          response.end();
          return;
        } else {
        // write to db and send response back to server
         response.status(200).send(JSON.stringify({ data: { validRequest:true, profileUrl: profileUrl, exists: true, fn: fn.fn }}));
         response.end();
         return;
       }

      }).catch(error => {
         response.status(403).send(JSON.stringify({ error: error, fn: fn.fn }));
         response.end();
         return;
      });
    } else {
      response.status(400).send(JSON.stringify({ error:'Invalid request', fn: fn.fn }));
      response.end();
      return;
    }
    // return response.send(JSON.stringify({validRequest: true, fn: fn.fn}));

});

exports.app = functions.https.onRequest(app);
