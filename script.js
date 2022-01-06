const musicas = [
    {titulo: 'Saudade de um Piseiro', 
    artista: 'Renanzinho Pressão', 
    src: 'musics/saudade de um piseiro.mp3',
    img: 'imgs/renanzin.png'},
    {titulo: 'Saudade e Solidão', 
    artista: 'Vitor Fernandez', 
    src: 'musics/saudade e solidao.mp3',
    img: 'imgs/vitor_fernandez.jpg'},
    {titulo: 'Solinho do Brabo', 
    artista: 'Japãozinho', 
    src: 'musics/solinho do brabo.mp3',
    img: 'imgs/japaozinho.png'},
    {titulo: 'Eu confiei em ti', 
    artista: 'Rafinha o Big Love', 
    src: 'musics/Eu Confiei em Ti.mp3',
    img: 'imgs/rafinha.png'},
    {titulo: 'Ligação Convarde', 
    artista: 'Thiago Aquino', 
    src: 'musics/ligacao covarde.mp3',
    img: 'imgs/thiago_aquino.jpeg'}
];

const musica = document.querySelector('audio');
let indexMusica = 0;

const duracaoMusica = document.querySelector('.fim');
const imagem = document.querySelector('img');
const nomeMusica = document.querySelector('.descricao h2');
const nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

//Eventos
document.getElementById('play').addEventListener('click', playMusica);
document.getElementById('pause').addEventListener('click', pausarMusica);

document.getElementById('previours').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 4;
    }
    renderizarMusica(indexMusica);
});

document.getElementById('next').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica === musicas.length) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

musica.addEventListener('timeupdate', atualizarBarra);

//Funções
function playMusica() {
    musica.play();
    document.getElementById('play').style.display = 'none';
    document.getElementById('pause').style.display = 'block';
}

function pausarMusica() {
    musica.pause();
    document.getElementById('play').style.display = 'block';
    document.getElementById('pause').style.display = 'none';
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' + campoSegundos;
}

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        playMusica();
    });
}

function atualizarBarra() {
    const barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    const tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));

    const tempoDescrescente = Math.floor(musica.duration - musica.currentTime);
    if (tempoDescrescente === 0) {
        indexMusica++;
        if (indexMusica === musicas.length) {
            indexMusica = 0;
        }        
        renderizarMusica(indexMusica);
    }
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(tempoDescrescente));
}
