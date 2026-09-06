/* 教材はデモ・コピー・練習で同じソースを使い、表示と実行のずれを防ぎます。 */
const LESSONS = [];
function lesson(id, title, goal, html, css, js, explain, mistake, task, answer, quiz, choices, correct, keywords) {
  LESSONS.push({ id, title, goal, html, css, js, explain, mistake, task, answer, quiz, choices, correct, keywords });
}
lesson('start','DOMとは？・学習の準備',
 'HTMLを画面の部品として捉え、JavaScriptで操作する準備をします。HTMLは構造、CSSは見た目、JavaScriptは動作を担当します。',
 '<h2 id="title">はじめてのDOM</h2>\n<p>下のボタンを押してみましょう。</p>\n<button id="button" type="button">文字を変える</button>', '',
 'const title = document.querySelector("#title");\nconst button = document.querySelector("#button");\n\nbutton.addEventListener("click", function () {\n  title.textContent = "DOMで変わりました！";\n});',
 ['DOMは、ブラウザがHTMLを読み取って作る「操作できる文書の構造」です。h2やbuttonなどの要素をJavaScriptから扱えます。','基本の流れは「要素を取得する → 操作のきっかけを決める → 要素を変える」です。この3つを少しずつ学びます。','iPhoneではデモと練習欄で試せます。パソコンで制作する場合は、完成例を新しいindex.htmlに貼り付け、ブラウザで開きます。','DOMを書き換えても元のHTMLファイルそのものは書き換わりません。通常、再読み込みすると元の表示に戻ります。'],
 'コードはこの時点ですべて暗記しなくて大丈夫です。まずボタンと文字の変化を確かめましょう。',
 '完成例の「DOMで変わりました！」を「学習スタート！」に変えて実行し、ボタンを押しましょう。',
 'title.textContent = "学習スタート！"; に変えます。引用符は残します。',
 'DOM操作で変わるものは？',['表示中のページの要素','GitHub上の元ファイル'],0,'入門 準備 HTML CSS DOM document');

lesson('basics','必要なJavaScriptの基本',
 'const・let・関数・ifを、DOM操作に必要な分だけ学びます。ボタンを押した回数を数えましょう。',
 '<button id="count" type="button">1回増やす</button>\n<p id="result" aria-live="polite">0回</p>', '',
 'const button = document.querySelector("#count");\nconst result = document.querySelector("#result");\nlet count = 0;\n\nfunction updateCount() {\n  count = count + 1;\n  result.textContent = count + "回";\n  if (count >= 3) {\n    result.textContent = count + "回：よくできました！";\n  }\n}\n\nbutton.addEventListener("click", updateCount);',
 ['constは後から別の値を代入しない変数、letは値を入れ直す変数に使います。変数は値に付ける名前です。','count = count + 1 は「今の値に1を足して、countに入れ直す」という意味です。数学の等式とは違います。','functionは処理をまとめる書き方です。updateCountは自分で付けた関数名で、()を付けると実行します。','イベント登録ではupdateCountと書き、クリックされたときに実行してもらいます。ifは条件が成り立つときだけ中の処理を実行します。'],
 'addEventListenerにupdateCount()を渡すと、その場で関数が実行されます。登録するだけなら括弧を付けません。',
 '5回押したらメッセージが出るように変えましょう。','if (count >= 5) に変えます。>= は「以上」です。',
 '回数のように値を入れ直す変数に使うのは？',['const','let'],1,'変数 関数 条件分岐 if let const カウンター');

lesson('select','要素を取得する',
 '操作したい要素を、idやclassで指定できるようになります。',
 '<p id="message">変更前の文章</p>\n<p class="note">補足の文章</p>', '',
 'const message = document.querySelector("#message");\nconst note = document.querySelector(".note");\n\nmessage.textContent = "idで取得できました";\nnote.textContent = "classで取得できました";',
 ['documentは現在のページを表します。querySelectorはCSSのセレクターで探し、最初に一致した要素を返します。','id="message"を探すときは"#message"、class="note"を探すときは".note"です。idは同じページ内で重複させません。','getElementById("message")でもidで取得できます。この書き方には#を付けません。','要素がない場合、querySelectorはnullを返します。HTMLに対象があるかを確認しましょう。'],
 'HTMLより先にJavaScriptを実行すると要素が見つからないことがあります。外部JSはdeferを付けるか、bodyの最後で読み込みます。',
 'HTMLのidとJavaScriptの指定を、両方ともgreetingに変えましょう。','HTMLはid="greeting"、JSはquerySelector("#greeting")にします。',
 'class="card"を探す指定は？',['"#card"','".card"'],1,'querySelector getElementById セレクター 取得 id class null');

