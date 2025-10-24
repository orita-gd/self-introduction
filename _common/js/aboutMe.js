const container = document.querySelector(".about__how-box");

const questionData = [
	{
		title: "行動は？",
		answers: ["勢い派", "慎重派"],
		selectedIndex: 3,
	},
	{
		title: "話し方は？",
		answers: ["早口", "ゆっくり"],
		selectedIndex: 4,
	},
	{
		title: "主食は？",
		answers: ["お米", "パン"],
		selectedIndex: 0,
	},
	{
		title: "あそびは？",
		answers: ["インドア", "アウトドア"],
		selectedIndex: 2,
	},
	{
		title: "動物は？",
		answers: ["犬", "猫"],
		selectedIndex: 4,
	},
	{
		title: "行くなら？",
		answers: ["山", "海"],
		selectedIndex: 3,
	},
	{
		title: "天気は？",
		answers: ["雨", "晴れ"],
		selectedIndex: 3,
	},
	{
		title: "住むなら？",
		answers: ["砂漠", "南極"],
		selectedIndex: 4,
	},
	{
		title: "生まれ変わるなら？",
		answers: ["人以外", "人"],
		selectedIndex: 1,
	},
	{
		title: "叶うなら？",
		answers: ["お金持ち", "人気者"],
		selectedIndex: 0,
	},
	{
		title: "手に入れるなら？",
		answers: ["俊足", "頭脳"],
		selectedIndex: 4,
	},
	{
		title: "友達と盛り上がる話は？",
		answers: ["恋愛話", "怪談話"],
		selectedIndex: 0,
	},
	{
		title: "優先するなら？",
		answers: ["食欲", "睡眠欲"],
		selectedIndex: 4,
	},
	{
		title: "行けるなら？",
		answers: ["過去", "未来"],
		selectedIndex: 1,
	},
	{
		title: "髪型を変えるなら？",
		answers: ["アフロ", "坊主"],
		selectedIndex: 4,
	},
	{
		title: "好きなのはどっち？",
		answers: ["匂い", "筋肉"],
		selectedIndex: 0,
	},
];

// 一覧を作成（前回と同じ）
questionData.forEach((data, i) => {
	const li = document.createElement("li");
	li.classList.add("about__how-question-box");

	const title = document.createElement("p");
	title.classList.add("about__how-question-box--title");
	title.textContent = data.title;
	li.appendChild(title);

	const leftText = document.createElement("p");
	leftText.classList.add("about__how-question-box--text", "about_left");
	leftText.textContent = data.answers[0];
	li.appendChild(leftText);

	const barList = document.createElement("div");
	barList.classList.add("about__how-question-box--list");
	barList.dataset.index = i; // 識別用に data 属性つけとく

	const barNames = ["one", "two", "three", "four", "five"];
	barNames.forEach((name) => {
		const bar = document.createElement("p");
		bar.classList.add(name);
		barList.appendChild(bar);
	});

	li.appendChild(barList);

	const rightText = document.createElement("p");
	rightText.classList.add("about__how-question-box--text", "about_right");
	rightText.textContent = data.answers[1];
	li.appendChild(rightText);

	container.appendChild(li);
});

// スクロール検知＆順番に .this を付ける処理
const barLists = document.querySelectorAll(".about__how-question-box--list");
const options = {
	root: null,
	rootMargin: "0px 0px -5% 0px",
	threshold: 0,
};

const observer = new IntersectionObserver((entries, obs) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const list = entry.target;
			const index = parseInt(list.dataset.index);
			const bars = list.querySelectorAll("p");

			let current = 0;
			const selectedIndex = questionData[index].selectedIndex;

			// 順番に this を付けていく
			const interval = setInterval(() => {
				bars.forEach((bar) => bar.classList.remove("this")); // すべて削除
				if (current < bars.length) {
					bars[current].classList.add("this");
					current++;
				} else {
					clearInterval(interval);
					// 最後に指定インデックスだけに this を固定
					bars.forEach((bar) => bar.classList.remove("this"));
					bars[selectedIndex].classList.add("this");
				}
			}, 150); // 適当に調整（速さ）
			obs.unobserve(list); // 一度だけ動作させたい場合
		}
	});
}, options);

// 監視開始
barLists.forEach((list) => {
	observer.observe(list);
});
