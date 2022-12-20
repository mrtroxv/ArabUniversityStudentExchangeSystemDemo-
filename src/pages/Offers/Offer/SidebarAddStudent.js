// ** React Imports
import { useEffect, useState } from "react"
// ** Third Party Components
import Flatpickr from "react-flatpickr"
//useSelector
import { useDispatch, useSelector } from "react-redux"
// ** Reactstrap Imports
import { Form, Input, Label, Button } from "reactstrap"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
import { selectAllStudents } from "../../../redux/project/students"
import {
  addStudent,
  fetchAllOffers,
  resetAddStudentState,
  selectAddStudentState
} from "../../../redux/project/offers"
import toast from "react-hot-toast"

const SidebarAddStudent = ({ open, toggleSidebar, id }) => {
  console.log(id)
  // ** States
  const { t } = useTranslation()
  const [student_id, setStudent_id] = useState(-1)
  const students = useSelector(selectAllStudents)
  const addStudentState = useSelector(selectAddStudentState)
  console.log(students)
  const dispatch = useDispatch()

  const handelAddStudent = () => {
    console.log("add student")
    dispatch(addStudent({ offer_id: id, student_id }))
  }
  const handelSelectStudent = (e) => {
    console.log(e.target.value)
    setStudent_id(e.target.value)
  }

  useEffect(() => {
    if (addStudentState.status) {
      toast.success(t("Student Added Successfully"))
      toggleSidebar()
      dispatch(fetchAllOffers())
      dispatch(resetAddStudentState())
    }
    if (addStudentState.error) {
      toast.error(addStudentState.error)
    }

  }, [addStudentState.status])

  return (
    <Sidebar
      size="lg"
      open={open}
      title={t("AddStudent")}
      headerClassName="mb-1"
      contentClassName="p-0"
      toggleSidebar={toggleSidebar}
    >
      <Form>
        <div className="mb-1">
          <Input id="id" defaultValue={`${t("offerID")} : #${id}`} disabled />
        </div>
        <div className="mb-1">
          <Label for="payment-method" className="form-label">
            {t("selectStudent")}
          </Label>
          <Input
            type="select"
            id="payment-method"
            defaultValue=""
            onChange={(e) => handelSelectStudent(e)}
          >
            <option value="" disabled>
              {t("selectStudent")}
            </option>
            {students.map((student) => (
              <option value={student.ID}>{student.name}</option>
            ))}
          </Input>
        </div>

        <div className="d-flex flex-wrap mb-0">
          <Button className="me-1" color="primary" onClick={handelAddStudent}>
            {t("AddStudent")}
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            {t("cancel")}
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SidebarAddStudent
