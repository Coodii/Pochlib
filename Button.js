class Button {
    constructor(value,action, class1, id1) {
        this.value = value
        this.action = action
        this.class = class1
        this.id = id1
    }


//Create a button
createElement(){
        var element = document.createElement("button")
        element.setAttribute("text", this.value)
        element.setAttribute("onclick", this.action)
        element.setAttribute("class", this.class)
        element.setAttribute("id", this.id)

          return element
        }
}