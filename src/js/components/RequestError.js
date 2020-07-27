export default class RequestError {
  constructor(options) {
    this.options = options;
    this.props = this.options.props;
    this.container = this.options.container;
  }

  open() {
    const { requestErrorOpened } = this.props;

    this.container.classList.add(requestErrorOpened);
  }

  close() {
    const { requestErrorOpened } = this.props;

    this.container.classList.remove(requestErrorOpened);
  }
}
