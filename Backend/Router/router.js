const { upsertAccount } = require('../model/Account/upsertAccount')
const { upsertContact } = require('../model/Contact/upsertContact')
const { upsertLead } = require('../model/Lead/upsertLead')
const { upsertOpportunity } =require('../model/Opportunity/upsertOpportunity')
const { upsertUser } =require('../model/User/upsertUser')
const{upsertProperty} =require('../model/Inventory Management/upsertInventorymanagement')
const { getAccountName } = require('../model/Account/accountname')
const {getFiveAccountName} = require('../model/Account/getFiveAccountName')
const { getAccount } = require('../model/Account/getAccount')
const { getContact } = require('../model/Contact/getContact')
const { getLead } = require('../model/Lead/getLead')
const { getOpportunity } = require('../model/Opportunity/getOpportunity')
const { getProperty } = require('../model/Inventory Management/getInventoryManagement')
const { getUser } = require('../model/User/getUser')
const { deleteAccount } = require('../model/Account/deleteAccount')
const { deleteContact } = require('../model/Contact/deleteContact')
const { deleteLead } = require('../model/Lead/deleteLead')
const { deleteOpportunity } = require('../model/Opportunity/deleteOpportunity')
const { deleteProperty } = require('../model/Inventory Management/inventoryMangementDelete')
const { deleteUser } = require('../model/User/delelteUser')
const { Accouninsertschema } = require('../model/schema/accountSchema')
const { result } = require('lodash')

