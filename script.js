const username = document.getElementById("username");
const tarefasBtn = document.getElementById("tarefas-btn");
const tarefasInput = document.getElementById("tarefas-input");
const tarefasList = document.getElementById("tarefas-list");
const tarefaContador = document.querySelector("#tarefa-contador");
const tarefasBtnLimpar = document.querySelector("#tarefas-btn-limpar");

let namePrompt = prompt("Digite seu nome:");
username.textContent = namePrompt;
const getTarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];
let tarefasArray = [];
if (getTarefas != null) {
  for (i of getTarefas) {
    let novoItem = document.createElement("div");
    novoItem.classList.add("tarefas-item");
    tarefasList.appendChild(novoItem);
    novoItem.innerHTML = i;
    tarefasArray.push(i);
    tarefaContador.textContent = tarefasArray.length;
  }
  console.log(tarefasArray);
}

tarefasBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (tarefasInput.value !== "") {
    let tarefasInputValue = tarefasInput.value;
    let novoItem = document.createElement("div");
    novoItem.classList.add("tarefas-item");
    tarefasList.appendChild(novoItem);
    novoItem.innerHTML = `
                                <li class="tarefas-li">${tarefasInputValue}</li>
                                <button id="tarefas-removerBtn">Remover</button>
                            
    `;
    const storageItem = novoItem.innerHTML;
    console.log(novoItem);
    tarefasArray.push(storageItem);
    localStorage.setItem("Tarefas", JSON.stringify(tarefasArray));
    console.log(tarefasArray);
    tarefasInput.value = "";
    tarefaContador.textContent++
  }
});

tarefasList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const li = event.target;
    if (li.style.textDecoration != "line-through") {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  }
  if (event.target.tagName === "BUTTON") {
    const divItem = event.target.parentElement;
    const itemHtml = divItem.innerHTML;
    tarefasArray = tarefasArray.filter((item) => item != itemHtml);
    divItem.remove();
    tarefaContador.textContent--
    localStorage.setItem("Tarefas", JSON.stringify(tarefasArray));
  }
});

tarefasBtnLimpar.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  tarefasList.innerHTML = "";
  tarefaContador.textContent = 0
});
