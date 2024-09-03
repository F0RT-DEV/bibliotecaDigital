
class Livro {
    constructor(id, titulo, autorId, ano) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.ano = ano;
    }
}

class Autor {
    constructor(id, nome, dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }
}

class Estudante {
    constructor(id, nome, curso) {
        this.id = id;
        this.nome = nome;
        this.curso = curso;
    }
}

class Emprestimo {
    constructor(id, estudanteId, livroId, data) {
        this.id = id;
        this.estudanteId = estudanteId;
        this.livroId = livroId;
        this.data = data;
    }
}

const livros = [];
const autores = [];
const estudantes = [];
const emprestimos = [];

function carregarDados() {
    fetch('livros.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            linhas.forEach(linha => {
                const [id, titulo, autorId, ano] = linha.split(',');
                livros.push(new Livro(id, titulo, autorId, ano));
            });
        });

    fetch('autores.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            linhas.forEach(linha => {
                const [id, nome, dataNascimento] = linha.split(',');
                autores.push(new Autor(id, nome, dataNascimento));
            });
        });

    fetch('estudantes.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            linhas.forEach(linha => {
                const [id, nome, curso] = linha.split(',');
                estudantes.push(new Estudante(id, nome, curso));
            });
        });

    fetch('emprestimos.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            linhas.forEach(linha => {
                const [id, estudanteId, livroId, data] = linha.split(',');
                emprestimos.push(new Emprestimo(id, estudanteId, livroId, data));
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
        case 'autores':
            titulo.textContent = 'Autores';
            cabecalho.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                </tr>
            `;
            autores.forEach(autor => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${autor.id}</td>
                    <td>${autor.nome}</td>
                    <td>${autor.dataNascimento}</td>
                `;
                corpo.appendChild(linha);
            });
            break;
        case 'estudantes':
            titulo.textContent = 'Estudantes';
            cabecalho.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Curso</th>
                </tr>
            `;
            estudantes.forEach(estudante => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${estudante.id}</td>
                    <td>${estudante.nome}</td>
                    <td>${estudante.curso}</td>
                `;
                corpo.appendChild(linha);
            });
            break;
        case 'emprestimos':
            titulo.textContent = 'Empréstimos';
            cabecalho.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>Estudante ID</th>
                    <th>Livro ID</th>
                    <th>Data</th>
                </tr>
            `;
            emprestimos.forEach(emprestimo => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${emprestimo.id}</td>
                    <td>${emprestimo.estudanteId}</td>
                    <td>${emprestimo.livroId}</td>
                    <td>${emprestimo.data}</td>
                `;
                corpo.appendChild(linha);
            });
            break;
    }
}

document.getElementById('Livro').addEventListener('click', () => exibirDados('livros'));
document.getElementById('Autor').addEventListener('click', () => exibirDados('autores'));
document.getElementById('Estudantes').addEventListener('click', () => exibirDados('estudantes'));
document.getElementById('Emprestimos').addEventListener('click', () => exibirDados('emprestimos'));

carregarDados();