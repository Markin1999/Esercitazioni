const griglia = document.getElementById("contenitore-prodotti");
const select = document.getElementById("contenitore-categorie");
const prezzoMinimo = document.getElementById("prezzo-minimo");
const prezzoMassimo = document.getElementById("prezzo-massimo");
const resetB = document.getElementById("reset");

let carrello = [];
let favorite = [];
const carrelloB = document.getElementById("carrello");
const preferitiCount = document.getElementById("preferiti-count");

async function prodotti(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Errore nella fetch: ${response.statusText}`);
      return;
    }

    const data = await response.json();

    // Trova gli elementi del DOM

    // Controlla se gli elementi sono stati trovati
    if (!griglia) {
      console.error("Elemento 'contenitore-prodotti' non trovato");
      return;
    }
    if (!select) {
      console.error("Elemento 'contenitore-categorie' non trovato");
      return;
    }

    const categoria = [];

    //opzione all
    const optionAll = document.createElement("option");
    optionAll.value = "all";
    optionAll.innerText = "All";
    select.appendChild(optionAll);

    // Popola la select e aggiungi tutte le opzioni uniche
    data.forEach((element) => {
      if (!categoria.includes(element.category)) {
        categoria.push(element.category);

        const option = document.createElement("option");
        option.value = element.category;
        option.innerText = element.category;
        select.appendChild(option);
      }
    });

    // Aggiungi tutte le carte dei prodotti alla griglia
    mostraProdotti(data, griglia);

    // Aggiungi l'evento per filtrare le categorie
    //si attiva quando l'utente cambia l'opzione selezionata del menu

    select.addEventListener("change", () => filtra(data));

    prezzoMinimo.addEventListener("input", () => filtra(data));

    prezzoMassimo.addEventListener("input", () => filtra(data));

    //pulsante reset

    resetB.addEventListener("click", () => {
      griglia.innerHTML = "";
      prezzoMinimo.value = "";
      prezzoMassimo.value = "";
      select.value = "all";
      data.forEach((prodotto) => {
        const card = creaCard(prodotto);
        griglia.appendChild(card);
      });
    });

    //fine pulsante reset

    //Pulsante carrello
    carrelloB.addEventListener("click", () => {
      if (carrello.length === 0) {
        alert("Carrello vuoto");
      } else {
        mostraCarrello(carrello);
      }
    });

    //fine carrello
  } catch (error) {
    console.error(error);
  }
}

function mostraCarrello(prodotti) {
  griglia.innerHTML = "";
  const buttonElimina = document.createElement("button");
  buttonElimina.innerText = "Elimina tutto";

  buttonElimina.addEventListener("click", () => {
    carrello = [];
    mostraCarrello(carrello);
  });

  prodotti.forEach((prodotto, index) => {
    const card = creaCardCarrello(prodotto);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    checkbox.addEventListener("click", () => {
      carrello.splice(index, 1);
      mostraCarrello(carrello);
    });

    card.appendChild(checkbox);
    griglia.appendChild(card);
    griglia.appendChild(buttonElimina);
  });

  if (carrello.length === 0) {
    griglia.innerHTML = "<p>Il carrello è vuoto.</p>";
  }
}

// Funzione per mostrare i prodotti nella griglia
function mostraProdotti(prodotti) {
  griglia.innerHTML = ""; // Svuota la griglia prima di aggiungere nuovi elementi
  prodotti.forEach((prodotto) => {
    const card = creaCard(prodotto);
    griglia.appendChild(card);
  });
}

function filtra(prodotti) {
  griglia.innerHTML = "";

  const minimoValue = prezzoMinimo.value;
  const massimoValue = prezzoMassimo.value;
  const categoriaSelezionata = select.value;

  const datiFiltrati = prodotti.filter((prodotto) => {
    const prezzo = Math.ceil(prodotto.price);

    const filtroCategoria =
      categoriaSelezionata === "all" ||
      prodotto.category === categoriaSelezionata;

    const filtroPrezzo =
      (!minimoValue || prezzo >= minimoValue) &&
      (!massimoValue || prezzo <= massimoValue);

    return filtroCategoria && filtroPrezzo;
  });

  datiFiltrati.forEach((prodotto) => {
    const card = creaCard(prodotto);
    griglia.appendChild(card);
  });
}

function creaCard(obj) {
  const div = document.createElement("div");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const divTesto = document.createElement("div");
  const titolo = document.createElement("h3");
  const descrizione = document.createElement("p");
  const prezzo = document.createElement("p");
  const divBtn = document.createElement("div");
  const acquista = document.createElement("button");
  const preferiti = document.createElement("button");

  div.classList.add("box");
  divImg.classList.add("div-img");
  img.classList.add("box-img");
  divTesto.classList.add("div-testo");
  divBtn.classList.add("div-btn");
  acquista.classList.add("bottone-acquisti");
  preferiti.classList.add("bottone-pref");
  prezzo.classList.add("prezzo");
  titolo.classList.add("titolo");
  descrizione.classList.add("descrizione");

  img.src = obj.image;
  img.alt = obj.title;
  titolo.innerText = obj.title;
  descrizione.innerText = obj.description;
  prezzo.innerText = `€ ${obj.price}`;
  acquista.innerText = "🛒 Acquista";
  preferiti.innerText = "❤️ Preferiti";

  divImg.appendChild(img);
  div.appendChild(divImg);
  div.appendChild(divTesto);
  divTesto.appendChild(titolo);
  divTesto.appendChild(descrizione);
  divTesto.appendChild(prezzo);
  divBtn.appendChild(acquista);
  divBtn.appendChild(preferiti);
  div.appendChild(divBtn);

  acquista.addEventListener("click", () => {
    carrello.push(obj);
  });
  preferiti.addEventListener("click", () => {
    favorite.push(obj);
    preferitiCount.textContent = favorite.length;
  });
  return div;
}

function creaCardCarrello(obj) {
  const div = document.createElement("div");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const divTesto = document.createElement("div");
  const titolo = document.createElement("h3");
  const descrizione = document.createElement("p");
  const prezzo = document.createElement("p");

  div.classList.add("box");
  divImg.classList.add("div-img");
  img.classList.add("box-img");
  divTesto.classList.add("div-testo");

  prezzo.classList.add("prezzo");
  titolo.classList.add("titolo");
  descrizione.classList.add("descrizione");

  img.src = obj.image;
  img.alt = obj.title;
  titolo.innerText = obj.title;
  descrizione.innerText = obj.description;
  prezzo.innerText = `€ ${obj.price}`;

  divImg.appendChild(img);
  div.appendChild(divImg);
  div.appendChild(divTesto);
  divTesto.appendChild(titolo);
  divTesto.appendChild(descrizione);
  divTesto.appendChild(prezzo);

  return div;
}

prodotti("https://fakestoreapi.com/products");
