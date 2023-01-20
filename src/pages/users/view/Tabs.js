// ** React Imports
import { Fragment } from "react"

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"

// ** Icons Imports
import { User, Lock } from "react-feather"

// ** User Components
import SecurityTab from "./SecurityTab"
// import UserTimeline from "./UserTimeline"
import UserProjectsList from "./UserProjectsList"
import UserTimeline from "./UserTimeline"
// import { selectUser } from "../../../redux/authentication"
import { useSelector } from "react-redux"

const UserTabs = ({ active, toggleTab }) => {
  const store = useSelector((state) => state.users?.selectedUser?.activeUser)
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Account</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Security</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {store.type !== "admin" && <UserProjectsList />}
          {/* <UserTimeline /> */}
        </TabPane>
        <TabPane tabId="2">
          <SecurityTab />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
