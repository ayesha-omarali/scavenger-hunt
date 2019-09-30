import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/grid/emotion';
import Card from 'react-bootstrap/Card';

export default class Game extends React.Component {

  render() {
    const tasks = [
      {
        title: 'Starting Task!', 
        subtitle: '10 points',
        text: 'Take a selfie with your team to mark the start of your adventures!',
        points: 10
      },
      {
        title: 'Hug a Stranger', 
        subtitle: '10 points',
        text: 'Find a stranger, and with their consent ask for a hug',
        points: 10
      },
      {
        title: 'Ice a Teammate',
        subtitle: '50 points',
        text: 'Find/buy some Smirnoff Ice and ice a teammate, extra 50 points if you find another DPhiE member not participating in Savenger Hunt!',
        points: 50
      },
      {
        title: 'Ask a professor for their autograph',
        subtitle: '100 points',
        text: 'Do your best to pin down a professor for their autograph!',
        points: 100
      },
      {
        title: 'Get Tipped for Performing on Telegraph',
        subtitle: '200 points',
        text: 'Do any performance on Telegraph - music, dancing, comedy and provide evidence of supporters / photo of tips or tippers!',
      }
    ]

    return(
      <GameContainer>
        {tasks.map(TaskCard)}
      </GameContainer>

    );
  }
}

const TaskCard = ({title, subtitle, text}) => {
  return (
    <React.Fragment>
      <Card style={{ width: '100%', borderColor: '#FDB515' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>
            {text}
          </Card.Text>
          <Card.Link href="#">Submit Evidence</Card.Link>
        </Card.Body>
      </Card>
      <p></p>
    </React.Fragment>
  )
}

const GameContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  justify-content: center;
  padding: 30px;
  overflow: scroll;
  font-family: sans-serif;
`;

