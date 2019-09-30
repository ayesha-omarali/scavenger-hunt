import React from 'react';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import GameContainer from './GameContainer';
import Card from 'react-bootstrap/Card';

export default class Completed extends React.Component {

  render() {
    const totalPoints = 9;
    const tasks = [
      {
        title: 'Starting Task!', 
        subtitle: '10 points',
        text: 'Take a selfie with your team to mark the start of your adventures!',
        points: 10
      },
    ]

    return(
      <CompletedContainer>
        <TalliedPoints>
          Total Points: {totalPoints}
        </TalliedPoints>
        {tasks.map(TaskCard)}
      </CompletedContainer>
    )
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
          {/* TODO: DISPLAY EVIDENCE */}
        </Card.Body>
      </Card>
      <p></p>
    </React.Fragment>
  )
}

const CompletedContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  justify-content: center;
  padding: 30px;
  overflow: scroll;
  font-family: sans-serif;
`;

const TalliedPoints = styled(Flex)`
  font-family: helvetica-bold;
  font-size: calc(20px + 2vmin);
  padding: 10px 0px;
`;