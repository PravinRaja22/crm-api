const items = require('../item')

const { Accountdata } = require('../model/AccountInsert.js')
const { Contactdata } = require('../model/contactInsert.js')
const { Leaddata } = require('../model/LeadInsert')
const { opportunitydata } = require('../model/opportunityInsert')
const{ propertydata }=require('../model/inventoryManganagementInsert')

const { getAccount } = require('../model/getAccount')
const { getContact } = require('../model/getContact')
const { getLead } = require('../model/getLead')
const { getOpportunity } = require('../model/getOpportunity')
const{getProperty}=require('../model/getInventoryManagement')

const{deleteAccount} = require('../model/DeleteAccount')
const{delteContact}=require('../model/deleteContact')
const{delteLead}=require('../model/deleteLead')
const{delteOpportunity}=require('../model/deleteOpportunity')
const{deleteProperty}=require('../model/inventoryMangementDelete')

function getdatafromreact(fastify, options, done) {

    fastify.post('/api/accountInsert', (request, reply) => {
        console.log("accountInsert Route called")
        Accountdata(request.body)

        reply.send("Account inserted successfully")
    })

    fastify.post('/api/contactInsert', (request, reply) => {
        console.log("contact data " + JSON.stringify(request.body));
        Contactdata(request.body)
        reply.send("contact inserted succesfully")
    })

    fastify.post('/api/opportunityInsert', (request, reply) => {
        console.log("opportuinty data " + JSON.stringify(request.body));
        opportunitydata(request.body)
        reply.send("opportunity created successfully")
    })


    fastify.post('/api/leadInsert', (request, reply) => {
        console.log("lead request " + request.body)
        Leaddata(request.body)
        reply.send("Lead created successfully")
    })
    fastify.post('/api/inventoryInsert', (request, reply) => {
        console.log("inventory request " + request.body)
        console.log("Above inverntory management")
        propertydata( request.body)
        reply.send("Inventory created successfully")
    })


    fastify.post('/api/accounts',async (request, reply) => {
        console.log("test inside show accounts")
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
        console.log("inventory management datas test")
        let result = await getProperty();
        reply.send(result)
    })

    fastify.post('/api/deleteAccount', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteAccount(request.query.code);
        reply.send("Account Deleted Successfully")
    })
    fastify.post('/api/deleteContact', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteContact(request.query.code);
        reply.send("Contact Deleted Successfully")
    })
    fastify.post('/api/deleteOpportunity', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteLead(request.query.code);
        reply.send("Opportunity deleted successfully")
    })
    fastify.post('/api/deleteLead', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await delteOpportunity(request.query.code);
        reply.send("Lead Deleted Successfully")
    })
    fastify.post('/api/deleteInventory', async (request, reply) => {
        console.log("indie delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteProperty(request.query.code);
        reply.send("Property Deleted Successfully")
    })

    done();

}
module.exports = getdatafromreact;