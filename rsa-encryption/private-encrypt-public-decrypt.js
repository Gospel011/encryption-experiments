const crypto = require("crypto");

const textToEncrypt = "Denaerys Targaryen";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2 * 1024,
});
const encryptedText = crypto
  .privateEncrypt(privateKey, textToEncrypt)
  .toString("base64");

console.log({
  encryptedText,
  publicKey: privateKey.export({
    type: "pkcs8",
    format: "pem",
  }),
});

const decryptedText = crypto.publicDecrypt(
  publicKey,
  Buffer.from(encryptedText, "base64")
).toString('utf8');

console.log({
  decryptedText,
  privateKey: publicKey.export({
    type: "spki",
    format: "pem",
  }),
});
