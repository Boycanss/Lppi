var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const validateRegister = require('./validator/registerValidator');
const validateLogin = require('./validator/loginValidator')
const bcrypt = require("bcryptjs");
const secret = require('../../jwtConfig').secretOrKey;
const jwt = require('jsonwebtoken');


class AuthController {

    login(req, res) {
        const { body } = req;
        const sql = req.app.get('db');

        const error = validateLogin(body);
        console.log(error);
        if (Object.entries(error.errors).length === 0) {
            sql.query('SELECT * FROM member WHERE email=? ', [body.email], (req, result) => {
                if (result.length === 0) {
                    error.errors.email = "email atau password anda salah";
                    res.json(error);
                } else {
                    bcrypt.compare(body.password, result[0].password)
                        .then(isMatch => { //isMatch : onFullFilled
                            if (isMatch) {
                                const payload = { ...result[0] }
                                jwt.sign(payload, secret, { expiresIn: 31556926 }, (err, token) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        return res.status(200).json({
                                            user: payload,
                                            success: true,
                                            token: "bearer " + token
                                        })
                                    }
                                })
                            } else {
                                error.errors.email = "email atau password anda salah";
                                res.json(error);
                            }
                        })
                }
            })
        } else {
            res.json(error);
        }
    }

    register(req, res) {
        const sql = req.app.get('db');
        const { body } = req;
        const error = validateRegister(body);
        console.log(error);
        if (Object.entries(error.errors).length === 0) {
            // check if email exists
            sql.query('SELECT * FROM member where email=? ', [body.email], (checkReq, checkRes) => {
                if (checkRes.length > 0) {
                    error.errors.email = "Email sudah terdaftar, silahkan mendaftar dengan email lain";
                    res.json(error);
                    console.log(error);
                } else {

                    //generate uuid
                    body.id_member = uuidv4();

                    //hash password before gets inserted to db
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(body.password, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            }
                            body.password = hash;

                            //finally insert to db the member data
                            sql.query(`INSERT INTO member (id_member, nama_member, asal_provinsi, asal_kabupaten, email, hp, jenis_kelamin, pekerjaan, password) VALUES ("${body.id_member}","${body.nama_member}",${body.asal_provinsi},${body.asal_kabupaten},"${body.email}","${body.hp}",'${body.jenis_kelamin}',${body.pekerjaan},"${body.password}")`,
                                (req, result) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        console.log('registered');
                                        res.status(200).json('registered');
                                    }
                                })
                        })
                    })
                }
            })
        } else {
            res.json(error);
        }
    }

    getProvinsi(req, res) {
        req.app.get('db').query('SELECT * FROM provinces', (err, rows) => {
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        })
    }

    getKabupaten(req, res) {
        const provId = req.params.id;
        req.app.get('db').query('SELECT * FROM regencies WHERE province_id = ?', [provId], (err, rows) => {
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        })
    }

    getPekerjaan(req, res) {
        req.app.get('db').query('SELECT * FROM pekerjaan', (err, rows) => {
            if (err) {
                throw err;
            }
            res.status(200).json(rows);
        })
    }
}

module.exports = { AuthController }