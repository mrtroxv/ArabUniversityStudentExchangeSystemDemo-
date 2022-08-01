// ** React Imports
import { Fragment } from 'react'

// ** Utils


// ** Third Party Components
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'react-feather'


// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormHeader from './FormHeader'


const ContactInformation = ({ stepper, onSubmit }) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const defaultValues = {
        email: "",
        phone: "",
        address: "",
        passportNumber: "",
        passportExpiryDate: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('No email provided')
            .email("Invalid email address"),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('No Phone Number provided'),
        address: Yup.string()
            .required('No address provided')
            .min(8, 'Too Short - address must be at least 8 characters long'),
        passportNumber: Yup.string()
            .required('No passport number  provided'),
        passportExpiryDate: Yup.date()
            .required('No Date provided')

    })

    return (
        <Fragment>

            <FormHeader title="Contact information" description="Enter the contact information." />

            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    onSubmit(values)
                    stepper.next()
                }}
            >
                {({ errors, touched }) => (<Form>
                    <Row>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="email" className="form-label form-label">Email</label>
                            <Field type="email" name="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                placeholder="ex. aseel1234500000@gmail.com" />
                            <ErrorMessage name='email' component="p" className="invalid-feedback" />
                        </Col>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="phone" className="form-label form-label">Phone</label>
                            <Field type="number" name="phone" className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`} placeholder="ex. 059-774-519" />
                            <ErrorMessage name='phone' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <Row>

                        <Col md="6" className='mb-1'>
                            <label htmlFor="passportNumber" className="form-label form-label">Passport number</label>
                            <Field type="number" name="passportNumber" className={`form-control ${errors.passportNumber && touched.passportNumber ? 'is-invalid' : ''}`} placeholder="ex. 111222333" />
                            <ErrorMessage name='passportNumber' component="p" className="invalid-feedback" />
                        </Col>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="passportExpiryDate" className="form-label form-label">Passport expiry date</label>
                            <Field type="date" name="passportExpiryDate" className={`form-control ${errors.passportNumber && touched.passportNumber ? 'is-invalid' : ''}`} placeholder="ex. 1-1-2024" />
                            <ErrorMessage name='passportExpiryDate' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" className='mb-2'>
                            <label htmlFor="address" className="form-label form-label">Address</label>
                            <Field name="address" className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} placeholder="ex. Jenin" />
                            <ErrorMessage name='address' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-between'>
                        <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()}>
                            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button>
                        <Button type='submit' color='success' className='btn-submit'>
                            <span className='align-middle d-sm-inline-block d-none'>Submit</span>
                        </Button>
                    </div>

                </Form>)}
            </Formik>
        </Fragment >
    )
}

export default ContactInformation