lesson('text','文字を変更する',
 '見出しやメッセージをtextContentで変更します。',
 '<p id="message" aria-live="polite">こんにちは</p>\n<button id="change" type="button">あいさつを変える</button>', '',
 'const message = document.querySelector("#message");\nconst button = document.querySelector("#change");\n\nbutton.addEventListener("click", function () {\n  message.textContent = "ようこそ、私のホームページへ！";\n});',
 ['textContentは要素の中の文字を読み書きするプロパティです。= の右側に新しい文字を書きます。','文字列は" "または\' \'で囲みます。日本語のかぎ括弧「 」だけでは文字列になりません。','textContentにHTMLタグを書いてもタグとして実行されず、文字として表示されます。入力された文字を表示するときにも適しています。','要素の子要素も文字で置き換わるので、変更したい文章専用のpやspanを用意すると扱いやすくなります。'],
 '入力された文字をinnerHTMLに入れると、HTMLとして解釈されます。通常の文章にはtextContentを使いましょう。',
 '表示する文章を自分のサイトの歓迎メッセージに変えましょう。','message.textContent = "私の作品集へようこそ！"; などに変更します。',
 'ユーザーの入力を文字として表示するには？',['textContent','innerHTML'],0,'テキスト 文字 見出し 変更 textContent innerHTML');

lesson('class','色・見た目を切り替える',
 'classListでCSSクラスを付け外しし、見た目を切り替えます。',
 '<p id="card">注目してほしいお知らせ</p>\n<button id="toggle" type="button">強調を切り替える</button>',
 '.highlight {\n  background: #b8d4ff;\n  color: #121212;\n  padding: 16px;\n  border-radius: 8px;\n}',
 'const card = document.querySelector("#card");\nconst button = document.querySelector("#toggle");\n\nbutton.addEventListener("click", function () {\n  card.classList.toggle("highlight");\n});',
 ['classList.add("highlight")はクラスを追加、removeは削除します。','toggleはクラスがあれば外し、なければ付けます。同じボタンで状態を切り替えるときに便利です。','contains("highlight")はクラスがあるかをtrueまたはfalseで返します。trueは「はい」、falseは「いいえ」に当たります。','見た目をCSS、切り替えるタイミングをJavaScriptに分けると、後から色を変更しやすくなります。'],
 'classList.toggle(".highlight")にはしません。classListには先頭のドットを付けずクラス名だけ渡します。',
 'CSSの背景色を#ffe08aに変えましょう。次にtoggleをaddに変え、2回押した結果を比べましょう。','addでは2回押しても強調されたままです。toggleに戻すと付け外しできます。',
 'クラスを付け外しするメソッドは？',['toggle','contains'],0,'classList toggle add remove contains 色 スタイル 強調');

lesson('events','クリック・イベントを扱う',
 'イベントを登録し、押されたボタンの情報を使います。iPhoneのタップにもclickが使えます。',
 '<button id="button" type="button">押してみる</button>\n<p id="result" aria-live="polite">まだ押されていません</p>', '',
 'const button = document.querySelector("#button");\nconst result = document.querySelector("#result");\n\nbutton.addEventListener("click", function (event) {\n  result.textContent = event.currentTarget.textContent + " を押しました";\n});',
 ['addEventListenerの1つ目の引数はイベント名、2つ目はイベントが起きたときの関数です。引数は関数に渡す情報です。','eventには発生したイベントの情報が入ります。currentTargetはイベントを登録した要素です。','targetは実際に押された内側の要素になることもあります。ボタンの中にspanがある場合などに違いが出ます。','操作にはbuttonを使うと、タップだけでなくキーボードのEnterやSpaceでも操作できます。'],
 'イベント名は"onclick"ではなく"click"です。ボタンの文字を取得する場合は.textContentを付けます。',
 'ボタンの文字を「予約する」に変えて、表示メッセージも変わることを確かめましょう。','event.currentTarget.textContentがボタンの現在の文字を読み取るため、JSを変更しなくても反映されます。',
 'イベントを登録した要素を示すのは？',['event.currentTarget','event.targetだけ'],0,'click addEventListener event currentTarget target クリック タップ');

