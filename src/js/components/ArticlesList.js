export default class ArticlesList {
  constructor(section, container, search, notFound, article, preloader, api, moreButton) {
    this.section = section;
    this.container = container;
    this.search = search;
    this.notFound = notFound;
    this.article = article;
    this.preloader = preloader;
    this.api = api;
    this.moreButton = moreButton;
  }
  async renderNews() {
    const data = await this.search.getNewsData();
    if (data.news.length !== 0) {
      this.section.style.display = 'flex';
    }

    this.container.innerHTML = '';
    const keyword = data.key;
    const news = JSON.parse(localStorage.getItem('articles'));

    news.length = 3;
    news.forEach(el => {
      this.container
      .insertAdjacentHTML('beforeend', this.article.create(
        keyword,
        el.url,
        el.urlToImage,
        el.publishedAt,
        el.title,
        el.description,
        el.source.name,
        '',
        'article__action-button_not-added-article'
      ));
    })
    this.preloader.close();
  }
  showMore() {
    const keyword = this.search.getInfo();
    const j = Array.from(document.querySelectorAll('.article')).length - 1
    const news = JSON.parse(localStorage.getItem('articles'));
    for (let i = j; i < j+3; i++) {
      this.container
      .insertAdjacentHTML('beforeend', this.article.create(
        keyword,
        news[i].url,
        news[i].urlToImage,
        news[i].publishedAt,
        news[i].title,
        news[i].description,
        news[i].source.name,
        '',
        'article__action-button_not-added-article'
      ));
      if (i === news.length -1 ) {
        this.moreButton.style.display = 'none';
        break;
      }
    }
  }
  renderSaveArticles() {
    this.api.getArticles()
      .then(res => {
        if (res.length > 0) {
          res.forEach(el => {
            this.container
            .insertAdjacentHTML('beforeend', this.article.create(
                el.keyword,
                el.link,
                el.image,
                el.date,
                el.title,
                el.text,
                el.source,
                el._id,
                'article__action-button_delete-article'
              ))
          })
          this.section.style.display = 'flex';
        }
      })
      .catch((res) => {
        console.log(res);
      })
  }
}
