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
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('log in button clicked!')

    axios.post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        //res.data.payload = token
        localStorage.setItem('TOKEN', res.data.payload);
        this.props.history.push('/bubbles')
      })
      .catch(err => {
        console.log(err)
      })
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
            type="password"
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
