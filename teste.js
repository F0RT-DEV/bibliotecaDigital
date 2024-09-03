class Livro {
    constructor(id, titulo, autorId, ano) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.ano = ano;
    }
}

const livros = [];
function carregarDados() {
    fetch('file:///C:/Users/d.borges/Documents/Biblioteca%20Digital/livros.csv')
    .then(response => response.text())
    .then(data => {
        const linhas = data.split('\n');
        linhas.forEach(linha => {
            const [id, titulo, autorId, ano] = linha.split(',');
            livros.push(new Livro(id, titulo, autorId, ano));
        });
    });
}

function exibirDados(tipo) {
    const tabela = document.getElementById('tabelaDados');
    const cabecalho = document.getElementById('cabecalhoTabela');
    const corpo = document.getElementById('corpoTabela');
    const titulo = document.getElementById('tituloSecao');

    tabela.innerHTML = '';
    titulo.innerHTML = '';
    cabecalho.innerHTML = '';
    corpo.innerHTML = '';

    switch (tipo) {
        case 'livros':
            titulo.textContent = 'Livros';
            cabecalho.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Autor ID</th>
                    <th>Ano</th>
                </tr>
            `;
            livros.forEach(livro => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${livro.id}</td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autorId}</td>
                    <td>${livro.ano}</td>
                `;
                corpo.appendChild(linha);
            });
            break;
    }
}
document.getElementById('Livro').addEventListener('click', () => exibirDados('livros'));
carregarDados()