import './index.css'

const PasswordItem = props => {
  const {usernamePasswordDetails, isShownPassword, toggleIsDelete} = props
  const {id, website, username, password, initialClassName} =
    usernamePasswordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const onClickDeleteButton = () => {
    toggleIsDelete(id)
  }

  return (
    <li className="password-item">
      <div className="password-container">
        <div className="details-container">
          <div className={`initial-container ${initialClassName}`}>
            <p className="initial">{initial}</p>
          </div>
          <div className="username-container">
            <p className="user-info">{website}</p>
            <p className="user-info">{username}</p>
            {!isShownPassword && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars-icon"
              />
            )}
            {isShownPassword && <p className="user-info">{password}</p>}
          </div>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
