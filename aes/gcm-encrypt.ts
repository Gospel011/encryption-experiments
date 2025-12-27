import crypto from 'crypto';

const KEY = Buffer.from("6dc7744fd7fd1a120e78858f0658768101da5710748a632d6497cfc09eef06d2", 'hex');

function encrypt(text:string) {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv)

    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()])

    const authTag = cipher.getAuthTag()

    const payload = `${iv.toString('hex')}:${authTag.toString('hex')}:${encryptedText.toString('hex')}`

    return payload;    
}




console.log(encrypt('HELLO WORLD'));


