import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@rebass/grid/emotion';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  async componentDidMount() {
    const team = localStorage.getItem('team');
    const pendingTasks = await axios.get(`http://localhost:8000/tasks?team=${team}`);
    this.setState({ tasks: pendingTasks.data });
  }


  render() {
    return(
      <GameContainer>
        {this.state.tasks.map(TaskCard)}
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

