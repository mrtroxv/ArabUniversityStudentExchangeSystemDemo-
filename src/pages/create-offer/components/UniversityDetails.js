// ** React Imports
import { Fragment } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from 'reactstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const UniversityDetails = ({ stepper, onSubmit }) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const faxRegExp = /^\+?[0-9]{6,}$/

    const defaultValues = {
        uni_name: '',
        member_name: '',
        member_email: '',
        uni_phone: '',
        uni_fax: ''
    }

    const UniversitySchema = Yup.object().shape({
        uni_name: Yup.string()
            .required('No name provided')
            .min(8, 'Too Short - Name must be at least 8 characters long'),
        member_name: Yup.string()
            .required('No name provided')
            .min(8, 'Too Short - Name must be at least 8 characters long'),
        member_email: Yup.string().email().required('No Email provided'),
        uni_phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('No Phone Number provided'),
        uni_fax: Yup.string().matches(faxRegExp, 'Fax number is not valid').required('No fax Number provided')
    })


    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>University Information</h5>
                <small className='text-muted'>Enter the University and the name of the person in charge.</small>
            </div>
            <Formik
                initialValues={defaultValues}
                validationSchema={UniversitySchema}
                onSubmit={async (values) => {
                    onSubmit(values)
                    stepper.next()
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Row>
                            <Col className='mb-1'>
                                <Label className='form-label' for={`uni_name`}>
                                    University Name
                                </Label>
                                <Field
                                    type='text'
                                    name={`uni_name`}
                                    id={`uni_name`}
                                    placeholder='ex. Palestinian Technical University'
                                    className={`form-control ${errors.uni_name && touched.uni_name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="uni_name" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`member_name`}>
                                    Member Name
                                </Label>
                                <Field
                                    type='text'
                                    name={`member_name`}
                                    id={`member_name`}
                                    placeholder='ex. Dr.Moutmad Al Khateeb'
                                    className={`form-control ${errors.member_name && touched.member_name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="member_name" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`member_email`}>
                                    Member Email
                                </Label>
                                <Field
                                    type='email'
                                    name={`member_email`}
                                    id={`member_email`}
                                    placeholder='ex. m.a.khateeb@teachers.ptuk.edu.ps'
                                    className={`form-control ${errors.member_email && touched.member_email ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="member_email" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <Row>

                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for={`uni_phone`}>
                                    Phone Number
                                </Label>
                                <Field
                                    type='number'
                                    name={`uni_phone`}
                                    id={`uni_phone`}
                                    placeholder='+970-594360110'
                                    className={`form-control ${errors.uni_phone && touched.uni_phone ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="uni_phone" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for={`fax_phone`}>
                                    Fax
                                </Label>
                                <Field
                                    type='number'
                                    name={`uni_fax`}
                                    id={`uni_fax`}
                                    placeholder='09-2945415'
                                    className={`form-control ${errors.uni_fax && touched.uni_fax ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="uni_fax" component='p' className="invalid-feedback" />

                            </Col>

                        </Row>
                        <div className='d-flex justify-content-between'>
                            <Button color='secondary' className='btn-prev' outline disabled>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                            </Button>
                            <Button color='primary' className='btn-next' type='submit'>
                                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>

        </Fragment>
    )
}
export default UniversityDetails
