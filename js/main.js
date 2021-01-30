document.addEventListener("DOMContentLoaded", () => {
	const backdrop = document.querySelector(".backdrop");
	const modal = document.querySelector(".modal");
	const modalTriggers = document.querySelectorAll(".show-modal");
	const closeTrigger = modal.querySelector(".modal__close");

	const mobileTrigger = document.querySelector(".menu-icon-wrapper");
	const mobileBody = document.querySelector(".menu-adaptive");

	const mobileMenuLinks = document.querySelectorAll(".menu__link");

	mobileMenuLinks.forEach(el => {
		el.addEventListener("click", () => {
			mobileBody.classList.remove("active");
			backdrop.classList.remove("active");
		});
	});

	backdrop.addEventListener("click", () => {
		mobileBody.classList.remove("active");
		backdrop.classList.remove("active")
	});

	select();
	modalInit(modal, backdrop, modalTriggers, closeTrigger);
	mobileMenu(mobileTrigger, mobileBody, backdrop);

	AOS.init();
});

function mobileMenu(mobileTrigger, mobileBody, backdrop) {
	mobileTrigger.addEventListener("click", function() {
		if (!mobileBody.classList.contains("active")) {
			mobileBody.classList.add("active");
			backdrop.classList.add("active");
		} else {
			mobileBody.classList.remove("active");
			backdrop.classList.remove("active");
		}
	});
}

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
