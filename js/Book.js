var bookList = [];
var bookCount = 3;
class Book {
    constructor(bookId, bookName, bookAuthor, bookPublisher, bookSubject, bookCopiesCount) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPublisher = bookPublisher;
        this.bookSubject = bookSubject;
        this.bookCopiesCount = bookCopiesCount;
    }

    static newBook(bookId, bookName, bookAuthor, bookPublisher, bookSubject, bookCopiesCount) {
        var newBook = new Book(bookId, bookName, bookAuthor, bookPublisher, bookSubject, bookCopiesCount);
        bookList.push(newBook);
        return newBook;
    }

    static borrowedBook(bookId) {
        for (var i = 0; i < bookList.length; i++) {
            if (bookId == bookList[i].bookId) {
                bookList[i].bookCopiesCount--;
                break;
            }
        }
    }

    static receiveBook(bookId){
        for (var i = 0; i < bookList.length; i++) {
            if (bookId == bookList[i].bookId) {
                bookList[i].bookCopiesCount++;
                break;
            }
        }
    }
}

//predefined books
Book.newBook("BKUS01", "Little Leaders", "Shiv Khera", "Macmillan Pub. India Ltd.", "Novel", 7);
Book.newBook("BKIF02", "Junior Knowledge", "Rama Gupta", "Madhuban Educational Books", "Knowledge", 4);
var addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", addNewBook);

function addNewBook() {
    var bookName = document.getElementById("bookName").value;
    var bookId = "BK" + bookName.slice(0, 2) + bookCount;
    var bookAuthor = document.getElementById("bookAuthor").value;
    var bookPublisher = document.getElementById("bookPublisher").value;
    var bookSubject = document.getElementById("bookSubject").value;
    var bookCopiesCount = document.getElementById("bookCopiesCount").value;
    var newBook = Book.newBook(bookId, bookName, bookAuthor, bookPublisher, bookSubject, bookCopiesCount);
    var bookListTable = document.getElementById("bookList");
    var bookListDropdown = document.getElementById("bookListDropdown");
    // printBook(bookListTable, bookListDropdown, newBook);
    printBookLoop(bookListTable, bookListDropdown);
    alert(bookName + " is added successfully");
    clearBookData();

    //dropdown

}

function clearBookData() {
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPublisher").value = "";
    document.getElementById("bookSubject").value = "";
    document.getElementById("bookCopiesCount").value = "";
}

// function printBook(bookListTable, bookListDropdown, book) {

//     var newRow = bookListTable.insertRow(bookCount);
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     var cell3 = newRow.insertCell(2);
//     var cell4 = newRow.insertCell(3);
//     var cell5 = newRow.insertCell(4);
//     var cell6 = newRow.insertCell(5);

//     cell1.innerHTML = book.bookId;
//     cell2.innerHTML = book.bookName;
//     cell3.innerHTML = book.bookAuthor;
//     cell4.innerHTML = book.bookPublisher;
//     cell5.innerHTML = book.bookSubject;
//     cell6.innerHTML = book.bookCopiesCount;
//     bookCount++;


//     var option = document.createElement("OPTION");
//     option.innerHTML = book.bookId;
//     option.value = book.bookId;
//     bookListDropdown.options.add(option);
// }

function printBookLoop(bookListTable, bookListDropdown) {
    bookListDropdown.innerHTML = null
    for (var i = bookListTable.rows.length - 1; i > 0; i--) {
        bookListTable.deleteRow(i);
    }
    for (var i = 0; i < bookList.length; i++) {
        var newRow = bookListTable.insertRow(i + 1);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.innerHTML = bookList[i].bookId;
        cell2.innerHTML = bookList[i].bookName;
        cell3.innerHTML = bookList[i].bookAuthor;
        cell4.innerHTML = bookList[i].bookPublisher;
        cell5.innerHTML = bookList[i].bookSubject;
        cell6.innerHTML = bookList[i].bookCopiesCount;

        if (bookList[i].bookCopiesCount > 0) {
            var option = document.createElement("OPTION");
            option.innerHTML = bookList[i].bookId +" ("+bookList[i].bookName+")";
            option.value = bookList[i].bookId;
            bookListDropdown.options.add(option);
        }
    }
}



