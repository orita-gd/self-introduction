document.addEventListener("DOMContentLoaded", () => {
	// アコーディオンのデータを配列で管理
	const accordionData = [
		{
			question: "いつか挑戦してみたいことは？",
			answerTitle: "富士山に登って頂上でカップラーメンを食べる！",
			answerContent: `YouTubeで<a href="https://www.youtube.com/watch?v=8G3B3eS6lk0" class="c-link" target="_blank">山の頂上でカップラーメンを食べている動画</a>を見たことがあって、それが本当に美味しそうで自分もやってみたい！と思うようになりました。 頂上の空気や登山の達成感ですごく美味しいだろうな〜と思います。`,
		},
		{
			question: "行ってみたい国・場所は？",
			answerTitle: "デンマークのコペンハーゲン！",
			answerContent: `コペンハーゲンの街並みがカラフルですごくかわいいんです。 どこを写真でとってもフォトジェニックに撮れそうで、ずっと憧れがあります。<br>また、雑貨屋さんがたくさんあって、食器などが好きなわたしにとって、天国みたいな場所な気がしています。いつか行ってみたいなぁ〜`,
		},
		{
			question: "行ってみたいイベント・フェスは？",
			answerTitle: "フジロック！",
			answerContent: `毎年夏に開催される音楽フェスですが、新潟県で開催されるということもあって、まだ行ったことがありません。日本最大級の音楽フェスで、大好きなアーティストさんが絶対に出ている印象があるので、人生で一回は行ってみたいな〜と思っています。<br>ひとりで参戦は結構ハードルが高いので、誰か一緒に参戦してくれる人を募集しています。`,
		},
		{
			question: "食べてみたい料理・スイーツは？",
			answerTitle: "本場の韓国料理！カンジャンケジャン！",
			answerContent: `辛い食べ物が好きなので、本場の韓国料理をたべてみたいな〜と思っています。辛いものだけじゃなくて、韓国料理って全てが美味しそうに見えます。<br>赤と緑の食べ物が多いから美味しそうに見えるのでしょうか？<br>海鮮もすごく好きなので、韓国にグルメ旅とかしてみたいな〜と思っています。<br>スイーツでいうと、マリトッツォ！一時期流行っていた時に毎週のように食べていました！今となってはあまりみることのない幻のスイーツになっているので、ぜひ食べたい！今食べたい！`,
		},
		{
			question: "住んでみたい場所・理想の部屋は？",
			answerTitle: "海の見える家！真っ白な家具に囲まれた便利すぎる部屋！",
			answerContent: `高いところよりは海とか自然が大好きなので、海の波音を聞きながら生活できる家に憧れを持っています。また、家具とか持ち物とか、白色のもので揃えたい派なので、ホワイトウッドとかでナチュラルな家具に囲まれたハイテクな部屋に住むのが夢です・・・♡`,
		},
		{
			question: "叶えたい小さな夢は？",
			answerTitle: "Switch2にホワイトカラーが新登場！当選！",
			answerContent: `今一番欲しいものと言っても過言ではないSwitch2に白色が出たら最高だな〜と思っています。<br>あとは、ポケモンの新作も同時発売とかしてくれたら最高ですね！`,
		},
		{
			question: "飼ってみたいペットは？",
			answerTitle: "オカメインコ！フクロモモンガ！うさぎ！",
			answerContent: `動物大好きなので、いつか一緒に暮らせるといいな〜と思っています。特に小動物が好きなので、可愛い子をいつかお迎えできたらいいですね。オカメインコは小さいころ飼っていたのですが、電子レンジの500W30秒の音を覚えてしまって、電子レンジの前に立つとぴ、ぴぴぴと鳴いていたのを思い出します。</br>（2025/10/20 追記：デグーのむぎちゃんをお迎えしました！）`,
		},
		{
			question: "してみたい趣味・習い事は？",
			answerTitle: "英会話！",
			answerContent: `友達に30歳までにトリリンガルを目指している子がいて、その話を聞いた時に素直にかっこいいと思ったので、わたしも英語を話せるようになりたいと思っています。特にそんなに行動に起こせていないのですが、毎日５分間ぐらいは英語に触れる時間を設けるようにしています。`,
		},
	];
	const container = document.getElementById("accordionContainer");
	container.innerHTML = "";

	accordionData.forEach((item, index) => {
		const li = document.createElement("li");
		li.className = "dream__accordion-box";

		const divItem = document.createElement("div");
		divItem.className = "dream__accordion-item";

		const button = document.createElement("button");
		button.className = "dream__accordion-item--question";
		button.innerText = item.question;

		const answerDiv = document.createElement("div");
		answerDiv.className = "dream__accordion-item--answer";

		// 中身を inner でラップ
		const inner = document.createElement("div");
		inner.className = "answer-inner";
		inner.innerHTML = `
			<p class="title">${item.answerTitle}</p>
			<p class="content">${item.answerContent}</p>
		`;

		answerDiv.appendChild(inner);
		divItem.appendChild(button);
		divItem.appendChild(answerDiv);
		li.appendChild(divItem);
		container.appendChild(li);

		// 最初の項目だけ開く
		if (index === 0) {
			button.classList.add("open");
			answerDiv.classList.add("open");
			answerDiv.style.maxHeight = inner.scrollHeight + "px";
		}

		// クリックイベント
		button.addEventListener("click", () => {
			const isOpen = answerDiv.classList.contains("open");

			if (isOpen) {
				// --- 閉じる ---
				const inner = answerDiv.querySelector(".answer-inner");
				const height = inner.scrollHeight;

				// 一旦現在の高さを max-height にセット
				answerDiv.style.maxHeight = height + "px";

				// 次のフレームで 0 にして閉じるアニメーション
				requestAnimationFrame(() => {
					answerDiv.style.maxHeight = "0";
					answerDiv.style.opacity = "0";
				});

				answerDiv.classList.remove("open");
				button.classList.remove("open");
			} else {
				// --- 他を閉じる ---
				container.querySelectorAll(".dream__accordion-item--answer.open").forEach((el) => {
					const inner = el.querySelector(".answer-inner");
					const h = inner.scrollHeight;
					el.style.maxHeight = h + "px";
					requestAnimationFrame(() => {
						el.style.maxHeight = "0";
						el.style.opacity = "0";
					});
					el.classList.remove("open");
				});
				container.querySelectorAll(".dream__accordion-item--question.open").forEach((el) => {
					el.classList.remove("open");
				});

				// --- 開く ---
				const inner = answerDiv.querySelector(".answer-inner");
				answerDiv.classList.add("open");
				button.classList.add("open");
				answerDiv.style.maxHeight = inner.scrollHeight + "px";
				answerDiv.style.opacity = "1";

				// 開ききったら max-height を解除
				answerDiv.addEventListener(
					"transitionend",
					() => {
						if (answerDiv.classList.contains("open")) {
							answerDiv.style.maxHeight = "none";
						}
					},
					{ once: true }
				);
			}
		});
	});
});
