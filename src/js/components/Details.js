export default class Details {
  constructor(container, api) {
    this.container = container;
    this.api = api;
    this.countArticles = this.container
    .querySelector('.details__counting-articles');
    this.keywordsArticles = this.container
    .querySelector('.details__keywords');
  }
  setInfo() {
    this.api.getArticles()
      .then(res => {
        this.countArticles.textContent = `${localStorage.getItem('username')}, у вас ${res.length} сохранённых статей`;
        const keywords = []
        res.forEach(el => {
          keywords.push(el.keyword);
        })
        const objKeys = keywords.reduce((pre, curr) => {

          if (!pre[curr]) {
            pre[curr] = 1;
          } else {
            pre[curr] += 1;
          }
          return pre;
        }, {})

        const result = Object.entries(objKeys).sort((a,b) => b[1]-a[1]);

        if (result.length > 3) {
          return this.keywordsArticles.textContent = `По ключевым словам: ${result[0][0]}, ${result[1][0]} и ${result.length - 2} другим`
        }
        if (result.length === 3) {
          return this.keywordsArticles.textContent = `По ключевым словам: ${result[0][0]}, ${result[1][0]} и ${result[2][0]}`
        }
        if (result.length == 2) {
          return this.keywordsArticles.textContent = `По ключевым словам: ${result[0][0]}, ${result[1][0]}`
        }
        if (result.length == 1) {
          return this.keywordsArticles.textContent = `По ключевым словам: ${result[0][0]}`
        }
        if (result.length === 0) {
          return this.keywordsArticles.textContent = `По ключевым словам:`
        }
      })
  }
}
