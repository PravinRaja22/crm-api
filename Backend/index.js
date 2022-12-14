const fastify = require('fastify')({ logger: false })
fastify.register(require('./model/plugin/mongodb'))
fastify.after(error => error ? console.log(error):"plugin loaded successfully");
fastify.ready(error => error ? console.log(error):"All plugin loaded successfully");
fastify.register(require('./Router/router'))
fastify.register(require('@fastify/cors'))
const start = async () => {
    try {
        await fastify.listen({port : 4000}, () => {
            console.log("connected to port successfully")
        })
    }

    catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();