lesson('visibility','表示・非表示を切り替える',
 '「もっと見る」ボタンで説明文を開閉します。',
 '<button id="toggle" type="button" aria-expanded="false" aria-controls="detail">もっと見る</button>\n<p id="detail" hidden>ここに詳しいサービスの説明が入ります。</p>', '',
 'const button = document.querySelector("#toggle");\nconst detail = document.querySelector("#detail");\n\nbutton.addEventListener("click", function () {\n  detail.hidden = !detail.hidden;\n  const isOpen = !detail.hidden;\n  button.setAttribute("aria-expanded", String(isOpen));\n  button.textContent = isOpen ? "閉じる" : "もっと見る";\n});',
 ['hiddenがtrueなら非表示、falseなら表示です。! はtrueとfalseを反転します。','aria-controlsは操作対象のid、aria-expandedは開いているかを伝える属性です。読み上げを使う人にも状態を伝えます。','setAttributeはHTML属性を変更します。String(isOpen)で真偽値を"true"または"false"の文字列にします。','条件 ? A : B は、条件がtrueならA、falseならBを使う書き方です。ここではボタンの文字を切り替えます。'],
 'CSSのdisplay指定がhiddenと競合する場合があります。この教材の完成例では[hidden]を確実に非表示にしています。',
 '最初から説明を開くには、HTMLのどこを変えるでしょう？','pのhiddenを外し、aria-expanded="true"、ボタンの文字を「閉じる」にします。3つの初期状態をそろえます。',
 'hiddenがtrueのとき、要素は？',['表示される','非表示になる'],1,'hidden 表示 非表示 もっと見る 開閉 aria-expanded');

lesson('attributes','リンク・属性を変更する',
 'リンク先やラベルなど、HTML属性を変更します。画像ならsrcとaltも同じ考え方です。',
 '<a id="link" href="#intro">紹介へ</a>\n<button id="change" type="button">リンク先を変える</button>\n<section id="intro"><h3>紹介</h3><p>サイトの紹介です。</p></section>\n<section id="contact"><h3>お問い合わせ</h3><p>連絡先の案内です。</p></section>', '',
 'const link = document.querySelector("#link");\nconst button = document.querySelector("#change");\n\nbutton.addEventListener("click", function () {\n  link.setAttribute("href", "#contact");\n  link.textContent = "お問い合わせへ";\n});',
 ['hrefはリンク先を指定する属性です。#contactなら同じページのid="contact"へ移動します。','setAttribute("属性名", "値")で属性を設定し、getAttribute("属性名")で現在の値を取得できます。','画像を変えるときはimage.src = "photo.jpg";、説明はimage.alt = "写真の説明"; と書けます。画像ファイルを置く必要があります。','リンク先だけでなく文字も合わせて変更すると、移動先が分かりやすくなります。'],
 'リンク先のidのつづりが違うと目的の場所へ移動しません。画像のファイル名は大文字・小文字も確認します。',
 'リンク先を紹介に戻すコードに変えましょう。','hrefを"#intro"に、textContentを"紹介へ"に変えます。',
 'リンク先を指定する属性は？',['alt','href'],1,'属性 setAttribute getAttribute href src alt 画像 リンク');

lesson('multiple','複数の要素をまとめて操作する',
 'querySelectorAllとforEachで、複数のカードをまとめて変更します。',
 '<ul><li class="item">HTML</li><li class="item">CSS</li><li class="item">JavaScript</li></ul>\n<button id="mark" type="button">すべて強調する</button>',
 '.done { color: #b8d4ff; font-weight: 700; }',
 'const items = document.querySelectorAll(".item");\nconst button = document.querySelector("#mark");\n\nbutton.addEventListener("click", function () {\n  items.forEach(function (item) {\n    item.classList.add("done");\n  });\n});',
 ['querySelectorは最初の1つ、querySelectorAllは一致した要素の一覧を返します。','forEachは一覧から1つずつ取り出して関数を実行します。itemにはその回の要素が入ります。','一覧全体にはclassListがありません。1つずつ取り出した要素に対して操作します。','querySelectorAllの結果は取得時点の一覧です。後から追加した要素も含める場合は、もう一度取得します。'],
 'items.classList.add(...)では動きません。items.forEachの中でitem.classList.add(...)と書きます。',
 'liを1つ増やしてから実行し、4つとも強調されるか確認しましょう。','追加したliにもclass="item"を付けます。JSの再実行時に4つが取得されます。',
 'すべての.itemを取得するのは？',['querySelectorAll(".item")','querySelector(".item")'],0,'querySelectorAll forEach 複数 一覧 繰り返し');

