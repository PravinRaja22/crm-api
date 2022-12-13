const fastifyplugin = require('fastify-plugin');
console.log("fastify plugin ");
async function dbconnector(fastify){
    fastify.register(require('@fastify/mongodb'),{
        url:'mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority'
    });

}
module.exports =fastifyplugin(dbconnector);
