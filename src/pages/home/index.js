// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import Breadcrumbs from "@components/breadcrumbs"
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Label
} from "reactstrap"

// import TableBasic from './components/table/Table'
import { useTranslation } from "react-i18next"

// import axios from "axios"
import DataTableWithButtons from "../../components/custom/table/ReactTable"
import OfferWizard from "../Offers/create-offer/OfferWizard"
import { dupliateOffer } from "../../redux/project/offers"
import { useForm } from "react-hook-form"
import Spinner from "../../components/custom/loader/Spinner"
import useCols from "./useCols"
import SimpleFormDialog from "../../components/custom/SimpleFormDialog"
import toast from "react-hot-toast"
import { getOffersData } from "../Offers/store"
import { selectUser } from "../../redux/authentication"

function Home() {
  const { register, watch, setValue, getValues } = useForm()
  const { cols, duplicateDialogData, toggleDuplicateDialog } = useCols()
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  const store = useSelector((state) => state.appOffers)
  const isLoading = store.isLoading
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useEffect(() => {
    dispatch(getOffersData())
  }, [dispatch, store.allData?.offers?.length])

  const handleOfferPopUp = () => {
    setFormModal(!formModal)
  }

  const handleCloseDuplicate = () => {
    setValue("duplicate", undefined)
    toggleDuplicateDialog()
  }

  const handleDuplicateOffer = () => {
    const number = getValues("duplicate")
    const { id } = duplicateDialogData
    const uploadData = {
      offer_id: id,
      number
    }
    toast.promise(dispatch(dupliateOffer(uploadData)), {
      loading: "Dupliating...",
      success: "Duplicate offer"
    })
    handleCloseDuplicate()
  }

  const dataToRender = () => {
    const id = watch("id")
    const college = watch("college")
    const major = watch("major")
    console.log(store.allData)
    return store.allData?.offers?.filter((offer) => {
      return (
        offer?.id.toString().includes(id) &&
        offer?.college_name.toLowerCase().includes(college.toLowerCase()) &&
        offer?.major_name.toLowerCase().includes(major.toLowerCase())
      )
    })
  }
  return (
    <Fragment>
      <Breadcrumbs
        title={`${t("home")}`}
        data={[{ title: t("home"), link: "/" }]}
      />

      <Card>
        <CardBody>
          <Row>
            <Col lg="10" md="8">
              <Row>
                <Col lg="4" md="6">
                  <Label key="id">ID :</Label>
                  <input
                    {...register("id")}
                    placeholder="ID"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg="4" md="6">
                  <Label key="college_name">{t("college")} :</Label>
                  <input
                    {...register("college")}
                    placeholder="College"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg="4" md="6">
                  <Label key="major_name">{t("major")} :</Label>
                  <input
                    {...register("major")}
                    placeholder="Major"
                    type="text"
                    className="form-control"
                  />
                </Col>
              </Row>
            </Col>
            {user.role !== "admin" && (
              <Col lg="2" md="4">
                <Button
                  color="primary"
                  className="m-2"
                  onClick={handleOfferPopUp}
                >
                  {t("createOffer")}
                </Button>
              </Col>
            )}
          </Row>
        </CardBody>
        {isLoading && <Spinner />}
        {!isLoading && (
          <DataTableWithButtons data={dataToRender()} columns={cols} />
        )}
      </Card>
      {formModal && (
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader
            toggle={() => setFormModal(!formModal)}
            className="modal-lg"
          >
            {t("createOffer")}
          </ModalHeader>
          <ModalBody>
            <OfferWizard
              outerSubmit={handleOfferPopUp}
              type="modern-horizontal"
              onClose={() => setFormModal(!formModal)}
            />
          </ModalBody>
        </Modal>
      )}
      {duplicateDialogData.isOpen && (
        <SimpleFormDialog
          open={duplicateDialogData.isOpen}
          toggleModal={handleCloseDuplicate}
          handleSubmit={handleDuplicateOffer}
        >
          <Col md="12">
            <Label key="duplicate">{t("Chose a Number")} :</Label>
            <input
              {...register("duplicate")}
              placeholder="#"
              type="number"
              className="form-control"
            />
          </Col>
        </SimpleFormDialog>
      )}
    </Fragment>
  )
}

export default Home
