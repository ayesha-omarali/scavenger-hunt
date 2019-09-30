import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export default class GoogleSignIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  responseGoogle = async (response) => {
    const email = response.profileObj.email
    localStorage.setItem('email', email);
    localStorage.setItem('loggedIn', true);
    const team = await axios.get(`http://localhost:8000/userTeam?email=${email}`);
    localStorage.setItem('team', team.data);
    this.setState({ loggedIn: true });
  }

  render() {
    return !this.state.loggedIn ? 
    (
      <GoogleLogin
      clientId={'347105098552-3jvf06c6oq42qrpslcdk5pp8dor9m9a2.apps.googleusercontent.com'}
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      >
        <span> Login with Google</span>
    </GoogleLogin> 
    ) : 
    (
      <Redirect to={{
        pathname: '/game',
      }}/>
    )
  }
}