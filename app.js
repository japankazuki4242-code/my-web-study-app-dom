'use strict';
const APP_NAME = 'WEB学習アプリDom';
// GitHub Pagesは元アプリと同一オリジン。必ず専用キーだけを読み書きする。
const PREFIX = 'my-web-study-app-dom:v1:';
const main = document.querySelector('#main');
const drafts = new Map();
const dirty = new Set();
let previousRoute = '#home';
let currentRoute = location.hash || '#home';
let currentLesson;
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function read(key, fallback = '') {
  try { return localStorage.getItem(PREFIX + key) ?? fallback; }
  catch { return fallback; }
}
function write(key, value, status) {
  try {
    localStorage.setItem(PREFIX + key, value);
    if (status) status.textContent = '保存しました';
    return true;
  } catch {
    if (status) status.textContent = '保存できませんでした。保存容量やブラウザ設定を確認し、メモをコピーして控えてください。';
    return false;
  }
}
const demoCSS = `* { box-sizing: border-box; }\nhtml { color-scheme: dark; }\nbody { margin:0; padding:18px; background:#121212; color:#f5f5f5; font:16px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; overflow-wrap:anywhere; }\nbutton,input,select { font:inherit; min-height:44px; max-width:100%; padding:10px 12px; color:#f5f5f5; border:1px solid #666; border-radius:8px; background:#2a2a2a; }\nbutton { cursor:pointer; touch-action:manipulation; }\nbutton:hover { background:#3a3a3a; }\ninput,select,label { display:block; width:100%; margin-block:8px; }\na { color:#b8d4ff; }\n:focus-visible { outline:3px solid #b8d4ff; outline-offset:3px; }\n[hidden] { display:none !important; }\nh2 { font-size:23px; line-height:1.5; }`;
function fullCode(item) {
  return `<!doctype html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${esc(item.title)}</title>\n  <style>\n${demoCSS}\n\n/* この教材のCSS */\n${item.css}\n  </style>\n</head>\n<body>\n${item.html}\n\n<!-- HTMLの要素を用意した後でJavaScriptを実行します -->\n<script>\n${item.js}\n</script>\n</body>\n</html>`;
}
function frameSource(code) {
  // 練習は不透明な別オリジンで実行。親画面・メモ・外部通信にアクセスさせない。
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'">`;
  const reporter = `<script>window.addEventListener('error', function(e) { parent.postMessage({type:'dom-demo-error', message:e.message}, '*'); }); document.addEventListener('click', function(e) { const link = e.target.closest('a'); if (!link) return; const href = link.getAttribute('href'); if (href && href.startsWith('#')) { e.preventDefault(); const target = document.getElementById(href.slice(1)); if (target) target.scrollIntoView(); } });<\/script>`;
  return policy + reporter + code;
}
function menu(href, title, detail = '') {
  return `<a class="menu-button" href="${href}"><span>${esc(title)}${detail ? `<small>${esc(detail)}</small>` : ''}</span><span aria-hidden="true">＞</span></a>`;
}
function accordion(title, body, open = false) {
  return `<details${open ? ' open' : ''}><summary>${title}</summary><div class="details-content">${body}</div></details>`;
}
function memo(key) {
  return `<div class="free-memo-area" data-memo="${key}"><label for="memo-${key}">自由メモ</label><textarea class="free-memo-input" id="memo-${key}" name="memo-${key}" autocomplete="off" placeholder="気づいたことやコードを書いてください…"></textarea><button class="nav-button free-memo-save-button" data-save="${key}" type="button">保存</button><p class="free-memo-status" role="status"></p></div>`;
}
function bindMemos() {
  main.querySelectorAll('[data-memo]').forEach(area => {
    const key = area.dataset.memo;
    const input = area.querySelector('textarea');
    const status = area.querySelector('[role="status"]');
    input.value = drafts.has(key) ? drafts.get(key) : read('memo:' + key);
    if (dirty.has(key)) status.textContent = '未保存です。「保存」を押してください。';
    input.addEventListener('input', () => {
      drafts.set(key, input.value);
      dirty.add(key);
      status.textContent = '未保存です。「保存」を押してください。';
    });
    area.querySelector('button').addEventListener('click', () => {
      if (write('memo:' + key, input.value, status)) {
        drafts.set(key, input.value);
        dirty.delete(key);
      }
    });
  });
}
function codeBlock(label, value, key) {
  return `<h3>${label}</h3><button type="button" class="nav-button copy-button" data-copy="${key}">${label}をコピー</button><pre tabindex="0" aria-label="${label}コード"><code translate="no">${esc(value)}</code></pre>`;
}
async function copy(value, button) {
  const status = main.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(value);
    status.textContent = 'コピーしました。貼り付け先で「ペースト」してください。';
    const old = button.textContent;
    button.textContent = 'コピーしました';
    setTimeout(() => { if (button.isConnected) button.textContent = old; }, 1800);
  } catch {
    status.textContent = 'コピーできませんでした。下のコードを長押しして選択・コピーしてください。';
  }
}
function home() {
  const completed = LESSONS.filter(item => read('done:' + item.id) === '1').length;
  const next = LESSONS.find(item => read('done:' + item.id) !== '1') || LESSONS[0];
  main.innerHTML = `<h1>${APP_NAME}</h1><p class="intro">DOM操作を、基本から。<br>学んで、試して、いつでも見返す。</p><div class="button-list">${menu('#learn','順番に学ぶ','全16レッスン・基本からホームページ制作へ')}${menu('#dictionary','やりたいことから探す','日本語・コード名で引けるDOM辞書')}${menu('#memo','自由メモ','学んだこと・自分用コードを保存')}${menu('#guide','使い方・用語集','初めて使う方はこちら')}</div><section class="panel"><h2>学習の進み具合</h2><p>${completed} / ${LESSONS.length} レッスン完了</p><progress max="${LESSONS.length}" value="${completed}" aria-label="学習の進み具合"></progress><div class="button-list">${menu('#lesson/' + next.id, completed === LESSONS.length ? '最初から見返す' : '次のレッスンへ',next.title)}</div></section>`;
}
function learn() {
  main.innerHTML = `<h1>順番に学ぶ</h1><p class="intro">上から1つずつ。「動きを試す」だけの日があっても大丈夫です。</p><div class="button-list">${LESSONS.map((item,index) => menu('#lesson/' + item.id, `${String(index + 1).padStart(2,'0')}　${item.title}`,read('done:' + item.id) === '1' ? '✓ 学習済み・何度でも復習できます' : index < 3 ? '基本を知る' : index < 11 ? '小さな操作を身につける' : 'ホームページに使う')).join('')}</div>`;
}
function dictionary() {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const query = params.get('q') || '';
  main.innerHTML = `<h1>やりたいことから探す</h1><label class="search-label" for="search">日本語・コード名で検索</label><input class="study-item-input" id="search" name="search" type="search" autocomplete="off" placeholder="例：メニュー、文字、classList…"><p id="search-status" class="status" role="status"></p><div class="button-list" id="results"></div>`;
  const search = main.querySelector('#search');
  search.value = query;
  function update() {
    const words = search.value.trim().normalize('NFKC').toLowerCase().split(/\s+/).filter(Boolean);
    const found = LESSONS.filter(item => words.every(word => [item.title,item.goal,item.keywords,item.js].join(' ').normalize('NFKC').toLowerCase().includes(word)));
    main.querySelector('#search-status').textContent = found.length ? `${found.length}件のレッスン` : '見つかりませんでした。「表示」「入力」など短い言葉で探してください。';
    main.querySelector('#results').innerHTML = found.map(item => menu('#lesson/' + item.id,item.title,item.goal)).join('');
  }
  search.addEventListener('input', () => {
    history.replaceState(null,'', '#dictionary' + (search.value ? '?q=' + encodeURIComponent(search.value) : ''));
    currentRoute = location.hash;
    update();
  });
  update();
}
function guide() {
  const terms = [['DOM','ブラウザがHTMLから作る、JavaScriptで操作できる文書の構造。'],['要素','p、button、navなど、HTMLを構成する部品。'],['セレクター','操作したい要素を指定する書き方。#titleはid、.cardはclassを指定します。'],['変数','値に付ける名前。取得した要素も変数に入れられます。'],['プロパティ','要素などが持つ情報。textContentやhiddenが例です。'],['メソッド','対象に対して呼び出す処理。querySelector()やappend()など。'],['イベント','クリック、入力など、ブラウザ内で起きる出来事。'],['関数・コールバック','関数は処理のまとまり。コールバックは他の処理へ渡し、必要なタイミングで呼んでもらう関数です。'],['引数','関数を呼ぶときに渡す情報。toggle("open")の"open"など。'],['真偽値','true（成り立つ）とfalse（成り立たない）の2つの値。'],['null','対象が存在しないことを表す値。取得の失敗を確認するときに使います。'],['localStorage','この端末・ブラウザの中に文字を保存する仕組み。GitHubへの保存や端末間の同期ではありません。']];
  main.innerHTML = `<h1>使い方・用語集</h1><div class="details-list">${accordion('学習の進め方','<ol><li>「順番に学ぶ」を上から開きます。</li><li>デモで動きを確かめます。</li><li>解説とコードを読み、練習で少し変更します。</li><li>確認問題を解き、理解できたら「学習済みにする」にチェックします。</li><li>復習は辞書から。気づいたことは自由メモに保存します。</li></ol>',true)}${accordion('コードの使い方','<p>iPhoneでは「完成例をコピー」でコピーし、メモやコード編集アプリへ貼り付けられます。このアプリの練習欄でも編集して実行できます。</p><p>パソコンでは新しいindex.htmlに完成例を貼り付け、保存してブラウザで開きます。HTML・CSS・JavaScriptを分けて使う手順は各レッスンのコード欄にあります。</p><p>練習欄の変更はページを離れると元に戻ります。残したいコードは自由メモに貼り付けて「保存」を押してください。</p>')}${accordion('自由メモ・学習状況の保存','<p>元のアプリと同じく、自由メモは「保存」ボタンでブラウザ内に保存します。教材はGitHubで公開していますが、あなたのメモはGitHubに送信されません。</p><p>端末やブラウザを変えると別のメモになります。ブラウザのデータ削除やプライベートブラウズの終了などで消える場合があります。大切なメモはコピーして別にも控えてください。</p><p>新アプリ専用の保存名を使用しています。元のアプリのメモを読み書きすることはありません。</p>')}${accordion('iPhoneでいつでも見返す','<p>公開URLをSafariのブックマークに保存すると開きやすくなります。Safariの共有メニューから「ホーム画面に追加」する使い方もあります。</p><p>教材を開くにはインターネット接続が必要です。文字は拡大でき、コード欄は横にスクロールできます。</p>')}${accordion('用語集',`<dl class="glossary">${terms.map(([term,definition]) => `<dt>${term}</dt><dd>${definition}</dd>`).join('')}</dl>`)}${accordion('さらに調べる','<p><a href="https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model">MDN：DOMの説明</a></p><p><a href="https://developer.mozilla.org/ja/docs/Web/API/Element/classList">MDN：classList</a></p><p><a href="https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener">MDN：addEventListener</a></p>')}</div>`;
}
function showLesson(item) {
  currentLesson = item;
  const index = LESSONS.indexOf(item);
  const code = fullCode(item);
  main.innerHTML = `<p class="eyebrow">STEP ${String(index + 1).padStart(2,'0')} / ${LESSONS.length}</p><h1>${esc(item.title)}</h1><p class="intro">${esc(item.goal)}</p><div class="details-list">${accordion('1. 動きを試す',`<p>下のデモを操作してみましょう。画面内で安全に練習できます。</p><iframe class="demo" id="demo" title="${esc(item.title)}のデモ" sandbox="allow-scripts allow-forms"></iframe><button type="button" class="nav-button copy-button" id="reset-demo">デモを最初に戻す</button><p id="demo-status" class="status" role="status"></p>`,true)}${accordion('2. コードの意味',`<ol>${item.explain.map(text => `<li>${esc(text)}</li>`).join('')}</ol>`)}${accordion('3. コード・コピー',`<p>まずは「完成例」をコピーすると、この例だけで動くHTMLを使えます。新しいindex.htmlへ全文を貼り付けて保存し、ブラウザで開きます。</p>${codeBlock('完成例',code,'full')}<p>ファイルを分ける場合：HTMLはbodyの中、CSSはstyle.css、JavaScriptはscript.jsへ貼り付けます。以下の読み込み指定もheadの中に追加してください。</p>${codeBlock('読み込み指定','<link rel="stylesheet" href="style.css">\n<script src="script.js" defer></script>','loader')}${codeBlock('HTML',item.html,'html')}${codeBlock('CSS',demoCSS + '\n\n' + item.css,'css')}${codeBlock('JavaScript',item.js,'js')}<p id="copy-status" class="status" role="status"></p>`)}${accordion('4. 少し変えて練習',`<p>${esc(item.task)}</p><label for="editor">練習用コード（完成例を編集）</label><textarea id="editor" name="code" class="free-memo-input editor" autocomplete="off" spellcheck="false"></textarea><button type="button" class="nav-button copy-button" id="run">変更したコードを実行</button><p id="practice-status" class="status" role="status"></p><iframe class="demo" id="practice" title="練習の実行結果" sandbox="allow-scripts allow-forms"></iframe><p>変更は自動保存されません。残したいコードは自由メモへコピーし、保存してください。</p>${accordion('ヒント・解答例',`<p>${esc(item.answer)}</p>`)}`)}${accordion('5. 確認問題',`<p>${esc(item.quiz)}</p>${item.choices.map((choice,i) => `<button type="button" class="nav-button quiz-choice" data-choice="${i}">${esc(choice)}</button>`).join('')}<p id="quiz-status" class="status" role="status"></p>`)}${accordion('6. よくある間違い',`<p>${esc(item.mistake)}</p>`)}${accordion('7. この項目の自由メモ',memo(item.id))}</div><section class="panel"><label class="check-label"><input id="done" type="checkbox" ${read('done:' + item.id) === '1' ? 'checked' : ''}>学習済みにする</label><p id="done-status" class="status" role="status"></p></section><div class="lesson-navigation">${index < LESSONS.length - 1 ? menu('#lesson/' + LESSONS[index + 1].id,'次のレッスン',LESSONS[index + 1].title) : menu('#dictionary','辞書で復習する','自分のホームページに使ってみましょう')}${menu('#learn','レッスン一覧へ')}</div>`;
  const demo = main.querySelector('#demo');
  demo.srcdoc = frameSource(code);
  main.querySelector('#editor').value = code;
  main.querySelector('#practice').srcdoc = frameSource(code);
  main.querySelector('#reset-demo').addEventListener('click', () => { demo.srcdoc = frameSource(code); main.querySelector('#demo-status').textContent = 'デモを最初に戻しました'; });
  main.querySelector('#run').addEventListener('click', () => {
    main.querySelector('#practice-status').textContent = '実行しました。下の画面で動きを確認してください。';
    main.querySelector('#practice').srcdoc = frameSource(main.querySelector('#editor').value);
  });
  const copies = { full:code, html:item.html, css:demoCSS + '\n\n' + item.css, js:item.js, loader:'<link rel="stylesheet" href="style.css">\n<script src="script.js" defer></script>' };
  main.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copy(copies[button.dataset.copy], button)));
  main.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    main.querySelector('#quiz-status').textContent = Number(button.dataset.choice) === item.correct ? '正解です！ 練習でも確かめてみましょう。' : 'もう一度考えてみましょう。「コードの意味」を見返すとヒントがあります。';
  }));
  main.querySelector('#done').addEventListener('change', event => {
    if (!write('done:' + item.id,event.target.checked ? '1':'0',main.querySelector('#done-status'))) event.target.checked = !event.target.checked;
  });
}
function render() {
  const route = location.hash.slice(1).split('?')[0] || 'home';
  currentLesson = null;
  if (route === 'home' || route === 'main') home();
  else if (route === 'learn') learn();
  else if (route === 'dictionary') dictionary();
  else if (route === 'guide') guide();
  else if (route === 'memo') main.innerHTML = `<h1>自由メモ</h1><p class="intro">学んだことやコードを記録しましょう。<br>「保存」を押すと、このブラウザに保存します。</p>${memo('general')}<p class="muted">元のアプリとは別のメモです。大切な内容はコピーして別にも控えてください。</p>`;
  else {
    const item = LESSONS.find(lesson => route === 'lesson/' + lesson.id);
    if (item) showLesson(item);
    else main.innerHTML = `<h1>ページが見つかりません</h1><div class="button-list">${menu('#home','トップへ戻る')}</div>`;
  }
  document.title = route === 'home' ? APP_NAME : main.querySelector('h1').textContent + ' | ' + APP_NAME;
  bindMemos();
}
window.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'dom-demo-error') return;
  for (const [id,status] of [['demo','demo-status'],['practice','practice-status']]) {
    const frame = main.querySelector('#' + id);
    if (frame && event.source === frame.contentWindow) main.querySelector('#' + status).textContent = 'コードを確認してください：' + String(event.data.message).slice(0,300);
  }
});
window.addEventListener('beforeunload', event => {
  if (dirty.size) { event.preventDefault(); event.returnValue = ''; }
});
document.querySelector('#back-button').addEventListener('click', () => {
  if (currentLesson) location.hash = previousRoute.startsWith('#dictionary') ? previousRoute : '#learn';
  else location.hash = '#home';
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange', () => {
  previousRoute = currentRoute;
  currentRoute = location.hash || '#home';
  render();
  window.scrollTo(0,0);
  main.focus({preventScroll:true});
});
render();
