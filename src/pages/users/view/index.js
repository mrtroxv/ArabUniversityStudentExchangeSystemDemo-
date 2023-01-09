// ** React Imports
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

// ** Store & Actions
import { getUser } from "../store"
import { useSelector, useDispatch } from "react-redux"

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap"

// ** User View Components
import UserTabs from "./Tabs"
import UserInfoCard from "./UserInfoCard"

// ** Styles
import "@styles/react/apps/app-users.scss"
import { selectUser } from "../../../redux/authentication"
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner"
// import { selectAllUniversities } from "../../../redux/project/universities"

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.users)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  // const universities = useSelector(selectAllUniversities)
  // ** Hooks
  let { id } = useParams()
  if (user?.role === "user" && !id) {
    id = user.id
  }

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, store?.data?.length])

  const refetchData = (id) => dispatch(getUser(id))

  const [active, setActive] = useState("1")
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  if (store.isLoading) return <SpinnerComponent />
  else if (
    store.selectedUser?.activeUser !== null &&
    store.selectedUser?.activeUser !== undefined
  ) {
    return (
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard
              selectedUser={store.selectedUser?.activeUser}
              refetchData={refetchData}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} />
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
