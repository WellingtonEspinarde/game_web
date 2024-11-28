document.addEventListener('DOMContentLoaded', function () { // Espera o DOM estar carregado para iniciar o código

    // Variáveis de jogo
    let playerSymbol = 'X'; // Define o símbolo inicial do jogador
    let gameMode = 'twoPlayers'; // Define o modo de jogo (dois jogadores)
    let gameBoard = ['', '', '', '', '', '', '', '', '']; // Inicializa o tabuleiro com células vazias
    let currentPlayer = 'X'; // Define o jogador atual (X)
    let gameActive = true; // Define se o jogo está ativo ou não

    // Variáveis de pontuação
    let scoreX = 0; // Pontuação do jogador X
    let scoreO = 0; // Pontuação do jogador O

    // Elementos HTML
    const startGameBtn = document.getElementById('startGameBtn'); // Botão de iniciar o jogo
    const gameForm = document.getElementById('gameForm'); // Formulário de configurações do jogo
    const gameContainer = document.getElementById('gameContainer'); // Container do jogo
    const gameBoardElement = document.getElementById('gameBoard'); // Elemento do tabuleiro no HTML
    const messageSection = document.getElementById('messageSection'); // Seção das mensagens (vitória ou empate)
    const gameMessage = document.getElementById('gameMessage'); // Mensagem do jogo (vitória ou empate)
    const restartButton = document.getElementById('restartButton'); // Botão de reiniciar o jogo
    const acceptTermsCheckbox = document.getElementById('acceptTerms'); // Checkbox para aceitar os termos
    const scoreBoard = document.getElementById('scoreBoard'); // Elemento para exibir a pontuação

    function createGameBoard() { // Função para criar o tabuleiro do jogo
        gameBoardElement.innerHTML = ''; // Limpa o tabuleiro
        gameBoard.forEach((cell, index) => { // Para cada célula do tabuleiro
            const cellElement = document.createElement('div'); // Cria o elemento da célula
            cellElement.classList.add('cell'); // Adiciona a classe 'cell' ao elemento
            cellElement.textContent = cell; // Define o conteúdo da célula
            cellElement.addEventListener('click', () => handleCellClick(index)); // Adiciona o evento de clique
            gameBoardElement.appendChild(cellElement); // Adiciona a célula ao tabuleiro
        });
    }

    function startGame(event) { // Função que inicia o jogo
        event.preventDefault(); // Previne o comportamento padrão do formulário
        if (!acceptTermsCheckbox.checked) { // Verifica se os termos foram aceitos
            alert('Você precisa aceitar os termos e condições.'); // Alerta caso os termos não sejam aceitos
            return;
        }

        // Define o símbolo do jogador e o modo de jogo a partir dos inputs do formulário
        playerSymbol = document.querySelector('input[name="symbol"]:checked').value;
        gameMode = document.querySelector('input[name="gameMode"]:checked').value;
        currentPlayer = playerSymbol; // O jogador atual começa com o símbolo escolhido

        gameForm.style.display = 'none'; // Esconde o formulário de configurações
        gameContainer.style.display = 'block'; // Exibe o container do jogo
        messageSection.style.display = 'none'; // Esconde a seção de mensagens
        restartButton.style.display = 'none'; // Esconde o botão de reiniciar

        gameBoard = ['', '', '', '', '', '', '', '', '']; // Reinicia o tabuleiro
        createGameBoard(); // Cria o novo tabuleiro
    }

    function handleCellClick(index) { // Função para lidar com o clique nas células
        if (gameBoard[index] !== '' || !gameActive) return; // Verifica se a célula já foi jogada ou se o jogo acabou

        gameBoard[index] = currentPlayer; // Marca a célula com o símbolo do jogador atual
        createGameBoard(); // Atualiza o tabuleiro

        if (checkWinner()) { // Verifica se houve um vencedor
            gameMessage.textContent = `${currentPlayer} venceu!`; // Exibe mensagem de vitória
            updateScore(currentPlayer); // Atualiza a pontuação do vencedor
            gameActive = false; // Desativa o jogo
            messageSection.style.display = 'block'; // Exibe a seção de mensagens
            restartButton.style.display = 'inline-block'; // Exibe o botão de reiniciar
        } else if (gameBoard.every(cell => cell !== '')) { // Verifica se o jogo deu empate (todas as células preenchidas)
            gameMessage.textContent = 'Empate!'; // Exibe mensagem de empate
            gameActive = false; // Desativa o jogo
            messageSection.style.display = 'block'; // Exibe a seção de mensagens
            restartButton.style.display = 'inline-block'; // Exibe o botão de reiniciar
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alterna o jogador
        }
    }

    function checkWinner() { // Função que verifica se existe um vencedor
        const winningCombination = [ // Combinações vencedoras do jogo
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        return winningCombination.some(combination => { // Verifica se alguma combinação vencedora foi formada
            const [a, b, c] = combination;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function updateScore(winner) { // Função que atualiza a pontuação do vencedor
        if (winner === 'X') {
            scoreX++; // Incrementa a pontuação de X
        } else {
            scoreO++; // Incrementa a pontuação de O
        }
        scoreBoard.textContent = `X: ${scoreX} | O: ${scoreO}`; // Exibe a pontuação atual
    }

    function restartGame() { // Função para reiniciar o jogo
        gameActive = true; // Ativa o jogo novamente
        gameBoard = ['', '', '', '', '', '', '', '', '']; // Reinicia o tabuleiro
        createGameBoard(); // Cria o novo tabuleiro
        messageSection.style.display = 'none'; // Esconde a seção de mensagens
        restartButton.style.display = 'none'; // Esconde o botão de reiniciar
        currentPlayer = playerSymbol; // Define o jogador atual
    }

    startGameBtn.addEventListener('click', startGame); // Evento para iniciar o jogo
    restartButton.addEventListener('click', restartGame); // Evento para reiniciar o jogo

});
