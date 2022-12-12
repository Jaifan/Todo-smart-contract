const {developmentChain,networkConfig} = require("../../helper-hardhat-config")
const {network,deployments,ethers} = require("hardhat")
const {assert,expect} = require("chai")


!developmentChain.includes(network.name) ? describe.skip
: describe("Todo List Unit Test....!", function(){
    let accounts, deployer,todoListContract,todoList;
    beforeEach(async()=>{
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture("all")
        todoListContract = await ethers.getContract("TodoList")
        todoList = todoListContract.connect(deployer)
    })
    describe("addTask",function(){
        it("add the task with name & status pending",async()=>{
            await todoList.addTask("Jaifan")
            await todoList.addTask("Zakaria")
            expect(parseInt(await todoList.getTaskListLength(deployer.address)),2)
            const {taskName, taskStatus} = await todoList.getTaskWithIndex(0,deployer.address)
            //assert.equal(await todoList.getTaskWithIndex(0,deployer.address))
            assert.equal(taskName,'Jaifan')
            assert.equal(taskStatus,0)
        }) 
    })
})

// yarn hardhat test