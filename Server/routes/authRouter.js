var express = require('express');
var router = express.Router();
const { Controller } = require('../api/controllers/index');

class AuthRouter extends Controller {
  route() {
    return [
      router.get('/kabupaten/:id', (req, res) => {super.AuthController().getKabupaten(req,res)}),
      router.get('/provinsi', (req, res) => {super.AuthController().getProvinsi(req,res)}),
      router.get('/pekerjaan', (req, res) => {super.AuthController().getPekerjaan(req,res)}),

      router.post('/login', (req, res) => { super.AuthController().login(req, res) }),
      router.post('/register', (req, res) => { super.AuthController().register(req, res) }),
    ]
  }
}

module.exports = { AuthRouter }