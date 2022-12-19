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
            assert.equal(taskName,'Jaifan')
            assert.equal(taskStatus,0)
        }) 
        it("task name length should be more than or equal three character",async()=>{
            await expect(todoList.addTask("Ji")).to.be.revertedWith("TodoList__TaskNameMinimumThree")
            await expect(todoList.addTask("")).to.be.revertedWith("TodoList__TaskNameMinimumThree")
        })
        it("an event excuted right after taskn  register",async()=>{
            await expect(todoList.addTask("Mr Github")).to.emit(todoList,"AddTask")  
        })
    })

    describe("editTaskStatus",function(){
        it("task index should be valid",async()=>{
            await expect(todoList.editTaskStatus(0)).to.be.revertedWith("TodoList__TaskIndexInvalid") 
        })
        it("task status should change",async()=>{
            await todoList.addTask("Jaifan")
            await todoList.addTask("Zakaria")
            await todoList.editTaskStatus(1)
            const {taskStatus} = await todoList.getTaskWithIndex(1,deployer.address)
            assert(taskStatus,1)      
        })
    })

    describe("editTaskName",function(){
        it("task index should be valid",async()=>{
            await todoList.addTask("Hello")
            await expect(todoList.editTaskName(1,"Jaifan")).to.be.revertedWith("TodoList__TaskIndexInvalid")
        })
        it("edit name should be more than or equal three chacter",async()=>{
            await todoList.addTask("Hello")
            await expect(todoList.editTaskName(0,"J")).to.be.revertedWith("TodoList__TaskNameMinimumThree")
        })
        it("edit name successfully",async()=>{
            await todoList.addTask("Hello")
            await todoList.editTaskName(0,"Hello Jaifan")
            const {taskName} = await todoList.getTaskWithIndex(0,deployer.address)
            assert(taskName,"Hello Jaifan")
        })
    })
    
    describe("taskDelete",function(){
        it("task index should be valid",async()=>{
            await todoList.addTask("Hello")
            await expect(todoList.taskDelete(1)).to.be.revertedWith("TodoList__TaskIndexInvalid")
        })
        it("delete the task successfully",async()=>{
            await todoList.addTask("Hello")
            await todoList.addTask("Hello2")
            await todoList.addTask("Hello3")
            await todoList.addTask("Hello4")
            await todoList.taskDelete(1)
            await todoList.taskDelete(0)
            const length = parseInt(await todoList.getTaskListLength(deployer.address))
            assert(2,length)
        })
    })
})

// yarn hardhat test