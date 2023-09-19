// ** React Imports
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

// ** Store & Actions
import { getCandidate } from "../store"
import { useSelector, useDispatch } from "react-redux"

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap"

// ** User View Components
import UserTabs from "./Tabs"
import UserInfoCard from "./UserInfoCard"

// ** Styles
import "@styles/react/apps/app-users.scss"
import { getOffer } from "../../Offers/store"
// import { selectAllUniversities } from "../../../redux/project/universities"

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.candidates)
  const dispatch = useDispatch()
  // const universities = useSelector(selectAllUniversities)
  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getCandidate(id))
  }, [])
  useEffect(() => {
    if (store.selectedUser?.offer?.id !== undefined) {
      dispatch(getOffer(store.selectedUser?.offer?.id))
    }
  }, [dispatch, store.selectedUser])

  const [active, setActive] = useState("1")

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedUser?.student !== null &&
    store.selectedUser?.student !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard
            selectedUser={store.selectedUser?.student}
            university={store.selectedUser?.university}
            offer={store.selectedUser?.offer}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
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
