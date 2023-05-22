
const inputElement = document.getElementById("myInput")


inputElement.style.minWidth = "100px"
inputElement.style.maxWidth = "300px"


inputElement.addEventListener("input", function() {
  this.style.width = this.value.length + "ch"
})

