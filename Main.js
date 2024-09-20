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

function lerArquivoCSV(arquivo, callback) {         //Aqui estamos definindo uma função chamada lerArquivoCSV, que recebe dois parâmetros: arquivo (representa o arquivo CSV a ser lido) e callback (uma função que será chamada quando a leitura do arquivo for concluída)
    const reader = new FileReader();               //Este código cria uma nova instância de FileReader, que é uma API JavaScript para ler o conteúdo de arquivos locais no navegador. Ele permite que o conteúdo de arquivos (como texto ou binários) seja lido de várias maneiras.
    reader.onload = function(evento) {            //Estamos definindo um manipulador de evento (onload) para o FileReader. Este manipulador será executado quando o processo de leitura do arquivo for concluído com sucesso. O parâmetro evento contém informações sobre o evento de carregamento, como o conteúdo lido.
        const conteudo = evento.target.result;   //Nesta linha, estamos acessando o resultado da leitura do arquivo usando evento.target.result e armazenando esse conteúdo na variável conteudo. No caso de readAsText, o conteúdo será uma string com o texto do arquivo.
        callback(conteudo);                     //Aqui, estamos chamando a função callback passada como parâmetro para a função lerArquivoCSV. Passamos o conteudo do arquivo como argumento para essa função, permitindo que o código fora dessa função possa processar o conteúdo do CSV assim que ele for lido.
    };
    reader.readAsText(arquivo);               //estamos iniciando a leitura do arquivo usando o método readAsText do FileReader, que lê o conteúdo do arquivo como texto. O arquivo passado como parâmetro é o arquivo selecionado que será lido.
}

function converterCSVparaArray(conteudo) {
    const linhas = conteudo.split(/\r?\n/); // Aceita \n ou \r\n
    return linhas.map(linha => linha.split(',').map(campo => campo.trim())); // Remove espaços em branco extras
}