lesson('input','入力した文字を使う',
 'フォームへの入力を受け取り、ページに表示します。',
 '<label for="name">お名前</label>\n<input id="name" name="name" type="text" autocomplete="off">\n<p id="preview" aria-live="polite">お名前を入力してください</p>', '',
 'const input = document.querySelector("#name");\nconst preview = document.querySelector("#preview");\n\ninput.addEventListener("input", function () {\n  const name = input.value.trim();\n  if (name === "") {\n    preview.textContent = "お名前を入力してください";\n  } else {\n    preview.textContent = "こんにちは、" + name + "さん";\n  }\n});',
 ['inputイベントは入力内容が変わったときに発生します。キー操作だけでなく貼り付けにも反応します。','input.valueで入力欄の現在の値を取得します。通常のpの文字を取得するtextContentとは使い分けます。','trim()は前後の空白を取り除きます。=== は2つの値が厳密に等しいかを調べます。','空欄のときに何を表示するかも決めると、使う人が次の操作に迷いません。'],
 '入力欄の文字はinput.textContentでは取得できません。valueを使いましょう。',
 'あいさつを「○○さん、ようこそ！」に変えましょう。','preview.textContent = name + "さん、ようこそ！"; に変えます。',
 '入力欄の現在の文字を取得するには？',['input.textContent','input.value'],1,'フォーム 入力 input value trim プレビュー');

lesson('create','要素を追加・削除する',
 '入力した項目をリストに追加し、各項目の削除ボタンで取り除きます。',
 '<form id="form">\n  <label for="item">学びたいこと</label>\n  <input id="item" name="item" autocomplete="off" required>\n  <button type="submit">追加する</button>\n</form>\n<p id="status" aria-live="polite"></p>\n<ul id="list"></ul>',
 'li { margin-block: 12px; overflow-wrap: anywhere; }\nli button { margin-left: 12px; }',
 'const form = document.querySelector("#form");\nconst input = document.querySelector("#item");\nconst list = document.querySelector("#list");\nconst status = document.querySelector("#status");\n\nform.addEventListener("submit", function (event) {\n  event.preventDefault();\n  const text = input.value.trim();\n  if (text === "") {\n    status.textContent = "文字を入力してください";\n    return;\n  }\n  const li = document.createElement("li");\n  const label = document.createElement("span");\n  label.textContent = text;\n  const removeButton = document.createElement("button");\n  removeButton.type = "button";\n  removeButton.textContent = "削除";\n  removeButton.setAttribute("aria-label", text + "を削除");\n  removeButton.addEventListener("click", function () {\n    li.remove();\n    status.textContent = "項目を削除しました";\n  });\n  li.append(label, removeButton);\n  list.append(li);\n  input.value = "";\n  status.textContent = "追加しました。このデモは再読み込みで元に戻ります";\n});',
 ['submitはフォーム送信のイベントです。preventDefault()で通常の送信・画面移動を止めます。','createElement("li")で新しい要素を作ります。この時点ではまだ画面にはありません。','appendで親要素の末尾に追加すると画面に現れます。remove()でその要素を取り除きます。','returnはその関数の処理をそこで終えます。空欄の場合は追加処理まで進まないようにします。'],
 'createElementだけでは表示されません。作る → 文字を設定する → appendする、の順を確認しましょう。',
 '新しい項目が上に追加されるように変えましょう。','list.append(li)をlist.prepend(li)に変えると先頭に追加されます。',
 '作った要素を末尾に追加するのは？',['append','createElement'],0,'createElement append prepend remove 追加 削除 submit preventDefault');

