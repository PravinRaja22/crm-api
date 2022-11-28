const items = require('../item')

const { Accountdata } = require('../model/Account/AccountInsert.js')
const { Contactdata } = require('../model/Contact/contactInsert.js')
const { Leaddata } = require('../model/Lead/LeadInsert')
const { opportunitydata } = require('../model/Opportunity/opportunityInsert')
const{ propertydata }=require('../model/Inventory Management/inventoryManganagementInsert')
const {Userdata} = require('../model/User/userInsert')


const { getAccount } = require('../model/Account/getAccount')
const { getContact } = require('../model/Contact/getContact')
const { getLead } = require('../model/Lead/getLead')
const { getOpportunity } = require('../model/Opportunity/getOpportunity')
const{getProperty}=require('../model/Inventory Management/getInventoryManagement')
const{getUser}=require('../model/User/getUser')

const{deleteAccount} = require('../model/Account/deleteAccount')
const{deleteContact}=require('../model/Contact/deleteContact')
const{deleteLead}=require('../model/Lead/deleteLead')
const{deleteOpportunity}=require('../model/Opportunity/deleteOpportunity')
const{deleteProperty}=require('../model/Inventory Management/inventoryMangementDelete')
const{deleteUser}=require('../model/User/delelteUser')

const{updateAccount} = require('../model/Account/updateAccount')
const{updateContact}=require('../model/Contact/updateContact')
const{updateLead}=require('../model/Lead/updateLead')
const{updateOpportunity}=require('../model/Opportunity/updateOpportunity')
const{updateProperty}=require('../model/Inventory Management/updateinventoryMangement')
const{updateUser}=require('../model/User/updateUser')

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

    fastify.post('/api/userInsert', (request, reply) => {
        console.log("user request " + request.body)
        console.log("Above user ")
        Userdata( request.body)
        reply.send("User created successfully")
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


    fastify.post('/api/Users', async (request, reply) => {
        console.log("inventory management datas test")
        let result = await getUser();
        reply.send(result)
    })


    fastify.post('/api/deleteAccount', async (request, reply) => {
        console.log("inside Account delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteAccount(request.query.code);
        reply.send("Account Deleted Successfully")
    })
    fastify.post('/api/deleteContact', async (request, reply) => {
        console.log("inside Contact delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteContact(request.query.code);
        reply.send("Contact Deleted Successfully")
    })
    fastify.post('/api/deleteOpportunity', async (request, reply) => {
        console.log("inside opportunity delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteOpportunity(request.query.code);
        reply.send("Opportunity deleted successfully")
    })
    fastify.post('/api/deleteLead', async (request, reply) => {
        console.log("inside lead delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteLead(request.query.code);
        reply.send("Lead Deleted Successfully")
    })
    fastify.post('/api/deleteInventory', async (request, reply) => {
        console.log("indie inventory delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteProperty(request.query.code);
        reply.send("Property Deleted Successfully")
    })

    fastify.post('/api/delete', async (request, reply) => {
        console.log("indie user delete");
        console.log("Query "+JSON.stringify(request.query.code))
        let result = await deleteUser(request.query.code);
        reply.send("User Deleted Successfully")
    })


    fastify.post('/api/editAccount', async (request, reply) => {
        console.log("inside updae Account");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateAccount(request.body);
        reply.send("Account Updated Successfully")
    })

    fastify.post('/api/editContact', async (request, reply) => {
        console.log("inside updae Contact");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateContact(request.body);
        reply.send("Contact Updated Successfully")
    })


    fastify.post('/api/editLead', async (request, reply) => {
        console.log("inside updae Account");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateLead(request.body);
        reply.send("Lead Updated Successfully")
    })

    fastify.post('/api/editOpportunity', async (request, reply) => {
        console.log("inside update Opportuntiy");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateOpportunity(request.body);
        reply.send("Opportunity Updated Successfully")
    })


    fastify.post('/api/editInventory', async (request, reply) => {
        console.log("inside update Inventory");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateProperty(request.body);
        reply.send("Inventory Updated Successfully")
    })

    fastify.post('/api/editUser', async (request, reply) => {
        console.log("inside update user");
        console.log("Query "+JSON.stringify(request.body))
        let result = await updateUser(request.body);
        reply.send("user Updated Successfully")
    })

    done();

}
module.exports = getdatafromreact;