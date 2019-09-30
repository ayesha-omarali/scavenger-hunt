import React from 'react';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import Card from 'react-bootstrap/Card';

export default class Contact extends React.Component {

  render() {
    return(
      <ContactContainer>
        <Card style={{ width: '100%', borderColor: '#FDB515' }}>
          <Card.Body>
            <Card.Title>Need help? Something broke? Want a Friend?</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Contact tech support!! (aka Ayesha)</Card.Subtitle>
            <Card.Text>
              (925) 732 - 8254
            </Card.Text>
          </Card.Body>
        </Card>
      </ContactContainer>
    )
  }
}

const ContactContainer = styled(Box)`
  flex-grow: 1;
  background-color: white;
  justify-content: center;
  padding: 30px;
  overflow: scroll;
  font-family: sans-serif;
  top: 50%
`;