import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-header"
          />
        </Link>
        <ul className="links-container">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <ul className="links-container-small">
          <Link to="/" className="nav-link">
            <li>
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
          <button type="button" onClick={onLogout} className="logout-btn">
            <FiLogOut className="icon" />
          </button>
        </ul>
        <button type="button" onClick={onLogout} className="logout-desktop-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
