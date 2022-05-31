window.onhashchange = renderNewState;
let SPAStateH = {};
const app = document.getElementById('app');

function renderNewState() {
  let StateJSON = decodeURIComponent(window.location.hash.substr(1));
  if (StateJSON !== '') {
    SPAStateH = JSON.parse(StateJSON);
  } else {
    SPAStateH = {
      pagename: 'main'
    };
  }
  switch (SPAStateH.pagename) {
    case 'main':
      app.innerHTML = `
              <div class="game">
                <div class="game__title">
                  <h1>2048 GAME</h1>
                </div>
                <div class="game__list">
                  <input type="button" value="Play" class="game__list-play button" id="game">
                  <input type="button" value="Rules" class="game__list-rules button" id="rules">
                  <input type="button" value="Controls" class="game__list-controls button" id="controls">
                </div>
              </div>      
                `;
      break;
    case 'rules':
      app.innerHTML = `
              <div class="game rules">
                <div class="game__title">
                  <h1>2048 GAME</h1>
                </div>
                <div class="game__rules">
                  The game of 2048 does not include complicated controls. The controls you will be using are just upward, downward, and sideways. The rules are also simple. You just need to move the tiles and every time you move one, another tile pops up in a random manner anywhere in the box. When two tiles with the same number on them collide with one another as you move them, they will merge into one tile with the sum of the numbers written on them initially.
                </div>
                <button id="button-home" class="button"><a href="#">Home</a></button>
              </div>
              `;
      break;
    case 'game':
      app.innerHTML = `    
              <div class="item">
                <span id="score"></span>
                <span id="history"></span>
                <button id="button-home"><a href="#">Home</a></button>
              </div>
              <div id="highScores"></div>
              <canvas id="canvas"></canvas>
              `;
      break;
    case 'controls':
      app.innerHTML = `    
              <div class="game rules">
                <div class="game__title">
                  <h1>2048 GAME</h1>
                  <div class="game__rules">
                    You can use arrows <br>
                      &uArr; <br>
                      &lArr; &rArr; <br>
                      &dArr; <br>
                    Or touch if your device supports it
                  </div>
                </div>
                <button id="button-home" class="button"><a href="#">Home</a></button>
              </div>`;
      break;
  }

  const rules = document.getElementById('rules');
  const game = document.getElementById('game');
  const button = document.getElementById('button');
  const controls = document.getElementById('controls');

  if (game) {
    game.addEventListener('click', SwitchToGamePage);
  }
  if (rules) {
    rules.addEventListener('click', SwitchToRulesPage);
  }
  if (button) {
    button.addEventListener('click', SwitchToMainPage);
  }
  if (controls) {
    controls.addEventListener('click', SwitchToControlsPage);
  }
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToMainPage() {
  SwitchToState({
    pagename: 'main'
  });
}

function SwitchToRulesPage() {
  SwitchToState({
    pagename: 'rules'
  });
}

function SwitchToGamePage() {
  SwitchToState({
    pagename: 'game'
  });
  location.reload();
}

function SwitchToControlsPage() {
  SwitchToState({
    pagename: 'controls'
  });
}
renderNewState();