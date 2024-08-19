import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp()

// Cloud Function to delete a user from Firebase Authentication
export const deleteUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid
  try {
    await admin.auth().deleteUser(uid)

    return { message: `Successfully deleted user with UID: ${uid}` }
  }
  catch (error) {
    return { error: `Error deleting user: ${error.message}` }
  }
})
