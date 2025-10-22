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
document.querySelectorAll("nav a").forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			const headerOffset = document.querySelector("header").offsetHeight;
			const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
			smoothScrollTo(targetPosition, 700);
		}
	});
});
