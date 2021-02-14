import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'

const home = ({ user }) => {
    // console.log(user);
    return (
        <div className="page">
            <h2>Welcome {user.nama_member}</h2>
        </div>
    )
}

export default home