lesson('hamburger','ハンバーガーメニューを作る',
 '三本線のボタンでナビゲーションを開閉します。文字・見た目・読み上げの状態をそろえます。',
 '<header>\n  <strong>My Site</strong>\n  <button id="menu-button" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="メニューを開く">\n    <span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>\n  </button>\n  <nav id="site-nav" aria-label="サイト内メニュー" hidden>\n    <a href="#about">自己紹介</a>\n    <a href="#works">作品</a>\n  </nav>\n</header>\n<section id="about"><h2>自己紹介</h2><p>こんにちは。制作を学んでいます。</p></section>\n<section id="works"><h2>作品</h2><p>ここに作品を紹介します。</p></section>',
 'header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }\n+nav { width: 100%; padding: 12px; background: #2a2a2a; border-radius: 8px; }\n+nav a { display: block; padding: 12px; color: #b8d4ff; }\n+.bars { display: grid; gap: 5px; width: 24px; }\n+.bars span { display: block; height: 2px; background: currentColor; transition: transform .2s, opacity .2s; }\n+.is-open .bars span:nth-child(1) { transform: translateY(7px) rotate(45deg); }\n+.is-open .bars span:nth-child(2) { opacity: 0; }\n+.is-open .bars span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }\n+@media (prefers-reduced-motion: reduce) { .bars span { transition: none; } }'.replace(/^\+/gm, ''),
 'const button = document.querySelector("#menu-button");\nconst nav = document.querySelector("#site-nav");\n\nfunction setMenu(open) {\n  nav.hidden = !open;\n  button.classList.toggle("is-open", open);\n  button.setAttribute("aria-expanded", String(open));\n  button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");\n}\n\nbutton.addEventListener("click", function () {\n  setMenu(nav.hidden);\n});\n\nnav.querySelectorAll("a").forEach(function (link) {\n  link.addEventListener("click", function () {\n    setMenu(false);\n    button.focus();\n  });\n});\n\ndocument.addEventListener("keydown", function (event) {\n  if (event.key === "Escape" && !nav.hidden) {\n    setMenu(false);\n    button.focus();\n  }\n});',
 ['① HTML：buttonに三本の線を入れ、navにリンクをまとめます。aria-controlsにはnavのidを書きます。','② CSS：三本線はspanで描きます。is-openクラスが付くと上下の線を回転し、中央の線を消して×にします。','③ JS：setMenuにtrueを渡すと開き、falseを渡すと閉じます。表示・クラス・aria属性を1か所で更新し、状態のずれを防ぎます。','toggle("is-open", open)の第2引数は付け外しの指定です。trueなら付け、falseなら外します。','④ リンクを押したときとEscapeキーでも閉じます。隠れるリンクにフォーカスを残さないよう、ボタンへ戻します。','この例はページ内で開くメニューです。画面全体を覆うタイプでは、背景操作の制御なども別途設計します。'],
 '見た目だけを×にしてもメニューは開きません。nav.hiddenとaria-expandedも一緒に更新しましょう。',
 '「お問い合わせ」リンクと、その移動先のsectionを追加しましょう。開く → リンクを押す → 閉じるまで確かめます。','nav内に<a href="#contact">お問い合わせ</a>、body内に<section id="contact"><h2>お問い合わせ</h2></section>を追加します。',
 '開閉の状態を読み上げに伝える属性は？',['aria-expanded','classだけ'],0,'ハンバーガー メニュー 三本線 ナビゲーション 開閉 Escape アクセシビリティ');

