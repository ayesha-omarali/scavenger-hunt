import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'

function App() {
  return (
    <AppContainer>
      <AppHeader>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </AppHeader>
    </AppContainer>
  );
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
  color: white;
`;

const Welcome = styled(Flex)`
`;

export default App;
