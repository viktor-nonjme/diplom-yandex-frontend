export default class Search {
  constructor(form, ERRORS, responsePlace, newsApi, preloader, notFound, requestError, moreButton, section) {
    this.form = form;
    this.ERRORS = ERRORS;
    this.responsePlace = responsePlace;
    this.newsApi = newsApi;
    this.preloader = preloader;
    this.notFound = notFound;
    this.requestError = requestError;
    this.moreButton = moreButton;
    this.section = section;
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
      buttonSearch.style.backgroundColor = '#347eff';

    } else {
      buttonSearch.setAttribute('disabled', true);
      buttonSearch.style.backgroundColor = '#c5c6c9';
    }
  }
  getInfo() {
    const { keyword } = this.form.elements;

    return String(keyword.value);
  }
  async getNewsData() {
    const { buttonSearch, keyword } = this.form.elements;

    buttonSearch.setAttribute('disabled', true);
    keyword.setAttribute('disabled', true);
    buttonSearch.style.backgroundColor = '#c5c6c9';

    event.preventDefault();

    this.requestError.close();
    this.preloader.open();

    const key = this.getInfo();

    this.notFound.style.display = 'none';
    let news;
    try {
      const newsData = await this.newsApi.getNews(key);
      news = newsData.articles;
      if (news.length === 0) {
        this.preloader.close();
        this.notFound.style.display = 'flex';
        this.section.style.display = 'none';
      }
      if (news.length > 3) {
        this.moreButton.style.display = 'inline-block';
      }
      localStorage.setItem('articles', JSON.stringify(news));
    } catch(err) {
      console.log(err.message);
      this.preloader.close();
      this.requestError.open();
    } finally {
      buttonSearch.removeAttribute('disabled');
      buttonSearch.style.backgroundColor = '#347eff';
      keyword.removeAttribute('disabled');
    }
    return {
      key,
      news
    }
  }
}
