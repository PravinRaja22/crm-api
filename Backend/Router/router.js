const { upsertAccount } = require('../model/Account/upsertAccount')
const { upsertContact } = require('../model/Contact/upsertContact')
const { upsertLead } = require('../model/Lead/upsertLead')
const { upsertOpportunity } = require('../model/Opportunity/upsertOpportunity')
const { upsertUser } = require('../model/User/upsertUser')
const { upsertProperty } = require('../model/Inventory Management/upsertInventorymanagement')
const { upsertTask } = require('../model/Task/upsertTask');
const { getAccountName } = require('../model/Account/accountname')
const { propertyName } = require('../model/Inventory Management/inventroyname');
const { leadName } = require('../model/Lead/leadName')
const { getUserName } = require('../model/User/userName')
const { getopportunityName } = require('../model/Opportunity/opportunitiesName')
const { getAccountdata } = require('../model/Account/getAccount')
const { getAccountInventory } = require('../model/Account/accountInventory')
const { getContact } = require('../model/Contact/getContact')
const { getLead } = require('../model/Lead/getLead')
const { getOpportunity } = require('../model/Opportunity/getOpportunity')
const { getProperty } = require('../model/Inventory Management/getInventoryManagement')
const { getOpportunityInventory } = require('../model/Opportunity/opportunityInventory')
const { getOpportunityLead } = require('../model/Opportunity/opportunityLead.js')
const { getUser } = require('../model/User/getUser')
const { getTask } = require('../model/Task/gettask.js')
const { leadTask } = require('../model/Task/leadtask')
const { opportunityTask } = require('../model/Task/opportunitytask')
const { accountTask } = require('../model/Task/accounttask')
const { deleteAccount } = require('../model/Account/deleteAccount')
const { deleteLead } = require('../model/Lead/deleteLead')
const { deleteOpportunity } = require('../model/Opportunity/deleteOpportunity')
const { deleteProperty } = require('../model/Inventory Management/inventoryMangementDelete')
const { deleteUser } = require('../model/User/delelteUser')
const { deleteTask } = require('../model/Task/deleteTask')
const { deleteContact } = require('../model/Contact/deleteContact')
const { getEachFiles } = require('../model/fileupload/individualfile')
const { insertFile } = require('../model/fileupload/fileupload')
const { getFiles } = require('../model/fileupload/getfiles')
const { dataloaderLead } = require('../model/Lead/dataloaderleadinsert')
const { dataloaderAccount } = require('../model/Account/dataloaderaccount')
const { dataloaderOpportuntiy } = require('../model/Opportunity/dataloaderopportunity')
const csvtojson = require('csvtojson')
const accountSchema = require('../model/schema/accountSchema')
//const { fieldsUpload, uploadFile, Multer } = require('../Dalaloader/multer')
const { fieldsUpload, Multer } = require('../Dalaloader/multer')

