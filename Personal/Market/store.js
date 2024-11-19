
let databaseProdotti =[]
const select = document.querySelector("#contenitore-categorie")
const griglia = document.getElementById("contenitore-prodotti")
async function prodotti(url) {
    
    try {
        const response = await fetch(url)
        if(!response.ok){
            console.error(error)
            return
        }
        

        
        const data = await response.json()

        databaseProdotti = data
        

       //creazione pulsante all

        






           
        
        
        const categoria = []
        categoria.push("All")

        if(categoria.includes("All")){

        }

            data.forEach(x => {
                if(!categoria.includes(x.category)){
                     categoria.push(x.category)
                     
                  }
})
        creaCategoria(categoria)


    

        data.forEach(element => 

        {
            

            const prodotti = creacard(element)
            griglia.appendChild(prodotti)
        
        }
            
    );        return data
    } catch (error) {
        console.error(error);
    }
}

    
   
  


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
    
    

    div.appendChild(img)
    div.appendChild(titolo)
    div.appendChild(descrizione)
    div.appendChild(prezzo)
    div.appendChild(acquista)
    div.appendChild(preferiti)

   
    

    return div

}



function creaCategoria(x){
const optionDue = document.createElement("option")

optionDue.innerText = "All"


    x.forEach(categoria => {
        const option = document.createElement("option")
        

        option.value=categoria

        option.innerText = categoria

        select.appendChild(option)

        
    })

}



function filter(selezione){


    griglia.innerHTML="";
    const filtrato = databaseProdotti.filter(element => element.category === selezione )
    filtrato.forEach(element => {
       const card = creacard(element) 
       griglia.appendChild(card)
    })
}



select.addEventListener("change", () => {
    filter(select.value);
});

prodotti("https://fakestoreapi.com/products");