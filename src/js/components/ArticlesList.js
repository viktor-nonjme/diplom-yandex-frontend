export default class ArticlesList {
  constructor(section, container, search, newsApi, notFound, article, count, preloader, api, moreButton, requestError) {
    this.section = section;
    this.container = container;
    this.search = search;
    this.newsApi = newsApi;
    this.notFound = notFound;
    this.article = article;
    this.count = count;
    this.preloader = preloader;
    this.api = api;
    this.moreButton = moreButton;
    this.requestError = requestError;
  }
  render() {
    event.preventDefault();

    this.requestError.close();

    const key = this.search.getInfo();

    this.newsApi.getNews(key)
      .then((res) => {
        this.preloader.open();
        if(res.totalResults === 0) {
          this.notFound.style.display = 'flex';
          this.section.style.display = 'none';
        }
        if (res.totalResults > 0) {

          this.notFound.style.display = 'none';
          this.container.innerHTML = '';
          res.articles.length = this.showMore();
          res.articles.forEach(el => {
            this.container
            .insertAdjacentHTML('beforeend', this.article.create(
              key,
              el.url,
              el.urlToImage,
              el.publishedAt,
              el.title,
              el.description,
              el.source.name,
              '',
              'article__action-button_not-added-article'
              ))
          });

          this.section.style.display = 'flex';

        }
        if (res.totalResults > 3) {
          this.moreButton.style.display = 'inline-block'
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.requestError.open();
      })
      .finally(() => {
        this.preloader.close();
      })
  }
  showMore() {
    let n = 3;
    return this.count += n;
  }
  renderSaveArticles() {
    this.api.getArticles()
      .then(res => {
        console.log(res);
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
