var fs = require("fs");
var path = require("path");
var encryptor = require("file-encryptor");

var key = "My Super Secret Key";
var folderPath = "./danica"; // Assuming the 'danica' folder is in the same directory as this script

// Read the contents of the folder
fs.readdir(folderPath, function (err, files) {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Loop through each file in the folder
  files.forEach(function (file) {
    var filePath = path.join(folderPath, file);
    var encryptedFilePath = filePath + ".encrypted";

    // Encrypt file.
    encryptor.encryptFile(filePath, encryptedFilePath, key, function (err) {
      if (err) {
        console.error("Encryption error for file:", filePath, err);
      } else {
        console.log("Encryption complete for file:", filePath);
        // Delete original file after encryption
        fs.unlink(filePath, function (err) {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("Original file deleted:", filePath);
          }
        });
      }
    });
  });
});
