
const carrello = []
async function prodotti(url) {
    
    try {
        

        const response = await fetch(url)
        const data = await response.json()
        const griglia = document.getElementById("contenitore-prodotti")
        const nav = document.querySelector("nav")
        const aside = document.querySelector(".contenitore-categorie")

        

        
//button carrello


        const buttonCarrello = document.createElement("button")

        buttonCarrello.classList.add("buttonCarrello")

        buttonCarrello.innerText="Carrello"

        nav.appendChild(buttonCarrello)

        buttonCarrello.addEventListener("click", () => {
            griglia.innerHTML =""
            carrello.forEach(element => {
                const grigliaCarrello = creacard(element)
                
                const inputCheck = document.createElement("input")
                const removeCarrello = document.createElement("button")

                removeCarrello.classList.add("remove")

                inputCheck.setAttribute("type", "checkbox")

                removeCarrello.innerText="Rimuovi"

                griglia.appendChild(grigliaCarrello)
                griglia.appendChild(inputCheck)
                griglia.appendChild(removeCarrello)

                if(inputCheck.checked){
                    const variabile = carrello.filter(element => element.checked)

                }

                removeCarrello.addEventListener("click", () => {
                   
                    carrello.removeChild(variabile)
                    
                    
                });

                
            })


        })

        //fine button carrello



        
 

        

        if(!response.ok){
            console.error(error)
            return
        }

        const categorieViste = {} 





const divNuovo = document.createElement("div");
const h3Nuovo = document.createElement("h3");
divNuovo.classList.add("divCategoria");


h3Nuovo.innerText = "All";

divNuovo.addEventListener("click", () => {
    griglia.innerHTML= "";
    data.forEach(element =>  
  {  const prodottiNuovo = creacard(element)
            griglia.appendChild(prodottiNuovo)})

})

aside.appendChild(divNuovo);
divNuovo.appendChild(h3Nuovo)

        
        function filtraCategorie(selezione){
            griglia.innerHTML= "";
            const filtratore =  data.filter(x => x.category === selezione)

            filtratore.forEach(element => {
                const datoFiltrato = creacard(element)
                griglia.appendChild(datoFiltrato)

            })
        }

        data.forEach(element => 
{
    if(!categorieViste[element.category]){ //Se la categoria non esiste, creo un elemento, con la categoria all'interno, categorieViste[element.category] ogni volta che trova una categoria mette true, quando non ha la categoria, rifa il procedimento
            const categoria = creaCategoria(element.category)
            categorieViste[element.category]
            aside.appendChild(categoria)
            categorieViste[element.category] = true;

            categoria.addEventListener("click", ()=>{
                    filtraCategorie(element.category)

            })
           
        }
            

           //const tutto = tutteCategorie(element)
           // aside.appendChild(tutto)//
            
            const prodotti = creacard(element)
            griglia.appendChild(prodotti)
        
        }
            
    );        
    } catch (error) {
        console.error(error);
    }
}


   
   prodotti("https://fakestoreapi.com/products")

function creacard(obj) {
    const div = document.createElement("div")
    const img = document.createElement("img")
    const titolo = document.createElement("h3")
    const descrizione = document.createElement("p")
    const prezzo = document.createElement("p")
    const acquista = document.createElement("button")
    const preferiti = document.createElement("button")
    

    div.classList.add("box")
    img.classList.add("box-img")
    acquista.classList.add("bottone-acquisti")
    preferiti.classList.add("bottone-pref")
    prezzo.classList.add("prezzo")
    titolo.classList.add("titolo")
    descrizione.classList.add("descrizione")
    

    img.src = obj.image
    img.alt = obj.title
    titolo.innerText = obj.title
    descrizione.innerText = obj.description
    prezzo.innerText = obj.price
    acquista.innerText = "🛒Acquista"
    preferiti.innerText = "❤️Preferiti"

    acquista.addEventListener("click", () => {
    carrello.push(obj)
    });
    
    

    div.appendChild(img)
    div.appendChild(titolo)
    div.appendChild(descrizione)
    div.appendChild(prezzo)
    div.appendChild(acquista)
    div.appendChild(preferiti)

   
    

    return div

}


function creaCategoria(x){
const divCategorie = document.createElement("div")
const nomeCategoria = document.createElement("h3")



divCategorie.classList.add("divCategoria")

nomeCategoria.innerText = x



divCategorie.appendChild(nomeCategoria)


return divCategorie
}


