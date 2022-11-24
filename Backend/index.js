const fastify = require('fastify')({ logger: true })
const fastifyEnv = require('@fastify/env')

fastify.register(require('./Router/router'))
fastify.register(require('@fastify/cors'))

// fastify
//   .register(fastifyEnv)
//   .ready((err) => {
//     if (err) console.error(err)

//     console.log(fastify.config) // or fastify[options.confKey]
//     // output: { PORT: 3000 }
//   })
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
