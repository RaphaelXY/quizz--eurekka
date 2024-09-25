// Definindo temas
const temas = {
  portugues: { fundo: '#FFDDC1', img: "url('PORT(3).png')" },
  matematica: { fundo: '#D1FFDD', img: "url('MATH.png')" },
  geografia: { fundo: '#C1DDFF', img: "url('GEO (2).png')" },
  fisica: { fundo: '#FFF7C1', img: "url('FIS.png')" },
  gerais: { fundo: '#E1C1FF', img: "url('GERALr.png')" }
};

let temaAtual = localStorage.getItem('temaSelecionado') || 'portugues'; // Tema padrão se não houver tema salvo
let perguntas = []; // Armazena as perguntas do tema atual
let perguntaAtual = 0; // Índice da pergunta atual
let acertos = 0; // Contador de acertos
let totalRespondidas = 0; // Contador de perguntas respondidas

// Função para aplicar o tema
function aplicarTema() {
  const tema = temas[temaAtual];
  document.body.style.backgroundColor = tema.fundo;
  document.body.style.backgroundImage = tema.img;
}

// Função para alterar o tema ao selecionar
window.alterarTema = function(novoTema) {
  temaAtual = novoTema;
  localStorage.setItem('temaSelecionado', temaAtual); // Salvar tema no localStorage
  aplicarTema();
  carregarPerguntas(temaAtual); // Recarregar perguntas quando o tema mudar
  mostrarPergunta(); // Mostrar a primeira pergunta após mudar o tema
}

// Função para carregar perguntas específicas de acordo com o tema e a dificuldade
function carregarPerguntas(tema) {
  if (tema === 'matematica') {
    const matematicaFundamental = [
      { pergunta: "Quanto é 2+2?", respostas: ["3", "4", "5", "6"], correta: "4" },
      { pergunta: "Quanto é 5+3?", respostas: ["7", "8", "9", "10"], correta: "8" },
      // Outras perguntas fáceis...
    ];
    const matematicaMedio = [
      { pergunta: "Qual a raiz quadrada de 25?", respostas: ["4", "5", "6", "7"], correta: "5" },
      // Outras perguntas médias...
    ];
    const matematicaSuperior = [
      { pergunta: "Qual o valor de π?", respostas: ["3.14", "3.15", "3.16", "3.17"], correta: "3.14" },
      // Outras perguntas difíceis...
    ];

    // Começar com perguntas fáceis
    perguntas = [...matematicaFundamental];

    // Função para aumentar a dificuldade
    function atualizarDificuldade() {
      if (totalRespondidas >= 10 && totalRespondidas < 20) {
        perguntas = [...matematicaMedio];
      } else if (totalRespondidas >= 20) {
        perguntas = [...matematicaSuperior];
      }
    }

    return atualizarDificuldade;
  } else if (tema === 'portugues') {
    perguntas = [
      { pergunta: "Qual é a capital do Brasil?", respostas: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correta: "Brasília" },
      { pergunta: "Quem escreveu 'Dom Casmurro'?", respostas: ["Machado de Assis", "Carlos Drummond", "Clarice Lispector", "José de Alencar"], correta: "Machado de Assis" },
      // Outras perguntas de português...
    ];
  } 
  // Adicione outros temas...
}

// Função para mostrar a pergunta
function mostrarPergunta() {
  if (perguntaAtual < perguntas.length) {
    const perguntaEl = document.getElementById("pergunta");
    const respostasEl = document.getElementsByClassName("resposta");

    perguntaEl.textContent = perguntas[perguntaAtual].pergunta;

    for (let i = 0; i < respostasEl.length; i++) {
      respostasEl[i].textContent = perguntas[perguntaAtual].respostas[i];
      respostasEl[i].onclick = checarResposta;
    }
  } else {
    finalizarQuiz();
  }
}

// Função para checar resposta
function checarResposta() {
  const respostaSelecionada = this.textContent;
  const respostaCorreta = perguntas[perguntaAtual].correta;

  if (respostaSelecionada === respostaCorreta) {
    alert("Resposta correta!");
    acertos++;
  } else {
    alert("Resposta incorreta.");
  }

  perguntaAtual++;
  totalRespondidas++;

  // Atualizar dificuldade quando o número de perguntas respondidas atingir certos marcos
  if (temaAtual === 'matematica') {
    atualizarDificuldade(); // Atualiza as perguntas conforme a dificuldade
  }

  mostrarPergunta(); // Mostra a próxima pergunta
}

// Função para finalizar o quiz
function finalizarQuiz() {
  const nome = prompt("Digite seu nome:");

  if (nome) {
    const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
    jogadores.push({ nome: nome, acertos: acertos });
    localStorage.setItem("jogadores", JSON.stringify(jogadores));
  }

  window.location.href = "siteEnd.html"; // Redirecionar para a página final
}

// Iniciar o quiz aplicando o tema salvo e carregando perguntas
aplicarTema();
carregarPerguntas(temaAtual);
mostrarPergunta();
