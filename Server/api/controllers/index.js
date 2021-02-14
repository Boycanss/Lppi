const { AuthController } = require('./auth');

class Controller {
    AuthController() {
        return new AuthController();
    }
}

module.exports = { Controller }