import './index.css';

import MainApi from '../../js/api/MainApi';
import Header from '../../js/components/Header';
import ArticlesList from '../../js/components/ArticlesList';
import Article from '../../js/components/Article';
import Details from '../../js/components/Details';

import MAIN_API_OPTIONS from '../../js/constants/main-api';
import MONTHS from '../../js/constants/months';

import dates from '../../js/utils/dates';
import redirect from '../../js/utils/redirect';

const api = new MainApi(MAIN_API_OPTIONS);
const details = new Details(
  document.querySelector('.details__container'),
  api
);
const header = new Header(
  api,
  document.querySelector('.header'),
  document.querySelector('.header__toggle'),
  redirect
);
const article = new Article(
  api,
  details,
  dates,
  MONTHS
);
const articlesList = new ArticlesList(
  document.querySelector('.articles'),
  document.querySelector('.article-list'),
  null,
  null,
  article,
  null,
  api,
  null
);

document.querySelector('.article-list').addEventListener('click', (event) => {
  article.delete(event);
});

document.querySelector('.header__toggle').addEventListener('click', () => {
  header.openClose();
});

document.querySelector('.header__button_logout').addEventListener('click', () => {
  header.logout();
});

header.renderHeader();
articlesList.renderSaveArticles();
details.setInfo();

