var breakline = document.createElement("div");
var myList = document.getElementById("content");
var list = document.getElementById("output");
var container = document.getElementById("container");

//This method adds the elements to research a book
function addABook() {
  var addButton = document.getElementById("btn");
  container.removeChild(addButton);
  // Create an input search for the name of the book
  var bookName = new ResearchInput("book", "Nom du livre").createElement();
  container.appendChild(bookName);
  // Create an input search for the author of the book
  var bookAuthor = new ResearchInput(
    "author",
    "Nom de l'auteur"
  ).createElement();
  container.appendChild(bookAuthor);
  // Create a button to search a book
  var researchButton = new InputButton(
    "Rechercher un nouveau livre",
    "research()",
    "btn",
    "1"
  ).createElement();
  container.appendChild(researchButton);
  // Create a button to cancel the research
  var cancelButton = new InputButton(
    "Annulez la recherche",
    "cancelResearch()",
    "cancel",
    "2"
  ).createElement();
  container.appendChild(cancelButton);
}

//This method cancel the research
function cancelResearch() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.innerHTML =
    "<button class='btn' id='btn' onclick='addABook()'>Ajouter un livre</button";
  list.innerHTML = "";
}

//This method is searching the book
function research() {
  list.innerHTML = "";
  var bookInput = document.getElementById("book");
  var authorInput = document.getElementById("author");
  //checking that the inputs are not empty
  if (book.validity.valueMissing || author.validity.valueMissing) {
    alert("Merci de remplir les champs Nom du livre et Nom de l'auteur");
  } else {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        bookInput.value +
        "+inauthor:" +
        authorInput.value
    )
      .then((a) => a.json())
      .then((response) => {
        if (response.items === undefined) {
          alert("Pas de livre trouvé");
        } else {
          for (var bookId = 0; bookId < 10; bookId++) {
            var item = response.items[bookId];
            var books = document.createElement("div");
            books.setAttribute("class", "research");
            books.setAttribute("id", item.id);
            //Getting the id
            var id = document.createElement("p");
            id.innerHTML = "Id: " + item.id;
            id.setAttribute("class", "id");
            //Getting the description
            var description = document.createElement("p");
            description.setAttribute("class", "description");
            var text = item.volumeInfo.description;
            // If the description of the book exists and put the characters length at 200.
            if (text) {
              description.innerHTML =
                "Description: " + text.substring(0, 200) + " ...";
            } else {
              description.innerHTML = "Description: Information manquante";
            }
            // Getting the title
            var title = document.createElement("p");
            title.setAttribute("class", "title");
            title.innerHTML = "Titre: " + item.volumeInfo.title;
            //Getting the author
            var author = document.createElement("p");
            author.setAttribute("class", "author");
            author.innerHTML = "Auteur: " + item.volumeInfo.authors;
            //Getting the image
            var image = document.createElement("img");
            image.setAttribute("class", "image-resize");
            image.setAttribute("alt", item.id);
            if (item.volumeInfo.imageLinks) {
              var bookImage = item.volumeInfo.imageLinks.thumbnail + ".jpg";
              image.setAttribute("src", bookImage);
            } else {
              image.setAttribute("src", "image/unavailable.jpg");
            }
            //Initialise the button
            var saveButton = new Button(
              null,
              "saving(" + item.id + ")",
              "button"
            ).createElement();
            saveButton.innerHTML = '<i class="fas fa-bookmark"></i>';
            //Creating the result
            books.appendChild(title);
            books.appendChild(saveButton);
            books.appendChild(id);
            books.appendChild(author);
            books.appendChild(image);
            books.appendChild(description);
            list.appendChild(books);
          }
        }
      });
  }
}

//This method saves the book
function saving(bookId) {
  var book = bookId.getAttribute("id");
  var bookInfo = document.getElementById(book);
  var button = bookInfo.childNodes[1];
  var key = book;
  //Create a button to unsave the book
  var unsaveButton = new Button(
    null,
    "unsave(" + book + ")",
    "button"
  ).createElement();
  unsaveButton.innerHTML = '<i class="far fa-trash-alt"></i>';
  //Replace the save button with an unsave button
  bookInfo.replaceChild(unsaveButton, button);
  //Copy the book
  var bookInfoCopy = bookInfo.cloneNode(true);
  bookInfoCopy.setAttribute("class", "saving");
  bookInfoCopy.setAttribute("id", book);
  //Add the book to the "content" div
  myList.appendChild(bookInfoCopy);
  sessionStorage.setItem(key, bookInfoCopy.innerHTML);
}

function displaySavingBooks() {
  var allKeys = Object.keys(sessionStorage);
  allKeys.forEach((element) => {
    var books = sessionStorage.getItem(element);
    var book = document.createElement("div");
    book.setAttribute("class", "saving");
    book.setAttribute("id", element);
    book.innerHTML += books;
    myList.appendChild(book);
  });
}

function unsave(book) {
  if (book[1]) {
    var bookToRemove = book[1];
    var bookToAdd = book[0];
    var key = bookToRemove.id;
    var button = bookToAdd.childNodes[1];
    var saveButton = new Button(
      null,
      "saving(" + key + ")",
      "button"
    ).createElement();
    saveButton.innerHTML = '<i class="fas fa-bookmark"></i>';
    bookToAdd.replaceChild(saveButton, button);
  } else {
    bookToRemove = book;
    key = book.id;
  }
  sessionStorage.removeItem(key);
  bookToRemove.remove();
}
