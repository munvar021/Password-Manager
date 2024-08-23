import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItems'
import './index.css'

const initialContainerBackgroundClassNames = [
  'green',
  'pumpkin',
  'light-sea-green',
  'carnelian',
  'vivid-cerulean',
  'slate-grey',
  'brandeis-blue',
  'cadet-grey',
  'pastel-blue',
  'violet-blue',
  'orange',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    usernamePasswordsList: [],
    isTrue: false,
    isShown: false,
  }

  onChangeShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShown: true})
    } else {
      this.setState({isShown: false})
    }
  }

  toggleIsDelete = id => {
    const {usernamePasswordsList} = this.state

    this.setState({
      usernamePasswordsList: usernamePasswordsList.filter(
        eachUserInfo => eachUserInfo.id !== id,
      ),
    })
  }

  onSubmitAddPassword = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const randomColor = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * (initialContainerBackgroundClassNames.length - 1),
        )
      ]
    }`
    const newUsernamePassword = {
      id: uuidv4(),
      website,
      username,
      password,
      initialClassName: randomColor,
    }

    this.setState(prevState => ({
      usernamePasswordsList: [
        ...prevState.usernamePasswordsList,
        newUsernamePassword,
      ],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  getSearchResults = () => {
    const {searchInput, usernamePasswordsList} = this.state

    const searchResults = usernamePasswordsList.filter(eachUserInfo =>
      eachUserInfo.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  render() {
    const {website, username, password, isShown, searchInput} = this.state

    let {isTrue} = this.state

    const updatedUsernamePasswordsList = this.getSearchResults()

    if (updatedUsernamePasswordsList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="small-password-manager"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="large-password-manager"
            />
            <div className="form-container">
              <form onSubmit={this.onSubmitAddPassword}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onChangeWebsite}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="password-list-container">
            <div className="password-search-container">
              <div className="passwords-counter">
                <h1 className="form-heading">Your Passwords </h1>
                <p className="password-count">
                  {updatedUsernamePasswordsList.length}
                </p>
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-icon"
                />
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="show-passwords-container">
              <input
                type="checkbox"
                id="isCheckedPasswords"
                className="checkbox"
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="isCheckedPasswords" className="show-password">
                Show Passwords
              </label>
            </div>
            {!isTrue && (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="username-passwords-list">
                {updatedUsernamePasswordsList.map(eachUserInfo => (
                  <PasswordItem
                    key={eachUserInfo.id}
                    usernamePasswordDetails={eachUserInfo}
                    isShownPassword={isShown}
                    toggleIsDelete={this.toggleIsDelete}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
