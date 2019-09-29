import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import GoogleSignIn from './GoogleSignIn';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <AppHeader>
          <p>
            WELCOME TO DPHIE SCAVENGER HUNT!
          </p>
          <img src={logo} style={{padding: '20px'}} className="App-logo" alt="logo" />
          <p>
            ~ sign with your Berkeley Email here ~ 

          </p>
          <GoogleSignIn />

          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        {/* <script src="https://apis.google.com/js/platform.js" async defer />
        <meta name="google-signin-client_id" content="347105098552-3jvf06c6oq42qrpslcdk5pp8dor9m9a2.apps.googleusercontent.com" />
        <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
        </AppHeader>

      </AppContainer>
    );
  }
}


const AppContainer = styled('div')`
  text-align: center;
`;

const AppHeader = styled(Flex)`
  background-color: #003262;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #FDB515;
  font-family: monospace;
`;

const Welcome = styled(Flex)`
`;
