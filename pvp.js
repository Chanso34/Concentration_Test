// pvp神経衰弱
// ----------------------------------------
// 定数
var RESOURCE_FILE = "resource.png";
var ROWS = 4;       // ステージ行数
var COLS = 5;       // ステージ列数
var CARD_H = 120;   // カード高さ
var CARD_W = 80;    // カード幅
// 変数
var cards = []; // カード番号記録
var opened = [];    // 開いたかどうかを記録
var resImage;
var ctx;        //コンテキスト
var selIndex;   // プレーヤーの選択値
var p1_score;   // Player1スコア
var p2_score;   // Player2スコア
var lock;       // 連続クリック防止用
var scope=1;      // プレイヤー判別用//初期P1

// 初期化処理
window.onload = function () {
  // 描画コンテキスト取得
  var canvas = $("mainCanvas");
  ctx = canvas.getContext("2d");
  canvas.onmousedown = canvasMDHandler;
  // 画像ファイル読み込み
  resImage = loadImage(RESOURCE_FILE, function () {
      initGame();
  });
};

// ゲーム初期化
function initGame() {
  selIndex = -1;  // 未選択
  p1_score = 0;   // スコア宣言
  p2_score = 0;   // スコア宣言
  $("p1_score").innerHTML = "PLAYER1 SCORE: O";
  $("p2_score").innerHTML = "PLAYER2 SCORE: O";
  initCards();
  drawStage();
}

// カードを初期化してシャッフル
function initCards() {
  // 10ペアのカード20枚を配列に代入
  for (var i = 0; i < ROWS * COLS; i++) {
      cards[i] = 1 + Math.floor(i / 2);
  }
  // カードの状態を初期化
  for (var i = 0; i < cards.length; i++) {
      opened[i] = false;
  }
  // シャッフル
  for (var i = 0; i < cards.length; i++) {
    var r = rand(cards.length);
    var tmp = cards[i];
    cards[i] = cards[r];
    cards[r] = tmp;
  }
}

// ステージを描画
function drawStage() {
  // カードを一枚ずつ描画
  for (var i = 0; i < cards.length; i++) {
    var no = cards[i];
    if (opened[i] == false && selIndex != i) {
        no = 0;
    }
    var row = Math.floor(i / COLS);
    var col = i % COLS;
    var y = CARD_H * row;
    var x = CARD_W * col;
    ctx.drawImage(resImage,
        no * CARD_W, 0 , CARD_W, CARD_H,
        x, y, CARD_W, CARD_H);
    // 選択中動作
    if (selIndex == i) {
        ctx.strokeSty1e = "rgba(255,100,100,0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect(x+2, y+2, CARD_W-4, CARD_H-4);
    }
  }
}

// クリックイベント
function canvasMDHandler(e) {
  // クリック位置取得
  var x = e.clientX;
  var y = e.clientY;
  var r = e.target.getBoundingClientRect();
  x -= r.left;
  y -= r.top;
  // クリック箇所判定
  var col = Math.floor(x / CARD_W);
  var row = Math.floor(y / CARD_H);
  pos = col + row *COLS;
  console.log("click=" + pos);
  clickCard(pos);
}

// カード選択処理
function clickCard(pos) {
  // 既出判定
  if (opened[pos]) return;
  if (lock) return;
  // 選択回数判定
  if (selIndex < 0) {
      selIndex = pos;
      drawStage();
      return;
  }
  // 2枚目選択
  if (pos == selIndex) return;
  // 合致判定
  var c1 = cards[selIndex];
  var c2 = cards[pos];
  if (c1 == c2) {
    opened[selIndex] = true;
    opened[pos] = true;
    selIndex = -1;
    if (scope==1) {
      p1_score += 2;
      $("p1_score").innerHTML = "PLAYER1 SCORE: " + p1_score;
    } else {
      p2_score += 2;
      $("p2_score").innerHTML = "PLAYER2 SCORE: " + p2_score;
    }
    drawStage();
    // クリア判定
    if (p1_score+p2_score >= cards.length) {
      if (p1_score>p2_score) {
        var winner = "PLAYER1の勝利！";
      } else if (p1_score<p2_score) {
        var winner = "PLAYER2の勝利！";
      } else {
        var winner = "引き分け";
      }
      setTimeout(function () {
        alert("FINISH!\nPLAYER1:"+p1_score+"点\nPLAYER2:"+p2_score+"点\n"+winner+"\nトップページに戻ります");
        location.href = 'suijaku.php';
        initGame();
      },1);
    }
  } else {
    // 間違いプレイヤーを切り替える
    opened[pos] = true; // posのカードを表向き
    drawStage();    // ステージを描画
    lock = true;
    if (scope==1) {
      scope=2;
    } else if (scope==2) {
      scope=1;
    }
    setTimeout(function () {
        opened[pos] = false;    // カード伏せ
        selIndex = -1;      // 1枚目のカード未選択
        drawStage();    // ステージ描画
        if (scope==1) {
          alert("PLAYER1の番です");
        }
        if (scope==2) {
          alert("PLAYER2の番です");
        }
        lock = false;
    },500);
  }
}

// 画像を読み込む関数
function loadImage(fname, onload) {
  var image = new Image();
  image.src = fname;
  image.onload = onload;
  return image;
}

// 乱数生成用関数
function rand(n) {
  return Math.floor(Math.random() * n);
}

// DOM要素を返す
function $(id) {
  return document.getElementById(id);
}
