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
	removeAttribute();

	AOS.init();
});

function removeAttribute() {
	if (document.body.scrollWidth < 992) {
		console.log(1);
	}
}

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

// Select script

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

// Slider script

const slider = function() {
	const slides = document.querySelectorAll(".slide");
	const dotContainer = document.querySelector(".dots");

	const maxSlide = slides.length;
	let curSlide = 0;

	const createDots = function() {
		slides.forEach(function(_, i) {
			const html = `<button class="dots__dot" data-slide="${i}"></button>`;
			dotContainer.insertAdjacentHTML("beforeend", html);
		});
	};
	createDots();

	const activateDot = function(slide) {
		document.querySelectorAll(".dots__dot").forEach(dot => dot.classList.remove("active"));
		document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("active");
	};

	activateDot(0);

	const goToSlide = (slide) => {
		slides.forEach((el, i) => {
			el.style.transform = `translateX(${100 * (i - slide)}%)`;
			el.classList.remove("active");
		});
		slides[slide].classList.add("active");
	};

	goToSlide(0);

	const nextSlide = () => {
		curSlide === (maxSlide - 1) ? curSlide = 0 : curSlide++;
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = () => {
		curSlide === 0 ? curSlide = (maxSlide - 1) : curSlide--;
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	document.addEventListener("keydown", function(e) {
		if (e.key === "ArrowLeft") prevSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", function(e) {
		if (e.target.classList.contains("dots__dot")) {
			const slide = e.target.dataset.slide;
			goToSlide(slide);
			activateDot(slide);
		}
	});
}

slider();

// Tab script
const tabsContainer = document.querySelector(".delicious-menu__items");

const tabs = document.querySelectorAll(".delicious-menu__item");
const tabsContent = document.querySelectorAll(".delicious-content__items");

tabsContainer.addEventListener("click", (e) => {
	const clicked = e.target.closest(".delicious-menu__item");

	if (!clicked) return;
	console.log("clicked.dataset.tab", clicked.dataset.tab)
	tabs.forEach(tab => tab.classList.remove("active"));
	clicked.classList.add("active");

	tabsContent.forEach(tabContent => tabContent.classList.remove("active"));
	document.querySelector(`.delicious-content__items[data-tab-content="${clicked.dataset.tab}"]`).classList.add("active")
});
