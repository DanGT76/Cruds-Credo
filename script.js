let lista = JSON.parse(localStorage.getItem("lista")) || [];
let filtroAtual = "todos";

function salvarLocalStorage() {
  localStorage.setItem("lista", JSON.stringify(lista));
}

function adicionarItem() {
  const input = document.getElementById("inputItem");
  const titulo = input.value.trim();
  if (titulo === "") return;

  const novoItem = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  lista.push(novoItem);
  salvarLocalStorage();
  listarItens();
  input.value = "";
}

function removerItem(id) {
  lista = lista.filter(item => item.id !== id);
  salvarLocalStorage();
  listarItens();
}

function concluirItem(id) {
  lista = lista.map(item =>
    item.id === id ? { ...item, concluida: !item.concluida } : item
  );
  salvarLocalStorage();
  listarItens();
}

function filtrarItens(filtro) {
  filtroAtual = filtro;
  listarItens();
}

function listarItens() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  let itensFiltrados = lista;
  if (filtroAtual === "concluidos") {
    itensFiltrados = lista.filter(item => item.concluida);
  } else if (filtroAtual === "pendentes") {
    itensFiltrados = lista.filter(item => !item.concluida);
  }

  itensFiltrados.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.titulo;
    li.className = item.concluida ? "concluido" : "";

    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.onclick = () => concluirItem(item.id);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => removerItem(item.id);

    li.appendChild(btnConcluir);
    li.appendChild(btnRemover);

    ul.appendChild(li);
  });
}

function exportarJSON() {
  const area = document.getElementById("jsonArea");
  area.value = JSON.stringify(lista, null, 2);
}

function importarJSON() {
  try {
    const area = document.getElementById("jsonArea");
    const dados = JSON.parse(area.value);
    if (Array.isArray(dados)) {
      lista = dados;
      salvarLocalStorage();
      listarItens();
      alert("Importado com sucesso!");
    } else {
      alert("JSON inválido");
    }
  } catch (e) {
    alert("Erro ao importar JSON");
  }
}

// Inicializa a lista ao carregar a página
listarItens();
