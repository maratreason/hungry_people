document.addEventListener("DOMContentLoaded", () => {
	const backdrop = document.querySelector(".backdrop");
	const modal = document.querySelector(".modal");
	const modalTriggers = document.querySelectorAll(".show-modal");
	const closeTrigger = modal.querySelector(".modal__close");

	select();
	modalInit(modal, backdrop, modalTriggers, closeTrigger);
});

function modalInit(modal, backdrop, modalTriggers, closeTrigger) {
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
}

function select() {
	const selectHeader = document.querySelectorAll(".select__header");
	const selectItem = document.querySelectorAll(".select__item");

	selectHeader.forEach(item => actionHandler(item, "click", toggleSelect));
	selectItem.forEach(item => actionHandler(item, "click", chooseSelect));
}

function actionHandler(element, eventName ,action) {
	element.addEventListener(eventName, action);
}

function toggleSelect() {
	this.parentElement.classList.toggle("active");
	const selectIcon = this.querySelector(".select__image");
	selectIcon.classList.toggle("showed");
}

function chooseSelect() {
	const select = this.closest(".section__select");
	const selectIcon = select.querySelector(".select__image");
	select.querySelector(".select__current").innerText = this.innerText;
	select.classList.remove("active");
	selectIcon.classList.remove("showed");
}
