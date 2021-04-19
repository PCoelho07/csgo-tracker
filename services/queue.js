const amqpLib = require('amqplib')

const connect = () => {
    return amqpLib.connect("amqp://localhost")
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

const consumeFromQueue = (queue, onConsume) => {
    connect()
        .then(channel => channel.consume(queue, function(msg) {
            onConsume(JSON.parse(msg.content.toString()))
        }, {
            noAck: true
        }))
}

module.exports = {
    sendToQueue,
    consumeFromQueue
}