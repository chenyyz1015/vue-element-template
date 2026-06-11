import CryptoJS from "crypto-js";

/** 加密密钥（生产环境应通过环境变量注入） */
const SECRET_KEY = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_SECRET);
const SECRET_IV = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_IV);

// ==================== Base64 ====================

/** Base64 编码 */
export const base64Encode = (value: string): string => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
};

/** Base64 解码 */
export const base64Decode = (value: string): string => {
  return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
};

// ==================== AES ====================

/** AES 加密 */
export const encrypt = (value: string): string => {
  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/** AES 解密 */
export const decrypt = (value: string): string => {
  const decrypted = CryptoJS.AES.decrypt(value, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// ==================== 对象快捷加解密 ====================

/** 加密对象 */
export const encryptObj = <T extends Record<string, unknown>>(obj: T): string => {
  return encrypt(JSON.stringify(obj));
};

/** 解密为对象 */
export const decryptObj = <T extends Record<string, unknown>>(value: string): T => {
  return JSON.parse(decrypt(value));
};

// ==================== 哈希 ====================

/** MD5 哈希 */
export const md5 = (value: string): string => {
  return CryptoJS.MD5(value).toString();
};

/** SHA256 哈希 */
export const sha256 = (value: string): string => {
  return CryptoJS.SHA256(value).toString();
};
