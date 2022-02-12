const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor (formAddress, toAddress){}
}

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;  // if we do not add it then the hash value of the block will not change
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currBlock = this.chain[i];
            const prev = this.chain[i-1];

            if(currBlock.hash != currBlock.calculateHash()){
                return false;
            }
    
            if(currBlock.previousHash != prev.hash){
                return false;
            }
        }

        return true;
    }
}

let adiCoin = new BlockChain();
console.log("Mining block 1....");
adiCoin.addBlock(new Block(1, "07/02/2022", {amount: 4}));

console.log("Mining block 2....");
adiCoin.addBlock(new Block(2, "09/02/2022", {amount: 10}));
