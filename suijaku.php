<!DOCTYPE>
<html>
<!--神経衰弱プログラム-->
<head>
  <style>
  td {
    text-align: center;
    vertical-align: top;
  }
  .rule {
    width: 80%;
  }
  #wrap {
    width: 90%;
    margin: auto;
  }
  #selectTable {
    width: 80%;
    max-width: 80%;
    margin-bottom: 20px;
}
</style>
  <meta charset="utf-8">
  <title>神経衰弱</title>
  <!--ページ整形用bootstrap導入用リンク-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
</head>
<body>
  <div id="wrap">
    <!--ヘッダ画像を読み込んでリサイズ-->
    <h1>
      <img src="title.png" width="30%" height="15%">
    </h1>
    <!--モード選択をテーブルのヘッダに指定-->
    <table id="selectTable" class="table table-bordered" border="3px">
      <thead>
        <tr class="table_head">
          <th class="col-xs-2 col-ms-2 col-md-2 col-lg-2">タイムアタックモード</th>
          <th class="col-xs-2 col-ms-2 col-md-2 col-lg-2">対戦モード</th>
        </tr>
      </thead>
      <!--ゲーム開始ボタンをテーブルの要素に指定-->
      <tr>
        <td>
          <a class="btn btn-success" href="solo_page.php">ゲーム開始</a>
        </td>
        <td>
          <a class="btn btn-success" href="pvp_page.php">ゲーム開始</a>
        </td>
      </tr>
    </table>
    <h2>ルール説明</h2>
    <div class="rule">
      <div class="jumbotron">
        <h3>タイムアタックモード</h3>
        <p>・絵柄は10種類の20枚</p>
        <p>・制限時間60秒ですべての絵柄をそろえられたらクリア！</p>
        <p>・制限時間にないにそろえ終われないとゲームオーバーとなります</p>
        </p>
      </div>
      <div class="jumbotron">
        <h3>対戦モード</h3>
        <p>・絵柄は10種類の20枚</p>
        <p>・制限時間なしですべてのカードのペアがなくなるまでゲームを行います。</p>
        <p>・より多くのペアを作ったプレイヤーが勝利！</p>
        <p>・2枚をめくって絵柄がそろわない場合は相手の手番になります。</p>
        <p>・ゲームはPLAYER1から開始してください。</p>
      </div>
    </div>
  </div>
  <!--bootstrapのjsファイル-->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</body>
</html>
