import './index.css';

import Popup from '../../js/components/Popup';
import Validation from '../../js/components/Validation';
import MainApi from '../../js/api/MainApi';
import NewsApi from '../../js/api/NewsApi';
import PopupReg from '../../js/components/PopupReg';
import PopupSuccess from '../../js/components/PopupSuccess';
import PopupLogin from '../../js/components/PopupLogin';
import Header from '../../js/components/Header';
import Search from '../../js/components/Search';
import ArticlesList from '../../js/components/ArticlesList';
import Article from '../../js/components/Article';
import Preloader from '../../js/components/Preloader';
import RequestError from '../../js/components/RequestError';

import ERRORS_VALIDATION from '../../js/constants/errors-validaion';
import MAIN_API_OPTIONS from '../../js/constants/main-api';
import NEWS_API_OPTIONS from '../../js/constants/news-api';
import PRELOADER_OPTIONS from '../../js/constants/preloader';
import REQUEST_ERROR_OPTIONS from '../../js/constants/request-error';
import MONTHS from '../../js/constants/months';

import dates from '../../js/utils/dates';

const popup = new Popup(document.querySelector('.popup'));
const validationReg = new Validation(
  document.forms.reg,
  ERRORS_VALIDATION
);
const validationLog = new Validation(
  document.forms.auth,
  ERRORS_VALIDATION
);
const api = new MainApi(MAIN_API_OPTIONS);
const popupSuc = new PopupSuccess(
  document.querySelector('.popup_type_success')
);
const newsApi = new NewsApi(NEWS_API_OPTIONS);
const popupReg = new PopupReg(
  document.querySelector('.popup_type_reg'),
  api,
  popupSuc,
  document.querySelector('#response-reg')
);
const header = new Header(
  api,
  document.querySelector('.header'),
  document.querySelector('.header__toggle'),
);
const popupLogin = new PopupLogin(
  document.querySelector('.popup_type_auth'),
  api,
  document.querySelector('#response-auth'),
  header
);
const search = new Search(
  document.forms.search,
  ERRORS_VALIDATION,
  document.querySelector('.search__error'),
  newsApi
);
const preloader = new Preloader(PRELOADER_OPTIONS);
const article = new Article(
  api,
  null,
  dates,
  MONTHS
);
const requestError = new RequestError(REQUEST_ERROR_OPTIONS);
const articlesList = new ArticlesList(
  document.querySelector('.articles'),
  document.querySelector('.article-list'),
  search,
  newsApi,
  document.querySelector('.not-found'),
  article,
  0,
  preloader,
  api,
  document.querySelector('.articles__show-more'),
  requestError
);

document.querySelector('.header__button').addEventListener('click', () => {
  popupReg.open();
});
document.querySelector('.form__sub-button-link_reg').addEventListener('click', () => {
  popupReg.open();
  popupLogin.close();
  validationLog.clearErrors();
  document.forms.auth.reset();
});
document.querySelector('.form__sub-button-link_auth').addEventListener('click', () => {
  popupLogin.open();
  popupReg.close();
  validationReg.clearErrors();
  document.forms.reg.reset();
});
document.querySelector('.success__auth-link').addEventListener('click', () => {
  popupLogin.open();
  popupSuc.close();
});

document.querySelector('.popup__close_reg').addEventListener('click', () => {
  popup.close();
  validationReg.clearErrors();
  document.forms.reg.reset();
});
document.querySelector('.popup__close_success').addEventListener('click', () => {
  popupSuc.close();
});
document.querySelector('.popup__close_auth').addEventListener('click', () => {
  popupLogin.close();
  validationLog.clearErrors();
  document.forms.auth.reset();
});

document.forms.reg.addEventListener('input', (event) => {
  validationReg.checkInputValidity(event.target, event.target.nextElementSibling);
  validationReg.setSubmitButtonState();
});
document.forms.auth.addEventListener('input', (event) => {
  validationLog.checkInputValidity(event.target, event.target.nextElementSibling);
  validationLog.setSubmitButtonState();
});
document.forms.search.addEventListener('input', (event) => {
  search.validateInputElement(event.target);
  search.validateForm();
});
document.forms.search.addEventListener('submit', (event) => {
  search.getInfo();
  articlesList.render();
});

document.forms.reg.addEventListener('submit', (event) => {
  popupReg.registration();
  document.forms.reg.reset();
});
document.forms.auth.addEventListener('submit', () => {
  popupLogin.login();
  document.forms.auth.reset();
});

document.querySelector('.header__toggle').addEventListener('click', () => {
  header.openClose();
});
document.querySelector('.header__button_logout').addEventListener('click', () => {
  header.logout();
});

document.querySelector('.articles__show-more').addEventListener('click', () => {
  articlesList.render();
});

document.querySelector('.article-list').addEventListener('click', (event) => {
  article.save(event);
});

header.renderHeader();
