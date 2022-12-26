// const Multer = require('fastify-multer')
// const path = require('path')
// var storage = Multer.diskStorage({
//     destination: (req, file, cb) => {
//         const ROOT_PATH = __dirname
//         console.log("Root path " + ROOT_PATH);
//         console.log("directory name of path ", path.dirname(ROOT_PATH))
//         console.log("inside destination folder " + JSON.stringify(file));
//         cb(null, path.dirname(ROOT_PATH))
//     },
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             file.originalname + '-' + Date.now()
//         );
//     }
// })

// var upload = Multer({
//     storage: storage,
// })

// let fieldsUploadfile = upload.single('file')

// const uploaddata = async (req, res) => {
//     console.log("inside file uploader task data");
//     //multer
//     console.log(req.file.filename);

//     try {
        
//         console.log("inside upload fuile");
//         console.log('data loader files ' + JSON.stringify(req.file.filename));
//     }
//     catch (e) {
//         res.send('error ' + e.message)
//     }
// }

// module.exports={
//     fieldsUploadfile,uploaddata,Multer
// }


