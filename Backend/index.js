const fastify = require('fastify')({ logger: false })
const path = require('path')
const dotenv = require("dotenv").config();
fastify.register(require('@fastify/cookie'))
fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
  })// const fastifyjwt=  require('@fastify/jwt')
//  const fileUpload = require('fastify-file-upload')
// fastify.register(fileUpload, {
//     limits: { fileSize: 50 * 1024 * 1024 },
// });
//fastify.register(fileUpload)
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'uploads'),
   // prefix: 'uploads'
  })
//   fastify.register(fileUpload, {
//     limits: { fileSize: 50 * 1024 * 1024 },
//   });
 // const dbconnect = require('./Database/mongodb')
//fastify.register(dbconnect)
const Multer = require ('fastify-multer')
console.log(path.join(__dirname, 'uploads'));
// fastify.register(require('./model/plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
fastify.register(Multer.contentParser);
fastify.register(require('./Router/router'))
fastify.register(require('@fastify/cors'))

const start = async () => {
    try {
        await fastify.listen({ port:8080}, () => {
            console.log(`connected successfully to Port No :8080`)
        })
    }
    catch (error)
        {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
