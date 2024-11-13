// 1. Seleziona dal DOM la lista `todo-list`, il campo di input `new-todo`, e i bottoni `add-todo` e `clear-list`.

const lista = document.querySelector(".my-li")
const input = document.querySelector("#new-todo")
const add = document.querySelector("#add-todo")
const clear = document.querySelector("#clear-list")


// 2. Crea un array di oggetti `todos`, dove ogni oggetto rappresenta un'attività con un `id`, un `text`, e uno stato `done`.

let todos = [
    { id: 1, text: 'Completare il progetto', done: false },
    { id: 2, text: 'Studiare JavaScript', done: false },
    { id: 3, text: 'Fare la spesa', done: false }
];


// 3. Definisci una funzione `renderTodos()`:
function renderTodos(){
//    - Svuota la lista `todo-list` e usa un ciclo `forEach` per aggiungere ogni attività dal `todos` array.
lista.innerHTML="";
todos.forEach(({id, text, done}) => {
    const li = document.createElement("li")
    li.classList.add("my-li")
    li.textContent=text
    li.style.textDecoration = done ? 'line-through' : 'none';

    li.addEventListener("click", ()=>{
        
    })
});



//    - Crea un elemento `li` per ogni attività, imposta il `textContent`, applica `textDecoration` condizionalmente se l'attività è completata o no.
//    - Aggiungi un event listener per marcare l'attività come completata (usa `toggleDone`).
//    - Crea un pulsante "Elimina" per ogni attività e imposta `stopPropagation()` sull'evento per fermare la propagazione.
//    - Aggiungi il pulsante "Elimina" all'`li` e l'`li` alla lista.
}
// 4. Crea una funzione `addTodo()` per aggiungere una nuova attività:
//    - Prendi il valore dall'input `new-todo`.
//    - Usa `trim()` per rimuovere spazi vuoti e verifica che non sia vuoto.
//    - Aggiungi l'attività all'array `todos` usando lo `spread operator`.
//    - Svuota l'input e aggiorna la lista chiamando `renderTodos()`.

// 5. Crea una funzione `toggleDone(id)` per cambiare lo stato `done` di un’attività:
//    - Usa `map()` per trovare l'attività con il `id` specificato e alterna il suo stato `done`.
//    - Aggiorna la lista chiamando `renderTodos()`.

// 6. Definisci una funzione `removeTodo(id)` per eliminare un'attività:
//    - Usa `filter()` per rimuovere l’attività con il `id` specificato.
//    - Aggiorna la lista chiamando `renderTodos()`.

// 7. Crea una funzione `clearList()` per eliminare tutte le attività:
//    - Svuota l’array `todos` e aggiorna la lista con `renderTodos()`.

// 8. Aggiungi event listeners:
//    - Collega `addTodo()` al bottone `add-todo`.
//    - Collega `clearList()` al bottone `clear-list`.

// 9. Alla fine, chiama `renderTodos()` per visualizzare la lista iniziale.
