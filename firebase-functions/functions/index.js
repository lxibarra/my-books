// follow this
// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js

const cors = require('cors')({origin: true});
const slugify = require('slugify');
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

//success response must include data property otherwise the firebase client complains.
const serverReply = (code, data, response) => {
  response.status(code).json({data});
  response.end();
  return;
};

app.post('/get-public-profile', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  const profileUrl = request.body.data.profileUrl;
  return admin.database().ref('/').orderByChild('profile/profileUrl')
         .equalTo(profileUrl)
         .once('value')
         .then(snapShot => {
           const value = snapShot.val();
           if (value === null) {
             return serverReply(404, { error: 'User not found' }, response);
           }
           const [key, ...rest] = Object.getOwnPropertyNames(value);
           const { books, profile } = value[key];

           return serverReply(200,
             {
               books,
               profile: {
                  publicFullName: profile.publicFullName
               }
             }, response);
         })
         .catch(error => {
           console.log('Error', error);
           return serverReply(500, error, response);
         });
});

app.post('/checkRepeatedProfile', (request, response) => {
  const _profileUrl = request.body.data.profileUrl;
  const { publicFullName } = request.body.data;
  console.log('Public Full name', publicFullName);
  const profileUrl = slugify(_profileUrl, {
    replacement: '-',    // replace spaces with replacement
    remove: null,        // regex to remove characters
    lower: true          // result in lower case
  });
  response.setHeader('Content-Type', 'application/json');
  if (request.user && profileUrl) {
      return admin.database().ref('/').orderByChild('profile/profileUrl')
      .equalTo(profileUrl)
      .once('value')
      .then(snapShot => {
        const value = snapShot.val();
        let isSameUser = (value || {}).hasOwnProperty(request.user.uid);
        const data = { profileUrl, publicFullName };
        if (isSameUser || !value) {
            return admin.database().ref(`${request.user.uid}/profile`).set(data, error => {
              if (error) {
                return serverReply(400, { error }, response);
              }
              return admin.database()
                      .ref(`${request.user.uid}/profile`)
                      .once('value', updatedData => serverReply(200, { updated: true, data: updatedData.val() }, response));
            });
        }
        return serverReply(200, { error:
          {
            msg: 'Profile url is already taken by another user',
            profileUrlTaken:!isSameUser
          }
        }, response);
      }).catch(error => {
        return serverReply(403, { error: error }, response);
      });
    }
    return serverReply(400, { error: 'Invalid request' }, response);
});

exports.app = functions.https.onRequest(app);
