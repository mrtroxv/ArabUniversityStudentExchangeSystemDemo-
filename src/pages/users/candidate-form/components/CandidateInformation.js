// ** React Imports
import { Fragment } from 'react'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import * as Yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
// import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Select from 'react-select'
import FormHeader from './FormHeader'


const CandidateInformation = ({ stepper, onSubmit }) => {
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ]

  const defaultValues = {
    name: "",
    id: "",
    gender: "",
    nationality: "",
    birthDate: "",
    birthPlace: ""
  }
  const schema = Yup.object({
    name: Yup.string().required('No name provided')
      .min(8, 'Too Short - Name must be at least 8 characters long'),
    id: Yup.number().required('No id provided'),
    gender: Yup.string().oneOf(genderOptions.map(value => value.value)).required('You have to pick one'),
    nationality: Yup.string().required('No nationality provided'),
    birthDate: Yup.date().required('No birth date provided'),
    birthPlace: Yup.string().required('No birth place provided')

  })


  return (
    <Fragment>
      <FormHeader title="Candidate" description="Enter the candidate information." />
      <Formik
        initialValues={defaultValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          onSubmit(values)
          stepper.next()
        }}
      >
        {({ errors, touched, values }) => (<Form>
          <Row>
            <Col md="6" className='mb-1'>
              <label htmlFor="name" className="form-label form-label">Name</label>
              <Field name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="ex. Assel AlAssel" />
              <ErrorMessage name='name' component="p" className="invalid-feedback" />
            </Col>
            <Col md="6" className='mb-1'>
              <label htmlFor="id" className="form-label form-label">ID</label>
              <Field type="number" name="id" className={`form-control ${errors.id && touched.id ? 'is-invalid' : ''}`}
                placeholder="ex. 201810232" />
              <ErrorMessage name='id' component="p" className="invalid-feedback" />
            </Col>
          </Row>
          <Row>
            <Col md="6" className='mb-1'>
              <label htmlFor="nationality" className="form-label form-label">Nationality</label>
              <Field name="nationality" className={`form-control ${errors.nationality && touched.nationality ? 'is-invalid' : ''}`} placeholder="palestinian" />
              <ErrorMessage name='nationality' component="p" className="invalid-feedback" />
            </Col>
            <Col md="6" className='mb-1'>
              <label htmlFor="gender" className="form-label form-label">Gender</label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                id='gender'
                options={genderOptions}
                className={`react-select ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                classNamePrefix='select'
                onChange={value => { values.gender = value.value }}

              />
              <ErrorMessage name='gender' component="p" className="invalid-feedback" />
            </Col>
          </Row>
          <Row>
            <Col md="6" className='mb-2'>
              <label htmlFor="birthPlace" className="form-label form-label">Birth place</label>
              <Field name="birthPlace" className={`form-control ${errors.birthPlace && touched.birthPlace ? 'is-invalid' : ''}`} placeholder="ex. Ramallah" />
              <ErrorMessage name='birthPlace' component="p" className="invalid-feedback" />
            </Col>
            <Col md="6" className='mb-2'>
              <label htmlFor="birthDate" className="form-label form-label">Birth date</label>
              <Field name="birthDate" className={`form-control ${errors.birthDate && touched.birthDate ? 'is-invalid' : ''}`} placeholder="ex. 8-1-2001" type="date" />
              <ErrorMessage name='birthDate' component="p" className="invalid-feedback" />
            </Col>
          </Row>
          <div className='d-flex justify-content-between'>
            <Button color='secondary' className='btn-prev' outline disabled>
              <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
              <span className='align-middle d-sm-inline-block d-none'>Previous</span>
            </Button>
            <Button type='submit' color='primary' className='btn-next'>
              <span className='align-middle d-sm-inline-block d-none'>Next</span>
              <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
            </Button>
          </div>

        </Form>)}
      </Formik>
    </Fragment >
  )
}

export default CandidateInformation
