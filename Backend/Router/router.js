
const items = require('../item')
function getdatafromreact(fastify,options,done){
console.log(items);
fastify.get('/',(request,reply)=>{
reply.send(items)
})

fastify.post('/api/accountInsert',(request,reply)=>{
    console.log("request "+JSON.stringify(request.body))
    reply.send(items)
})

    done();

}


module.exports = getdatafromreact;