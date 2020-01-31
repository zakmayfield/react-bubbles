import React from "react";
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
    console.log(e.target.name, '=', e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('log in button clicked!')
  }

  render() {
    return (
      <div>
        <h2>Log in Here</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default Login;
