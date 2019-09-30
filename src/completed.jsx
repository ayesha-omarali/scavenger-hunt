import React from 'react';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import GameContainer from './GameContainer';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default class Completed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      totalPoints: 0
    }
  }

  async componentDidMount() {
    const team = localStorage.getItem('team');
    const completedTasks = await axios.get(`http://localhost:8000/tasks?team=${team}&completed=true`);
    const pointTally = completedTasks.data.reduce((currentTally, task) => {
      return currentTally + task.points;
    }, 0);
    this.setState( { tasks: completedTasks.data, totalPoints: pointTally })
  }

  render() {
    return(
      <CompletedContainer>
        <TalliedPoints>
          Total Points: {this.state.totalPoints}
        </TalliedPoints>
        {this.state.tasks.map(TaskCard)}
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
          <Card.Link href="#">Submit Evidence</Card.Link>
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