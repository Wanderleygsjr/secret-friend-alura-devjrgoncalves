// app.js

// Estado da aplicação
const amigos = [];

// Referências de elementos
const input = document.getElementById("amigo");
const listaEl = document.getElementById("listaAmigos");
const resultadoEl = document.getElementById("resultado");

// Normaliza texto (para evitar duplicados com acentos/maiúsculas)
const normalize = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

// Renderiza a lista de amigos na UL
function renderLista() {
  listaEl.innerHTML = "";
  amigos.forEach((nome, i) => {
    const li = document.createElement("li");
    li.textContent = nome;

    // Botão de remover (opcional, mas útil)
    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.setAttribute("aria-label", `Remover ${nome}`);
    btnRemover.textContent = "×";
    btnRemover.className = "remove-item";
    btnRemover.onclick = () => {
      amigos.splice(i, 1);
      renderLista();
    };

    li.appendChild(btnRemover);
    listaEl.appendChild(li);
  });
}

// Limpa e foca o input
function resetInput() {
  input.value = "";
  input.focus();
}

// Adiciona nome à lista
function adicionarAmigo() {
  const nome = input.value.trim();
  if (!nome) {
    alert("Digite um nome válido.");
    input.focus();
    return;
  }

  // Evita duplicados (case/acento-insensitive)
  const existe = amigos.some((n) => normalize(n) === normalize(nome));
  if (existe) {
    alert("Esse nome já foi adicionado.");
    resetInput();
    return;
  }

  amigos.push(nome);
  renderLista();
  resetInput();
}

// Sorteia um nome (e remove da lista para não repetir)
function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Adicione ao menos um nome antes de sortear.");
    input.focus();
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos.splice(indice, 1)[0]; // remove do array

  // Atualiza a UL da lista e o resultado
  renderLista();
  resultadoEl.innerHTML = ""; // mantém o resultado como UL, exibindo o último sorteado
  const li = document.createElement("li");
  li.textContent = `🎉 O amigo secreto é: ${sorteado} 🎁`;
  resultadoEl.appendChild(li);
}

// Atalho: Enter adiciona nome
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarAmigo();
});

// Expõe funções no escopo global (para os atributos onclick do HTML)
window.adicionarAmigo = adicionarAmigo;
window.sortearAmigo = sortearAmigo;
