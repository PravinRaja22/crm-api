const { upsertAccount } = require('../model/Account/upsertAccount')
const { upsertContact } = require('../model/Contact/upsertContact')
const { upsertEnquiry } = require('../model/Enquiry/upsertEnquiry')
const { upsertDeal } = require('../model/Deal/upsertDeal')
const { upsertUser } = require('../model/User/upsertUser')
const { upsertInventory } = require('../model/Inventory/upsertInventorymanagement')
const { upsertEvent } = require('../model/Event/upsertEvent')
const { getAccountName } = require('../model/Account/accountname')
const { inventoryName } = require('../model/Inventory/inventroyname');
const { enquiryName } = require('../model/Enquiry/enquiryName')
const { getUserName } = require('../model/User/userName')
const { getDealName } = require('../model/Deal/dealName')
const { getAccountdata } = require('../model/Account/getAccount')
const { getAccountInventory } = require('../model/Account/accountInventory')
const { getContact } = require('../model/Contact/getContact')
const { getEnquiry } = require('../model/Enquiry/getEnquiry')
const { getDeal } = require('../model/Deal/getDeal')
const { getInventory } = require('../model/Inventory/getInventoryManagement')
const { getDealInventorylookup } = require('../model/Deal/dealInventory')
const { getInventoryDealsjn } = require('../model/Inventory/inventorydeals')
const { getAccountscontact } = require('../model/Contact/getAccountscontact');
const { getDealEnquiry } = require('../model/Deal/dealEnquiry.js')
const { getUser, getSignUpPageUser } = require('../model/User/getUser')
const { getSingleUser } = require('../model/User/getUser')
const { getEvent } = require('../model/Event/getEvent.js')
const { enquiryEvent } = require('../model/Event/enquiryEvent')
const { dealEvent } = require('../model/Event/dealEvent')
const { accountEvent } = require('../model/Event/accountEvent')
const { deleteAccount } = require('../model/Account/deleteAccount')
const { deleteEnquiry } = require('../model/Enquiry/deleteEnquiry')
const { deletedeal } = require('../model/Deal/deleteDeal')
const { deleteInventory } = require('../model/Inventory/inventoryMangementDelete')
const { deleteUser } = require('../model/User/delelteUser')
const { deleteEvent } = require('../model/Event/deleteEvent')
const { deleteContact } = require('../model/Contact/deleteContact')
const { deleteFile } = require('../model/fileupload/deletefile')
const { getEachFiles } = require('../model/fileupload/individualfile')
const { insertFile } = require('../model/fileupload/fileupload')
const { getFiles } = require('../model/fileupload/getfiles')
const { dataloaderEnquiry } = require('../model/Enquiry/dataloaderEnquiryinsert')
const { dataloaderAccount } = require('../model/Account/dataloaderaccount')
const { dataloaderDeal } = require('../model/Deal/dataloaderDeal')
const { upsertOpportunityInventory } = require('../model/opportunity_inventory/upsertoppinv')
const { getOpportunityInventory } = require('../model/opportunity_inventory/getoppinv')
const { deleteOpportunityInventory } = require('../model/opportunity_inventory/deleteoppinv.js')
const csvtojson = require('csvtojson')
const { authVerify } = require('../helpers/authverify')
const { Accouninsertschema, dataloaderAccountinsertschema } = require('../model/schema/accountSchema')
//const nodemailer = require('nodemailer')
//const { fieldsUploAccouninsertschemaad, uploadFile, Multer } = require('../Dalaloader/multer')
const { filesUpload, Multer } = require('../Dataloader/multer')
const { gmail } = require('../Email/gmail')
const { outlookemail } = require('../Email/outlook')
const { insertEmail } = require('../model/Email/insertemail')
const { sendMessage, getTextMessageInput } = require('../whatsapp/whatsapp')
const { otpVerification } = require('../Email/otpverificationgmail')
const { getCollections } = require('../model/showCollections/collectionNames')
const { getPermission } = require('../model/permissions/getPermissions')
const { upsertPermissions } = require('../model/permissions/upsertPermissons')
const { deletePermissions } = require('../model/permissions/deletePermissions')
const { getRole } = require('../model/Role/getRole')
const { upsertRole } = require('../model/Role/upsertRole')
const { deleteRole } = require('../model/Role/deleteRole')
const { getFieldsdata } = require('../model/objectFields/getFields.js')
const { checkAccess } = require('../model/Authorization/checkAccess')
const { isArray } = require('lodash')
const { getAllowedTabs } = require('../model/showAllowedTabs/allowedTabs')
const { request } = require('http')
const { getDashboardData } = require('../model/Dashboard/dashboardGroup')
const { upsertDashboard } = require('../model/Dashboard/upsertDashboard')
const { getDashboard } = require('../model/Dashboard/getDashboard')
const { deleteDashboard } = require('../model/Dashboard/deleteDashboard')
const { eventFile } = require('../model/fileupload/getFileEvent')
// const passport = require('../passportjs/passport');
// const { ensureAuthenticated } = require('../middleware/ensureAuthenticated')
const { sp, idp } = require('../saml-2/config');
const { deleteManyEnquiry } = require('../model/Enquiry/deleteManyEnquiry')
function getdatafromreact(fastify, options, done) {
    /*=====salesforce */
    // SSO initiation route
    fastify.get('/auth', (req, reply) => {
        console.log('Auth route ')
        sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
            if (err != null)
                return reply.send(500);

            console.log(request_id)
            reply.send(login_url);
        });
    });

    let name_id, session_index;

    // SSO callback route

    fastify.post('/auth/callback', (req, res) => {
        console.log('auth callback route')
        console.log(req)
        let options = { request_body: req.body };
        console.log(options)
        sp.post_assert(idp, options, (err, saml_response) => {
            console.log(saml_response)
            console.log(options)
            if (err != null) {
                return res.send(err.message);

            }
            else {
                name_id = saml_response.user.name_id;
                session_index = saml_response.user.session_index;
                res.send("Hello #{name_id}! session_index: #{session_index}.");
            }

        });
    });




    // fastify.get('/login',(req,res)=>{
    //     res.send('login')
    // })

    // fastify.post('/dashboard',(req,res)=>{
    //     res.send('dashboard')
    // })
    // fastify.get('/auth', (req, res) => {
    //     console.log('inside auth backednd');
    //     // passport.authenticate("saml")(req.raw, res.raw);

    //     passport.authenticate("saml", { failureRedirect: "/" })(req, res,(err,user)=>{
    //         if(err){
    //             console.log('error is ')
    //             res.send(err)

    //         }
    //         else if (user){
    //             console.log(user)
    //         }
    //     });
    // });


    // fastify.get('/auth',{prehandler : passport.authenticate('saml',{ failureRedirect: '/', failureFlash: true })}, (req, reply) => {
    //     // console.log(req)
    //     // console.log(passport)
    //     reply.send('https://vijayclouddevorg-dev-ed.my.salesforce.com/idp/login?app=0sp5j000000wkEG');
    //   });


    // fastify.post('/auth', (req, res) => {
    //     console.log('inside auth backednd');
    //     passport.authenticate("saml")(req.raw, res.raw);

    //     // passport.authenticate("saml", { failureRedirect: "/" })(req, res,(err,user)=>{
    //     //     console.log('error is ')
    //     //     res.send(err)
    //     // });
    // });


    // fastify.post('/auth/callback',(req, reply) => {
    //     reply.redirect('/'); // Redirect to the home page or any other page after successful login
    //   });



    // fastify.post('/auth/callback', (req, res) => {
    //     console.log('inside auth callback');
    //     passport.authenticate('saml', { failureRedirect: '/login' })(req.raw, res.raw, (err, user) => {
    //         if (err || !user) {
    //             res.redirect('/login'); // Handle authentication failure
    //         } else {
    //             // The SAML response is usually available in the SAMLResponse query parameter
    //             const samlResponse = req.query.SAMLResponse;

    //             // Parse the XML SAML response
    //             parseString(Buffer.from(samlResponse, 'base64').toString(), (err, result) => {
    //                 if (err) {
    //                     // Handle parsing error
    //                     return res.redirect('/login');
    //                 }

    //                 // Process the parsed SAML response as needed

    //                 // Finally, log in the user if everything is successful
    //                 req.logIn(user, (err) => {
    //                     if (err) {
    //                         res.redirect('/login'); // Handle login error
    //                     } else {
    //                         res.redirect('/dashboard'); // Redirect the user to the desired page after successful authentication
    //                     }
    //                 });
    //             });
    //         }
    //     });
    // });



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


    // fastify.delete('/Account/delete', async (request, reply) => {
    //     console.log("inside Account delete salesforce");
    //     try {
    //         let result = await deleteAccount(request.query.code);
    //         if (result) {
    //             reply.send("Account Deleted Successfully")
    //         }
    //         else {
    //             reply.send("No data deleted")
    //         }
    //     }
    //     catch (e) {
    //         console.log("error block in delete account   page ", e);
    //         reply.send("Error " + e.message)
    //     }
    // })



    // fastify.post('/Account/upsert', /*Accouninsertschema,*/ async (request, reply) => {
    //     console.log("upsert route called")
    //     console.log("request body " + request.body)
    //     try {
    //         console.log("upsert account try ");
    //         let result = await upsertAccount(request.body)
    //         if (result) {
    //             reply.send(result)
    //         }
    //         else {
    //             reply.status(404).send("No Data Inserted or updated")
    //         }
    //     }
    //     catch (e) {
    //         console.log("inside Account upsert Catch block ", e);
    //         reply.send("Error " + e.message)
    //     }
    // })
    /*=====salesforce */




    //get all object Names 

    fastify.get('/api/objects', async (request, reply) => {
        try {
            console.log('inside tabs')
            let data = await getCollections();
            console.log('result is ==>>')
            console.log(data)
            collectionArray = []
            JSON.parse(data).map((e) => {
                if (e.name !== "Opportunity Inventory") {
                    collectionArray.push(e.name)
                }
            })
            reply.send(collectionArray)

        } catch (error) {
            reply.send(error.message)
        }

    })

    //getting collection based fileds in this route
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


    //checking permission based on object,department and role
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



    fastify.get('/api/tabs', async (request, reply) => {
        try {
            const { department, role } = request.query
            let data = await getAllowedTabs(department, role)
            reply.send(data)
        } catch (error) {
            reply.send("error in tabs section " + error.message)
        }

    })


    fastify.get('/api/dashboard', async (request, reply) => {
        try {
            const { object, field } = request.query
            let result = await getDashboard(object, field)
            reply.send(result)
        } catch (error) {
            console.log(error.message)
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
            console.log(request.headers)
            console.log("inside sigin page get")
            console.log(request.body)
            let result = await getSingleUser(request);
            console.log('token is ')
            console.log(result.content)
            console.log("cookies ")
            // reply.setCookie('jwt', result.content)
            console.log(request.cookies)
            if (result.status == "success") {
                console.log("inside if condtition ")
                console.log("cookies are ", request.cookies)
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

    fastify.post('/api/checkUserPasswordReset', async (request, reply) => {
        try {
            console.log("Check sign up user  ")
            console.log(request.body)
            let data = await getSignUpPageUser(request)
            reply.send(data)

        } catch (error) {
            console.log("error in sign up page " + error.message)
        }

    })

    fastify.post("/api/bulkemail", { preHandler: filesUpload }, async (request, reply) => {
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

    fastify.post("/api/outlookemail", { preHandler: filesUpload }, async (request, reply) => {
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



    fastify.post("/api/bulkewhatsapp", { preHandler: filesUpload }, (request, reply) => {
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
    fastify.post('/api/dataloaderEnquiry', { preHandler: filesUpload }, async (request, reply) => {
        console.log("inside data loader Enquiry");
        console.log(request.files[0]);
        console.log(request.files[0].filename);
        let created = JSON.parse(request.body.createdBy);
        let modified = JSON.parse(request.body.modifiedBy);
        // let created = new Date() ;
        // let modified = new Date();

        try {

            const files = request.files[0].filename
            const csvfilepath = 'uploads/' + files
            await csvtojson()
                .fromFile(csvfilepath)
                .then(async (jsonobj) => {
                    // console.log('data format ' + JSON.stringify(jsonobj));
                    let result = await dataloaderEnquiry(jsonobj, created, modified);
                    console.log(result[0], 'result in Enquiry dataLoader')
                    if (result[0].updatedCount > 0) {
                        console.log(`${result.length} Records Updated SuccessFully `)
                        reply.send(`${result.length} Records Updated SuccessFully `);
                    }
                    else if (result[0].insertedCount > 0) {
                        console.log(`${result.length} Records Inserted  SuccessFully `)
                        reply.send(`${result.length} Records Inserted  SuccessFully `);
                    }

                })
        }
        catch (e) {
            res.send('error ' + e.message)
        }
    });
    fastify.post('/api/dataloaderFilePreview', { preHandler: filesUpload }, async (request, reply) => {
        console.log("Inside dataloaderFilePreview");
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

    fastify.post('/api/dataloaderAccount', { preHandler: filesUpload }, async (request, reply) => {
        console.log("inside upload file data loader Account");
        console.log("validator worked ?? :: " + request.validationError)
        //    console.log(request.files.filename);
        let created = JSON.parse(request.body.createdBy);
        let modified = JSON.parse(request.body.modifiedBy);
        try {
            // console.log("inside upload file data loader Account ");
            // console.log('data loader Account  data  ' + JSON.stringify(request.files[0].filename));
            // console.log('body Account ' + JSON.stringify(request.files[0].filename));
            const files = request.files[0].filename
            // console.log("Accounts " + '../uploads/' + files);
            const csvfilepath = 'uploads/' + files
            // console.log("csvfile Accounts " + csvfilepath);
            await csvtojson()
                .fromFile(csvfilepath)
                .then(async (jsonobj) => {
                    // console.log('data format Account ' + JSON.stringify(jsonobj));
                    console.log(jsonobj)
                    let result = await dataloaderAccount(jsonobj, created, modified)
                    console.log(result[0], 'result in Account dataLoader')
                    if (result[0].updatedCount > 0) {
                        console.log(`${result.length} Records Updated SuccessFully `)
                        reply.send(`${result.length} Records Updated SuccessFully `);
                    }
                    else if (result[0].insertedCount > 0) {
                        console.log(`${result.length} Records Inserted  SuccessFully `)
                        reply.send(`${result.length} Records Inserted  SuccessFully `);
                    }
                })
        }
        catch (e) {
            reply.send('error ' + e.message)
        }
    });

    fastify.post('/api/dataloaderDeal', { preHandler: filesUpload }, async (request, reply) => {
        console.log("inside upload file data loader Deal");
        let created = JSON.parse(request.body.createdBy);
        let modified = JSON.parse(request.body.modifiedBy);
        try {

            console.log('data loader Deal  data  ' + JSON.stringify(request.files[0].filename));
            const files = request.files[0].filename
            const csvfilepath = 'uploads/' + files
            await csvtojson()
                .fromFile(csvfilepath)
                .then(async (jsonobj) => {
                    console.log('data format Deal ' + JSON.stringify(jsonobj));
                    let result = await dataloaderDeal(jsonobj, created, modified)
                    console.log(result[0], 'result in Account dataLoader')
                    if (result[0].updatedCount > 0) {
                        console.log(`${result.length} Records Updated SuccessFully `)
                        reply.send(`${result.length} Records Updated SuccessFully `);
                    }
                    else if (result[0].insertedCount > 0) {
                        console.log(`${result.length} Records Inserted  SuccessFully `)
                        reply.send(`${result.length} Records Inserted  SuccessFully `);
                    }
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

    fastify.post('/api/file', {
        preHandler: (request, reply, done) => {
            console.log("testing")
            console.log(request.url);
            filesUpload(request, reply, done);
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
            console.log("afeter insert")
            console.log(result)
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

    fastify.delete('/api/file/:id', { preHandler: filesUpload }, async (request, reply) => {
        console.log("inside delete file datas ");
        try {
            console.log("id is " + request.params.id)
            let result = await deleteFile(request.params.id)
            if (result) {
                reply.send("File Deleted Successfully")
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

    fastify.post('/api/Dashboard', /*Accouninsertschema,*/ async (request, reply) => {
        console.log("upsert route called")
        console.log("request body " + request.body)
        try {
            console.log("upsert account try ");
            let result = await upsertDashboard(request.body)
            if (result) {
                reply.send(result)
            }
            else {
                reply.status(404).send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside Dashboard upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })



    fastify.post('/api/account', /*Accouninsertschema,(validation)*/ async (request, reply) => {
        console.log("upsert Account route called")
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

    fastify.post('/api/contact', async (request, reply) => {
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

    fastify.post('/api/inventory', async (request, reply) => {
        console.log("upsert inventory route called")
        console.log("upsert status code " + reply.statuscode);
        try {
            console.log("upsert Inventory try ");
            let result = await upsertInventory(request.body)
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



    fastify.post('/api/enquiry', async (request, reply) => {
        console.log("upsert enquiry route called")
        console.log("upsert status code " + reply.statuscode);
        try {
            console.log("upsert Lead-enquiry try ");

            let result = await upsertEnquiry(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside enquiry upsert Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/deal', async (request, reply) => {
        console.log("upsert deal route called")
        console.log("upsert  deal request code ", JSON.stringify(request.body));
        try {
            console.log("upsert Deal try ");
            let result = await upsertDeal(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside Deal upsert  Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.post('/api/user', async (request, reply) => {
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

    fastify.post('/api/event', async (request, reply) => {
        console.log("upsert task -event route called " + JSON.stringify(request.body))
        try {
            console.log("upsert task-event try ");
            let result = await upsertEvent(request.body)
            console.log("result length " + result);
            if (result) {
                reply.send(result)
            }
            else {
                reply.send("No Data Inserted or updated")
            }
        }
        catch (e) {
            console.log("inside task-event upsert  Catch block ", e);
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


    fastify.get('/api/accounts',/*{preHandler:authVerify},*/ async (request, reply) => {
        try {
            console.log("cookies ", request.cookies)
            console.log("inside account get")
            let result = await getAccountdata();
            reply.send(result)
        }
        catch (e) {
            console.log("inside Account view Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/dashboardGroup', async (request, reply) => {
        try {
            const { object, field } = request.query
            console.log("inside Dashboard Group")
            let result = await getDashboardData(object, field);
            reply.send(result)
        }
        catch (e) {
            console.log("inside Dashboard view Catch block ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/dashboards', async (request, reply) => {
        try {
            console.log("inside Dashboard get")
            let result = await getDashboard();
            reply.send(result)
        }
        catch (e) {
            console.log("inside Dashboard view Catch block ", e);

            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/inventory/related/account/:id', async (request, reply) => {

        console.log("Inside  get Inventories by acc id  Router " + request.params.id)
        try {
            let result = await getAccountInventory(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.get('/api/accounts/name', async (request, reply) => {
        if (request.query.searchKey) {
            console.log("inside if statement for account name router");
            try {
                let result = await getAccountName(request.query.searchKey);
                reply.send(result)
            }
            catch (e) {
                console.log("inside lookup account name view Catch block ", e);
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



    fastify.get('/api/inventories/name', async (request, reply) => {
        console.log(" inside show accountsname look up " + JSON.stringify(request.query.searchKey))
        if (request.query.searchKey) {
            try {
                let result = await inventoryName(request.query.searchKey);
                reply.send(result)
            }
            catch (e) {
                console.log("inside inventory lookup name  Catch block ", e);
                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await inventoryName();
                reply.send(result)
            }
            catch (e) {
                console.log("inside inventory lookup name  Catch block ", e);
                reply.send("Error " + e.message)
            }
        }
    })


    fastify.get('/api/enquiries/name', async (request, reply) => {
        console.log(request.query)
        if (request.query.searchKey) {
            try {
                console.log("inside Enquiry by name")
                let result = await enquiryName(request.query.searchKey);
                reply.send(result)
            }
            catch (e) {
                console.log("inside Enquiry lookup name  Catch block ", e);
                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await enquiryName();
                reply.send(result)
            }
            catch (e) {
                console.log("inside Enquiry lookup name  Catch block ", e);
                reply.send("Error " + e.message)
            }
        }
    })

    fastify.get('/api/deals/name', async (request, reply) => {
        if (request.query.searchKey) {
            try {
                let result = await getDealName(request.query.searchKey);

                reply.send(result)

            }
            catch (e) {
                console.log("inside Deal lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
        else {
            try {
                let result = await getDealName();

                reply.send(result)

            }
            catch (e) {
                console.log("inside Deal lookup name  Catch block ", e);

                reply.send("Error " + e.message)
            }
        }
    })

    fastify.get('/api/users/name', async (request, reply) => {
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
    fastify.get('/api/contacts', async (request, reply) => {
        try {
            let result = await getContact();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in contact view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/account/related/contact/:id', async (request, reply) => {
        try {
            console.log('Account Related Contacts')
            let result = await getAccountscontact(request.params.id);
            reply.send(result)
        }
        catch (e) {
            console.log("error block in contact view  page ", e);
            reply.send("Error " + e.message)
        }
    })


    fastify.get('/api/files', async (request, reply) => {
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


    fastify.get('/api/enquiries', async (request, reply) => {
        try {
            console.log("inside get Enquiries")
            if (Object.keys(request.query).length === 0) {
                console.log("inside leads-enquiries data");
                let result = await getEnquiry();
                reply.send(result)

            }
            else {
                if (request.query.month) {
                    console.log("else if")
                    console.log(request.query.month)
                    let result = await getEnquiry(request.query.month)
                    reply.send(result)

                }

            }
        }
        catch (e) {
            console.log("error block in Enquiryview  page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.get('/api/deals', async (request, reply) => {
        try {
            console.log("inside get  deals");
            let result = await getDeal();
            console.log("Deals result ", result);
            reply.send(result)

        }
        catch (e) {
            console.log("error block in Deals view  page ", e);
            reply.send("Error " + e.message)
        }
    })
    fastify.get('/api/inventories', async (request, reply) => {
        console.log(" get inventory ")
        try {
            let result = await getInventory();
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
            let result = await getDealInventorylookup(request.query.searchId)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/inventory/related/deal/:id', async (request, reply) => {
        console.log("Inside  get Deal by Inv id  Router " + request.params.id)
        try {
            let result = await getInventoryDealsjn(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.get('/api/enquiry/related/deal/:id', async (request, reply) => {
        console.log("Inside enquiryRelatedDeal Router " + request.params.id)

        try {
            let result = await getDealEnquiry(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.get('/api/event/related/file/:id', async (request, reply) => {
        console.log("Inside event relate file  Router " + request.params.id)

        try {
            let result = await eventFile(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.get('/api/users', async (request, reply) => {
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

    fastify.get('/api/events', async (request, reply) => {
        console.log("Inside get Event Router")
        try {
            let result = await getEvent();
            reply.send(result)
        }
        catch (e) {
            console.log("error block in Event view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.get('/api/enquiry/related/event/:id', async (request, reply) => {
        console.log("Inside enquiry event lead Router " + request.params.id)
        try {
            let result = await enquiryEvent(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in enquiry event view  page ", e);
            reply.send("Error " + e.message)
        }

    })
    fastify.get('/api/account/related/event/:id', async (request, reply) => {
        console.log("Inside Event Related Account Router " + request.params.id)
        try {
            let result = await accountEvent(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.get('/api/deal/related/event/:id', async (request, reply) => {
        console.log("Inside dealRelatedEvent Router " + request.params.id)
        try {
            let result = await dealEvent(request.params.id)
            reply.send(result)
        }
        catch (e) {
            console.log("error block in users view  page ", e);
            reply.send("Error " + e.message)
        }
    })

    fastify.delete('/api/account/:id', async (request, reply) => {
        console.log("inside Account delete");
        try {
            let result = await deleteAccount(request.params.id);
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


    fastify.delete('/api/dashboard/:id', async (request, reply) => {
        console.log("inside dashboard delete");
        try {
            console.log(request.params.id);
            let result = await deleteDashboard(request.params.id);
            if (result) {
                reply.send("Dashboard Deleted Successfully")

            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Dashboard   page ", e);
            reply.send("Error " + e.message)
        }
    })


    fastify.delete('/api/contact/:id', async (request, reply) => {
        console.log("inside Contact delete");
        console.log("Query " + JSON.stringify(request.params.id))
        try {
            let result = await deleteContact(request.params.id);
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

    fastify.delete('/api/deal/:id', async (request, reply) => {
        console.log("inside deal delete");
        try {
            let result = await deletedeal(request.params.id);
            if (result) {
                reply.send("Deal deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Deal   page ", e);
            reply.send("Error " + e.message)
        }
    })


    fastify.delete('/api/enquiry/:id', async (request, reply) => {
        console.log("inside Enquiry delete");
        try {
            let result = await deleteEnquiry(request.params.id);
            if (result) {
                reply.send("Enquiry deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Enquiry  ", e);

            reply.send("Error " + e.message)
        }

    })

    fastify.delete('/api/enquiry/many', async (request, reply) => {
        console.log("inside Enquiry delete");
        console.log(request.body);
        try {
            let result = await deleteManyEnquiry(request.body.id);
            if (result) {
                console.log(result ,'Delet data')
                reply.send(`${result} Enquiry deleted successfully`)
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Enquiry  ", e);

            reply.send("Error " + e.message)
        }

    })
    fastify.delete('/api/inventory/:id', async (request, reply) => {
        console.log("inside inventory delete");
        try {
            let result = await deleteInventory(request.params.id);
            if (result) {
                reply.send("Inventory deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Inventory page", e);
            reply.send("Error " + e.message)
        }

    })

    fastify.delete('/api/user/:id', async (request, reply) => {
        console.log("inside user delete");
        try {
            let result = await deleteUser(request.params.id);
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
    fastify.delete('/api/event/:id', async (request, reply) => {
        console.log("inside event delete");
        try {
            let result = await deleteEvent(request.params.id);
            if (result) {
                reply.send("Event deleted successfully")
            }
            else {
                reply.send("No data deleted")
            }
        }
        catch (e) {
            console.log("error block in delete Event   page ", e);
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