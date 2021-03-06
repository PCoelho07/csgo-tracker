const { scrapData, sanitizeData } = require('./services/scraper')
const { sendToQueue } = require('./services/queue')
const { listCollection } = require('./services/firebase')


const main = async () => {
    const htmlData = await scrapData()
    const data = sanitizeData(htmlData)

    sendToQueue('matches', data)
}

main()
