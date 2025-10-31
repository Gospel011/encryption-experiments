const crypto = require("crypto");

const textToEncrypt = "HELLO HUMANSdow-f";

const key = crypto.randomBytes(32).toString("hex"); // would be stored as string anyways so I'm just simulating how it would be in real life
const iv = crypto.randomBytes(16).toString("hex"); // same for this

const cipher = crypto.createCipheriv(
  "aes-256-cbc",
  Buffer.from(key, "hex"), // would be converted back to buffer here
  Buffer.from(iv, "hex") // same for this
);
let encryptedText = cipher.update(textToEncrypt, "utf8", "hex");
encryptedText += cipher.final("hex");
console.log({ encryptedText });

const decipher = crypto.createDecipheriv(
  "aes-256-cbc",
  Buffer.from(key, "hex"),
  Buffer.from(iv, "hex")
);
let decryptedText = decipher.update(encryptedText, "hex", "utf8");
decryptedText += decipher.final("utf8");

console.log({
  encryptedText: `${iv}:${encryptedText}`,
  decryptedText,
  textToEncrypt,
});
