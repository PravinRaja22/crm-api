const Multer = require('fastify-multer')
const path = require('path')
//const csvtojson = require('csvtojson')
var storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        const ROOT_PATH = __dirname
        console.log("Root path " + ROOT_PATH);
        console.log("directory name of path ", path.dirname(ROOT_PATH))
        console.log("inside destination folder " + JSON.stringify(file));
       // cb(null, path.dirname(ROOT_PATH))
        cb(null,'uploads')
        

    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    }
})

var upload = Multer({
    storage: storage,
    
})

let fieldsUpload = upload.single('file')




// const uploadFile = async (req, res) => {
//     console.log("inside upload fuile");
    //file upload
   // console.log(req.raw.files.file.name);
    //multer
    //  console.log(req.file.filename);

    // try {
        
    //     console.log("inside upload fuile");
    //     console.log('data loader files ' + JSON.stringify(req.file.filename));
    //     console.log('body ' + JSON.stringify(req.file.filename));
    //     const files = req.file.filename
    //     console.log("files " +'/uploads/'+files);
    //     const csvfilepath = 'uploads/'+files
    //     csvtojson()
    //         .fromFile(csvfilepath)
    //         .then((jsonobj) => {
    //             console.log('data format ' + JSON.stringify(jsonobj));
    //             let result = dataloaderLead(jsonobj)
    //             return 'success';


    //         })

//file upload
       // const file = req.raw.files
       // console.log(file)
    //     console.log("inside file upload");
    //     console.log('data loader files upload ' + JSON.stringify(req.raw.files.file.name));
    //     console.log('body file upload ' + JSON.stringify(req.raw.files.file.name));
    //     const file = req.raw.files.file.name
    //     console.log("files upload " + file);
    //     const csvfilepath = file
    //     csvtojson()
    //         .fromFile(csvfilepath)
    //         .then((jsonobj) => {
    //             console.log('data format ' + JSON.stringify(jsonobj));
    //             let result = dataloaderLead(jsonobj)
    //             return 'success';


    //         })

//     }
//     catch (e) {
//         res.send('error ' + e.message)
//     }
// }

// module.exports={
//     fieldsUpload,uploadFile,Multer
// }

module.exports={
    fieldsUpload,Multer
}


