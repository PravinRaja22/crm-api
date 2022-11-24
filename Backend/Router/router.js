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
    reply.send("successfully inserted account")
})

fastify.post('/api/contactInsert',(request,reply)=>{
    console.log("contact data "+JSON.stringify(request.body));
    Contactdata(request.body)
    reply.send("succesfully inserted contact ")
})

fastify.post('/api/opportunityInsert',(request,reply)=>{
    console.log("opportuinty data "+JSON.stringify(request.body));
    opportunitydata(request.body)
    reply.send("successfully created opportunit")
})


fastify.post('/api/leadInsert',(request,reply)=>{
    console.log("lead request "+request.body)
    Leaddata(request.body)
    reply.send("successfully created lead")
})

    done();

}


module.exports = getdatafromreact;