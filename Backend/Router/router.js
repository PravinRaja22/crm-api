const { upsertAccount } = require('../model/Account/upsertAccount')
const { upsertContact } = require('../model/Contact/upsertContact')
const { upsertLead } = require('../model/Lead/upsertLead')
const { upsertOpportunity } = require('../model/Opportunity/upsertOpportunity')
const { upsertUser } = require('../model/User/upsertUser')
const { upsertProperty } = require('../model/Inventory Management/upsertInventorymanagement')
const { upsertTask } = require('../model/Task/upsertTask')
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
const { getOpportunityInventorylookup } = require('../model/Opportunity/opportunityInventory')
const { getInventoryOpportunityjn } = require('../model/Inventory Management/inventoryopportunity')
const { getAccountscontact } = require('../model/Contact/getAccountscontact');
const { getOpportunityLead } = require('../model/Opportunity/opportunityLead.js')
const { getUser, getSignUpPageUser } = require('../model/User/getUser')
const { getSingleUser } = require('../model/User/getUser')
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
const { deleteFile } = require('../model/fileupload/deletefile')
const { getEachFiles } = require('../model/fileupload/individualfile')
const { insertFile } = require('../model/fileupload/fileupload')
const { getFiles } = require('../model/fileupload/getfiles')
const { dataloaderLead } = require('../model/Lead/dataloaderleadinsert')
const { dataloaderAccount } = require('../model/Account/dataloaderaccount')
const { dataloaderOpportuntiy } = require('../model/Opportunity/dataloaderopportunity')
const { upsertOpportunityInventory } = require('../model/opportunity_inventory/upsertoppinv')
const { getOpportunityInventory } = require('../model/opportunity_inventory/getoppinv')
const { deleteOpportunityInventory } = require('../model/opportunity_inventory/deleteoppinv.js')
const csvtojson = require('csvtojson')
const { authVerify } = require('../helpers/authverify')
const accountSchema = require('../model/schema/accountSchema')
//const nodemailer = require('nodemailer')
//const { fieldsUpload, uploadFile, Multer } = require('../Dalaloader/multer')
const { fieldsUpload, Multer } = require('../Dataloader/multer')
const { gmail } = require('../Email/gmail')
const { outlookemail } = require('../Email/outlook')
const { insertEmail } = require('../model/Email/insertemail')
const { sendMessage, getTextMessageInput } = require('../whatsapp/whatsapp')
const { otpVerification } = require('../Email/otpverificationgmail')
const { getCollections } = require('../model/showTabs/collectionNames')
const { getPermission } = require('../model/permissions/getPermissions')
const { upsertPermissions } = require('../model/permissions/upsertPermissons')
const { deletePermissions } = require('../model/permissions/deletePermissions')
const { getRole } = require('../model/Role/getRole')
const { upsertRole } = require('../model/Role/upsertRole')
const { deleteRole } = require('../model/Role/deleteRole')
const { getFieldsdata } = require('../model/objectFields/getFields.js')
const { checkAccess } = require('../model/checkAccess/checkAccess')
const { isArray } = require('lodash')
function getdatafromreact(fastify, options, done) {





    /*=====salesforce */

    fastify.get('/accounts/show', async (request, reply) => {
        try {
            console.log("inside account get salesforce")
            let result = await getAccountdata();
            reply.send(result)
        }
        catch (e) {
            console.log("inside Account view Catch block ", e);

            reply.send("Error " + e.message)
        }
    })


    fastify.delete('/Account/delete', async (request, reply) => {
        console.log("inside Account delete salesforce");
        try {
            let result = await deleteAccount(request.query.code);
            if (result) {
                reply.send("Account Deleted Successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete account   page ", e);
            reply.send("Error " + e.message)
        }
    })



    fastify.post('/Account/upsert', /*Accouninsertschema,*/ async (request, reply) => {
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
    /*=====salesforce */






    fastify.get('/api/getTabs', async (request, reply) => {
        try {
            console.log('inside tabs')
            let data = await getCollections();
            console.log('result is ==>>')
            console.log(data)
            collectionArray = []
            JSON.parse(data).map((e) => {
                collectionArray.push(e.name)
            })
            reply.send(collectionArray)

        } catch (error) {
            reply.send(error.message)
        }

    })

    fastify.get('/api/fields/:object', async (request, reply) => {
        try {
            console.log("inside get fields")
            let data = await getFieldsdata(request.params.object);
            reply.send(data)
        } catch (error) {
            console.log("inside error message of fields")
            reply.send(error.message)
        }
    })

    fastify.get('/api/permissionforobject/:object/:department/:role', async (request, reply) => {
        try {

            console.log("inside get permission")
            const { object, department, role } = request.params
            let result = await checkAccess(object, department, role)
            reply.send(result)

        } catch (error) {

            console.log("inside get error in permission")
            reply.send(error.message)

        }
    })


    fastify.get('/api/permissions', async (request, reply) => {
        const { access } = request.params;
        console.log("access is ", access)
        try {
            let data = await getPermission();
            console.log("inside get permissions")
            reply.send(data)
        } catch (error) {

            reply.send(error.message)

        }
    })
    fastify.post('/api/permission', async (request, reply) => {
        try {
            console.log("inside Upsert Permissions")
            let result = await upsertPermissions(request.body);
            console.log("result is ======>>>>>>")
            reply.send(result)
        } catch (error) {
            reply.send(error.message)
        }
    })

    fastify.delete('/api/permission/:id', async (request, reply) => {
        try {
            let result = await deletePermissions(request.params.id);
            if (result) {
                reply.send(
                    "Record Deleted Successfully"
                )
            }
        } catch (error) {
        }
    })

    fastify.get('/api/roles', async (request, reply) => {
        try {
            console.log("inside get roles routes")
            if (request.query) {
                if (request.query.departmentName) {
                    const { departmentName, role } = request.query;
                    let result = await getRole(departmentName, role)
                    console.log(result)
                    if (isArray(result)) {
                        if (result.length > 0) {
                            let roleName = []
                            JSON.parse(result).forEach((e) => {
                                roleName.push({ _id: e._id, roleName: e.roleName })
                            })
                            console.log(roleName)
                            reply.send(roleName)
                        }
                    }
                    else {
                        reply.send(result)
                    }
                }
                else {
                    console.log("inside else")
                    let result = await getRole()
                    reply.send(result)
                }
            }
        }
        catch (error) {
            reply.send(error.message)

        }
    })

    fastify.post('/api/role', async (request, reply) => {
        try {
            console.log("inside Upsert Role")
            let result = await upsertRole(request.body);
            console.log("result is ======>>>>>>")
            reply.send(result)
        } catch (error) {
            reply.send(error.message)
        }
    })

    fastify.delete('/api/role/:id', async (request, reply) => {
        try {
            let result = await deleteRole(request.params.id);
            if (result) {
                reply.send("Record Deleted Successfully")
            }
        } catch (error) {

            reply.send(error.message)

        }
    })



    fastify.post('/api/testing', { preHandler: authVerify }, async (request, reply) => {
        console.log(request.cookies)
        console.log("inside protected route is ")
    })


    let generatedotp;
    fastify.post("/api/generateOTP", async (request, reply) => {

        try {
            if (!request.body.otp) {
                generatedotp = Math.floor(1000 + Math.random() * 9000);
                let emailresult = await otpVerification(request, generatedotp);
                reply.send("OTP sent Successfuly")

            }
            else if (request.body.otp) {
                if (request.body.otp == generatedotp) {

                    reply.send({ status: "success", content: "Entered otp is correct" })
                }
                else {

                    reply.send({ status: "failure", content: "please enter correct OTP" })
                }

            }

        } catch (error) {
            console.log("inside  generate otp error page")
            reply.send(error.message)

        }


    })

    fastify.post('/api/signin', async (request, reply) => {

        try {

            console.log("inside sigin page get")
            console.log(request.body)
            let result = await getSingleUser(request);
            console.log('token is ')
            console.log(result.content)
             reply.setCookie('jwt', result.content)

            if (result.status == "success") {
                console.log("inside if condtition")
                reply.send(result)
            }
            else if (result.status == 'failure') {
                console.log("inside else if condition")
                reply.send(result)
            }
        }
        catch (error) {
            console.log("inside catch ", error);
            reply.send(error.message)
        }

    })

    fastify.post('/api/signout', async (request, reply) => {
        try {

            console.log("inisde signout")
            console.log(request.cookies)
            reply.clearCookie('jwt', { path: '../' })
            reply.send("Logged Out Successfully")

        } catch (error) {
            console.log("error in logout")
            reply.send(error.message)

        }


    })


    fastify.post('/api/signup', async (request, reply) => {
        try {
            console.log("sign up body is ")
            console.log(request.body)
            let data = await upsertUser(request.body)
            reply.send(
                'Sign Up done SuccesFully'
            )

        } catch (error) {
            console.log("error in sign up page " + error.message)
        }

    })

    fastify.post('/api/checkSignUpUser', async (request, reply) => {
        try {
            console.log("Check sign up user  ")
            console.log(request.body)
            let data = await getSignUpPageUser(request)
            reply.send(data)

        } catch (error) {
            console.log("error in sign up page " + error.message)
        }

    })










    fastify.post("/api/bulkemail", { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("bulk email test");
        console.log(request.body);
        //  console.log("request file ", request.file);

        try {
            console.log("inside the try of the email sender");
            let emailresult = await gmail(request);

            // console.log("request is : " + requst);
            // console.log('insert email result is : ' + insertemailresult);

            reply.send(emailresult)
        }
        catch (e) {

            reply.send('error ' + e.message)
        }
    })

    fastify.post("/api/outlookemail", { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("outllook email test");
        console.log(request.body);
        //  console.log("request file ", request.file);

        try {
            console.log("inside the try of the outlook sender");
            let emailresult = await outlookemail(request);

            // console.log("request is : " + requst);
            // console.log('insert email result is : ' + insertemailresult);

            reply.send(emailresult)
        }
        catch (e) {

            reply.send('error ' + e.message)
        }
    })



    fastify.post("/api/bulkewhatsapp", { preHandler: fieldsUpload }, (request, reply) => {
        console.log("bulk email test");
        console.log(request.body.recordsData);
        //  console.log("request file ", request.file);
        let body = request.body.subject;
        let phonenumber;
        JSON.parse(request.body.recordsData).forEach(async (number) => {
            phonenumber = "91" + number.phone;

            console.log("array of Phone number is : " + phonenumber);
            console.log("inside send mesage initial stage");
            var data = getTextMessageInput('918870339850', body);
            console.log("data is : " + data);
            sendMessage(data)
                .then(function (resdata) {
                    console.log("inside the send message of then : " + data);
                    reply.send("Message sent successfully")
                })
                .catch(function (error) {
                    //console.log(error);
                    console.log(error.response);
                    reply.send(error);
                    return;
                });
        });
    })
    // fastify.post("/images", (request, reply) => {
    //     console.log('inside images');
    //     console.log('2023-01-10T09-30-57.169Z-wall.jpg');
    //res.send("Data based ")
    // let imageurl = request.protocol + '://' + request.headers.host + '/uploads/2023-01-10T11-55-08.191Z-node js logs imp.png'
    // reply.send(imageurl)
    //res.sendFile('2023-01-10T10-01-19.567Z-node js logs imp.png');
    //});
    // fastify.post('/api/dataloaderlead', { preHandler: fieldsUpload }, uploadFileLead);
    fastify.post('/api/dataloaderlead', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader files");
        console.log(request.files.filename);
        try {
            console.log("inside upload file data loader ");
            console.log('data loader files file data  ' + JSON.stringify(request.files[0].filename));
            console.log('body ' + JSON.stringify(request.files[0].filename));
            const files = request.files[0].filename
            console.log("files " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile " + csvfilepath);
            await csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format ' + JSON.stringify(jsonobj));
                    let result = dataloaderLead(jsonobj)
                    return "success";
                })
        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });
    fastify.post('/api/generatePreview', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("Inside Generate Preview");
        console.log(request.files);
        console.log(request.files[0].filename);
        try {
            const files = request.files[0].filename
            const csvfilepath = 'uploads/' + files
            console.log("object " + csvfilepath);
            await csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log(jsonobj);
                    reply.send(jsonobj)
                })
        }
        catch (e) {
            reply.send('error ' + e.message)
        }
        //  console.log("after exot pf try catch "+csvoutput);

    })

    fastify.post('/api/dataloaderAccount', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader Account");
        console.log(request.files.filename);
        try {
            console.log("inside upload file data loader Account ");
            console.log('data loader Account  data  ' + JSON.stringify(request.files[0].filename));
            console.log('body Account ' + JSON.stringify(request.files[0].filename));
            const files = request.files[0].filename
            console.log("Accounts " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile Accounts " + csvfilepath);
            await csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format Account ' + JSON.stringify(jsonobj));
                    let result = dataloaderAccount(jsonobj)
                    return "success";
                })
        }
        catch (e) {
            reply.send('error ' + e.message)
        }
    });

    fastify.post('/api/dataloaderOpportunity', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside upload file data loader Account");
        console.log(request.files[0].filename);
        try {
            console.log("test")
            console.log("inside upload file data loader opportunity ");
            console.log('data loader opportunity  data  ' + JSON.stringify(request.files[0].filename));
            const files = request.files[0].filename
            console.log("opportunity " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            console.log("csvfile opportunity " + csvfilepath);
            await csvtojson()
                .fromFile(csvfilepath)
                .then((jsonobj) => {
                    console.log('data format opportunity ' + JSON.stringify(jsonobj));
                    let result = dataloaderOpportuntiy(jsonobj)
                    return "success";
                })
        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });
    fastify.get('/api/testpage', async (request, reply) => {
        reply.send("testpage")
    })

    fastify.get('/', async (request, reply) => {
        reply.send({ message: "App initiated" })
    })

    fastify.post('/api/uploadfile', {
        preHandler: (request, reply, done) => {
            console.log("testing")
            console.log(request.url);
            fieldsUpload(request, reply, done);
        }
    }, async (request, reply) => {
        console.log("inside upload file datas ");
        // console.log(request.file.filename);
        try {
            console.log("inside try upload file  datas ");
            console.log("request body ", request.body);
            console.log("request file ", request.files);
            console.log("after request file");
            let result = await insertFile(request)
            reply.send(result)
        } catch (error) {
            reply.send('Error while uploading file. Try again later.');
        }
    }


        // (error, req, res, next) => {
        //     if (error) {
        //         reply.status(500).send(error.message);
        //     }
        // }

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

    fastify.post('/api/deletefile', { preHandler: fieldsUpload }, async (request, reply) => {
        console.log("inside delete file datas ");
        try {
            console.log("id is " + request.query.code)
            let result = await deleteFile(request.query.code)
            if (result) {
                reply.send({
                    status: "success",
                    content: "File Deleted Successfully"
                })
            }

        } catch (error) {
            reply.send('Error while deleting file. Try again later.');
        }
    })

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

                reply.send("No data inserted or updated")

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
                reply.send("No Data Inserted or updated")
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
                reply.send("No Data Inserted or updated")
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
                reply.send({ status: "success", content: result })
            }
            else {
                reply.send({ status: "failure", content: "No Data Inserted or updated" })
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
                reply.send("No Data Inserted or updated")
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
            let result = await upsertOpportunityInventory(request.body)
            console.log("result length junction object " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside task upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })


    fastify.get('/api/accounts',{ preHandler: authVerify }, async (request, reply) => {
        try {
            console.log("inside account get")
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
            reply.send(result)
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
        console.log(request.query)
        if (request.query.searchKey) {
            try {
                console.log("inside leads by name")
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

    fastify.post('/api/getContactsbyAccountId', async (request, reply) => {
        try {
            let result = await getAccountscontact(request.query.searchId);
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


    fastify.post('/api/preview-file', async (request, reply) => {
        console.log("inside preview file");
        console.log(request.query.searchId);

        try {
            console.log("inside preview file");
            let result = await getEachFiles(request.query.searchId);
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
    });


    fastify.post('/api/leads', async (request, reply) => {
        try {
            console.log()
            if (Object.keys(request.query).length === 0) {
                console.log("inside leads data");
                let result = await getLead();
                reply.send(result)

            }
            else {
                if (request.query.month) {
                    console.log("else if")
                    console.log(request.query.month)
                    let result = await getLead(request.query.month)
                    reply.send(result)

                }



            }

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
            // console.log(request.query.role)
            //  let userdata = await getUser(request.query.role)
            let result = await getProperty();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in Inventory view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/opportuintyinventory', async (request, reply) => {
        console.log("get opportuunity inventorty")
        try {
            let result = await getOpportunityInventory();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in Inventory view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/getInventoriesbyOppid', async (request, reply) => {
        console.log("inside get inventories by opp id ");
        console.log("Inside  get Inventories by opp id  Router " + request.query.searchId)
        try {
            let result = await getOpportunityInventorylookup(request.query.searchId)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.post('/api/getOpportunitiesbyInvid', async (request, reply) => {
        console.log("inside get Opportunites by Inv id ");
        console.log("Inside  get Opportunity by Inv id  Router " + request.query.searchId)
        try {
            let result = await getInventoryOpportunityjn(request.query.searchId)
            reply.send(result)
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
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.post('/api/Users', async (request, reply) => {
        console.log("Inside get user page ")
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
            reply.send(result)
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
            reply.send(result)
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
            reply.send(result)
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
                reply.send("No data deleted")
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
                reply.send("No data deleted")
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
                reply.send("Lead deleted successfully")
            }
            else {
                reply.send("No data deleted")
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
                reply.send("Property deleted successfully")
            }
            else {
                reply.send("No data deleted")
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
                reply.send("User deleted successfully")
            }
            else {
                reply.send("No data deleted")
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
                reply.send("Task deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete user   page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/deleteOpportunityInventory', async (request, reply) => {
        console.log("inside delete opportunity inventory ");
        try {
            let result = await deleteOpportunityInventory(request.query.code);
            if (result) {
                reply.send("oppinventory deleted successfully")
            }
            else {
                reply.send("No data deleted")
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