const fastify = require('fastify')({ logger: false })
fastify.register(require('./Router/router'))
fastify.register(require('@fastify/cors'))

const start = async () => {
    try {
        await fastify.listen('4000', () => {
            console.log("connected to port successfully")
        })
    }

    catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
