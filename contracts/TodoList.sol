// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

error  TodoList__TaskNameMinimumThree();

contract TodoList {
    
    /*----Type declarations-----*/
    enum TaskStatus {PENDING, DONE}
    
    struct Task {
        string taskName;
        TaskStatus taskStatus; 
    }

    /*-----Variables-----*/
    mapping (address => Task[]) taskList;

    /*-----Functions-----*/
    constructor() {

    }

    function addTask(string memory taskName) public {
        if( bytes(taskName).length < 3) {
            revert TodoList__TaskNameMinimumThree();
        }
        taskList[msg.sender].push(Task(taskName,TaskStatus.PENDING));
    }

    function editTaskStatus(uint256 taskIndex) public {
        
    }

    /*-----get/pure Funcions-----*/
    function getAddressTaskList() public view returns(Task[] memory) {
        return taskList[msg.sender];
    }
    function getTaskWithIndex(uint256 taskIndex) public view returns(Task memory) {
        return getAddressTaskList()[taskIndex];
    }
}