
const { db } = require('../modules/firebase.config')

const listCollection = async (collectionName) => {
    const results = []
    const snapshop = await db.collection(collectionName).get()

    snapshop.forEach((doc) => results.push(doc.data()))

    console.log(results)

    return results
}

const getDoc = async (collectionName, hashCode) => {
    const docRef = db.collection(collectionName).doc(hashCode)
    const snapshot = await docRef.get()

    if (!snapshot.exists) {
        return null
    }

    return snapshot.data()
}

const getDocByValue = async (collectionName, field, value) => {
    const results = []
    const collection = db.collection(collectionName)
    const snapshot = await collection.where(field, '==', value).get()

    if (snapshot.empty) {
        return results
    }

    snapshot.forEach(doc => results.push(doc.data()))

    return results
}

const createDocument = async (collectionName, documentData) => {
    const { hashCode, headLine, matchTime, matchMeta, matchTeam1, matchTeam2, stars, matchInfoEmpty } = documentData

    const doc = await db.collection(collectionName).doc(hashCode).set({
        stars,
        head_line: headLine,
        match_datime: matchTime,
        match_meta: matchMeta,
        match_team_1: matchTeam1,
        match_team_2: matchTeam2,
        match_info_empty: matchInfoEmpty || ''
    })

    return doc
}


module.exports = {
    listCollection,
    getDocByValue,
    getDoc,
    createDocument
}