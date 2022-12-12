const networkConfig = {
    default: {
        name : "hardhat",
        interval: "30"
    },
    31337 : {
        name : "localhost"
    },
    5 : {
        name : "goerli"
    } 
}

const developmentChain = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
    networkConfig,
    developmentChain,
    VERIFICATION_BLOCK_CONFIRMATIONS
}