/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var transactionList = [];
var transactionNumber = 3;
class BookTransaction {
    constructor(bookId, userId, issueDate, dueDate, transactionId, transactionStatus) {
        this.bookId = bookId;
        this.userId = userId;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.transactionId = transactionId;
        this.transactionStatus = transactionStatus;
    }
    static addTransaction(bookId, userId, issueDate, dueDate, transactionId, transactionStatus) {
        var newBookTransaction = new BookTransaction(bookId, userId, issueDate, dueDate, transactionId, transactionStatus);
        transactionList.push(newBookTransaction);
        Book.borrowedBook(bookId);
        return newBookTransaction;
    }

    static changeTransactionStatus(transactionId) {
        for (var i = 0; i < transactionList.length; i++) {
            if (transactionId == transactionList[i].transactionId && transactionList[i].transactionStatus) {
                transactionList[i].transactionStatus = false;
                Book.receiveBook(transactionList[i].bookId);
                alert(transactionId+" is returned successfully");
                break;
            }
        }
    }
}

//predefined transaction
BookTransaction.addTransaction("BKIF02", "18IT104", "2021-06-16", "2021-07-09", "TRHS1", true);
BookTransaction.addTransaction("BKUS01", "18IT101", "2021-06-16", "2021-07-09", "TR183", true);

var issueBookButton = document.getElementById("issueBookButton");
issueBookButton.addEventListener("click", addNewTransaction);
document.getElementById("dueDate").setAttribute("min", getTodayDate());

function addNewTransaction() {
    var bookId = document.getElementById("bookListDropdown").value;
    var userId = document.getElementById("userListDropdown").value;
    var dueDate = document.getElementById("dueDate").value;
    issueDate = getTodayDate();
    transactionId = "TR" + bookId.slice(2, 4) + transactionNumber;
    var transactionStatus = true;
    var newBookTransaction = BookTransaction.addTransaction(bookId, userId, issueDate, dueDate, transactionId, transactionStatus);
    var transactionListTable = document.getElementById("transactionListBody");
    // printTransaction(transactionListTable, newBookTransaction);
    printTransactionLoop(transactionListTable);
    alert(bookId + "is issued successfully to" + userId);
    clearTransactionData();
    addSelectOption();

}

function printTransactionLoop(transactionListTable) {
    for (var i = transactionListTable.rows.length - 1; i >= 0; i--) {
        transactionListTable.deleteRow(i);
    }
    for (var i = 0; i < transactionList.length; i++) {
        var newRow = transactionListTable.insertRow(i);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.innerHTML = transactionList[i].transactionId;
        cell2.innerHTML = transactionList[i].bookId;
        cell3.innerHTML = transactionList[i].userId;
        cell4.innerHTML = transactionList[i].issueDate;
        cell5.innerHTML = transactionList[i].dueDate;
        cell6.innerHTML = (transactionList[i].transactionStatus == true)? "Live": "Completed";
        
    }
    changeBookDetails();
}

function clearTransactionData() {
    document.getElementById("bookListDropdown").value = "";
    document.getElementById("userListDropdown").value = "";
    document.getElementById("dueDate").value = "";
}

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    return yyyy + '-' + mm + '-' + dd;
}

function addSelectOption() {
    $("#transactionListBody tr").click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var value = $(this).find('td:first').html();
    });
}


function endTransaction(transactionId) {
    BookTransaction.changeTransactionStatus(transactionId);
    var transactionListTable = document.getElementById("transactionListBody");
    printTransactionLoop(transactionListTable);
    addSelectOption();
}

function changeBookDetails() {
    var bookListTable = document.getElementById("bookList");
    var bookListDropdown = document.getElementById("bookListDropdown");
    printBookLoop(bookListTable, bookListDropdown);
}