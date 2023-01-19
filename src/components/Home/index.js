import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Home extends Component {
  removeButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-cont">
        <div className="card-home">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="img-1-home"
          />
          <button
            type="button"
            className="home-butt"
            onClick={this.removeButton}
          >
            Logout
          </button>
        </div>
        <div className="card-2-home">
          <h1 className="head-h">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="d-img"
          />
        </div>
      </div>
    )
  }
}

export default Home