function getdatafromreact(fastify, options, done) {


    //fastify.post('/api/dataloaderlead', { preHandler: fieldsUpload }, uploadFile);


    // fastify.post('/api/dataloaderlead', { preHandler: fieldsUpload }, uploadFileLead);


    fastify.post('/api/dataloaderlead', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader files");

        console.log(request.file.filename);

        try {

            console.log("inside upload file data loader ");
            console.log('data loader files file data  ' + JSON.stringify(request.file.filename));
            console.log('body ' + JSON.stringify(request.file.filename));
            const files = request.file.filename
            console.log("files " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile " + csvfilepath);
            csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format ' + JSON.stringify(jsonobj));
                    let result = dataloaderLead(jsonobj)
                    return 'success';


                })


        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });
    fastify.post('/api/dataloaderAccount', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader Account");
        console.log(request.file.filename);
        try {



            console.log("inside upload file data loader Account ");
            console.log('data loader Account  data  ' + JSON.stringify(request.file.filename));
            console.log('body Account ' + JSON.stringify(request.file.filename));
            const files = request.file.filename
            console.log("Accounts " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile Accounts " + csvfilepath);
            csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format Account ' + JSON.stringify(jsonobj));
                    let result = dataloaderAccount(jsonobj)
                    return 'success';
                })
        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });


    fastify.post('/api/dataloaderOpportunity', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader Account");
        console.log(request.file.filename);
        try {

            console.log("inside upload file data loader opportunity ");
            console.log('data loader opportunity  data  ' + JSON.stringify(request.file.filename));
            const files = request.file.filename
            console.log("opportunity " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile opportunity " + csvfilepath);
            csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format opportunity ' + JSON.stringify(jsonobj));
                    let result = dataloaderOpportuntiy(jsonobj)
                    return 'success';
                })
        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });




    fastify.post('/api/uploadfile', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file datas ");
        // console.log(request.file.filename);
        try {
            console.log("inside try upload file  datas ");
            console.log("request body ", request.body);
            console.log("request file ", request.file);
            console.log("after request file");
            let result = await insertFile(request)
            reply.send(result)
        } catch (error) {
            reply.status(400).send('Error while uploading file. Try again later.');
        }
    },
        (error, req, res, next) => {
            if (error) {
                reply.status(500).send(error.message);
            }
        }

        // try {
        //     console.log("Insert file upload try ");
        //     let result = await insertFile(request)

        //     reply.send(result)

        // }
        // catch (e) {
        //     console.log("inside file  Inser  Catch block ", e);
        //     reply.send("Error " + e.message)
        // }
    )


    // })

    // fastify.get('/api/uploadfile',{ preHandler: fieldsUpload },async(request,reply)=>{
    //     console.log("inside upload file get datas  ");
    //    // console.log(request.file.filename);
    //     try {
    //         console.log("Insert file upload try ");
    //        let result = await insertFile(request)

    //             reply.send('result')

    //     }
    //     catch (e) {
    //         console.log("inside file  Inser  Catch block ", e);
    //         reply.send("Error " + e.message)
    //     }


    // })


    // fastify.post('/api/uploadfile',async(request,reply)=>{
    //    console.log(request);
    //     try {
    //         console.log("Insert file upload try ");
    //         let result = await insertFile(request.body)

    //             reply.send(result)

    //     }
    //     catch (e) {
    //         console.log("inside file  Inser  Catch block ", e);
    //         reply.send("Error " + e.message)
    //     }


    // })





    fastify.post('/api/UpsertAccount', /*Accouninsertschema,*/ async (request, reply) => {
        console.log("upsert route called")
        console.log("request body " + request.body)
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
            console.log("inside Account upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/UpsertContact', async (request, reply) => {
        console.log("upsert route called")

        console.log("request body " + JSON.stringify(request.body))
        console.log("request query " + JSON.stringify(request.query))
        console.log("file upload datas " + request);
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
            console.log("inside Contact upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/UpsertInventory', async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code " + reply.statuscode);
        try {
            console.log("upsert Inventory try ");
            let result = await upsertProperty(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {

            }
        }
        catch (e) {
            console.log("inside Inventory upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })



    fastify.post('/api/UpsertLead', async (request, reply) => {
        console.log("upsert route called")
        console.log("upsert status code " + reply.statuscode);
        try {
            console.log("upsert Lead try ");

            let result = await upsertLead(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside Lead upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/UpsertOpportunity', async (request, reply) => {
        console.log("upsert oportunity route called")
        console.log("upsert opportunity request code ", JSON.stringify(request.body));
        try {
            console.log("upsert Lead try ");
            let result = await upsertOpportunity(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside Opportunity upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/UpsertUser', async (request, reply) => {
        console.log("upsert user route called")
        console.log("upsert status code " + reply.statuscode);
        try {
            console.log("upsert Lead try ");
            let result = await upsertUser(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside user upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/UpsertTask', async (request, reply) => {
        console.log("upsert task route called " + JSON.stringify(request.body))
        try {
            console.log("upsert tASK try ");
            let result = await upsertTask(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside task upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })


    fastify.post('/api/UpsertJnOppInventory', async (request, reply) => {
        console.log("upsert junction object opp inventory route called " + JSON.stringify(request.body))
        try {
            console.log("upsert junction object try ");
            let result = await upsertTask(request.body)
            console.log("result length junction object " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside task upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })









    fastify.post('/api/accounts', async (request, reply) => {
        try {
            let result = await getAccountdata();
            reply.send(result)
        }
        catch (e) {
            console.log("inside Account view Catch block ", e);

            reply.send("Error " + e.message)
        }
    })



    fastify.post('/api/getAccountbyInventory', async (request, reply) => {
        console.log("inside get inventories by account id ");
        console.log("Inside  get Inventories by acc id  Router " + request.query.searchId)
        try {
            let result = await getAccountInventory(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.post('/api/accountsname', async (request, reply) => {
        if (request.query.searchKey) {
            console.log("inside if statemeent for account name router");
            try {
                let result = await getAccountName(request.query.searchKey);

                reply.send(result)


            }
            catch (e) {
                console.log("inside lookyp account name view Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
        else {
            console.log("inside else statemeent for account name router");
            try {
                let result = await getAccountName();

                reply.send(result)

            }
            catch (e) {
                console.log("inside lookup account name view Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })



    fastify.post('/api/InventoryName', async (request, reply) => {
        console.log(" inside show accountsname look up " + JSON.stringify(request.query.searchKey))
        if (request.query.searchKey) {
            try {
                let result = await propertyName(request.query.searchKey);

                reply.send(result)


            }
            catch (e) {
                console.log("inside inventory lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await propertyName();

                reply.send(result)

            }
            catch (e) {
                console.log("inside inventory lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })


    fastify.post('/api/LeadsbyName', async (request, reply) => {
        if (request.query.searchKey) {
            try {
                let result = await leadName(request.query.searchKey);
                reply.send(result)
            }
            catch (e) {
                console.log("inside lead lookup name  Catch block ", e);
                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await leadName();
                reply.send(result)
            }
            catch (e) {
                console.log("inside lead lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })

    fastify.post('/api/opportunitiesbyName', async (request, reply) => {
        if (request.query.searchKey) {
            try {
                let result = await getopportunityName(request.query.searchKey);

                reply.send(result)

            }
            catch (e) {
                console.log("inside lead lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await getopportunityName();

                reply.send(result)

            }
            catch (e) {
                console.log("inside lead lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })

    fastify.post('/api/usersbyName', async (request, reply) => {
        if (request.query.searchKey) {
            try {
                let result = await getUserName(request.query.searchKey);

                reply.send(result)

            }
            catch (e) {
                console.log("inside user lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await getUserName();

                reply.send(result)

            }
            catch (e) {
                console.log("inside user lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })
    fastify.post('/api/contacts', async (request, reply) => {
        try {
            let result = await getContact();

            reply.send(result)


        }
        catch (e) {
            console.log("error block in contact view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/files', async (request, reply) => {
        try {
            let result = await getFiles();

            reply.send(result)


        }
        catch (e) {
            console.log("error block in contact view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/download', async (request, reply) => {
        console.log("inside download id ");
        console.log(request.query.searchKey);
        try {
            let result = await getEachFiles(request.query.searchKey);

            reply.send(result)


        }
        catch (e) {
            console.log("error block in contact view  page ", e);
            reply.send("Error " + e.message)
        }
        // try {
        //   const file = await File.findById(req.params.id);
        //   res.set({
        //     'Content-Type': file.file_mimetype
        //   });
        //   res.sendFile(path.join(__dirname, '..', file.file_path));
        // } catch (error) {
        //   res.status(400).send('Error while downloading file. Try again later.');
        // }
    });


    fastify.post('/api/leads', async (request, reply) => {
        try {
            console.log("inside leads data");
            let result = await getLead();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in lead view  page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/opportunities', async (request, reply) => {
        try {
            console.log("opportuntiy try");
            let result = await getOpportunity();
            console.log("opportunity result ", result);
            reply.send(result)

        }
        catch (e) {
            console.log("error block in opportunity view  page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/inventories', async (request, reply) => {
        console.log("inventory management datas test")
        try {
            let result = await getProperty();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in Inventory view  page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/getInventoriesbyOppid', async (request, reply) => {
        console.log("inside get inventories by opp id ");
        console.log("Inside Task get Inventories by opp id  Router " + request.query.searchId)
        try {
            let result = await getOpportunityInventory(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.post('/api/getLeadsbyOppid', async (request, reply) => {
        console.log("inside get lead by opp id ");
        console.log("Inside Task get lead by opp id  Router " + request.query.searchId)
        try {
            let result = await getOpportunityLead(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })




    fastify.post('/api/Users', async (request, reply) => {
        console.log("inventory management datas test")
        try {
            let result = await getUser();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/Task', async (request, reply) => {
        console.log("Inside Task Router")
        try {
            let result = await getTask();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/getTaskbyLeadId', async (request, reply) => {
        console.log("Inside Task lead Router " + request.query.searchId)
        try {
            let result = await leadTask(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })
    fastify.post('/api/getTaskbyAccountId', async (request, reply) => {
        console.log("Inside Task Account Router " + request.query.searchId)
        try {
            let result = await accountTask(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })
    fastify.post('/api/getTaskbyOpportunityId', async (request, reply) => {
        console.log("Inside Task Opportunity Router " + request.query.searchId)
        try {
            let result = await opportunityTask(request.query.searchId)
            return result;
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
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
            console.log("error block in delete account   page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/deleteContact', async (request, reply) => {
        console.log("inside Contact delete");
        console.log("Query " + JSON.stringify(request.query.code))
        try {
            let result = await deleteContact(request.query.code);
            if (result) {
                reply.send("Contact Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete contact   page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/deleteOpportunity', async (request, reply) => {
        console.log("inside opportunity delete");
        try {
            let result = await deleteOpportunity(request.query.code);
            if (result) {
                reply.send("Opportunity deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete opportunity   page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/deleteLead', async (request, reply) => {
        console.log("inside lead delete");
        try {
            let result = await deleteLead(request.query.code);
            if (result) {
                reply.send("Lead Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete lead   page ", e);

            reply.send("Error " + e.message)
        }

    })
    fastify.post('/api/deleteInventory', async (request, reply) => {
        console.log("inside inventory delete");
        try {
            let result = await deleteProperty(request.query.code);
            if (result) {
                reply.send("Property Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Inventory   page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.post('/api/delete', async (request, reply) => {
        console.log("inside user delete");
        try {
            let result = await deleteUser(request.query.code);
            if (result) {
                reply.send("User Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete user   page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.post('/api/deleteTask', async (request, reply) => {
        console.log("inside Task delete");
        try {
            let result = await deleteTask(request.query.code);
            if (result) {
                reply.send("Task Deleted Successfully")
            }
            else {
                reply.status(404).send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete user   page ", e);
            reply.send("Error " + e.message)
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