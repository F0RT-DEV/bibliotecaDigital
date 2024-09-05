class Livro {
    constructor(id, titulo, autorId, ano) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.ano = ano;
    }
}

const livros = [];

// Selecionar o formulário e adicionar o evento de submissão
const formCSV = document.getElementById('formCSV');
formCSV.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Impede o envio padrão do formulário

    const inputArquivo = document.getElementById('livros1');
    const arquivo = inputArquivo.files[0]; // Seleciona o arquivo CSV

    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {
            const arrayCSV = converterCSVparaArray(conteudo);
            console.log(arrayCSV);

            arrayCSV.forEach(function (linha) {
                const [id, titulo, autorId, ano] = linha;
                const livro = new Livro(id, titulo, autorId, ano);
                livros.push(livro);
            });

            exibirDados('livros');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});

// Função para ler o arquivo CSV
function lerArquivoCSV(arquivo, callback) {
    const reader = new FileReader();
    reader.onload = function(evento) {
        const conteudo = evento.target.result;
        callback(conteudo);
    };
    reader.readAsText(arquivo);
}

// Função para converter CSV em Array
function converterCSVparaArray(conteudo) {
    const linhas = conteudo.split('\n');
    return linhas.map(linha => linha.split(','));
}

function exibirDados(tipo) {
    const tabela = document.getElementById('tabelaDados');
    const cabecalho = document.getElementById('cabecalhoTabela');
    const corpo = document.getElementById('corpoTabela');
    const titulo = document.getElementById('tituloSecao');

    // Limpa a tabela e o título
    titulo.textContent = '';
    cabecalho.innerHTML = '';
    corpo.innerHTML = '';

    if (tipo === 'livros') {
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
    }
}

// Adicionar evento de clique no botão de exibição de dados
document.getElementById('Livro').addEventListener('click', () => exibirDados('livros'));
