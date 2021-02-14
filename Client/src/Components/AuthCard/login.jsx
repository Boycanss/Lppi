import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

const Login = ({ toRegister }) => {
    const [dataLogin, setDataLogin] = useState({});
    const [error, setError] = useState({});

    const dataOnChange = (e) => {
        const { id, value } = e.target;
        setDataLogin(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const submit = async () => {
        axios.post('http://localhost:5000/auth/login', dataLogin)
            .then((res) => {
                if (res.data.errors) {
                    setError(res.data.errors);
                } else if (res.status === 200) {
                    // console.log(res.data);
                    localStorage.setItem('jwtToken', res.data.token)
                    window.location.reload({ forceReload: false })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3><strong>Log in</strong></h3>

            < small style={{ color: 'red', margin: 0 }}>{error.email}</small>
            <Form>
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={dataOnChange} id="email" type="email" placeholder="user@mail.com" />
                <br />
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={dataOnChange} id="password" type="password" placeholder="********" />
                <br />
                <div style={{ float: 'right' }}>
                    <Button onClick={submit}>Login</Button>
                    <br /><br />
                    <small>Belum punya akun?</small><br />
                    <a href="/" className="navlink-link2" onClick={toRegister}>
                        <strong>Daftar sekarang!</strong>
                    </a>
                </div>
            </Form>
        </div>
    )
}

export default Login
