const { AuthRouter } = require('./authRouter');

class Router {
  authRoute() {
    return [new AuthRouter().route()]
  }
}

module.exports = { Router }