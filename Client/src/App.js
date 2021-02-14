import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtdecode from 'jwt-decode'

import Navbar from './Components/Navbar/navbar.jsx'
import Auth from './Pages/Auth/auth'
import Home from './Pages/Home/home'


export default class routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    // console.log(token);
    if (token) {
      const user = jwtdecode(token);
      this.setState({
        user: user
      })
    }
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Navbar user={user} />
        <Switch>
          <Route exact path="/">
            {user.nama_member ? <Home user={user} /> : <Redirect to="/auth" />}
          </Route>
          <Route exact path="/auth">
            {!user.nama_member ? <Auth user={user} /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </>
    )
  }
};



