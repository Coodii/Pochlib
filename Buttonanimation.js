var button = document.querySelector('input')
var container = document.getElementById("container")
var button2 = document.createElement("input")
var button3 = document.createElement("input")
var breakline = document.createElement("div")
var bookName = document.createElement("input")
var bookAuthor = document.createElement("input")
var form = document.createElement("form")
var list = document.getElementById("output")
var myList = document.getElementById("content")

button.addEventListener("click", newaction);

//This method adds the elements to research a book
function newaction() {
	
	// Create an input search for the name of the book
	container.appendChild(bookName);
	bookName.setAttribute("type", "search");
	bookName.setAttribute("placeholder", "Nom du livre");
	bookName.setAttribute("Id", "book");
	bookName.setAttribute("required","required");

	// Create an input search for the author of the book
	container.appendChild(bookAuthor);
	bookAuthor.setAttribute("type", "search");
	bookAuthor.setAttribute("placeholder", "Nom de l'auteur")
	bookAuthor.setAttribute("Id", "author")
	bookAuthor.setAttribute("required","required")

	// Create a button to search a book
	container.replaceChild(button2, button);
	button2.setAttribute("type","button")
	button2.setAttribute("name", "2");
	button2.setAttribute("onclick","reserch()")
	button2.setAttribute("value","Rechercher un nouveau livre")
	
	// Create a button to cancel the research
	container.appendChild(breakline);
	breakline.setAttribute("class", "space")
	container.appendChild(button3);
	button3.setAttribute("name", "3")
	button3.setAttribute("type","button")
	button3.setAttribute("value", "Annulez la recherche")
}



  
