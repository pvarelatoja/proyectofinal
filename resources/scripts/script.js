var people =[{"Name": "usuario1@usuario.com", "Psw":"usuario1"}]


var books = [];
var booksSvc = new booksService();

// carga inicial de datos
booksSvc.getBooks().then(function (res) {
    books = res.data;
    renderTable(books);
});

function verification(event, person){
    event.preventDefault();
    var name = document.getElementById("userMail").value;
    var password = document.getElementById("userPsw").value;

    var person = {Name: name, Psw: password};

    var i = 0;     
    while ((i <= people.length)&&(person.Name!=people[i].Name)){
        i++;
    }
    if ((i <= people.length)&&(person.Psw == people[i].Psw)){
            window.location = "pages/firstPage.html"
    }
    else{
        alert("Usuario incorrecto");
    }; 
}

function newUser(event, person){
    event.preventDefault();
    var NewUserName = document.getElementById("New_userName").value;
    var NewUserEmail = document.getElementById("New_userMail").value;
    var NewUserPassword = document.getElementById("New_userPsw").value;

    var newPerson = {name: NewUserEmail, Psw: NewUserPassword};

    people.push(newPerson);
    
    window.location = "pages/firstPage.html"
}


function AddToList(event, form){ 
    event.preventDefault();

    //obtengo datos del libro
    var list = document.getElementById("list").value; 
    var bookName = document.title;
    var bookAuthor = document.getElementById("autor").value;
    var bookWindow = window.location.href;
  
    if (list.value = "Quiero leerlo"){
    //me fijo si el libro ya esta en la base
     var existingBook = getBook(bookName);

    // si esta cargado?
    if (existingBook != undefined) {
        existingBook.name = bookName;
        existingBook.author = bookAuthor;
        existingBook.window = bookWindow;
    } else
    // si no esta cargada
    {      
         var book = {
             name: bookName,
             author: bookAuthor,
             window: bookWindow
             };

         booksSvc.addBook(book)
            // si el request se ejecutó correctamente
            .then(function (res) {
                var addedBook = res.data;
                // agrego la pelicula al array
                books.push(addedBook);
                // la agrego a la tabla
                addBookToTable(addedBook);
            })
    }
};
}
   

function addBookToTable(book) {
    var tableBody = document.getElementById("WishedBooks");
    for(var i = 0; i < books.length; i++){

    var newBookRow = tableBody.insertRow();
    newBookRow.classList.add('text-center');
    
    var nameCell = newBookRow.insertCell(0);
    nameCell.innerHTML = "<a href="+ book.window +">"+ book.name + "</a>";

    var authorCell = newBookRow.insertCell(1);
    authorCell.innerHTML = book.author;
    }
}
        

function getBook(bookName) {
    return books.find(function (bookName) {
        for (var i =0; i < books.length; i++){
        return (books[i].name.toLowerCase() == bookName.toLowerCase());}
    });
}

function renderTable(books){
    var tableBody = document.getElementById('WishedBooks');
    tableBody.innerHTML = "";

    books.forEach(function(book) {
        addBookToTable(book);
    });
}

