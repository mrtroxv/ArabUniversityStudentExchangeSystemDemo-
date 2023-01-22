// ** React Imports
import { useState } from "react"
// // ** Third Party Components
// //useSelector
import { useDispatch, useSelector } from "react-redux"
// ** Reactstrap Imports

// ** Custom Components

// ** Reactstrap Imports
import {
  Button,
  Label,
  Modal,
  ListGroup,
  ModalBody,
  ModalHeader,
  ListGroupItem,
  Col,
  Row,
  Card
} from "reactstrap"
import * as Yup from "yup"
// ** Third Party Components
import Select, { components } from "react-select"
import { FileText, Users, Link } from "react-feather"

// ** Utils
import { selectThemeColors } from "@utils"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
// import toast from "react-hot-toast"
import Avatar from "../../../@core/components/avatar"
import { ErrorMessage, Field, Formik, Form } from "formik"
import FileUploadInput from "../../../views/forms/form-elements/file-uploader/FileUploadInput"
import FormHeader from "../create-user/new-user-form/FormHeader"
import { reactivateAccount, suspendUser } from "../store"
import toast from "react-hot-toast"

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option key={data.id} {...props}>
      <div className="d-flex flex-wrap align-items-center">
        <Avatar className="my-0 me-1" size="sm" img={data.avatar} />
        <div>{data.label}</div>
      </div>
    </components.Option>
  )
}

const ReactivateAccount = ({ open, toggleSidebar, id, university_id }) => {
  // ** States
  const { t } = useTranslation()
  const store = useSelector((state) => state.users)
  const [account_id, setAccountId] = useState(-1)
  const dispatch = useDispatch()

  const handleSelectAccount = (e) => {
    console.log(e)
    setAccountId(e?.value)
  }

  const handleSubmit = (values) => {
    const { id: ID, username, password, name, avatar } = values
    console.log({ ID, username, password, name, avatar, account_id })
    if (account_id !== -1 && account_id !== "" && account_id !== undefined) {
      const data = {
        id,
        account_id,
        university_id
      }
      toast.promise(dispatch(reactivateAccount(data)), {
        loading: "Saving...",
        success: () => {
          return "Account Reactivated"
        },
        error: "Error"
      })
    } else if (!!username && !!name && !!password && !!avatar) {
      const data = {
        id,
        university_id,
        username,
        password,
        name,
        avatar
      }
      toast.promise(dispatch(suspendUser(data)), {
        loading: "Suspend user",
        success: "User suspended",
        error: "Something went wrong"
      })
    }
    toggleSidebar()
  }

  const data = [...store.selectedUser?.users].filter(
    (user) => user.status === "suspend"
  )

  const options = [
    ...data?.map((item) => ({
      label: item.name,
      value: item.id,
      avatar: item.avatar
    }))
  ]

  const defaultValues = {
    id: "",
    username: "",
    password: "",
    name: "",
    avatar: undefined
  }
  const schema = Yup.object({
    username: Yup.string().min(
      8,
      "Too Short - Name must be at least 8 characters long"
    ),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    name: Yup.string().min(
      8,
      "Too Short - Name must be at least 8 characters long"
    )
  })

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={toggleSidebar}
      ></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-4">
        <h1 className="text-center mb-1">Reactivate Account #{id}</h1>
        <p className="text-center">Activate Account to use the University</p>
        <Formik
          initialValues={defaultValues}
          validationSchema={schema}
          onSubmit={async (values) => {
            handleSubmit(values)
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Label
                for="id"
                className="form-label fw-bolder font-size font-small-4 mb-50"
              >
                Activate Account
              </Label>
              <Select
                options={options}
                isClearable={false}
                id="id"
                name="id"
                theme={selectThemeColors}
                className="react-select mb-3"
                classNamePrefix="select"
                components={{
                  Option: OptionComponent
                }}
                onChange={handleSelectAccount}
              />
              {account_id === -1 && (
                <Col>
                  <Row>
                    <Col md="6" className="mb-1">
                      <Label className="form-label" for={`name`}>
                        {t("Name")}
                      </Label>
                      <Field
                        type="text"
                        name={`name`}
                        id={`name`}
                        placeholder="ex. Dr.Moutmad Al Khateeb"
                        className={`form-control ${
                          errors.name && touched.name ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="invalid-feedback"
                      />
                    </Col>
                    <Col md="6" className="mb-1">
                      <Label className="form-label" for={`avatar`}>
                        {t("Profile Picture")}
                      </Label>
                      <FileUploadInput
                        uploadPhoto={(file) => {
                          setFieldValue("avatar", file)
                        }}
                      />
                      <ErrorMessage
                        name="avatar"
                        component="p"
                        className="invalid-feedback"
                      />
                    </Col>
                  </Row>
                  <FormHeader title={t("Login Details")} subtitle={t("")} />

                  <Row>
                    <Col md="6" className="mb-4">
                      <label
                        htmlFor="username"
                        className="form-label form-label"
                      >
                        {t("User Name")}
                      </label>
                      <Field
                        name="username"
                        className={`form-control ${
                          errors.username && touched.username
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={t("nameP")}
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="invalid-feedback"
                      />
                    </Col>
                    <Col md="6" className="mb-1">
                      <label
                        htmlFor="password"
                        className="form-label form-label"
                      >
                        {t("Password")}
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={"*********"}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="invalid-feedback"
                      />
                    </Col>
                  </Row>
                </Col>
              )}
              <div className="d-flex align-content-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center me-2">
                  <Users className="font-medium-2 me-50" />
                  <p className="fw-bolder mb-0"></p>
                </div>
                <Button
                  className="fw-bolder"
                  // onClick={handelAddStudent}
                  outline
                  color="primary"
                  type="submit"
                >
                  <Link className="font-medium-2 me-50" />
                  <span>Link </span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

export default ReactivateAccount
