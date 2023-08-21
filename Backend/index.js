const fastify = require('fastify')({ logger: false })
const path = require('path')
// const passport = require('./passportjs/passport');
const fastifySession = require('@fastify/session');
const dotenv = require("dotenv").config();
fastify.register(require('@fastify/cookie'))
fastify.register(require('@fastify/cors'))
// fastify.register(require('@fastify/formbody'))
// fastify.register(require('fastify-raw-body'), {
//   field: 'body', // Optional: 'body' is the default field name for accessing raw body
//   global: true, // Optional: Set to true to parse the body for all requests, false to parse only for this route
// });
// fastify.decorate('passport', passport.initialize());
// fastify.decorate('passportSession', passport.session());
// fastify.register(fastifySession, { secret: 'testingdatabasesectionalpravinrajanewssoseetings' });
fastify.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  //   prefix: 'uploads'
})
const Multer = require('fastify-multer');
console.log(path.join(__dirname, 'uploads'));
// fastify.register(require('./model/plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
fastify.register(Multer.contentParser);
fastify.register(require('./Router/router'))

const start = async () => {
  try {
    await fastify.listen({ port: 8080 }, () => {
      console.log(`connected successfully to Port No :8080`)
    })
  }
  catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}
start();