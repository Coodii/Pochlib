class ResearchInput {
    constructor(id,placeholder) {
        this.id = id
        this.placeholder = placeholder
    }


//Create a research input
createElement(){
        var element = document.createElement("input")
        element.setAttribute("type", "search")
        element.setAttribute("required", "required")
        element.setAttribute("Id", this.id )
        element.setAttribute("placeholder", this.placeholder)
          return element
        }
}
