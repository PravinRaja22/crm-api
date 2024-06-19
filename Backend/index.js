const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config();
const fastify = require("fastify")({
  logger: false,
  // https: {
  //   key: fs.readFileSync(path.join(__dirname, './certs/private.key.pem')),
  //   cert: fs.readFileSync(path.join(__dirname, './certs/domain.cert.pem'))
  // }
});


fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/cors"));
// fastify.register(require("@fastify/jwt"), {
//   secret: "supersecret",
// });
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
});

const Multer = require("fastify-multer");
fastify.register(Multer.contentParser);
fastify.register(require("./Router/router"));

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log("Connected successfully to Port No: 8080");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
