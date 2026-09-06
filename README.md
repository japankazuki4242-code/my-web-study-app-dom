# WEB学習アプリDom

初学者向けのDOM操作教材・辞書。元の `my-web-study-app` と同じダークテーマ、縦型メニュー、折りたたみ解説、BACK/TOPを採用した独立アプリです。

## 公開URL

https://japankazuki4242-code.github.io/my-web-study-app-dom/

## 機能

- 全16レッスン：DOMの準備、JavaScript基礎、取得、文字、クラス、イベント、表示、属性、複数要素、入力、追加削除、ハンバーガーメニュー、FAQ、絞り込み、デバッグ、総合制作。
- 日本語・API名で検索できる辞書。
- 各教材と同じソースで動くデモ。完成例を編集して試す練習欄。
- 完成例・HTML・CSS・JavaScriptのコピーボタン。
- 確認問題、練習の解答、学習済みチェック。
- 全体と各項目の自由メモ。「保存」ボタンでlocalStorageに保存。
- iPhone向けの16px以上の入力文字、44px以上の操作対象、セーフエリア、拡大対応。

## 元のアプリを保護する設計

このリポジトリだけを編集・公開します。元のリポジトリや公開設定は変更しません。
保存キーはすべて `my-web-study-app-dom:v1:` で始まります。元のアプリの保存キーを読み書きせず、localStorage.clear()も使いません。
デモは `sandbox="allow-scripts"` のiframe内で実行し、同一オリジン権限を与えません。CSPで外部通信を禁止しています。

## メモについて

メモはGitHubへ送信されず、端末・ブラウザ間で同期されません。ブラウザのデータ削除等で失われるため、大切な内容は別にも控えてください。教材はオンラインで利用します。練習コードは自動保存しません。

## 開発・公開

ビルドや外部ライブラリは不要。index.html、styles.css、dom.css、lessons.js、app.js、icon.svgを同じ場所に置きます。
GitHub PagesのSettings → PagesでDeploy from a branch、main、/(root)を選んで保存します。

`lessons.js` が教材データ、`app.js` が表示・検索・保存・デモ処理です。教材は自作の日本語解説と実行例です。参考：MDN DOM / classList / addEventListener。