lesson('faq','FAQ・アコーディオンを作る',
 '複数の質問に開閉処理を登録し、よくある質問欄を作ります。',
 '<button class="question" type="button" aria-expanded="false" aria-controls="a1">初心者でも学べますか？</button>\n<p id="a1" hidden>はい。基本から順番に学べます。</p>\n<button class="question" type="button" aria-expanded="false" aria-controls="a2">スマホでも見られますか？</button>\n<p id="a2" hidden>はい。スマホでも復習できます。</p>',
 '.question { display: block; width: 100%; margin-top: 12px; text-align: left; }',
 'const questions = document.querySelectorAll(".question");\n\nquestions.forEach(function (button) {\n  const answerId = button.getAttribute("aria-controls");\n  const answer = document.getElementById(answerId);\n  button.addEventListener("click", function () {\n    answer.hidden = !answer.hidden;\n    button.setAttribute("aria-expanded", String(!answer.hidden));\n  });\n});',
 ['同じclassを持つボタンをすべて取得し、forEachで個別にイベントを登録します。','aria-controlsから回答のidを読み取り、対応する回答だけを開きます。','それぞれのボタンがそれぞれの回答を覚えるため、他の回答の状態は変わりません。','簡単な開閉だけならHTMLのdetailsとsummaryでも作れます。このアプリの解説欄はその標準機能を使っています。'],
 '回答のidを重複させると、違う回答が開く原因になります。質問ごとに別のidを付けましょう。',
 '3つ目の質問と回答を追加しましょう。','ボタンにclass="question"とaria-controls="a3"、回答にid="a3"とhiddenを付けます。',
 '対応する回答を見つけるために、この例で読む属性は？',['aria-controls','aria-label'],0,'FAQ 質問 回答 アコーディオン 折りたたみ details summary');

lesson('filter','作品一覧を絞り込む',
 'data属性でカテゴリを持たせ、選んだ作品だけを表示します。',
 '<label for="filter">カテゴリ</label>\n<select id="filter" name="filter"><option value="all">すべて</option><option value="web">Web制作</option><option value="photo">写真</option></select>\n<ul><li class="work" data-category="web">カフェのサイト</li><li class="work" data-category="photo">風景写真</li><li class="work" data-category="web">作品集サイト</li></ul>\n<p id="result" aria-live="polite">3件表示</p>', '',
 'const filter = document.querySelector("#filter");\nconst works = document.querySelectorAll(".work");\nconst result = document.querySelector("#result");\n\nfilter.addEventListener("change", function () {\n  const category = filter.value;\n  let count = 0;\n  works.forEach(function (work) {\n    const show = category === "all" || work.dataset.category === category;\n    work.hidden = !show;\n    if (show) { count = count + 1; }\n  });\n  result.textContent = count + "件表示";\n});',
 ['data-categoryは自分で付けるデータ用のHTML属性です。JSではdataset.categoryで読み取ります。','selectの選択が確定するとchangeイベントが発生します。valueで選んだ値を取得します。','||は「または」です。「すべて」が選択されているか、カテゴリが一致したら表示します。','表示件数も更新すると、絞り込みの結果を文字で確認できます。'],
 'optionのvalueとdata-categoryの値はそろえます。見た目の日本語ラベルではなく値を比較しています。',
 '写真カテゴリの作品をもう1つ増やしましょう。','class="work" data-category="photo"を付けたliを追加します。初期の表示件数も4件に更新します。',
 'data-categoryをJSで読むには？',['dataset.category','data.category'],0,'検索 絞り込み フィルター dataset data属性 change select 作品');

lesson('debug','動かないときの確認方法',
 '要素が見つからない場合を扱い、エラーを順番に調べます。',
 '<p id="message">準備ができています</p>\n<button id="check" type="button">要素を確認する</button>\n<p id="result" aria-live="polite"></p>', '',
 'const button = document.querySelector("#check");\nconst result = document.querySelector("#result");\n\nbutton.addEventListener("click", function () {\n  const message = document.querySelector("#message");\n  console.log(message);\n  if (message === null) {\n    result.textContent = "要素がありません。HTMLのidを確認しましょう";\n    return;\n  }\n  result.textContent = "取得成功：" + message.textContent;\n});',
 ['① 読み込み：scriptのsrcとファイル名は合っていますか？ 外部JSをheadで読み込む場合はdeferを付けます。','② 取得：#と.の違い、idやclassのつづりを確認します。nullなら対象が見つかっていません。','③ 処理：引用符、括弧、波括弧が閉じているかを確認します。大文字・小文字も区別されます。','④ パソコンのブラウザでは開発者ツールのConsoleでエラーとconsole.logの結果を見られます。まず最初のエラーから直します。','このデモは取得結果を画面にも表示するため、iPhoneでもnullの意味を確かめられます。'],
 'nullチェックだけで原因が解決するわけではありません。対象があるはずならHTMLと読み込む順番を修正します。',
 'HTMLのidだけをmessage2に変えて実行し、確認ボタンを押しましょう。','JSは#messageを探すため見つかりません。JS側も#message2にそろえると取得成功になります。',
 'querySelectorがnullを返す主な理由は？',['対象の要素が見つからない','必ずブラウザが故障している'],0,'エラー デバッグ 動かない console log null defer');

