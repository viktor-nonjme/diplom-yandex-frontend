export default class NewsApi {
  constructor(options) {
    this.url = options.url;
    this.endpoint = options.endpoint;
    this.pageSize = options.pageSize;
    this.sortBy = options.sortBy;
    this.apiKey = options.apiKey;
  }
  getNews(keyword) {

    const weekAgo = new Date().getDate() - 7;
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    const date = new Date(year, month, weekAgo, hours, minutes);

    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {

      const url =
        `${this.url}` +
        `${this.endpoint}?` +
        `q=${keyword}&` +
        `from=${date}&` +
        `sortBy=${this.sortBy}&` +
        `apiKey=${this.apiKey}`;

      const req = new Request(url);

      return fetch(req)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error());
        });
    } else {
      const url =
        `https://praktikum.tk/news/v2/` +
        `${this.endpoint}?` +
        `q=${keyword}&` +
        `from=${date}&` +
        `sortBy=${this.sortBy}&` +
        `apiKey=${this.apiKey}`;

      const req = new Request(url);

      return fetch(req)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(new Error());
        });
    }
  }
}
