const {network,ethers} = require("hardhat")
const {verify} = require("../utils/verify")
const {networkConfig,developmentChain,VERIFICATION_BLOCK_CONFIRMATIONS} = require("../helper-hardhat-config")

module.exports = async function({getNamedAccounts, deployments}) {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId 

    const waitConfirmations = developmentChain.includes(network.name) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS;
    log("-------------------------")
    const todo = await deploy("TodoList", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitConfirmations
    })

    if(!developmentChain.includes(network.name)) {
        log("Verifying.........")
        await verify(todo.address)
    }
}

module.exports.tags = ["all", "todo"]