const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.sendPushNotification = functions.firestore
//   .document("some_collection/{some_document}")
//   .onCreate(event => {
//     // gets standard JavaScript object from the new write
//     const writeData = event.data.data();
//     // access data necessary for push notification 
//     const sender = writeData.uid;
//     const senderName = writeData.name;
//     const recipient = writeData.recipient;
//     // the payload is what will be delivered to the device(s)
//     let payload = {
//         data: {
//           custom_notification: JSON.stringify({
//             body: 'Hello Push notification',
//             title: 'got the content'
//           })
//         }
//       };
//       let options = { priority: "high" };
//     // either store the recepient tokens in the document write
//     const tokens = writeData.tokens;  
    
//     // or collect them by accessing your database
//     var pushToken = "";
//     return functions
//       .firestore
//       .collection("user_data_collection/recipient")
//       .get()
//       .then(doc => {
//          pushToken = doc.data().token;
//          // sendToDevice can also accept an array of push tokens
//          return admin.messaging().sendTodevice(pushToken, payload);
//       });
// });
// exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
//     const email = user.email; // The email of the user.
//     const displayName = user.displayName; // The display name of the user.

//     console.log("got email",email)
//     console.log("displayname", displayName)
//   });
exports.pushNotification = functions.database.ref('/messages/{pushId}').onWrite( event => {
    console.log('Push notification event triggered');
    /* Grab the current value of what was written to the Realtime Database */
        var valueObject = event.data.val();
    /* Create a notification and data payload. They contain the notification information, and message to be sent respectively */ 
        const payload = {
            notification: {
                title: 'Newsapp',
                body: "Tank you for registering",
                sound: "default"
            },
            data: {
                title: valueObject.title,
                message: valueObject.message
            }
        };
    /* Create an options object that contains the time to live for the notification and the priority. */
        const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24 //24 hours
        };
    return admin.messaging().sendToTopic("notifications", payload, options);
    });