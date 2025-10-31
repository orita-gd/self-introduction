// スムーススクロール関数（requestAnimationFrame使用）
function smoothScrollTo(targetY, duration = 500) {
	const startY = window.pageYOffset;
	const distance = targetY - startY;
	const startTime = performance.now();

	function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	function animation(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const eased = easeInOutQuad(progress);
		window.scrollTo(0, startY + distance * eased);

		if (elapsed < duration) {
			requestAnimationFrame(animation);
		}
	}

	requestAnimationFrame(animation);
}

// ナビゲーションのクリックイベント
document.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", function (e) {
		const href = this.getAttribute("href");

		// 外部リンクなどは除外（例：http, mailto）
		if (href.startsWith("http") || href.startsWith("mailto")) return;

		e.preventDefault();

		// #のみならページ最上部へ
		if (href === "#" || href === "") {
			smoothScrollTo(0, 700);
			return;
		}

		// #id へのスクロール
		const targetId = href.substring(1);
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			const header = document.querySelector("header");
			const headerOffset = header ? header.offsetHeight : 0;
			const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
			smoothScrollTo(targetPosition, 700);
		}
	});
});
