const { dataloaderLead } = require('../../model/Lead/dataloaderleadinsert')
const csvtojson = require('csvtojson')
const uploadFileLead = async (req, res) => {
    console.log("inside upload file data loader lead insert ");
    console.log(req.file.filename);
    try {
        console.log("inside upload file data loader lead uploaders .......... ");
        console.log('data loader files data loader lead uploader' + JSON.stringify(req.file.filename));
        console.log('body ' + JSON.stringify(req.file.filename));
        const files = req.file.filename
        console.log("files data loader lead uploader " +'/uploads/'+files);
        const csvfilepath = 'uploads/'+files
        csvtojson()
            .fromFile(csvfilepath)
            .then((jsonobj) => {
                console.log('data format data loader lead uploader ' + JSON.stringify(jsonobj));
                let result = dataloaderLead(jsonobj)
                return 'success';
            })
    }
    catch (e) {
        res.send('error ' + e.message)
    }
}

module.exports={
    uploadFileLead
}
