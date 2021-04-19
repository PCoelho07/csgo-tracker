const { createDocument, getDoc } = require('./firebase')

const createMatch = async (matchData) => {

    const isMatchExists = await getDoc('matches', matchData.hashCode)

    if (isMatchExists) {
        return
    }

    const match = await createDocument('matches', matchData)

    return match
}

module.exports = {
    createMatch
}