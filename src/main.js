const { Blockchain, Transaction } = require("./blockchain.js");
const EC = require("elliptic").ec;
const ec = new EC('secp256k1');
let privateKey;
let publicKey;


///testing the blockchain as a coin
// const myKey = ec.keyFromPrivate('655a9b5ec1c288dbac3e124d96849fb63cc7224275f05a77748e21f6c7be39c3');
// const myWalletAddress = myKey.getPublic('hex')

let coin;


// const transaction1 = new Transaction(myWalletAddress,'public key of the receiver goes here',10);
// transaction1.signTransaction(myKey);
// // console.log(transaction1.isValid())
// coin.addTransaction(transaction1);

// const transaction2 = new Transaction(myWalletAddress,'public key of the receiver goes here',20);
// transaction2.signTransaction(myKey);
// coin.addTransaction(transaction2);



// // // console.log('\n Starting the miner');
// coin.minePendingTransactions();
// console.log("My Balance is ",coin.getBalanceOfAddress(myWalletAddress));
// console.log(coin)



function createCoin() {

let name = document.getElementById("name").value;
let abbr = document.getElementById("abbr").value;
let difficulty = document.getElementById("difficulty").value;
let reward = document.getElementById("reward").value;
let start = document.getElementById("start").value;


coin = new Blockchain(name,abbr,difficulty,reward,start,publicKey);
return coin;
}


function generateKeys() {
    const key = ec.genKeyPair();
    publicKey = key.getPublic("hex");
    privateKey = key.getPrivate("hex");
    return [privateKey,publicKey];
}