lesson('project','総合練習・小さなホームページ',
 'これまでの操作を組み合わせ、メニュー・作品絞り込み・入力プレビューがある作品集を完成させます。',
 '<header><h2>私の作品集</h2><button id="menu" type="button" aria-expanded="false" aria-controls="nav">☰ メニュー</button></header>\n<nav id="nav" aria-label="サイト内" hidden><a href="#works">作品へ</a><a href="#greeting">あいさつへ</a></nav>\n<section id="works"><h3>作品</h3><label for="category">表示する作品</label><select id="category" name="category"><option value="all">すべて</option><option value="web">Web</option><option value="photo">写真</option></select>\n<ul><li class="work" data-category="web">お店のホームページ</li><li class="work" data-category="photo">海の写真</li></ul><p id="count" aria-live="polite">2件表示</p></section>\n<section id="greeting"><h3>あいさつを試す</h3><label for="name">お名前（送信されません）</label><input id="name" name="name" autocomplete="off"><p id="preview" aria-live="polite">ようこそ！</p></section>',
 'header { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; }\nnav { background:#2a2a2a; border-radius:8px; padding:12px; }\nnav a { display:block; padding:12px; }\nsection { margin-top:24px; border-top:1px solid #555; padding-top:12px; }',
 'const menu = document.querySelector("#menu");\nconst nav = document.querySelector("#nav");\nfunction setMenu(open) {\n  nav.hidden = !open;\n  menu.setAttribute("aria-expanded", String(open));\n  menu.textContent = open ? "× 閉じる" : "☰ メニュー";\n}\nmenu.addEventListener("click", function () { setMenu(nav.hidden); });\nnav.querySelectorAll("a").forEach(function (link) {\n  link.addEventListener("click", function () { setMenu(false); menu.focus(); });\n});\ndocument.addEventListener("keydown", function (event) {\n  if (event.key === "Escape" && !nav.hidden) { setMenu(false); menu.focus(); }\n});\n\nconst category = document.querySelector("#category");\nconst works = document.querySelectorAll(".work");\nconst count = document.querySelector("#count");\ncategory.addEventListener("change", function () {\n  let visible = 0;\n  works.forEach(function (work) {\n    const show = category.value === "all" || work.dataset.category === category.value;\n    work.hidden = !show;\n    if (show) { visible = visible + 1; }\n  });\n  count.textContent = visible + "件表示";\n});\n\nconst name = document.querySelector("#name");\nconst preview = document.querySelector("#preview");\nname.addEventListener("input", function () {\n  preview.textContent = name.value.trim() === "" ? "ようこそ！" : name.value.trim() + "さん、ようこそ！";\n});',
 ['まず完成デモを操作します。次に完成例をコピーし、新しいindex.htmlとして保存すると単独で動きます。','制作は「HTMLで部品を用意 → CSSで整える → JSで取得 → イベントで変更」の順で進めます。','既存サイトに組み込む場合は、HTML・CSS・JSを対応するファイルに分け、idが他の部品と重複しないようにします。','入力プレビューは画面表示だけです。メール送信やサーバーへの保存は行いません。','完成後は、メニューを2回押す・リンクで閉じる・カテゴリを戻す・入力を空にする、という往復の操作も確認します。'],
 'いくつもの機能を一度に書くと原因を探しづらくなります。メニューが動いてから絞り込み、というように1つずつ確認します。',
 '自分のサイト名に変更し、作品を1つ追加し、FAQを1問追加しましょう。まず自分で作り、必要な項目だけ辞書で見返してください。',
 '作品にはclass="work"とdata-categoryを付け、初期件数も更新します。FAQは「FAQ・アコーディオン」の例を参考にし、idを重複させず追加します。完成条件：メニューの開閉、絞り込み、空欄への対応、FAQの開閉が動くこと。',
 '機能を追加する際の進め方は？',['すべて書いて最後に確認する','1つずつ追加して動作確認する'],1,'総合 実践 ホームページ ポートフォリオ 完成例 制作');
