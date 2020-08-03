export default class Article {
  constructor(api, details, dates, MONTHS) {
    this.api = api;
    this.details = details;
    this.dates = dates;
    this.MONTHS = MONTHS;
  }
  create(keyword, link, imageUrl, date, title, text, source, id = ' ', actionButton = '') {

    date = this.dates.parseDate(date, this.MONTHS).textDate;

    return `<div class="article" id=${id}>
        <div class="article__action-container">
          <p class="article__search-keyword">${keyword}</p>
          <p class="article__action-description">Войдите чтобы сохранить статью</p>
          <button type="button" class="article__action-button ${actionButton}"></button>
        </div>
        <a href="${link}" class="article__link" target="_blank">
          <img src="${imageUrl}" alt="" class="article__image">
          <div class="article__description-container">
            <time class="article__date" datetime="${date}">${date}</time>
            <h6 class="article__title">${title}</h6>
            <p class="article__text">${text}</p>
            <p class="article__source">${source}</p>
          </div>
        </a>
      </div>`;

  }
  save(event) {

    const keyword = event.target.closest('.article').querySelector('.article__search-keyword').textContent;
    const link = event.target.closest('.article').querySelector('.article__link').href;
    const imageUrl = event.target.closest('.article').querySelector('.article__image').src;
    let date = event.target.closest('.article').querySelector('.article__date').textContent;
    const title = event.target.closest('.article').querySelector('.article__title').textContent;
    const text = event.target.closest('.article').querySelector('.article__text').textContent;
    const source = event.target.closest('.article').querySelector('.article__source').textContent;
    const actionDescription = event.target.closest('.article').querySelector('.article__action-description')

    date = new Date('2020-07-25T21:40:34.000Z');

    const articleActionButton = event.target.closest('.article').querySelector('.article__action-button');

    const user = localStorage.getItem('username');

    if (event.target.classList.contains('article__action-button_not-added-article')) {
      if (!user) {
        return actionDescription.style.display = 'block';
      }
      return this.api.saveArticle(keyword, title, text, date, source, link, imageUrl)
        .then(() => {
          articleActionButton.classList.remove('article__action-button_not-added-article');
          articleActionButton.classList.add('article__action-button_added-article');

        })
    }
  }
  delete(event) {
    const actionDescription = event.target.closest('.article').querySelector('.article__action-description');

    if (event.target.classList.contains('article__action-button_delete-article')) {

      actionDescription.style.display = 'block'
      actionDescription.textContent = 'Убрать из сохраненных';

      if (confirm('Вы действительно хотите удалить новость из сохраненных?')) {
        this.api.deleteArticle(event.target.closest('.article').id)
          .then(res => {
              if (res.message === 'Новость удалена') {
                event.target.closest('.article').remove()
                this.details.setInfo();
              }
              throw new Error(res.message);
          })
          .catch(err => console.log(err));
      }
    }
  }
}
