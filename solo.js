// solo神経衰弱
// ----------------------------------------
// 定数
var RESOURCE_FILE = "resource.png";
var ROWS = 4;       // ステージ行数
var COLS = 5;       // ステージ列数
var CARD_H = 120;   // カード高さ
var CARD_W = 80;    // カード幅
var DEFAULT_TIME = 60;  // 残り時間
// 変数
var cards = []; // カード番号記録
var opened = [];    // 開いたかどうかを記録
var resImage;
var ctx;
var selIndex;   // プレーヤーの選択値
var score;      // スコア
var time;       // 残り時間
var lock;       // 連続クリック防止用
var timer;      // タイマー

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
    score = 0;
    time = DEFAULT_TIME;
    $("score").innerHTML = "SCORE: O";
    initCards();
    drawStage();
    countTime();
}

// カードを初期化してシャッフル
function initCards() {
    // 10ペアのカード20枚を配列に代入
    for (var i = 0; i < ROWS * COLS; i++) {
        cards[i] = 1 + Math.floor(i / 2);
    }
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
        score += 2;
        $("score").innerHTML = "SCORE: " + score;
        drawStage();
        // クリア判定
        if (score >= cards.length) {
            setTimeout(function () {
                alert("GAME CLEAR!  残り時間は"+time+"秒です！\nトップページに戻ります");
                location.href = 'suijaku.php';
                clearTimeout(timer);
                initGame();
            },1);
        }
    } else {
        // 間違い。1秒だけカードをプレイヤーに見せる
        opened[pos] = true; // posのカードを表向き
        drawStage();    // ステージを描画
        lock = true;
        setTimeout(function () {
            opened[pos] = false;    // カード伏せ
            selIndex = -1;      // 1枚目のカード未選択
            drawStage();    // ステージ描画
            lock = false;
        },1000);
    }
}

// タイマーのカウントダウン
function countTime() {
    if (score >= ROWS * COLS) return;
    time--;
    $("time").innerHTML = "TIME: " + time;
    // タイムアップ
    if (time <= 0) {
        alert("TIME UP...GAME OVER\nホーム画面へ戻ります");
        location.href = 'suijaku.php';
        clearTimeout(timer);
        initGame();
        return;
    }
    // 次回タイマーの設定
    timer = setTimeout(countTime, 1000);
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
