//ここに追加していく
const timelineData = [
	{
		year: 2002,
		content: "末っ子として生まれる",
		subTexts: ["上に兄が三人います"],
	},
	{
		year: 2007,
		content: "字を習いはじめる",
		subTexts: ["硬筆と毛筆を習う"],
	},
	{
		year: 2008,
		content: "ピアノを習いはじめる",
		subTexts: ["好きな曲だけを弾く暴君になる"],
	},
	{
		year: 2009,
		content: "小学校に入学",
		subTexts: ["好きな教科は図工", "お勉強も大好き", "運動は苦手", "習い事をいっぱいする"],
	},
	{
		year: 2013,
		content: "両足を骨折してしまう",
		subTexts: ["三ヶ月間車椅子で過ごす"],
	},
	{
		year: 2014,
		content: "書道で金メダルをとる",
		subTexts: ["身長が止まる（166cm）", "ピアノ伴奏を担当する", "六年間学級委員を務めた"],
	},
	{
		year: 2015,
		content: "中学校に入学",
		subTexts: ["理科のテストで百点をとる", "生徒会役員書記をに任命される", "三年間学級委員", "美術部に入部する", "修学旅行前に左足を骨折する"],
	},
	{
		year: 2018,
		content: "高校に進学する",
		subTexts: ["新入生代表を務める", "一年生学級委員を務める", "先輩に一目惚れし軽音学部に入部", "書道部にスカウトされる", "生物と地理で百点をとる"],
	},
	{
		year: 2019,
		content: "文化祭で演奏する",
		subTexts: ["「新宝島」と「ワタリドリ」", "調理検定と服飾検定をとる"],
	},
	{
		year: 2020,
		content: "コロナウイルス襲来",
		subTexts: ["ギリギリ修学旅行へ", "はじめて髪を染める", "はじめてピアスをあける", "お金に困っちゃう"],
	},
	{
		year: 2020,
		content: "通信制高校へ転校する",
		subTexts: ["江坂キャンパスにスクーリング", "アルバイトに明け暮れる", "歯列矯正をはじめる", "歯を六本抜く"],
	},
	{
		year: 2021,
		content: "神戸電子に入学する",
		subTexts: ["特待生で入学する", "友達がたくさんできる", "WEB専攻に進む", "追加で歯を二本抜く", "進級制作でカレーを食べる"],
	},
	{
		year: 2022,
		content: "実務を経験する",
		subTexts: ["株式会社はてなでアルバイト", "マンガメディアに関わる", "リモートワークの難しさを知る", "卒業制作でクッキーを作る"],
	},
	{
		year: 2023,
		content: "神戸電子を卒業する",
		subTexts: ["卒業式で先生に花束を渡す"],
	},
	{
		year: 2023,
		content: "制作会社に入社する",
		subTexts: ["WEBデザイナーとして働く", "コーディングを主に担当する", "先輩とめっちゃ仲良くなる", "企画書やパッケージにも挑戦する", "歯列矯正が完了する", "ホワイトニングをはじめる"],
	},
	{
		year: 2025,
		content: "神戸電子の教員になる",
		subTexts: ["みんなかわいい"],
	},
	{
		year: 2025,
		content: "デザイナーになる",
		subTexts: ["現在"],
	},
];

// タイムラインを描画する関数
function renderTimeline(data) {
	const container = document.getElementById("js-timelineContainer");

	// 既存の要素をクリア
	container.innerHTML = "";

	// 年順でソート
	const sortedData = [...data].sort((a, b) => a.year - b.year);

	sortedData.forEach((item) => {
		// li要素（メインコンテナ）
		const li = document.createElement("li");
		li.className = "about__life-text-box";

		// メインテキストボックス
		const textBox = document.createElement("div");
		textBox.className = "about__life-text-box--text";

		const era = document.createElement("p");
		era.className = "era";
		era.textContent = item.year;

		const content = document.createElement("p");
		content.className = "content";
		content.textContent = item.content;

		textBox.appendChild(era);
		textBox.appendChild(content);

		// サブテキストボックス
		const subTextBox = document.createElement("ul");
		subTextBox.className = "about__life-sub-text-box";

		item.subTexts.forEach((subText) => {
			const subLi = document.createElement("li");
			subLi.className = "about__life-sub-text-box--text";
			subLi.textContent = subText;
			subTextBox.appendChild(subLi);
		});

		li.appendChild(textBox);
		li.appendChild(subTextBox);
		container.appendChild(li);
	});
}

// // デバッグ情報を表示
// function showDataStructure() {
// 	const debugElement = document.getElementById("dataStructure");
// 	debugElement.textContent = JSON.stringify(timelineData, null, 2);
// }

// 初期描画
renderTimeline(timelineData);
// showDataStructure();
