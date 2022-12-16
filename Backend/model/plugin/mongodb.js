const fastify = require('fastify')({ logger: false })
const fastifyplugin = require('fastify-plugin');
fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
console.log("fastify plugin ");
async function dbconnector(fastify, options, done){
      fastify.register(require('@fastify/mongodb'),{
        forceClose: true,
        url:'mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority'
    });
    done();

}
module.exports =fastifyplugin(dbconnector);
