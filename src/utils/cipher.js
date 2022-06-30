import { encrypt, decrypt } from 'crypto-js/aes.js'
import UTF8 from 'crypto-js/enc-utf8.js'
import pkcs7 from 'crypto-js/pad-pkcs7.js'
import ECB from 'crypto-js/mode-ecb.js'
import md5 from 'crypto-js/md5.js'
import Base64 from 'crypto-js/enc-base64.js'

export const encryptByBase64 = (text) => UTF8.parse(text).toString(Base64)

export const decryptByBase64 = (text) => Base64.parse(text).toString(UTF8)

export const encryptByMd5 = (text) => md5(text).toString()

export const createAesEncryption = (opt) => {
  const { key, iv } = opt
  return {
    key: UTF8.parse(key),
    iv: UTF8.parse(iv),
    getOptions() {
      return {
        mode: ECB,
        padding: pkcs7,
        iv: this.iv
      }
    },
    encryptByAES(text) {
      return encrypt(text, this.key, this.getOptions()).toString()
    },
    decryptByAES(text) {
      return decrypt(text, this.key, this.getOptions()).toString(UTF8)
    }
  }
}

// const AesEncryption = createAesEncryption({
//   key: '_11111000001111@',
//   iv: '@11111000001111_'
// })

// console.log(AesEncryption)

// debugger

// const enText = AesEncryption.encryptByAES('test')
// console.log(enText)
// debugger
// const deText = AesEncryption.decryptByAES(enText)
// debugger

// console.log(enText)
// console.log(deText)
// debugger
