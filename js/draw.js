game.draw = {
  game: game,
  numColor: {
    0: '#ccc0b3',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#ec6544',
    128: '#e44d29',
    256: '#edcf72',
    512: '#c8a145',
    1024: '#a8832b',
    2048: '#86aa9c'
  }, //Цвета блоков//
  numSize: {
    0: '60',
    2: '60',
    4: '60',
    8: '60',
    16: '60',
    32: '60',
    64: '60',
    128: '50',
    256: '50',
    512: '50',
    1024: '40',
    2048: '40'
  }, //размер цифры//
  offsetx: {
    0: 65,
    2: 65,
    4: 65,
    8: 65,
    16: 45,
    32: 45,
    64: 45,
    128: 40,
    256: 40,
    512: 40,
    1024: 40,
    2048: 40
  }, //Смещение цифры для центрирования//
  map: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  loop(func) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        func(i, j);
      }
  }, //Обход двумерного массива//
  produce() {
    let rand = Math.floor(Math.random() * game.emptyCells);
    let k = 0;
    this.loop(function (i, j) {
      if (game.draw.map[i][j] == 0) {
        if (rand == k) {
          game.draw.map[i][j] = 2;
          game.draw.block();
        }
        k += 1;
      }
    });
    game.emptyCells -= 1;
  }, //добавление новых блоков в пустые клетки//
  block() {
    this.loop(function (i, j) {
      let num = game.draw.map[i][j];
      color = game.draw.numColor[num];
      game.draw.roundRect(j * 130 + 30, i * 130 + 30, color);
      if (num != 0) {
        game.ctx.font = `bold ${game.draw.numSize[num]}px arial`;
        game.ctx.fillStyle = (num <= 4) ? '#776e65' : 'white';
        game.ctx.fillText(String(game.draw.map[i][j]), j * 132 + game.draw.offsetx[num], i * 132 + 80 + game.draw.numSize[num] / 3);
      }
    });
    document.getElementById('score').innerText = `Score: ${String(game.score)}`;
  }, //отрисовка всех блоков//
  roundRect(x, y, c) {
    const boxWidth = game.canvas.width * 0.2;
    const marginWidth = game.canvas.width * 0.05;
    game.ctx.beginPath();
    game.ctx.fillStyle = c;
    game.ctx.moveTo(x, y);
    game.ctx.arcTo(x + boxWidth, y, x + boxWidth, y + 2, marginWidth * 0.7);
    game.ctx.arcTo(x + boxWidth, y + boxWidth, x + boxWidth - 1, y + boxWidth, marginWidth * 0.7);
    game.ctx.arcTo(x, y + boxWidth, x, y + boxWidth - 1, marginWidth * 0.7);
    game.ctx.arcTo(x, y, x + 1, y, marginWidth * 0.7);
    game.ctx.fill();
  } //отрисовка блока//
};