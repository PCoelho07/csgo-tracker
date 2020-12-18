const axios = require('axios')
const cheerio = require('cheerio')

const getHTML = async () => {
    const { data } = await axios.get('https://www.hltv.org/matches?predefinedFilter=top_tier')
    return data
}

const scrapData = (htmlData) => {
    const $ = cheerio.load(htmlData)
    const matchesContainerHtmlEl = $('.upcomingMatchesSection')
    const matches = []

    matchesContainerHtmlEl.each((i, element) => {
        let data = {}
        
        const upComingMatch = $(element).find('.upcomingMatch')
        const headLine = $(element).find('.matchDayHeadline').text()

        upComingMatch.each((i, element) => {
            
            const stars = parseInt($(element).attr('stars'))
            const matchTime = $(element).find('.matchTime').text()
            const matchMeta = $(element).find('.matchMeta').text()
            const matchTeam1 = $(element).find('.team1 > .matchTeamName').text()
            const matchTeam2 = $(element).find('.team2 > .matchTeamName').text()

            data = {
                headLine,
                matchTime,
                matchMeta,
                matchTeam1,
                matchTeam2,
                stars
            }

            matches.push(data)
        })

    })

    return matches
}

const main = async () => {
    const htmlData = await getHTML()
    const data = scrapData(htmlData)
    console.log(data)
}

main()