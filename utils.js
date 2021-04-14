const crypto = require('crypto')

module.exports = {
    hash: (stringToBeHashed) => {
        return crypto.createHash('md5').update(stringToBeHashed).digest('hex')
    }
}