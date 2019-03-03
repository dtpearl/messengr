import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if ( this.isFormEmpty( this.state ) ) {
      // Handle error
      error = { message: 'Fill in all fields' };
      this.setState({
        errors: errors.concat(error)
      });
      return false;
    } else if ( !this.isPasswordValid( this.state ) ) {
      // Handle error
      error = { message: 'Password is invalid' };
      this.setState({
        errors: errors.concat(error)
      });
    } else {
      // Form is valid
      return true;
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if ( password !== passwordConfirmation ) {
      return false;
    } else {
      return true;
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
    if ( this.isFormValid() ){
      this.setState({
        errors: [],
        loading: true
      });
      firebase.auth().createUserWithEmailAndPassword( this.state.email, this.state.password)
      .then( (createdUser) => {
        console.log( createdUser );
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `https:gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        }).then( () => {
          this.saveUser( createdUser ).then( () => {
            console.log('User saved');
          })
        })
        .catch( (err) => {
          console.error(err);
          this.setState = {
            errors: this.state.errors.concat(err),
            loading: false
          }
        })
      })
      .catch( (err) => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        })
      });
    }
  }

  saveUser = ( createdUser ) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }

  handleInputError = ( errors, inputName ) => {
    // Check if the error message relates to an email or password field.
    // Adds 'error' to the className of the calling field, the field will then display a red background.
    return errors.some( error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  render () {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state;
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

              <Form.Input fluid
              type="password"
              name="passwordConfirmation"
              value={ passwordConfirmation }
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              className={ this.handleInputError( errors, 'password' ) }
              onChange={ this.handleChange } />

              <Button fluid
              className={ loading ? 'loading' : '' }
              disabled={ loading }
              color="orange"
              size="large">
              Submit</Button>
            </Segment>
          </Form>
          { /* If there are any errors, they will be rendered here. */ }
          { errMsg }
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
