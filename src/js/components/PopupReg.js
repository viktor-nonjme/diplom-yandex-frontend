import Popup from './Popup';

export default class PopupReg extends Popup {
  constructor(popup, api, popupTrue, placeForResponse) {
    super(popup)
    this.api = api;
    this.popupTrue = popupTrue;
    this.placeForResponse = placeForResponse;
    this.form = popup.querySelector('#reg');
  }
  registration() {
    event.preventDefault();
    const { emailReg, nameReg, passwordReg, button } = this.form.elements;

    this.form.elements.forEach(element => {
      element.setAttribute('disabled', true);
    });

    this.api.signup(emailReg.value, nameReg.value, passwordReg.value)
      .then(() => {
        this.close();
      })
      .then(() => {
        this.form.reset();
      })
      .then(() => {
        this.popupTrue.open();
      })
      .catch(res => {
        if (res.status === 409) {
          this.placeForResponse.textContent = 'Такой пользователь уже существует';
        }
        if (res.status === 400) {
          this.placeForResponse.textContent = 'Ошибка при регистрации';
        }
        if (res.status === 500) {
          this.placeForResponse.textContent = 'На сервере произошла ошибка';
        }
      })
      .finally(() => {
        this.form.elements.forEach(element => {
          element.removeAttribute('disabled');
        });
      });
  }
}
