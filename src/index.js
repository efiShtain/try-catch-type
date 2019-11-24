class Catcher {
  constructor(defaultErrorHandler) {
    this.defaultErrorHandler = defaultErrorHandler || (err => err);
    this.errorHandlers = {};
  }

  catch(error, handler) {
    this.errorHandlers[error.name] = handler;
    return this;
  }

  async try(func) {
    try {
      return [null, await func()];
    } catch (err) {
      if (this.errorHandlers[err.__proto__.name]) {
        return [this.errorHandlers[err.__proto__.name](err)];
      }
      return [this.defaultErrorHandler(err)];
    }
  }
}

module.exports = Catcher;
