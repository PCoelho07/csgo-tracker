
const connect = () => {
    return require('amqplib').connect("amqp://locahost")
        .then(conn => conn.createChannel())
}

const createQueue = (channel, queue) => {
    return new Promise((resolve, reject) => {
        try {
            channel.assertQueue(queue, { durable: true })
            resolve(channel)
        } catch (error) {
            reject(error)
        }
    })
}

const sendToQueue = (queue, message) => {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.sendToQueue(queue, Buffer.from(JSON.stringify(message))))
        .catch(err => console.log(err))
}

module.exports = {
    sendToQueue
}