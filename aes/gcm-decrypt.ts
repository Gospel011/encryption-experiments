import crypto from 'crypto';
const KEY = Buffer.from(
  "6dc7744fd7fd1a120e78858f0658768101da5710748a632d6497cfc09eef06d2",
  "hex"
);

function decrypt(encryptedText: string) {
  const [iv, authTag, encrypted] = encryptedText.split(":");
  const ivBuffer = Buffer.from(iv, 'hex');
  const authBuffer = Buffer.from(authTag, 'hex')
  const encryptedTextBuffer = Buffer.from(encrypted, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, ivBuffer)
  decipher.setAuthTag(authBuffer)

  const decrypted = Buffer.concat([decipher.update(encryptedTextBuffer), decipher.final()]).toString('utf8')

  return decrypted;
}


console.log(decrypt("1fcccc77a98dec7b3f6d2c69:4395e135a6c2649bd160fc3dc5a408d7:4688657ce6e4f9da490d6f"))