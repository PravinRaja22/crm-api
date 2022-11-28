const items = require('../item')

const { Accountdata } = require('../model/AccountInsert.js')
const { Contactdata } = require('../model/contactInsert.js')
const { Leaddata } = require('../model/LeadInsert')
const { opportunitydata } = require('../model/opportunityInsert')
const{inventoryMangementdata}=require('../model/inventoryManganagementInsert')

const { getAccount } = require('../model/getAccount')
const { getContact } = require('../model/getContact')
const { getLead } = require('../model/getLead')
const { getOpportunity } = require('../model/getOpportunity')
const{getinventoryMangement}=require('../model/getInventoryMangaement')

const{deleteAccount} = require('../model/DeleteAccount')
const{delteContact}=require('../model/deleteContact')
const{delteLead}=require('../model/deleteLead')
const{delteOpportunity}=require('../model/deleteOpportunity')
const{deleteInventoryMangement}=require('../model/inventoryMangementDelete')

function getdatafromreact(fastify, options, done) {

    fastify.post('/api/accountInsert', (request, reply) => {
        console.log("accountInsert Route called")
        Accountdata(request.body)

        reply.send("successfully inserted Account")
    })

    fastify.post('/api/contactInsert', (request, reply) => {
        console.log("contact data " + JSON.stringify(request.body));
        Contactdata(request.body)
        reply.send("succesfully inserted contact ")
    })

    fastify.post('/api/opportunityInsert', (request, reply) => {
        console.log("opportuinty data " + JSON.stringify(request.body));
        opportunitydata(request.body)
        reply.send("successfully created opportunity")
    })


    fastify.post('/api/leadInsert', (request, reply) => {
        console.log("lead request " + request.body)
        Leaddata(request.body)
        reply.send("successfully created lead")
    })
    fastify.post('/api/inventoryInsert', (request, reply) => {
        console.log("lead request " + request.body)
        inventoryMangementdata(request.body)
        reply.send("successfully created lead")
    })


    fastify.post('/api/accounts',async (request, reply) => {
        let result = await getAccount();
        reply.send(result)
    })
    fastify.post('/api/contacts', async (request, reply) => {
        let result = await getContact();

        reply.send(result)
    })

    fastify.post('/api/leads', async (request, reply) => {
        let result = await getLead();

        reply.send(result)
    })

    fastify.post('/api/opportunities', async (request, reply) => {
        let result = await getOpportunity();
        reply.send(result)
    })
    fastify.post('/api/inventories', async (request, reply) => {
        let result = await getinventoryMangement();
        reply.send(result)
    })

    fastify.post('/api/deleteAccount', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteAccount(request.query.code);
        reply.send("result")
    })
    fastify.post('/api/deleteContact', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteContact(request.query.code);
        reply.send("result")
    })
    fastify.post('/api/deleteOpportunity', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteLead(request.query.code);
        reply.send("result")
    })
    fastify.post('/api/deleteLead', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteOpportunity(request.query.code);
        reply.send("result")
    })
    fastify.post('/api/deleteInventoyMangement', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteInventoryMangement(request.query.code);
        reply.send("result")
    })

    done();

}


module.exports = getdatafromreact;