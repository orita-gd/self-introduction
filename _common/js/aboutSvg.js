document.addEventListener("DOMContentLoaded", function () {
	const graphContainer = document.getElementById("js-graphContainer");
	const segments = graphContainer.querySelectorAll(".draw-segment");
	const overlay = graphContainer.querySelector(".graph-overlay");

	// header の高さを取得
	const header = document.querySelector("header");
	const headerHeight = header ? header.offsetHeight : 0;

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					segments.forEach((segment) => segment.classList.add("animate"));
					if (overlay) overlay.classList.add("animate");
					observer.unobserve(graphContainer);
				}
			});
		},
		{
			// 上にヘッダーの高さ、下に20%マージン
			rootMargin: `-${headerHeight}px 0px -10% 0px`,
			threshold: 0,
		}
	);

	observer.observe(graphContainer);
});
