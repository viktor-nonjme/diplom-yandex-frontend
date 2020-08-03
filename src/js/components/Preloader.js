export default class Preloader {
  constructor(options) {
    this.container = options.container;
    this.props = options.props;
  }

  open() {
    const { preloaderOpened } = this.props;

    this.container.classList.add(preloaderOpened);
  }

  close() {
    const { preloaderOpened } = this.props;

    this.container.classList.remove(preloaderOpened);
  }
}
