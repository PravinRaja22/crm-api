const items = require('../item')
const{Accountdata} = require ('../model/AccountInsert.js')
const{Contactdata} = require ('../model/contactInsert.js')
const {Leaddata} = require('../model/LeadInsert')
const{opportunitydata}=require('../model/opportunityInsert')
function getdatafromreact(fastify,options,done){

fastify.get('/',(request,reply)=>{
    reply.send(items)

})

fastify.post('/api/accountInsert',(request,reply)=>{
    Accountdata(request.body)
    reply.send(items)
})

fastify.post('/api/contactInsert',(request,reply)=>{
    Contactdata(request.body)
    reply.send(items)
})

fastify.post('/api/opportunityInsert',(request,reply)=>{
    opportunitydata(request.body)
    reply.send(items)
})


fastify.post('/api/leadInsert',(request,reply)=>{
    Leaddata(request.body)
    reply.send(items)
})

    done();

}


module.exports = getdatafromreact;