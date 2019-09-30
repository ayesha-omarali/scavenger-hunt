import React from 'react';
import styled from '@emotion/styled';
import { Flex, Box } from '@rebass/grid/emotion';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { withRouter } from "react-router-dom";

import Game from './game';
import Completed from './completed';
import Contact from './contact';

class GameContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = { tasksPage: true, page: 'missions'};
  }

  updateMissionsPage(bool) {
    this.setState({
      tasksPage: bool
    }, 
    () => {console.log(this.state)});
  }

  navigateToRoute(newRoute){
    this.setState({
      page: newRoute
    })
    // this.props.history.push(`/${newRoute}`);
  }

  render() {
    const Main = () => {
      if (this.state.page === 'missions'){
        return(<Missions />)
      } else if(this.state.page === 'progress'){
        return(<div>HELLO</div>)
      } else if (this.state.page === 'contact'){
        return(<Contact />)
      }
    }

    return (
      <Wrapper>

        <Main /> 

        <NavContainer>
          <NavItem style={{color: '#DDD5C7', backgroundColor: '#003262'}} onClick={() => this.navigateToRoute('missions')}>
            MISSIONS
          </NavItem>
          <NavItem style={{color: '#DDD5C7', backgroundColor: '#EE1F60'}} onClick={() => this.navigateToRoute('progress')}>
            PROGRESS
          </NavItem>
          <NavItem style={{color: '#DDD5C7', backgroundColor: '#3B7EA1'}} onClick={() => this.navigateToRoute('contact')}>
            CONTACT
          </NavItem>
        </NavContainer>
        
      </Wrapper>
    );
  }
}

const Missions = () => {
  return(
    <Main>
    <Tabs id="controlled-tab-example" transition={false}>
      <Tab eventKey="REMAINING MISSIONS" title="REMAINING MISSIONS" onClick={(e) => this.updateMissionsPage(true)}>
        <Game/> 
      </Tab>
      <Tab eventKey="COMPLETED MISSIONS" title="COMPLETED MISSIONS" onClick={(e) => this.updateMissionsPage(false)}>
        <Completed />
      </Tab>
    </Tabs>
  </Main>
  )
};

const Wrapper = styled(Flex)`
  background-color: #003262;
  flex-direction: column;
  // min-height: 100vh;
  height: 100%;
  margin: 0;
`;

const Main = styled(Box)`
  flex-grow: 2;
  flex: 1 0 auto;
  height: 100%
  overflow: scroll;
  font-family: monospace;
  font-size: calc(8px + 2vmin);
  width: 100%;
`;

const NavContainer = styled(Flex)`
  flex-basis: 100%;
  text-align: center;
  justify-content: space-evenly;
  flex-shrink: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

`;

const NavItem = styled(Box)`
  text-align: center;
  justify-content: center;
  font-family: monospace;
  font-size: calc(17px + 2vmin);
  color: #DDD5C7 //bay fog
  align-self: stretch;
  flex-grow: 1;
`;

export default withRouter(GameContainer);