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


var list = document.getElementById("output");
var result = null

//This method is searching the book
function reserch(){
	var book = document.getElementById("book");
	var author = document.getElementById("author");

	//checking that the inputs are not empty
	if((book.validity.valueMissing) || (author.validity.valueMissing)){
		alert("Merci de remplir les champs Nom du livre et Nom de l'auteur");
	} else { list.innerHTML="";
	fetch("https://www.googleapis.com/books/v1/volumes?q=" + book.value + "+inauthor:" + author.value)
	.then(a => a.json())
	.then(response =>{
		for(var i=0; i<10; i++){
			//initialize an image
			var image = "<br><img class=image-resize src= image/unavailable.jpg>"
			item = response.items[i];
			//Getting the id
			var id = "<p class = id> Id: " + item.id + "</p>"
			//Getting the description
			var text = item.volumeInfo.description
			// Getting the title
			var title = "<p class = title> Titre: " + item.volumeInfo.title + "</p>"
			//Getting the 
			var author = "<p class = author> Auteur: " + item.volumeInfo.authors + "</p>"
			//initialise a saving button
			var book = "'result" + i +"'"
			var save = "<button name= save id='save" + i +"' onclick = saving(" + book + ")>Sauvegarde</button>"
			
			
			// If the description of the book exists and put the characters length at 200.
			if (item.volumeInfo.description || text.length > 200 ) {
				text = "<p> Description: " + text.substring(0,200) + " ..." + "</p>"
			} 	else {
				text = "<p> Description: Information manquante </p>"
			}
			
			// Get the image a the book from the API
			if (item.volumeInfo.imageLinks){
				image = "<br><img class=image-resize src=" + item.volumeInfo.imageLinks.thumbnail + ".jpg>"
			} 
			var books= title + id + author + text + image + save
			result = "<div class = 'research' id='result" + i +"'>" + books + "</div>"
			list.innerHTML += result	
		}		
})
}
}
  
