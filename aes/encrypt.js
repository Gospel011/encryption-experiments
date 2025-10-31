const crypto = require("crypto");
const fs = require("fs");

const [, , keyInput, ,fileName, , outputFile] = process.argv; // --key=key -i file.ext -o output.txt
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
// console.log({args: process.argv})

function encryptFile() {
  if (!fileName) {
    console.log("Please specify an input file");
    process.exit(1);
  }
  if (!outputFile) {
    console.log("please specify an output file");
    process.exit(1);
  }
  const file = fs.readFileSync(fileName, "utf8");
  const iv = crypto.randomBytes(16).toString("hex");

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );

  const encryptedText = `${iv}:${cipher.update(
    file,
    "utf8",
    "hex"
  )}${cipher.final("hex")}`;

  fs.writeFileSync(outputFile, encryptedText);
}

encryptFile();
