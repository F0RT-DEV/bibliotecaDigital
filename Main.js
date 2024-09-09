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
    getNome(){
        return this.nome;
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

function lerArquivoCSV(arquivo, callback) {
    const reader = new FileReader();
    reader.onload = function(evento) {
        const conteudo = evento.target.result;
        callback(conteudo);
    };
    reader.readAsText(arquivo);
}

function converterCSVparaArray(conteudo) {
    const linhas = conteudo.split(/\r?\n/); // Aceita \n ou \r\n
    return linhas.map(linha => linha.split(',').map(campo => campo.trim())); // Remove espaços em branco extras
}

function exibirDados(tipo) {
    let tabela, cabecalho, corpo, titulo;

    if (tipo === 'autores') {
        tabela = document.getElementById('tabelaDados1');
        cabecalho = document.getElementById('cabecalhoTabela1');
        corpo = document.getElementById('corpoTabela1');
        titulo = document.getElementById('tituloSecao1');
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

    }else if (tipo === 'livros') {
        tabela = document.getElementById('tabelaDados2');
        cabecalho = document.getElementById('cabecalhoTabela2');
        corpo = document.getElementById('corpoTabela2');
        titulo = document.getElementById('tituloSecao2');
        titulo.textContent = 'Livros';
        cabecalho.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
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

    } else if (tipo === 'estudantes') {
        tabela = document.getElementById('tabelaDados3');
        cabecalho = document.getElementById('cabecalhoTabela3');
        corpo = document.getElementById('corpoTabela3');
        titulo = document.getElementById('tituloSecao3');
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

    } else if (tipo === 'emprestimo') {
        tabela = document.getElementById('tabelaDados4');
        cabecalho = document.getElementById('cabecalhoTabela4');
        corpo = document.getElementById('corpoTabela4');
        titulo = document.getElementById('tituloSecao4');
        titulo.textContent = 'Empréstimos';
        cabecalho.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Estudante</th>
                <th>Livro</th>
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
    }
}

const formCSV1 = document.getElementById('formCSV1');
formCSV1.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const inputArquivo = document.getElementById('autores');
    const arquivo = inputArquivo.files[0]; // Seleciona o arquivo CSV
    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {
            const arrayCSV = converterCSVparaArray(conteudo);
            arrayCSV.forEach(function (linha) {
                const [id, nome, dataNascimento] = linha.map(item => item.trim());
                const autor = new Autor(id, nome, dataNascimento);
                autores.push(autor);
            });
            exibirDados('autores');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});

const formCSV2 = document.getElementById('formCSV2');
formCSV2.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const inputArquivo = document.getElementById('livros');
    const arquivo = inputArquivo.files[0];
    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {
            const arrayCSV = converterCSVparaArray(conteudo);
            arrayCSV.forEach(function (linha) {
                const [id, titulo, autorId, ano] = linha.map(item => item.trim());
                const autor = autores.find(autor => autor.id === autorId);
                /*o método find() está sendo utilizado no array autores para procurar um autor específico com base no seu id.
                    Array: autores — Este é o array de objetos Autor.
                    Callback: autor => autor.id === autorId
                    A função de callback compara o id de cada objeto autor dentro do array autores com o valor de autorId.
                    autor: É o objeto atual do array autores que está sendo verificado.
                    autor.id === autorId: Esta expressão verifica se o id do autor atual é igual ao autorId que foi passado no arquivo CSV.*/
                if (autor) {
                    // nessa condição erifique se o autor foi encontrado antes de criar o livro
                    const livro = new Livro(id, titulo, autor.nome, ano);
                    livros.push(livro);
                }
            });
            exibirDados('livros');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});

const formCSV3 = document.getElementById('formCSV3');
formCSV3.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Impede o envio padrão do formulário

    const inputArquivo = document.getElementById('estudantes');
    const arquivo = inputArquivo.files[0];
    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {
            const arrayCSV = converterCSVparaArray(conteudo);
            arrayCSV.forEach(function (linha) {
                const [id, nome, curso] = linha.map(item => item.trim());
                const estudante = new Estudante(id, nome, curso);
                estudantes.push(estudante);
            });
            exibirDados('estudantes');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});

const formCSV4 = document.getElementById('formCSV4');
formCSV4.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const inputArquivo = document.getElementById('emprestimo');
    const arquivo = inputArquivo.files[0];
    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {
            const arrayCSV = converterCSVparaArray(conteudo);
            arrayCSV.forEach(function (linha) {
                const [id, estudanteId, livroId, data] = linha.map(item => item.trim());
                const estudante = estudantes.find(estudante => estudante.id === estudanteId);
                const livro = livros.find(livro => livro.id === livroId);
                if (estudante && livro) {
                    const emprestimo = new Emprestimo(id, estudante.nome, livro.titulo, data);
                    emprestimos.push(emprestimo);
                }
            });
            exibirDados('emprestimo');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});