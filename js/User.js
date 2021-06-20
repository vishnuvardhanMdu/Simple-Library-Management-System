/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userList = [];
var userCount = 3;
class User {
    constructor(userName, userId) {
        this.userName = userName;
        this.userId = userId;
        this.fine = 0;
    }
    static newUser(userName, userId) {
        var newUser = new User(userName, userId);
        userList.push(newUser);
        return newUser;
    }
}

//predefined users
User.newUser("Kumar", "18IT101");
User.newUser("Ramesh", "18IT104");

var addUserButton = document.getElementById("addUserButton");
addUserButton.addEventListener("click", addNewUser);

function addNewUser() {

    var userName = document.getElementById("userName").value;
    var userId = document.getElementById("userId").value;
    var userListTable = document.getElementById("userList");
    var newUser = User.newUser(userName, userId);
    var userListDropdown = document.getElementById("userListDropdown");
    alert(userName + " is added successfully");
    printUser(userListTable, userListDropdown, newUser);
    clearUserData();
}


function printUser(userListTable, userListDropdown, user) {
    var newRow = userListTable.insertRow(userCount);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = user.userId;
    cell2.innerHTML = user.userName;
    userCount++;

    
    var option = document.createElement("OPTION");
    option.innerHTML = user.userId +" ("+user.userName+")";
    option.value = user.userId;
    userListDropdown.options.add(option);
}

function clearUserData() {
    document.getElementById("userName").value = "";
    document.getElementById("userId").value = "";
}