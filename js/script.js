/*  Выезжающее окно с формой поиска гостиницы  */

var buttonShowModal = document.querySelector(".button-show-modal");

var modalSearch = document.querySelector(".modal-search");

var modalSearchForm = modalSearch.querySelector(".modal-search-form");
var arrivalDateInput = modalSearch.querySelector("#arrival-date");
var departureDateInput = modalSearch.querySelector("#date-of-departure");
var adultsCountInput = modalSearch.querySelector("#adults-count");
var childrenCountInput = modalSearch.querySelector("#children-count");

var isStorageSupport = true;
var storageAdultsCount = "";
var storageChildrenCount = "";

var focusInput = function() {
  arrivalDateInput.focus();
}

modalSearch.classList.add("modal-search-hide");

try {
  storageAdultsCount = localStorage.getItem("adultsCount");
  storageChildrenCount = localStorage.getItem("childrenCount");
} catch (err) {
  isStorageSupport = false;
}

if (storageAdultsCount) {
  adultsCountInput.value = storageAdultsCount;
}

if (storageChildrenCount) {
  childrenCountInput.value = storageChildrenCount;
}

buttonShowModal.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalSearch.classList.toggle("modal-search-hide");
  if (modalSearch.classList.contains("modal-search-hide")) {
    modalSearch.classList.remove("modal-search-error");
  } else {
    setTimeout(focusInput, 300);
  }
});

modalSearchForm.addEventListener("submit", function (evt) {
  if (!arrivalDateInput.value || !departureDateInput.value || !adultsCountInput.value || !childrenCountInput.value) {
    evt.preventDefault();
    /*console.log("Нужно что-то ввести");*/
    modalSearch.classList.remove("modal-search-error");
    modalSearch.offsetWidth = modalSearch.offsetWidth;
    modalSearch.classList.add("modal-search-error");
  } else {
    if (isStorageSupport) {
      modalSearch.classList.remove("modal-search-error");
      localStorage.setItem("adultsCount", adultsCountInput.value);
      localStorage.setItem("childrenCount", childrenCountInput.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!modalSearch.classList.contains("modal-search-hide")) {
      modalSearch.classList.add("modal-search-hide");
      modalSearch.classList.remove("modal-search-error");
    }
  }
});
