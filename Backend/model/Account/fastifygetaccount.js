const fastify = require('fastify')()

async function getfastifyAccount(){
  fastify.register(require('@fastify/mongodb'),{
    forceClose: true,
    url: "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority"
  })
}
module.exports={getfastifyAccount};

