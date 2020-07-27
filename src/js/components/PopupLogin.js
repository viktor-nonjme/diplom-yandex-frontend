import Popup from './Popup';

export default class PopupLogin extends Popup {
  constructor(popup, api, placeForResponse, header) {
    super(popup)
    this.api = api;
    this.placeForResponse = placeForResponse;
    this.header = header;

    this.form = popup.querySelector('#auth');
  }
  _getName() {
    this.api.getUserInfo()
        .then(res => {
          localStorage.setItem('username', res.name);
        })
        .then(() => {
          this.header.renderHeader();
        })
        .catch(err => console.log(err));
  }
  login() {
    event.preventDefault();
    const { email, password } = this.form.elements;

    this.api.signin(email.value, password.value)
      .then(res => {
        this.placeForResponse.style.color = '#347EFF'
        this.placeForResponse.textContent = res.message;
      })
      .then(() => {
        setTimeout(this.close(), 30000);
      })
      .then(() => {
        this._getName();
      })
      .catch(res => {
        if (res.status === 401) {
          this.placeForResponse.textContent = 'Неправильный email или пароль';
        }
      })
  }
}
