document.addEventListener("DOMContentLoaded", () => {
	const quizData = [
		{
			question: "わたしの好きな色は？",
			choices: ["みずいろ", "ピンク", "きいろ", "きみどり"],
			correct: 3,
			explanation: "実はきみどりが一番好きです！<br>この4択の色すべて好きですが、小物を買うとなったらついついきみどりのものを購入してしまいます。",
		},
		{
			question: "私が好きなポケモンは？",
			choices: ["ウパー", "ミミッキュ", "ポッチャマ", "イーブイ"],
			correct: 0,
			explanation: "ウパーが大好きです。<br>戦闘の時にずっと頷いている姿や、止まっていると寄って来るところ、笑顔が可愛いところが好きです。<br>ちなみに...あまり公にはしていないですが、アメタマも好きです。",
		},
		{
			question: "私が飼っていたペットは？",
			choices: ["犬", "うさぎ", "インコ", "猫"],
			correct: 2,
			explanation: "昔、オカメインコを飼っていました。<br>電子レンジの500W30秒の音を気に入ってしまって、ずっとそのリズムで鳴いていたのを思い出します。ｶﾜｲｲﾈ",
		},
		{
			question: "私が一番好きなお菓子は？",
			choices: ["チョコレート", "グミ", "マシュマロ", "ポテチ"],
			correct: 3,
			explanation: "ポテチが一番好きです。<br>甘いものも最近は好きですが、ポテチのあのしょっぱさとサクサクと軽い食感がとても好きです。",
		},
		{
			question: "私の好きな季節は？",
			choices: ["春", "夏", "秋", "冬"],
			correct: 0,
			explanation: "春が一番好きです。<br>秋も好きなのですが、花粉が敵です。涼しい中のあたたかい風を感じられるところが好きです。",
		},
		{
			question: "私が思う、人生で一番買って良かったものは？(2025/9月現在)",
			choices: ["紫外線で色が変わるメガネ", "Apple Watch", "iPad", "SwitchBot"],
			correct: 3,
			explanation: "SwitchBotが人生ベストバイアイテムです！<br>自動開閉できるカーテンがすごくQOL爆上がりでおすすめです。<br>「いってきます」といえば家のあらゆる電気や電化製品の電源が切れ、「ただいま」といえば部屋は明るく涼しく、さらに好きなYouTubeの最新動画を自動で再生してくれます。<br>全力で楽したい人におすすめです。",
		},
		{
			question: "私が行ってみたい国は？",
			choices: ["アメリカ", "スイス", "オーストリア", "デンマーク"],
			correct: 3,
			explanation: "デンマークのコペンハーゲンに行ってみたいです！<br>すごく街並みが綺麗で食器などの雑貨がすごく可愛いので、人生で一度は実際に観に行きたいな〜と思います。",
		},
		{
			question: "私は4人きょうだいです。その構成は？",
			choices: ["兄 姉 私 弟", "兄 兄 兄 私", "私 弟 妹 弟", "姉 兄 私 弟"],
			correct: 1,
			explanation: "上に兄が3人います。<br>一番上とは10歳離れているので、小学生の時には車で遠くに連れて行ってもらっていた記憶があります。",
		},
		{
			question: "おりたひめのは歯列矯正のために歯を何本抜いた？",
			choices: ["2本", "4本", "6本", "8本"],
			correct: 3,
			explanation: "高校3年生の頃から歯列矯正を始めました！<br>生まれつき口が小さいこともあって、親知らず4本、上下2本ずつ、合計8本歯を抜くことになりました。<br>成人式までに綺麗にしたいなーと思っていたのですが、思ったよりも時間がかかってしまい、4年でなんとか終えることができました！<br>今ではインビザラインとかで安くできると思うのですが、めんどくさがりやは絶対にワイヤー矯正一択だと思います！",
		},
		{
			question: "私はちいかわの中でどのキャラクターが好き？",
			choices: ["ちいかわ", "ハチワレ", "うさぎ", "モモンガ"],
			correct: 2,
			explanation: "うさぎが好きです。<br>自由奔放なところも、実は隠れて努力しているところも、ちいかわとハチワレには心を開いているところ、それがわかりにくいところ、全て好きです。",
		},
	];

	// DOM
	const cardEl = document.getElementById("js-quiz-card");
	const questionEl = document.getElementById("js-quiz-question");
	const choicesEl = document.getElementById("js-quiz-choices");
	const quizNumberEl = document.getElementById("js-quiz-number");

	const modalEl = document.getElementById("js-quiz-modal");
	const explainCorrectEl = document.getElementById("js-quiz-explain-correct");
	const explainExplanationEl = document.getElementById("js-quiz-explain-explanation");
	const nextBtn = document.getElementById("js-quiz-next");

	const progressCurrent = document.getElementById("js-quiz-progress-current");
	const progressTotal = document.getElementById("js-quiz-progress-total");

	// 判定用
	const judgeEl = document.getElementById("js-quiz-judge");

	// state
	let questions = [];
	let currentIndex = 0;
	let score = 0;
	let locked = false;

	function shuffleArray(arr) {
		const a = arr.slice();
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	function startQuiz() {
		const oldScore = document.querySelector(".c-quiz__score");
		if (oldScore) oldScore.remove();

		questions = shuffleArray(quizData).slice(0, 5);
		currentIndex = 0;
		score = 0;
		locked = false;
		progressTotal.textContent = questions.length;

		cardEl.style.display = "";
		hideModal();
		renderQuestion();
	}

	function renderQuestion() {
		const q = questions[currentIndex];
		if (!q) return;

		progressCurrent.textContent = currentIndex + 1;
		quizNumberEl.textContent = currentIndex + 1;
		questionEl.textContent = q.question;
		choicesEl.innerHTML = "";
		locked = false;

		q.choices.forEach((text, idx) => {
			const li = document.createElement("li");
			li.className = "c-quiz__choice";
			li.tabIndex = 0;
			li.setAttribute("role", "button");
			li.dataset.index = idx;

			const numSpan = document.createElement("span");
			numSpan.className = "c-quiz__choice-num";
			numSpan.textContent = `${idx + 1} `;

			const textSpan = document.createElement("span");
			textSpan.className = "c-quiz__choice-text";
			textSpan.textContent = text;

			li.appendChild(numSpan);
			li.appendChild(textSpan);

			li.addEventListener("click", () => onSelect(idx));
			li.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onSelect(idx);
				}
			});

			choicesEl.appendChild(li);
		});
	}

	// ◯✕を画像で表示する関数
	function showJudge(isCorrect) {
		judgeEl.innerHTML = "";

		const img = document.createElement("img");
		img.className = "c-quiz__judge-mark";
		img.alt = isCorrect ? "正解" : "不正解";
		img.src = isCorrect ? "/_common/img/quiz_correct.svg" : "/_common/img/quiz_wrong.svg";

		const textSpan = document.createElement("span");
		textSpan.className = "c-quiz__judge-text";
		textSpan.textContent = isCorrect ? "正解！" : "不正解...";

		judgeEl.appendChild(img);
		judgeEl.appendChild(textSpan);

		judgeEl.classList.add("is-active");
		judgeEl.classList.toggle("is-correct", isCorrect);
		judgeEl.classList.toggle("is-wrong", !isCorrect);
	}

	function onSelect(idx) {
		if (locked) return;
		locked = true;

		const q = questions[currentIndex];
		const items = choicesEl.querySelectorAll("li");

		items.forEach((li, i) => {
			li.classList.add("is-disabled");
			li.style.pointerEvents = "none";
			if (i === q.correct) li.classList.add("is-correct");
			if (i === idx && i !== q.correct) li.classList.add("is-wrong");
		});

		const isCorrect = idx === q.correct;
		if (isCorrect) score += 1;

		showJudge(isCorrect);

		setTimeout(() => {
			judgeEl.classList.remove("is-active", "is-correct", "is-wrong");
			judgeEl.innerHTML = "";

			// 正解と解説をセット
			explainCorrectEl.textContent = `正解：${q.choices[q.correct]}`;
			explainExplanationEl.innerHTML = q.explanation || "";

			nextBtn.style.display = "inline-block";
			nextBtn.textContent = "次へ";
			nextBtn.onclick = () => {
				hideModal();
				currentIndex++;
				if (currentIndex < questions.length) {
					renderQuestion();
				} else {
					showFinal();
				}
			};

			showModal();
		}, 800);
	}

	function showModal() {
		modalEl.classList.add("is-active");
		modalEl.setAttribute("aria-hidden", "false");
		setTimeout(() => nextBtn.focus(), 200);
	}

	function hideModal() {
		modalEl.classList.remove("is-active");
		modalEl.setAttribute("aria-hidden", "true");
	}

	function showFinal() {
		// cardEl.style.display = "none";

		// スコアを上に追加（古いものがあれば削除）
		const oldScore = modalEl.querySelector(".c-quiz__score");
		if (oldScore) oldScore.remove();

		const scoreEl = document.createElement("div");
		scoreEl.className = "c-quiz__score";
		scoreEl.innerHTML = `${score}問 / ${questions.length}問 正解！`;

		// 「解説」タイトルを隠す
		const resultTitle = modalEl.querySelector(".c-quiz__result");
		if (resultTitle) resultTitle.style.display = "none";

		// 解説部分を差し替え
		explainCorrectEl.textContent = "";
		explainExplanationEl.innerHTML = score === questions.length ? "全問正解！<br>おりたひめのマスターです✨" : `まだまだ「おりたひめのマスター」には足りてないですね…。<br>日々精進してください。`;

		// モーダルの中にスコアを先頭に挿入
		const modalInner = modalEl.querySelector(".c-quiz__modal-inner");
		modalInner.insertBefore(scoreEl, modalInner.querySelector(".c-quiz__explain"));

		// 背景用クラスを付与
		modalEl.classList.add("is-final");
		modalEl.classList.toggle("all-correct", score === questions.length);

		// 出現アニメーション
		modalEl.classList.add("is-animate");
		setTimeout(() => {
			modalEl.classList.remove("is-animate");
		}, 300);

		nextBtn.style.display = "inline-block";
		nextBtn.textContent = "もう一度挑戦";
		nextBtn.onclick = () => {
			// フェードアウト
			modalEl.classList.add("is-hiding");

			// アニメーションが終わってからリスタート
			setTimeout(() => {
				modalEl.classList.remove("is-active", "is-hiding", "is-final", "all-correct");
				if (resultTitle) resultTitle.style.display = "";
				startQuiz();
			}, 300); // CSS のアニメーション時間に合わせる
		};

		showModal();
	}

	startQuiz();
});
