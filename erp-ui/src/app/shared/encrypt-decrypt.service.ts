import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptDecryptService {

  key = CryptoJS.enc.Utf8.parse('7061737323313233');
  iv = CryptoJS.enc.Utf8.parse('7061737323313233');

  constructor() { }

  public encrypt(value: { toString: () => any; }) {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }
  public decrypt(value: { toString: () => any; }) {
    var decrypted = CryptoJS.AES.decrypt(value.toString(), this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    var decryptedValue = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedValue.toString();
  }



}
