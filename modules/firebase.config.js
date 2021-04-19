
const firebase = require('firebase-admin')

const serviceAccount = require('../config/firebase-credentials.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})


const db = firebase.firestore()

module.exports = {
    db
}