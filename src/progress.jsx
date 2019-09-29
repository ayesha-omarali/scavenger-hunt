import React from 'react';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import GameContainer from './GameContainer';

export default class Progress extends React.Component {

  render() {
    return(
      <ProgressContainer>
        DA PROGRESS
      </ProgressContainer>
    )
  }
}

const ProgressContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  justify-content: center;
  padding: 30px;
`;