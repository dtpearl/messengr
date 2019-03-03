import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword( this.state.email, this.state.password)
    .then( (createdUser) => {
      console.log( createdUser );
    })
    .catch( (err) => {
      console.error(err);
    });
  }

  render () {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="comment alternate" color="orange" />
            Register for messengr
          </Header>
          <Form onSubmit={ this.handleSubmit } size="large">
            <Segment stacked>
              <Form.Input fluid
              type="text"
              name="username"
              value={ username }
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={ this.handleChange } />

              <Form.Input fluid
              type="email"
              name="email"
              value={ email }
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              onChange={ this.handleChange } />

              <Form.Input fluid
              type="password"
              name="password"
              value={ password }
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={ this.handleChange } />

              <Form.Input fluid
              type="password"
              name="passwordConfirmation"
              value={ passwordConfirmation }
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              onChange={ this.handleChange } />

              <Button fluid
              color="orange"
              size="large">
              Submit</Button>
            </Segment>
          </Form>
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
