const crypto = require("crypto");
const fs = require("fs");

const [, , keyInput, , fileName, , outputFile] = process.argv; // --key=key -i file.ext -o output.txt
if (!keyInput) {
  console.log("Please specify your encryption key");
  process.exit(1);
}
const [, key] = keyInput.split("--key=");

if (!key) {
  console.log("Invalid key");
  process.exit(1);
}

if (!fileName) {
  console.log("Please specify an input file");
  process.exit(1);
}
if (!outputFile) {
  console.log("please specify an output file");
  process.exit(1);
}

function decryptFile() {
  const file = fs.readFileSync(fileName, "utf8");
  const [iv, encryptedFile] = file.split(":");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  let decryptedText = decipher.update(encryptedFile.trim(), "hex", "utf8");
  decryptedText += decipher.final("utf8");

  fs.writeFileSync(outputFile, decryptedText);
}

decryptFile();
