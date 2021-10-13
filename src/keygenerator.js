const EC = require("elliptic").ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");
console.log();
console.log("private Key = " + privateKey);
console.log()
console.log("public key = " + publicKey)

// private Key = 655a9b5ec1c288dbac3e124d96849fb63cc7224275f05a77748e21f6c7be39c3

// public key = 0440deccb21fcbccfb1813c3cb3597532fca9e6e92dce7c696fc04a08f48a2f95b33106ac44bcf0437c64608d8f64cced411ee971fd866c82633e092aa533aff80