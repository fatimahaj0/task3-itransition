const crypto = require('crypto');

class HMACGenerator {
    constructor(length = 64, algorithm = 'sha256') {
        this.length = length;
        this.algorithm = algorithm;
    }

    generateRandomKey() {
        return crypto.randomBytes(Math.ceil(this.length / 2)).toString('hex').slice(0, this.length);
    }

    generateHMAC(message) {
        const secretKey = this.generateRandomKey();
        const hmac = crypto.createHmac(this.algorithm, secretKey);
        hmac.update(message);
        const hash = hmac.digest('hex');
        return { key: secretKey, hmac: hash };
    }
}
module.exports = HMACGenerator;