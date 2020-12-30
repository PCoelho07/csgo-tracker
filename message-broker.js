const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (error, connection) {
    if (error) {
        throw error
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        channel.assertQueue('test', {
            durable: true
        })

        channel.sendToQueue('test', Buffer.from('Opa, cheguei'))
        console.log('Sent %x', msg)
    })

})