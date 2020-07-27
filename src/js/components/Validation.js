export default class Validation {
  constructor(form, ERRORS) {
    this.form = form;
    this.ERRORS = ERRORS;
  }
  checkInputValidity(input, error) {
    if (input.name === 'authPassword' || input.name === 'password') {
      if (input.value.length < 8) {
        return error.textContent = this.ERRORS.typeOfPassword;
      }
    }
    if (input.validity.tooShort) {
      return error.textContent = this.ERRORS.tooShort;
    }
    if (input.validity.valueMissing) {
      return error.textContent = this.ERRORS.valueMissing;
    }
    if (input.validity.typeMismatch) {
      return error.textContent = this.ERRORS.typeMismatch;
    }
    if (input.validity.tooLong) {
      return error.textContent = this.ERRORS.tooLong;
    }

    return error.textContent = '';
  }
  setSubmitButtonState() {
    const { submit } = this.form.elements;

    if (this.form.checkValidity()) {
      submit.removeAttribute('disabled');

    } else {
      submit.setAttribute('disabled', true);
    }
  }
  clearErrors() {
    this.form.querySelectorAll('.error').forEach(element => {
      element.textContent = '';
    });
  }
}
