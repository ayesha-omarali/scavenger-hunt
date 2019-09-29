import React from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/grid/emotion';
import Game from './game';

export default class GameContainer extends React.Component {

  render() {
    return (
      <Wrapper>
        <HeaderContainer>
          <GameHeader>
            VIEW TASKS
          </GameHeader>

          <ProgressHeader>
            VIEW PROGRESS
          </ProgressHeader>
        </HeaderContainer>

        <Main>
          <Game/>
        </Main>
        
        
        
      </Wrapper>

    );
  }
}

const Wrapper = styled(Flex)`
  background-color: #003262;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderContainer = styled(Flex)`
  flex-basis: 100%;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  font-family: monospace;
  font-size: calc(12px + 2vmin);
  color: #DDD5C7 //bay fog
`;

const GameHeader = styled(Flex)`
  padding: 20px;
  text-align: center;
  justify-content: center;

  background-color: #003262; //cal blue
  flex-basis: 100%;
`;

const ProgressHeader = styled(Flex)`
  padding: 20px;
  background-color: #EE1F60; //rose garden
  flex-basis: 100%;
  justify-content: center;
`;

const Main = styled(Flex)`
  flex-grow: 1;
`;