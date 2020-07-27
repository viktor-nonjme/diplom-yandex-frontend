export default class MainApi {
  constructor(options) {
    this.options = options;
    this.url = this.options.url;
    this.headers = this.options.headers;
  }
  signup(email, name, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      })
    })
    .then(this.checkResponse);
  }
  signin(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(this.checkResponse);
  }
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers
    })
    .then(this.checkResponse);
  }
  saveArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image
      })
    })
    .then(this.checkResponse);
  }
  getArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(this.checkResponse);
  }
  deleteArticle(id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    })
    .then(this.checkResponse);
  }
  logout() {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    .then(this.checkResponse)
  }
  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}
