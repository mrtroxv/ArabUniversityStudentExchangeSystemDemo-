// ** React Imports
import { Fragment } from 'react'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'react-feather'


// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import FormHeader from './FormHeader'


const StudyInformation = ({ stepper, onSubmit }) => {
    const fluencyInEnglishOptions = [
        { value: "Good", label: "Good" },
        { value: "Medium", label: "Medium" },
        { value: "Excellent", label: "Excellent" }
    ]

    const defaultValues = {
        universityName: "",
        college: "",
        universityMajor: "",
        totalCreditHours: "",
        fluencyInEnglish: ""
    }
    const validationSchema = Yup.object({
        universityName: Yup.string().required('No university provided'),
        totalCreditHours: Yup.number().required('No total credit hours provided'),
        college: Yup.string().required('No college provided'),
        universityMajor: Yup.string().required('No university major provided'),
        fluencyInEnglish: Yup.string().oneOf(fluencyInEnglishOptions.map(value => value.value)).required('You have to pick one')

    })


    return (
        <Fragment>
            <FormHeader title="Study information" description="Enter the study information." />
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    onSubmit(values)
                    stepper.next()
                }}
            >
                {({ errors, touched, values }) => (<Form>
                    <Row>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="universityName" className="form-label form-label">University name</label>
                            <Field name="universityName" className={`form-control ${errors.universityName && touched.universityName ? 'is-invalid' : ''}`}
                                placeholder="ex. Palestine Technical University – Kadoorie" />
                            <ErrorMessage name='universityName' component="p" className="invalid-feedback" />
                        </Col>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="college" className="form-label form-label">College</label>
                            <Field name="college" className={`form-control ${errors.college && touched.college ? 'is-invalid' : ''}`} placeholder="ex. Engineering and Technology" />
                            <ErrorMessage name='college' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="universityMajor" className="form-label form-label">University major</label>
                            <Field name="universityMajor" className={`form-control ${errors.universityMajor && touched.universityMajor ? 'is-invalid' : ''}`} placeholder="ex. Computer systems Engineering" />
                            <ErrorMessage name='universityMajor' component="p" className="invalid-feedback" />
                        </Col>
                        <Col md="6" className='mb-1'>
                            <label htmlFor="totalCreditHours" className="form-label form-label">Total credit hours</label>
                            <Field type="number" name="totalCreditHours" className={`form-control ${errors.totalCreditHours && touched.totalCreditHours ? 'is-invalid' : ''}`} placeholder="ex. 144" />
                            <ErrorMessage name='totalCreditHours' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <Row>

                        <Col md="6" className='mb-2'>
                            <label htmlFor="fluencyInEnglish" className="form-label form-label">Fluency in english</label>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                id='fluencyInEnglish'
                                options={fluencyInEnglishOptions}
                                className={`react-select ${errors.fluencyInEnglish && touched.fluencyInEnglish ? 'is-invalid' : ''}`}
                                classNamePrefix='select'
                                onChange={value => { values.fluencyInEnglish = value.value }}

                            />
                            <ErrorMessage name='fluencyInEnglish' component="p" className="invalid-feedback" />
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-between'>
                        <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()}>
                            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button>
                        <Button color='primary' className='btn-next' type='submit'>
                            <span className='align-middle d-sm-inline-block d-none'>Next</span>
                            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                        </Button>
                    </div>

                </Form>)}
            </Formik>
        </Fragment >
    )
}

export default StudyInformation
