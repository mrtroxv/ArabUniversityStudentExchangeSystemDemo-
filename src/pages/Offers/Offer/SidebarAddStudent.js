// ** React Imports
import { useState } from "react"
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
import { addStudent } from "../../../redux/project/offers"
import toast from "react-hot-toast"

const SidebarAddStudent = ({ open, toggleSidebar, id }) => {
  console.log(id)
  // ** States
  const { t } = useTranslation()
  const students = useSelector(selectAllStudents)
  const [student_id, setStudent_id] = useState(students ? students[0]?.ID : -1)
  const dispatch = useDispatch()

  const handelAddStudent = () => {
    if (student_id === -1) {
      toast.error(t("msg.noStudentSelected"))
    } else {
      toast.promise(dispatch(addStudent({ offer_id: id, student_id })), {
        loading: "Adding Student",
        success: "Student Added Successfully",
        error: "Error Adding Student"
      })
      toggleSidebar()
    }
  }

  const handelSelectStudent = (e) => {
    setStudent_id(e.target.value)
  }

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
              <option value={student.ID} key={student.ID}>
                {student.name}
              </option>
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
