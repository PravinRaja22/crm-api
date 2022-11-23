
const items = require('../item')
function getdatafromreact(fastify,options,done){
console.log(items);
fastify.get('/',(request,reply)=>{
reply.send(items)
})

fastify.post('/',(request,reply)=>{
    reply.send("inside post method")
})

    done();

}


module.exports = getdatafromreact;