const API_URL = "http://localhost:8080/api/livros";

// Carregar livros na página
async function carregarLivros() {
    const resposta = await fetch(API_URL);
    const livros = await resposta.json();
    mostrarLivros(livros);
}

// Mostrar livros na lista com botão Excluir
function mostrarLivros(livros) {
    const lista = document.getElementById("listaLivros");
    lista.innerHTML = "";

    livros.forEach(livro => {
        const li = document.createElement("li");
        li.textContent = `${livro.titulo} - ${livro.autor} (${livro.anoPublicacao})`;

        // Botão Excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.style.marginLeft = "10px";
        btnExcluir.addEventListener("click", () => excluirLivro(livro.id));

        li.appendChild(btnExcluir);
        lista.appendChild(li);
    });
}

// Adicionar novo livro
document.getElementById("livroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const livro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        anoPublicacao: parseInt(document.getElementById("anoPublicacao").value),
        editora: document.getElementById("editora").value
    };

    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    });

    if (resposta.ok) {
        alert("Livro adicionado com sucesso!");
        carregarLivros();
        document.getElementById("livroForm").reset();
    } else {
        alert("Erro ao adicionar livro.");
    }
});

// Excluir livro por id
async function excluirLivro(id) {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;

    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        alert("Livro excluído com sucesso!");
        carregarLivros();
    } else {
        alert("Erro ao excluir o livro.");
    }
}

// Pesquisa dinâmica
document.getElementById("pesquisa").addEventListener("input", async function () {
    const termo = this.value.toLowerCase();
    const resposta = await fetch(API_URL);
    const livros = await resposta.json();
    const filtrados = livros.filter(l => l.titulo.toLowerCase().includes(termo));
    mostrarLivros(filtrados);
});

// Carrega livros ao iniciar
carregarLivros();
