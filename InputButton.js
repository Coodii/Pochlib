class InputButton {
    constructor(value,action,className) {
        this.value = value
        this.action = action
        this.className = className
    }


//Create a button
createElement(){
        var element = document.createElement("input")
        element.setAttribute("type", "button")
        element.setAttribute("value", this.value)
        element.setAttribute("onclick", this.action)
        element.setAttribute("class", this.className)
          return element
        }
}
