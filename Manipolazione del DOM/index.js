//Crea la tua To-Do List mediante i metodi visti nel video.


let ul =document.createElement("ul")
let h1=document.querySelector("h1")

h1.insertAdjacentElement("afterend", ul);

let objectLi = []

for(let i=0; i<=2; i++)
{
  let li = document.createElement("li")
ul.appendChild(li)
objectLi.push(li)
}

objectLi.forEach(element => {
  element.classList.add("my-li");
});
ul.classList.add("my-ul");
h1.classList.add("my-h1")


objectLi[0].textContent="Hello world"
objectLi[1].textContent="Hello"
objectLi[2].textContent="World"




//Creare una lista aggiungendo il task desiderato mediante il bottone Aggiungi.

const addProduct = () => {
  
};

