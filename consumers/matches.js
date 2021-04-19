
const { createMatch } = require('../services/matches')
const { consumeFromQueue } = require('../services/queue')

const matchesConsumer = (payload) => {
    const now = new Date()
    console.log(`Receiving matches - `, now)

    if (payload.length <= 0) {
        return
    }

    try {
        payload.forEach(item => createMatch(item))
        console.log(`Matches data was processed with success!`)
    } catch (error) {
        console.log(`An error occurred: ${error}`)
    }
}

consumeFromQueue('matches', matchesConsumer)