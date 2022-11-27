// ** React Imports

// ** Third Party Components
import Flatpickr from "react-flatpickr"
// useSelector
import { useDispatch, useSelector } from "react-redux"
// ** Reactstrap Imports
import { Form, Input, Label, Button } from "reactstrap"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
import { selectAllUniversities } from "../../../redux/project/universities"
import {
  fetchAllOffers,
  // selectAllOffers,
  sendOffer
} from "../../../redux/project/offers"
import { useState } from "react"

const SidebarSendOffer = ({ open, toggleSidebar, id }) => {
  // ** States
  const { t } = useTranslation()
  const universities = useSelector(selectAllUniversities)

  const [selectedUniversity, setSelectedUniversity] = useState(
    universities[0].ID
  )
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const uploadData = {
      university_id_des: selectedUniversity,
      offer_id: id
    }
    console.log(uploadData)
    dispatch(sendOffer(uploadData))
    dispatch(fetchAllOffers())
    toggleSidebar()
  }
  return (
    <Sidebar
      size="lg"
      open={open}
      title={t("SendUniversity")}
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
            {t("selectUniversity")}
          </Label>
          <Input
            type="select"
            id="payment-method"
            defaultValue=""
            onChange={(e) => {
              setSelectedUniversity(e.target.value)
            }}
          >
            <option value="" disabled>
              {t("UniversityName")}
            </option>
            {universities.map((university) => (
              <option value={university.ID}>{university.EN_Name}</option>
            ))}
          </Input>
        </div>

        <div className="d-flex flex-wrap mb-0">
          <Button className="me-1" color="primary" onClick={handleSubmit}>
            {t("Send")}
          </Button>
          <Button color="secondary" outline onClick={toggleSidebar}>
            {t("cancel")}
          </Button>
        </div>
      </Form>
    </Sidebar>
  )
}

export default SidebarSendOffer
