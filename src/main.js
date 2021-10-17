const { Blockchain, Transaction } = require("./blockchain.js");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
///testing the blockchain as a coin
const myKey = ec.keyFromPrivate('655a9b5ec1c288dbac3e124d96849fb63cc7224275f05a77748e21f6c7be39c3');
const myWalletAddress = myKey.getPublic('hex')

let coin = new Blockchain();

const transaction1 = new Transaction(myWalletAddress,'public key of the receiver goes here',10);
transaction1.signTransaction(myKey);
// console.log(transaction1.isValid())
coin.addTransaction(transaction1);

const transaction2 = new Transaction(myWalletAddress,'public key of the receiver goes here',20);
transaction2.signTransaction(myKey);
coin.addTransaction(transaction2);



// // console.log('\n Starting the miner');
coin.minePendingTransactions(myWalletAddress);
// console.log("My Balance is ",coin.getBalanceOfAddress(myWalletAddress));
// console.log(coin)
function generateKeys() {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");
    return [privateKey,publicKey];
}
// console.log(generateKeys())
