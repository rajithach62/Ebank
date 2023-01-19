import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pinVal: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  formButton = async event => {
    event.preventDefault()
    console.log('clicked')
    const {userId, pinVal} = this.state
    const userDetails = {user_id: userId, pin: pinVal}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  userChange = event => {
    this.setState({userId: event.target.value})
    console.log(event.target.value)
  }

  pinChange = event => {
    this.setState({pinVal: event.target.value})
    console.log(event.target.value)
  }

  render() {
    const {showSubmitError, errorMsg, pinVal, userId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-cont">
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <div className="inner-card-1">
            <form onSubmit={this.formButton}>
              <h1 className="login-head">Welcome Back!</h1>
              <label className="label-name" htmlFor="user">
                User ID
              </label>
              <br />
              <input
                type="text"
                className="input"
                id="user"
                placeholder="Enter User ID"
                onChange={this.userChange}
                value={userId}
              />
              <br />
              <label className="label-name" htmlFor="pinId">
                PIN
              </label>
              <br />
              <input
                type="password"
                className="input"
                id="pinId"
                placeholder="Enter PIN"
                onChange={this.pinChange}
                value={pinVal}
              />
              <br />
              <button type="submit" className="login-butt">
                Login
              </button>
              {showSubmitError && <p className="error">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
