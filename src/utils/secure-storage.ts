import crypto from "crypto-js";

export const encryptObject = (data: any, salt: string) => {
  return crypto.AES.encrypt(JSON.stringify(data), salt).toString();
};

export const decryptObject = (cypher: string, salt: string) => {
  if (cypher) {
    const bytes = crypto.AES.decrypt(cypher, salt);
    try {
      return JSON.parse(bytes.toString(crypto.enc.Utf8));
    } catch (err) {
      console.error(err);
      return null;
    }
  } else {
    return null;
  }
};
