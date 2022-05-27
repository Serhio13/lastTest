const game = {
  canvas: null,
  ctx: null,
  draw: null,
  play: null,
  emptyCells: 16,
  score: 0,
  history: '0',
  start() {
    game.init();
    game.play.onKeyDown();
    game.play.onTouchStart();
    game.play.onTouchMove();
    game.play.onTouchEnd();
    game.play.reload();
  },
  init() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.canvas.width = 550;
    this.canvas.height = 550;
    this.draw.produce();
    this.draw.produce();
    if (this.history) {
      document.getElementById('history').innerText = `Record: ${String(this.history)}`;
    }
  },
  move(dir) {
    function modify(x, y) {
      tx = x, ty = y;
      if (dir[0] == 0) {
        let q = tx;
        tx = ty;
        ty = q;
      } // Условие вверх/вниз
      if (dir[1] > 0) {
        tx = 3 - tx
      } // Условие движения вниз. Пример - для клетки 0, 0 вернется 3, 0
      if (dir[0] > 0) {
        ty = 3 - ty
      } // Условие лево/право
      return [tx, ty];
    }
    for (let i = 0; i < 4; i++) {
      const tmp = Array();
      let isadd = false;
      for (let j = 0; j < 4; j++) {
        let modifyResult = modify(i, j);
        let ti = modifyResult[0];
        let tj = modifyResult[1];
        if (this.draw.map[ti][tj] != 0) {
          if (!isadd && this.draw.map[ti][tj] == tmp[tmp.length - 1]) {
            this.score += (tmp[tmp.length - 1] *= 2);
            isadd = true;
            this.emptyCells += 1;
          } else {
            tmp.push(this.draw.map[ti][tj]);
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        let modifyResult = modify(i, j);
        let ti = modifyResult[0];
        let tj = modifyResult[1];
        this.draw.map[ti][tj] = isNaN(tmp[j]) ? 0 : tmp[j];
      }
    }
    this.draw.produce();
    if (this.emptyCells == 0) {
      alert('game over');
      this.historyScore(this.score);
    }
    this.draw.block();
  },
  historyScore(scores) {
    if (!this.history) {
      this.history = scores;
    }
    if (scores > this.history) {
      this.history = scores;
    }
  }
};

window.addEventListener('load', () => {
  game.start();
});