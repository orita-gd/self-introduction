// 画面に入ったら is-クラスを付与する関数
function activateOnScroll(targetSelector, activeClass) {
	const targets = document.querySelectorAll(targetSelector);
	const options = {
		root: null,
		rootMargin: "0px 0px -10% 0px",
		threshold: 0.2, // 20%見えたら
	};

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(activeClass);
				obs.unobserve(entry.target); // 一度発火したら監視終了
			}
		});
	}, options);

	targets.forEach((el) => observer.observe(el));
}

// ページの読み込みが完了してから監視開始
window.addEventListener("load", () => {
	// header用
	const header = document.querySelector(".header");
	if (header) {
		requestAnimationFrame(() => {
			header.classList.add("is-visible");
		});
	}

	// ふわっと表示
	activateOnScroll(".js-fade-target", "is-fade");

	// ビヨーン表示
	activateOnScroll(".js-bounce-target", "is-bounce");

	activateOnScroll(".js-here-target", "is-here");

	activateOnScroll(".js-scale-target", "is-scale");
});