function getdatafromreact(fastify, options, done) {

    fastify.post('/api/UpsertAccount', /*Accouninsertschema,*/ async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert account try ");
            let result = await upsertAccount(request.body)
            if (result) {
                reply.send(result)
            }

            else {
                reply.status(404).send("No Data Inserted or updated")
            }


        }
        catch (e) {
            console.log("inside Account Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })



    fastify.post('/api/UpsertContact',async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert contact try ");
            let result = await upsertContact(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }

            else {
                reply.status(404).send("No Data Inserted or updated")
            }


        }
        catch (e) {
            console.log("inside Contact Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })

    fastify.post('/api/UpsertInventory', async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert Inventory try ");
            let result = await upsertProperty(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)            }

            else {
                reply.status(404).send("No Data Inserted or updated")
            }


        }
        catch (e) {
            console.log("inside Inventory Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })



    fastify.post('/api/UpsertLead',async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert Lead try ");
            let result = await upsertLead(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)            }

            else {
                reply.status(404).send("No Data Inserted or updated")
            }


        }
        catch (e) {
            console.log("inside Lead Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })

    fastify.post('/api/UpsertOpportunity',async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert Lead try ");
            let result = await upsertOpportunity(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)            }

            else {
                reply.status(404).send("No Data Inserted or updated")
            }


        }
        catch (e) {
            console.log("inside Opportunity  Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })

    fastify.post('/api/UpsertUser',async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code "+reply.statuscode);
        try {
            console.log("upsert Lead try ");
            let result = await upsertUser(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside Opportunity  Catch block ",e.message);
            reply.send("Error "+e.message)
        }
    })



    fastify.post('/api/accounts', async (request, reply) => {
        console.log("test inside show accounts")
        try {
            let result = await getAccount();
            if(result){
            reply.send(result)
            }
            else{
                reply.status(404).send("No Records found")
            }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/accountsRecentName', async (request, reply) => {
      

   try {
            let result = await getFiveAccountName();
            if(result){
                reply.send(result)
            }
            else{
                reply.send("No Records found")
            }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }
    
})



    fastify.post('/api/accountsname', async (request, reply) => {
        console.log(" inside show accountsname look up "+JSON.stringify(request.query.searchKey))

    if(request.query.searchKey)
    {
        try {
            let result = await getAccountName(request.query.searchKey);
            if(result){
                reply.send(result)
            }
            else{
                reply.send("No Records found")
            }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }
    }
})

    fastify.post('/api/contacts', async (request, reply) => {
        try {
            let result = await getContact();
            if(result){
            reply.send(result)
        }
        else{
            reply.status(404).send("No Records found")
        }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })

    fastify.post('/api/leads', async (request, reply) => {
        try {
            let result = await getLead();
            if(result){
              
                reply.send(result)
            }
            else{
                reply.status(404).send("No Records found")
            }
           
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })

    fastify.post('/api/opportunities', async (request, reply) => {
        try {
            let result = await getOpportunity();
            if(result){
               
                reply.send(result)
            }
            else {
                reply.status(404).send("No Records found")
            }
           
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/inventories', async (request, reply) => {
        console.log("inventory management datas test")
        try {
            let result = await getProperty();
            if(result){
               
                reply.send(result)
            }
            else{
                reply.status(404).send("No Records found")
            }
            
        }
        catch (e) {
            reply.send("Error "+e.message)
        }
    })



    fastify.post('/api/Users', async (request, reply) => {
        console.log("inventory management datas test")
        try {
            let result = await getUser();
            if(result){
              
                reply.send(result)
                
            }
            else{
                reply.status(404).send("No Records found")
            }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })


    fastify.post('/api/deleteAccount', async (request, reply) => {
        console.log("inside Account delete");
        try {
            let result = await deleteAccount(request.query.code);
            if (result) {
               
                reply.send("Account Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/deleteContact', async (request, reply) => {
        console.log("inside Contact delete");
        console.log("Query " + JSON.stringify(request.query.code))
        try {
            let result = await deleteContact(request.query.code);
            if(result){
              
                reply.send("Contact Deleted Successfully")
            }
            else{
                reply.status(404).send("No data deleted")
            }
           
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/deleteOpportunity', async (request, reply) => {
        console.log("inside opportunity delete");
        try {
            let result = await deleteOpportunity(request.query.code);
            if(result){
              
                reply.send("Opportunity deleted successfully")
            }
            else{
                reply.status(404).send("No data deleted")            }
         
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/deleteLead', async (request, reply) => {
        console.log("inside lead delete");
        try {
            let result = await deleteLead(request.query.code);
            if(result){
              
                reply.send("Lead Deleted Successfully")
            }
            else{

                reply.status(404).send("No data deleted")   
            }
           
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })
    fastify.post('/api/deleteInventory', async (request, reply) => {
        console.log("inside inventory delete");
        try {
            let result = await deleteProperty(request.query.code);
            if(result){
                
                reply.send("Property Deleted Successfully")
            }
            else{
                reply.status(404).send("No data deleted")   
            }
          
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })

    fastify.post('/api/delete', async (request, reply) => {
        console.log("inside user delete");
        try {
            let result = await deleteUser(request.query.code);
            if(result){
                reply.send("User Deleted Successfully")
            }
            else{
                reply.status(404).send("No data deleted")   
            }
          
        }
        catch (e) {
            reply.send("Error "+e.message)
        }

    })


   /* fastify.post('/api/accountInsert', Accouninsertschema, async (request, reply) => {
        console.log("accountInsert Route called")
        console.log("request status code "+reply.statuscode);
        try {
            console.log("inside account insert try ");
            let result = await Accountdata(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send("New account with id: " + result + " inserted successfully")
            }

            else {
                reply.status(404 ).send("No Data Inserted")
            }


        }
        catch (e) {
            console.log("inside Account Catch block");
            reply.send(e)
        }
    })

    fastify.post('/api/contactInsert', async (request, reply) => {
        console.log("contact insert ");
        try {
            let result = await Contactdata(request)
            if (result) {
                reply.send("New Contact with id: " + result + " inserted successfully")

            }
          
            else {
                reply.status(404 ).send("No Data Inserted")
            }

        }
        catch (e) {
            reply.send(e);
        }
    })

    fastify.post('/api/opportunityInsert', async (request, reply) => {
        console.log("inside opportunity insert");

        try {
            let result = await opportunitydata(request.body)
            if (result) {
                reply.send("New Opportuntiy with id: " + result + " inserted successfully")

            }

          
            else {
                reply.status(404 ).send("No Data Inserted")
            }

        }
        catch (e) {
            reply.send(e);
        }

    })


    fastify.post('/api/leadInsert', async (request, reply) => {
        console.log("inside lead insert")
        try {
            let result = await Leaddata(request.body)
            if (result) {
                await reply.send("New Lead with id: " + result + " inserted successfully")
            }
           
            else {
                reply.status(404 ).send("No Data Inserted")
            }


        }
        catch (e) {
            reply.send(e);
        }

    })

    fastify.post('/api/inventoryInsert', async (request, reply) => {
        console.log("inside inventory insert ")

        try {
            let result = await propertydata(request.body)
            if (result) {
            reply.send("New Inventory  with id: " + result + " inserted successfully")
            }
            else {
                reply.status(404 ).send("No Data Inserted")
            }
        }
        catch (e) {
            reply.send(e.message);
        }

    })

    fastify.post('/api/userInsert', async (request, reply) => {
        console.log("user insert  ")
        try {
            let result = await Userdata(request.body)
            reply.send("New user  with id: " + result + " inserted successfully")
        }
        catch (e) {
            reply.send(e.message);
        }
    })
*/









 /*   fastify.post('/api/editAccount', async (request, reply) => {
        console.log("inside updae Account");
        console.log("Query " + JSON.stringify(request.body))
        try {
            let result = await updateAccount(request.body);
            reply.send("Account Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }

    })

    fastify.post('/api/editContact', async (request, reply) => {
        console.log("inside updae Contact");
        try {
            let result = await updateContact(request.body);
            reply.send("Contact Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }

    })


    fastify.post('/api/editLead', async (request, reply) => {
        console.log("inside updae Account");
        try {
            let result = await updateLead(request.body);
            reply.send("Lead Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }

    })

    fastify.post('/api/editOpportunity', async (request, reply) => {
        console.log("inside update Opportuntiy");
        try {
            let result = await updateOpportunity(request.body);
            reply.send("Opportunity Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }
    })


    fastify.post('/api/editInventory', async (request, reply) => {
        console.log("inside update Inventory");
        try {
            let result = await updateProperty(request.body);
            reply.send("Inventory Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }
    })

    fastify.post('/api/editUser', async (request, reply) => {
        console.log("inside update user");
        try {
            let result = await updateUser(request.body);
            reply.send("user Updated Successfully")
        }
        catch (e) {
            reply.send(e.message)
        }
    })*/

    done();

}
module.exports = getdatafromreact;