
const temas = {
    portugues: { fundo: '#FFDDC1', img: "url('PORT(3).png')"},
    matematica: { fundo: '#D1FFDD', img: "url('MATH.png')"},
    geografia: { fundo: '#C1DDFF', img: "url('GEO (2).png')"},
    fisica: { fundo: '#FFF7C1', img: "url('FIS.png')"},
    gerais: { fundo: '#E1C1FF', img: "url('GERALr.png')"}
};
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
}

// Carregar o tema salvo ao carregar a página
const temaSalvo = localStorage.getItem('temaSelecionado');
if (temaSalvo) {
    temaAtual = temaSalvo;
    aplicarTema();
};