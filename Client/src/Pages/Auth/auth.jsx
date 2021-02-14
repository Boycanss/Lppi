import React, { useState, useEffect } from 'react'
import Login from '../../Components/AuthCard/login'
import Register from '../../Components/AuthCard/register'


const Auth = () => {
    const [register, setRegister] = useState(false);


    useEffect(() => {
        document.title = 'Auth'
    }, [])

    const toggle = async (e) => {
        e.preventDefault();
        await setRegister(!register)
    }
    const card = register ? <Register toLogin={toggle} /> : <Login toRegister={toggle} />
    let height = register ? 1000 : 400;
    return (
        <div className="formMiddle" style={{
            transition: 'ease .3s',
            height: `${height}px`,
            width: '650px',
            margin: '25px auto',
            padding: '20px',
            border: '1px lightblue solid',
            borderRadius: '15px',
        }}>
            {card}
        </div>
    )
}

export default Auth
