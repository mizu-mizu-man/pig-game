/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dices as many times as he whishes. Each result get added to his ROUND score
- If the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls a 6 + 6, all his GLOBAL score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points (default) on GLOBAL score wins the game
- In 'FINAL SCORE' input you can enter a number of GLOBAL points, needed to win the game

ПРАВИЛА ИГРЫ:
- Игра для двух игроков, играющих по очереди
- Каждый ход игрок кидает по 2 кубика столько раз, сколько захочет. Результат каждого броска добавляется к очкам РАУНДА
- Если игрок скинул 1, то все очки РАУНДА теряются. После этого, ход переходит к слудующему игроку
- Если игрок скинул 6 + 6, то все ГЛОБАЛЬНЫЕ очки теряются.  После этого, ход переходит к слудующему игроку
- Игрок может сохранить результат бросков нажав на 'Hold' - очки РАУНДА добавятся к ГЛОБАЛЬНЫМ очкам. После этого, ход переходит к слудующему игроку
- Первый игрок, набравший 100 ГЛОБАЛЬНЫХ очков (по умолчанию), побеждает в игре
- В поле 'FINAL SCORE' можно указать кол-во ГЛОБАЛЬНЫХ очков, необходимых для победы

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var winningScore = document.querySelector('.final-score').value;

    if (!winningScore) {
      winningScore = 100;
    }

    console.log(winningScore);

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
