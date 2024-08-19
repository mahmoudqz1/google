import { gapi } from 'gapi-script'

const CLIENT_ID = '633394578244-uukvphmok82hdcjqconesn4jcojhtvh6.apps.googleusercontent.com'
const API_KEY = 'AIzaSyDwTz9loPUCg5zMDUBoKGHdrwqi1ylpVes' // Replace with your actual API key
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

export const initClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          resolve(gapi)
        }
        else {
          gapi.auth2.getAuthInstance().signIn().then(() => {
            resolve(gapi)
          }).catch(error => {
            reject(error)
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  })
}

export const getSheetData = (spreadsheetId, range) => {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  })
}
