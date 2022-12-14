const fastify = require('fastify')({ logger: false })
const fileUpload = require('fastify-file-upload')
fastify.register(require('./model/plugin/mongodb'))
fastify.register(require('./Router/router'))
fastify.register(require('@fastify/cors'))
fastify.register(fileUpload, {
    limits: { fileSize: 50 * 1024 * 1024 },
  });
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

