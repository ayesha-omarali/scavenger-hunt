import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

export default class GoogleSignIn extends React.Component{

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    return (
      <GoogleLogin
      clientId={'347105098552-3jvf06c6oq42qrpslcdk5pp8dor9m9a2.apps.googleusercontent.com'}
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      >
        <span> Login with Google</span>
    </GoogleLogin>
    );
  }
}