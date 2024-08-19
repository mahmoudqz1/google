import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

// Cloud Function to delete a user from Firebase Authentication
export const deleteUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  try {
    await admin.auth().deleteUser(uid);
    return { message: `Successfully deleted user with UID: ${uid}` };
  } catch (error) {
    const errorMessage = (error as Error).message; // Cast error to Error type
    return { error: `Error deleting user: ${errorMessage}` };
  }
});

// Cloud Function to handle Yousign webhook events
export const yousignWebhook = functions.https.onRequest(async (req, res) => {
  const signature = req.headers['x-yousign-signature'];
  if (!signature) {
    res.status(400).send('Missing signature');
    return;
  }

  const event = req.body;

  switch (event.eventName) {
    case 'signature_request.done':
      await admin.firestore().collection('yousign-events').add({
        type: 'Signature Request Completed',
        data: event,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      break;

    case 'signer.done':
      await admin.firestore().collection('yousign-events').add({
        type: 'Signer Completed',
        data: event,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      break;

    case 'electronic_seal.done':
      await admin.firestore().collection('yousign-events').add({
        type: 'Electronic Seal Completed',
        data: event,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      break;

    default:
      console.log(`Unhandled event: ${event.eventName}`);
  }

  res.status(200).send('Webhook received successfully');
});
