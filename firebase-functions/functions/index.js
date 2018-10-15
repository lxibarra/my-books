// follow this
// https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js


// I left here the function is working just need to clean it up and also
// save the profile if everything looks good

const cors = require('cors')({origin: true});
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
admin.initializeApp();
const app = express();

const validateFireBaseIdToken = (req, res, next) => {
  console.log('Cookies', req.cookies);
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
        res.status(403).json({ error: 'Unauthorized'});
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }
  admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return next();
  }).catch((error) => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });

};


app.use(cors);
app.use(cookieParser);
app.use(validateFireBaseIdToken)
app.post('/checkRepeatedProfile', (request, response) => {
  console.log('Went over to database update');
  const fn = { fn: 'cors-user-info(Working!)' };

  const profileUrl = request.body.data.data.profileUrl;
  console.log('Body', request.body);
  response.setHeader('Content-Type', 'application/json');
  console.log('profileUrl', profileUrl);
  if (request.user && profileUrl) {
      admin.database().ref('/').orderByChild('profile/profileUrl')
      .equalTo(profileUrl)
      .once('value')
      .then(snapShot => {
        const value = snapShot.val();
        console.log('Cheked db', value);
        if (value) {

          // send response back
          return response.status(200).send(JSON.stringify({ data: { validRequest:true, profileUrl: profileUrl, exists: true, fn: fn.fn }}));
        }
        // write to db and send response back to server
        return response.status(200).send(JSON.stringify({ data: { validRequest:true, profileUrl: profileUrl, exists: false, fn: fn.fn }}));

      }).catch(error => {
        return response.status(403).send(JSON.stringify({ error: error, fn: fn.fn }));
      });
    } else {
      return response.status(400).send(JSON.stringify({ error:'Invalid request', fn: fn.fn }));
    }
    // return response.send(JSON.stringify({validRequest: true, fn: fn.fn}));

});

exports.app = functions.https.onRequest(app);
// this function should update the db if everything passes.
// because we have to check the entire db for repeated and data can be sensitive.
/*
exports.checkRepeatedProfile = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
      const fn = { fn: 'cors-user-info(Validation cookie!)' };
      const profileUrl = request.body.profileUrl;

      let idToken = null;
      console.log('Cookies', request.cookies);
      if(request.cookies) {
        idToken = request.cookies.__session;
      }
      console.log('idToken', idToken);
      admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        console.log('ID Token correctly decoded', decodedIdToken);
        if (profileUrl) {
          admin.database().ref('/').orderByChild('profile/profileUrl')
          .equalTo(profileUrl)
          .once('value')
          .then(snapShot => {
            const value = snapShot.val();
            if (value) {
              // send response back
              return response.json({ validRequest:true, profileUrl: profileUrl, exists: true, fn: fn.fn });
            }
            // write to db and send response back to server
            return response.json({ validRequest:true, profileUrl: profileUrl, exists: false, fn: fn.fn });

          }).catch(error => {
            return response.json(error);
          });
        } else {
          return response.json({ validRequest:false, fn: fn.fn });
        }
        return response.json({validRequest: true, fn: fn.fn});
      })
      .catch(error => {
          console.error('Error while verifying Firebase ID token:', error);
          response.status(403).send('Unauthorized');
      });
  });
});
*/
