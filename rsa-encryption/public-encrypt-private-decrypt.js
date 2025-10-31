const crypto = require("crypto");

const textToEncrypt = "Denaerys Targaryen";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2 * 1024,
});
const encryptedText = crypto
  .publicEncrypt(publicKey, textToEncrypt)
  .toString("base64");

console.log({
  encryptedText,
  publicKey: publicKey.export({
    type: "spki",
    format: "pem",
  }),
});

const decryptedText = crypto.privateDecrypt(
  privateKey,
  Buffer.from(encryptedText, "base64")
).toString('utf8');

console.log({
  decryptedText,
  privateKey: privateKey.export({
    type: "pkcs8",
    format: "pem",
  }),
});
