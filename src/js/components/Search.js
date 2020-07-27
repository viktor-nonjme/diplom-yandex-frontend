export default class Search {
  constructor(form, ERRORS, responsePlace, newsApi) {
    this.form = form;
    this.ERRORS = ERRORS;
    this.responsePlace = responsePlace;
    this.newsApi = newsApi;
  }
  validateInputElement(input) {
    if (input.validity.tooShort) {
      return this.responsePlace.textContent = this.ERRORS.tooShort;
    }
    if (input.validity.valueMissing) {
      return this.responsePlace.textContent = this.ERRORS.valueMissing;
    }

    return this.responsePlace.textContent = '';

  }
  validateForm() {
    const { buttonSearch } = this.form.elements;

    if (this.form.checkValidity()) {
      buttonSearch.removeAttribute('disabled');

    } else {
      buttonSearch.setAttribute('disabled', true);
    }
  }
  getInfo() {
    const { keyword } = this.form.elements;

    return String(keyword.value);
  }
}
