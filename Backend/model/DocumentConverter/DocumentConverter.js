const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { exec } = require("child_process");

const execAsync = promisify(exec);

const convertToPdf = async (docxFilePath, url) => {
  try {
    const pdfFileName =
      path.basename(docxFilePath, path.extname(docxFilePath)) + ".pdf";
    let directoryName = path.join(__dirname, "..", "..", "uploads");
    const command = `soffice --headless --convert-to pdf "${docxFilePath}" --outdir "${directoryName}"`;
    let pdflink = url + pdfFileName;
    const { stdout, stderr } = await execAsync(command);
    let pdfdata = {
      fileName: pdfFileName,
      fileUrl: pdflink,
    };
    if (stdout) {
      console.log("pdf ile ", stdout);
      return pdfdata;
    }

    if (stderr) {
      console.error("Error Output:", stderr);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const convertDocument = async (request) => {
  let result = [];
  for (const file of request.files) {
    file.fileUrl = request.protocol + "://" + request.headers.host + "/";
    let dataset = await convertToPdf(file.path, file.fileUrl);
    result.push(dataset);
  }
  return result;
};
module.exports = { convertDocument };
