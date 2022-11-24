// ** React Imports

// ** Third Party Components
import Flatpickr from "react-flatpickr"
//useSelector
import { useSelector } from "react-redux"
// ** Reactstrap Imports
import { Form, Input, Label, Button } from "reactstrap"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
import { selectAllStudents } from "../../../redux/project/students"

const SidebarAddStudent = ({ open, toggleSidebar, id }) => {
  // ** States
  const { t } = useTranslation()
  const students = useSelector(selectAllStudents)

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
          <Input type="select" id="payment-method" defaultValue="">
            <option value="" disabled>
              {t("selectStudent")}
            </option>
            {students.map((student) => (
              <option value={student.id}>{student.name}</option>
            ))}
          </Input>
        </div>

        <div className="d-flex flex-wrap mb-0">
          <Button className="me-1" color="primary" onClick={toggleSidebar}>
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
