Documentação do Projeto de Quiz
Visão Geral

Este projeto é um quiz interativo construído com HTML, CSS e JavaScript, no qual o jogador responde perguntas sobre temas variados como Matemática, Português, Geografia, Física, e conhecimentos gerais. O quiz conta com diferentes níveis de dificuldade que se ajustam conforme o progresso do jogador, e um sistema de pontuação e ranking local armazenado em LocalStorage.
Funcionalidades Implementadas
1. Sistema de Temas

    Temas disponíveis: Português, Matemática, Geografia, Física e Gerais.
    Personalização visual: Cada tema altera o fundo e uma imagem personalizada da página de perguntas.
    Armazenamento do tema: O tema selecionado é salvo no LocalStorage e reaplicado automaticamente na próxima vez que o jogador acessa o quiz.

Código para aplicar o tema:

js

const temas = {
    portugues: { fundo: '#FFDDC1', img: "url('PORT(3).png')"},
    matematica: { fundo: '#D1FFDD', img: "url('MATH.png')"},
    geografia: { fundo: '#C1DDFF', img: "url('GEO (2).png')"},
    fisica: { fundo: '#FFF7C1', img: "url('FIS.png')"},
    gerais: { fundo: '#E1C1FF', img: "url('GERALr.png')"}
};

// Função para aplicar o tema selecionado
function aplicarTema() {
  const tema = temas[temaAtual];
  document.body.style.backgroundColor = tema.fundo;
  document.body.style.backgroundImage = tema.img;
}

2. Sistema de Perguntas e Dificuldades Dinâmicas

    Estrutura de perguntas por tema: Cada tema possui três conjuntos de perguntas (Fácil, Médio e Difícil).
    Ajuste dinâmico de dificuldade: O nível de dificuldade aumenta conforme o jogador responde mais perguntas, após atingir um certo número de perguntas respondidas.

Código para ajuste de dificuldade:

js

let perguntas = matematicaFundamental; // Início com as perguntas fáceis
let perguntaAtual = 0;
let totalRespondidas = 0;

function atualizarDificuldade() {
  if (totalRespondidas >= 10 && totalRespondidas < 20) {
    perguntas = matematicaMedio;
  } else if (totalRespondidas >= 20) {
    perguntas = matematicaSuperior;
  }
}

3. Armazenamento Local (LocalStorage)

    Ranking de jogadores: O nome do jogador e o número de acertos são armazenados em LocalStorage e exibidos em um ranking na página final.

Código para armazenar jogadores:

js

function finalizarQuiz() {
    const nome = prompt("Digite seu nome:");
    if (nome) {
      const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
      jogadores.push({ nome: nome, acertos: acertos });
      localStorage.setItem("jogadores", JSON.stringify(jogadores));
    }
    window.location.href = "siteEnd.html";
}

4. Sistema de Perguntas Embaralhadas

    Embaralhamento de respostas: As respostas das perguntas são embaralhadas para garantir que a resposta correta não esteja sempre na mesma posição.

Função para embaralhar respostas:

js

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

5. Layout Responsivo

O layout foi pensado para ser flexível e responsivo, adaptando-se a diferentes tamanhos de tela.
Como Executar o Projeto

    Clone o repositório do GitHub.
    Abra o arquivo index.html no navegador.
    Selecione um tema na página de configurações.
    Inicie o quiz e acompanhe o progresso pelo sistema de dificuldades e perguntas dinâmicas.

Melhorias Futuras

    Implementar um servidor para salvar o ranking de jogadores globalmente.
    Criar um sistema de perguntas mais amplo, talvez com conexão a APIs.
    Melhorar a interface visual com animações e transições mais suaves.
