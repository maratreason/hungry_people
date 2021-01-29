document.addEventListener("DOMContentLoaded", () => {
	const backdrop = document.querySelector(".backdrop");
	const modal = document.querySelector(".modal");
	const modalTriggers = document.querySelectorAll(".show-modal");
	const closeTrigger = modal.querySelector(".modal__close");

	modalTriggers.forEach(trigger => {
		trigger.addEventListener("click", () => {
			if (!modal.classList.contains("active") && !backdrop.classList.contains("active")) {
				modal.classList.add("active");
				backdrop.classList.add("active");
			}
		});

		closeTrigger.addEventListener("click", () => {
			modal.classList.remove("active");
			backdrop.classList.remove("active");
		});
	})
});
