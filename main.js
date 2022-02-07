const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.claculateHash();
    }

    claculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previous = this.getLatestBlock().hash;
        newBlock.hash = newBlock.claculateHash();
        this.chain.push(newBlock);
    }
}

let adiCoin = new BlockChain();
adiCoin.addBlock(new Block(1, "07/02/2022", {amount: 4}));
adiCoin.addBlock(new Block(2, "09/02/2022", {amount: 10}));

console.log(JSON.stringify(adiCoin, null, 4));