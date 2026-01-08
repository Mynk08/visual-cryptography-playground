// RSA Visualization
class RSAVisualizer {
    constructor(bits = 1024) {
        this.bits = bits;
        this.p = null;
        this.q = null;
        this.n = null;
        this.e = 65537; // Common public exponent
        this.d = null;
    }

    generatePrimes() {
        // Generate large primes p and q
        this.p = this.generatePrime(this.bits / 2);
        this.q = this.generatePrime(this.bits / 2);
        this.n = this.p * this.q;

        return { p: this.p, q: this.q, n: this.n };
    }

    computePrivateKey() {
        const phi = (this.p - 1) * (this.q - 1);
        this.d = this.modInverse(this.e, phi);
        return { d: this.d, e: this.e, n: this.n };
    }

    encrypt(message) {
        // m^e mod n
        return this.modPow(message, this.e, this.n);
    }

    decrypt(ciphertext) {
        // c^d mod n
        return this.modPow(ciphertext, this.d, this.n);
    }

    modPow(base, exp, mod) {
        let result = 1;
        base = base % mod;
        while (exp > 0) {
            if (exp % 2 === 1) result = (result * base) % mod;
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
        }
        return result;
    }

    visualizeEncryption(message) {
        return {
            step: 'encryption',
            message: message,
            publicKey: { e: this.e, n: this.n },
            ciphertext: this.encrypt(message),
            formula: `${message}^${this.e} mod ${this.n}`
        };
    }
}

module.exports = RSAVisualizer;
