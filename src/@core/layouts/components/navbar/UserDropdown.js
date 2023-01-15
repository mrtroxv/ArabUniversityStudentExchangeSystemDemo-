// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "@store/authentication"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image
// import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"

// ** Translations
import { useTranslation } from "react-i18next"
import { selectUser } from "../../../../redux/authentication"

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const userData = useSelector(selectUser)

  //** Vars
  const userAvatar = userData?.logo || userData?.avatar || undefined

  //** Translations
  const { t } = useTranslation()
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(userData && userData.name) || "User Profile"}
          </span>
          <span className="user-status">
            {(userData && userData.role) || "Role"}
          </span>
        </div>
        {userAvatar && userAvatar !== 0 ? (
          <Avatar
            img={userAvatar}
            imgHeight="40"
            imgWidth="40"
            status="online"
          />
        ) : (
          <Avatar image="false" imgHeight="40" imgWidth="40" status="online" />
        )}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">{t("profile")}</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/pages/account-settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">{t("settings")}</span>
        </DropdownItem>
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">{t("logout")}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
