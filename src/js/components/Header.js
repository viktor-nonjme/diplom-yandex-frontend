export default class Header {
  constructor(api, header, burger, redirect) {
    this.api = api;
    this.header = header;
    this.burger = burger;
    this.menu = this.header.querySelector('.header__nav-items');
    this.headerItems = this.menu.querySelectorAll('.header__nav-item');
    this.redirect = redirect;
  }
  openClose() {
    if (this.burger.classList.contains('header__toggle_light_opened')) {
      this.menu.classList.remove('nav-mobile_is-opened');
      this.burger.classList.remove('header__toggle_light_opened');
      this.burger.classList.add('header__toggle_light_closed');
    } else if (this.burger.classList.contains('header__toggle_light_closed')) {
      this.menu.classList.add('nav-mobile_is-opened');
      this.burger.classList.remove('header__toggle_light_closed');
      this.burger.classList.add('header__toggle_light_opened');
    } else if (this.burger.classList.contains('header__toggle_dark_closed')) {
      this.menu.classList.add('nav-mobile_is-opened');
      this.burger.classList.remove('header__toggle_dark_closed');
      this.burger.classList.add('header__toggle_dark_opened');
    } else if (this.burger.classList.contains('header__toggle_dark_opened')) {
      this.menu.classList.remove('nav-mobile_is-opened');
      this.burger.classList.remove('header__toggle_dark_opened');
      this.burger.classList.add('header__toggle_dark_closed');
    }
  }
  renderHeader() {
    const user = localStorage.getItem('username');

    if (user) {
      this.headerItems[2].style.display = 'none';
      this.headerItems[1].style.display = 'block';
      this.headerItems[3].style.display = 'block';
      this.headerItems[3].querySelector('.header__button_logout')
      .textContent = user;
    } else {
      this.headerItems[2].style.display = 'block';
      this.headerItems[1].style.display = 'none';
      this.headerItems[3].style.display = 'none';
    }
  }
  logout() {
    if (confirm('Вы действительно хотите покинуть систему?')) {
      this.api.logout()
        .then(res => {
          if (res.status === '200') {
          localStorage.removeItem('username');

          } else {
            throw new Error(res.message);
          }
        })
        .then(() => {
          this.renderHeader();
        })
        .then(() => {
          this.redirect();
        })
        .catch(res => {
          console.log(res.message)
        });
    }
  }
}

