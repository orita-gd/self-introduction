////	ニックネーム
const name_tags = ["himechan", "orihime", "himeko", "meme", "himeme", "hii", "chanhime", "himechi", "himeno", "himesen", "oritasan", "himetarou", "orihimesensi", "oritan"];

const name_box = document.querySelector(".header__text-box");

// name_tags をループして追加
name_tags.forEach((name_tag) => {
	const li = document.createElement("li");
	li.className = "header__text-box--item";
	li.innerHTML = `<span class="icon">#</span>${name_tag}`;
	name_box.appendChild(li);
});

// 2回目（クローンして追加）
const nameItems = [...name_box.children]; // NodeList → 配列に変換
nameItems.forEach((item) => {
	const clone = item.cloneNode(true);
	name_box.appendChild(clone);
});

////　　HelloWorld
const hello_tags = Array(6).fill('"Hello World!"');
const hello_box = document.querySelector(".mv__back-text");

hello_tags.forEach((hello_tag) => {
	const li = document.createElement("li");
	li.className = "mv__back-text--text";
	li.innerHTML = hello_tag;
	hello_box.appendChild(li);
});

// 2回目（クローン）
const helloItems = [...hello_box.children];
helloItems.forEach((item) => {
	const clone = item.cloneNode(true);
	hello_box.appendChild(clone);
});
