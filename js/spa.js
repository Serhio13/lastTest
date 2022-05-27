(function () {
  window.onhashchange = SwitchToStateFromURLHash;
  let SPAStateH = {};
  const app = document.getElementById('app');
  function SwitchToStateFromURLHash() {
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
                <input type="button" value="Records" class="game__list-records button" id="records">
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
              <button id="btn">New Game</button>
              <button id="button-home"><a href="#">Home</a></button>
            </div>
            <canvas id="canvas"></canvas>`;
        break;
    }
    
    document.getElementById('game').addEventListener('click', SwitchToGamePage);
    document.getElementById('rules').addEventListener('click', SwitchToRulesPage);
    document.getElementById('button-home').addEventListener('click', SwitchToMainPage);

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
  SwitchToStateFromURLHash();
})();