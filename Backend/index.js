const fastify = require('fastify')({ logger: true })
fastify.register(require('./Router/router2'))
const start = async () => {
    try {
        await fastify.listen('3000', () => {
            console.log("connected to port successfully")
        })
    }

    catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