function exibirDados(tipo) {
    let tabela, cabecalho, corpo, titulo;

    if (tipo === 'autores') {          //Estamos selecionando elementos da página HTML pelo seu ID e atribuindo-os às variáveis apropriadas: 
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
        `;                                  //O conteúdo HTML do cabecalho da tabela é definido diretamente. Estamos inserindo uma linha (<tr>) com três células de cabeçalho (<th>), que representam as colunas da tabela: "ID", "Nome" e "Data de Nascimento". Isso define os títulos das colunas da tabela
        autores.forEach(autor => {         //Aqui estamos iterando sobre o array autores, que contém uma lista de objetos do tipo Autor. Para cada autor no array, o código dentro desse bloco será executado.
            const linha = document.createElement('tr');       //Aqui estamos iterando sobre o array autores, que contém uma lista de objetos do tipo Autor. Para cada autor no array, o código dentro desse bloco será executado.
            linha.innerHTML = `
                <td>${autor.id}</td>
                <td>${autor.nome}</td>
                <td>${autor.dataNascimento}</td>
            `;                             //Estamos definindo o conteúdo da linha recém-criada (<tr>) usando a propriedade innerHTML. A linha contém três células (<td>)
            corpo.appendChild(linha);     //Depois de criar e preencher a linha com os dados do autor, ela é anexada ao corpo da tabela, ou seja, o elemento HTML responsável por armazenar as linhas de dados da tabela
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

function configurarBotoes(tipo) {
    let botaoMostrar, botaoOcultar, visualizacao;          //Aqui estamos declarando três variáveis: botaoMostrar, botaoOcultar e visualizacao. Essas variáveis serão usadas para armazenar os elementos HTML correspondentes aos botões de "mostrar" e "ocultar", e a área de visualização dos dados.

    if (tipo === 'autores') {
        botaoMostrar = document.getElementById('mostrarTabelaAutores');
        botaoOcultar = document.getElementById('ocultarTabelaAutores');
        visualizacao = document.getElementById('visualizacaoAutor');
    } else if (tipo === 'livros') {
        botaoMostrar = document.getElementById('mostrarTabelaLivros');
        botaoOcultar = document.getElementById('ocultarTabelaLivros');
        visualizacao = document.getElementById('visualizacaoLivro');
    } else if (tipo === 'estudantes') {
        botaoMostrar = document.getElementById('mostrarTabelaEstudantes');
        botaoOcultar = document.getElementById('ocultarTabelaEstudantes');
        visualizacao = document.getElementById('visualizacaoEstudante');
    } else if (tipo === 'emprestimo') {
        botaoMostrar = document.getElementById('mostrarTabelaEmprestimo');
        botaoOcultar = document.getElementById('ocultarTabelaEmprestimo');
        visualizacao = document.getElementById('visualizacaoEmprestimo');
    }

    botaoMostrar.style.display = 'inline';                       //Aqui estamos definindo o estilo CSS dos botões de "mostrar" e "ocultar", tornando-os visíveis na página ao definir a propriedade display como inline. Isso faz com que os botões sejam exibidos em linha no layout da página
    botaoOcultar.style.display = 'inline';

    botaoMostrar.addEventListener('click', function () {      //Esta linha adiciona um evento de clique ao botão botaoMostrar. Quando o botão for clicado, ele executa uma função anônima que define o estilo CSS da visualizacao para display: block, o que exibe o conteúdo da área de visualização (a tabela ou a seção correspondente).
        visualizacao.style.display = 'block';
    });

    botaoOcultar.addEventListener('click', function () {
        visualizacao.style.display = 'none';             //Aqui estamos adicionando um evento de clique ao botão botaoOcultar. Quando este botão for clicado, a função anônima será executada, definindo o estilo CSS da visualizacao para display: none, o que oculta o conteúdo da tabela ou da seção.
    });
}

const formCSV1 = document.getElementById('formCSV1');
formCSV1.addEventListener('submit', function (evento) {              //Aqui estamos adicionando um "ouvinte" para o evento de submit (envio) no formulário. Quando o formulário for enviado, a função anônima será executada. O parâmetro evento representa o evento de envio do formulário.
    evento.preventDefault();                                        //Esta linha impede o comportamento padrão do formulário HTML, que normalmente recarregaria a página ao ser enviado. O uso de preventDefault() permite processar o envio de dados via JavaScript sem recarregar a página.

    const inputArquivo = document.getElementById('autores');
    const arquivo = inputArquivo.files[0];                              //Acessamos a lista de arquivos enviados pelo usuário através da propriedade files do input. Pegamos o primeiro arquivo da lista (no caso, o CSV) e armazenamos na variável arquivo
    if (arquivo) {
        lerArquivoCSV(arquivo, function (conteudo) {                                                //Chamamos a função lerArquivoCSV, passando o arquivo selecionado como argumento. A função lerArquivoCSV lê o arquivo CSV e, quando a leitura for concluída, executa a função de callback que processa o conteúdo lido (armazenado em conteudo)
            const arrayCSV = converterCSVparaArray(conteudo);                                      //Após a leitura do arquivo, o conteúdo é convertido para um array de linhas de dados CSV (provavelmente uma matriz, onde cada linha é representada como um array de valores). Isso é feito através da função converterCSVparaArray, que recebe o conteúdo do CSV como string e retorna um array.
            arrayCSV.forEach(function (linha) {                                                   //Aqui, estamos iterando sobre cada linha do array CSV. Para cada linha do CSV, a função de callback será executada
                const [id, nome, dataNascimento] = linha.map(item => item.trim());               //Estamos desestruturando a linha do array em três variáveis: id, nome e dataNascimento. A função map é aplicada para remover espaços em branco de cada valor (item.trim()). Cada linha do CSV é dividida em três partes, correspondentes aos campos que queremos (ID, Nome e Data de Nascimento)
                const autor = new Autor(id, nome, dataNascimento);                              //Aqui, estamos criando uma nova instância da classe Autor, passando id, nome e dataNascimento como parâmetros para o construtor. Isso transforma os dados da linha em um objeto Autor
                autores.push(autor);                                                           //O objeto autor recém-criado é adicionado ao array autores, que provavelmente contém a lista de todos os autores que estão sendo lidos do CSV.
            });                                                                                               
            exibirDados('autores');                                                                             //a função exibirDados('autores') é chamada para atualizar a tabela ou a visualização de dados na interface com a lista de autores
            document.getElementById('mensagemEnvio1').textContent = `Arquivo enviado: ${arquivo.name}`;        //Aqui, estamos atualizando o conteúdo do elemento HTML com o ID mensagemEnvio1, inserindo uma mensagem que informa o nome do arquivo enviado (arquivo.name).
            configurarBotoes('autores');    //Chamando a função configurar botão
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
                /*o método find() está sendo utilizado no array autores para procurar um autor específico com base no seu id; Array: autores — Este é o array de objetos Autor; Callback: autor => autor.id === autorId está função de callback compara o id de cada objeto autor dentro do array autores com o valor de autorId.
                    autor: É o objeto atual do array autores que está sendo verificado; autor.id === autorId: Esta expressão verifica se o id do autor atual é igual ao autorId que foi passado no arquivo CSV.*/
                if (autor) {
                    // nessa condição verifica-se o autor foi encontrado antes de criar o livro
                    const livro = new Livro(id, titulo, autor.nome, ano);
                    livros.push(livro);
                }
            });
            exibirDados('livros');
            document.getElementById('mensagemEnvio2').textContent = `Arquivo enviado: ${arquivo.name}`;
            configurarBotoes('livros');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});

const formCSV3 = document.getElementById('formCSV3');
formCSV3.addEventListener('submit', function (evento) {
    evento.preventDefault();

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
            document.getElementById('mensagemEnvio3').textContent = `Arquivo enviado: ${arquivo.name}`;
            configurarBotoes('estudantes');
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
            document.getElementById('mensagemEnvio4').textContent = `Arquivo enviado: ${arquivo.name}`;
            configurarBotoes('emprestimo');
        });
    } else {
        console.error("Nenhum arquivo selecionado");
    }
});