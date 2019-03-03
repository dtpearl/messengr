import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false,
    }
  }

  displayErrors = (errors) => errors.map( (err, i) => <p key={i}>{ err.message }</p>);

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if ( this.isFormValid( this.state ) ){
      this.setState({
        errors: [],
        loading: true
      });
      firebase.auth().signInWithEmailAndPassword( this.state.email, this.state.password )
      .then( (signedInUser) => {
        console.log(signedInUser);
      })
      .catch( err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      });
    }
  }

  isFormValid = ({ email, password }) => email && password;

  handleInputError = ( errors, inputName ) => {
    // Check if the error message relates to an email or password field.
    // Adds 'error' to the className of the calling field, the field will then display a red background.
    return errors.some( error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  render () {
    const { email, password, errors, loading } = this.state;
    let errMsg;

    // If there are any errors, they will be displayed in a box below the form.
    if ( errors.length > 0 ) {
      errMsg =  (<Message error>
                  <h3>Error</h3>
                    { this.displayErrors( errors )}
                </Message>);
    }

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to messengr
          </Header>
          <Form onSubmit={ this.handleSubmit } size="large">
            <Segment stacked>
              <Form.Input fluid
              type="email"
              name="email"
              value={ email }
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              className={ this.handleInputError( errors, 'email' ) }
              onChange={ this.handleChange } />

              <Form.Input fluid
              type="password"
              name="password"
              value={ password }
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              className={ this.handleInputError( errors, 'password' ) }
              onChange={ this.handleChange } />

              <Button fluid
              className={ loading ? 'loading' : '' }
              disabled={ loading }
              color="violet"
              size="large">
              Submit</Button>
            </Segment>
          </Form>
          { /* If there are any errors, they will be rendered here. */ }
          { errMsg }
          <Message>Don't have an account? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
