const items = require('../item')
const{Accountdata} = require ('../model/AccountInsert.js')
const{Contactdata} = require ('../model/contactInsert.js')
const {Leaddata} = require('../model/LeadInsert')
const{opportunitydata}=require('../model/opportunityInsert')
const{getAccount} = require('../model/getAccount')
const{getContact} = require('../model/getContact')
const {getLead} = require('../model/getLead')
const {getOpportunity} = require('../model/getOpportunity')

function getdatafromreact(fastify,options,done){

fastify.get('/',(request,reply)=>{
    reply.send(items)

})

fastify.post('/api/accountInsert',(request,reply)=>{
    Accountdata(request.body)
    reply.send("successfully inserted Account")
})

fastify.post('/api/contactInsert',(request,reply)=>{
    console.log("contact data "+JSON.stringify(request.body));
    Contactdata(request.body)
    reply.send("succesfully inserted contact ")
})

fastify.post('/api/opportunityInsert',(request,reply)=>{
    console.log("opportuinty data "+JSON.stringify(request.body));
    opportunitydata(request.body)
    reply.send("successfully created opportunity")
})


fastify.post('/api/leadInsert',(request,reply)=>{
    console.log("lead request "+request.body)
    Leaddata(request.body)
    reply.send("successfully created lead")
})

fastify.post('/accounts',async (request,reply)=>{
    let result = await getAccount(); 
    console.log("result "+result);
    reply.send(result)   
})
fastify.post('/contacts',async (request,reply)=>{
    let result = await getContact(); 
    console.log("result "+result);
    reply.send(result)   
})

fastify.post('/lead',async (request,reply)=>{
    let result = await getLead(); 
    console.log("result "+result);
    reply.send(result)   
})

fastify.post('/opportunity',async (request,reply)=>{
    let result = await getOpportunity(); 
    console.log("result "+result);
    reply.send(result)   
})

    done();

}


module.exports = getdatafromreact;