// ** React Imports
import { Fragment } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils'
// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from 'reactstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'

const StudentDetails = ({ stepper, onSubmit }) => {

    const studentGenderTypes = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Either', label: 'Either' }
    ]
    const studentLevelTypes = [
        { value: 'Starter', label: 'Starter' },
        { value: 'Undergraduate', label: 'Undergraduate' },
        { value: 'Graduate', label: 'Graduate' }
    ]

    const defaultValues = {
        college_name: '',
        branch_name: '',
        major_name: '',
        stu_level: '',
        stu_sex: '',
        other_requirments: ''
    }

    const Schema = Yup.object().shape({
        college_name: Yup.string()
            .required('No College provided')
            .min(8, 'Too Short - College name must be at least 8 characters long'),
        branch_name: Yup.string()
            .required('No branch provided')
            .min(8, 'Too Short - Branch name must be at least 8 characters long'),
        major_name: Yup.string()
            .required('No Email provided')
            .min(8, 'Too Short - Major name must be at least 8 characters long'),
        stu_gender: Yup.string().oneOf(studentGenderTypes.map(value => value.value), 'Student Sex type is not valid').required('You should pick one'),
        stu_level: Yup.string().oneOf(studentLevelTypes.map(value => value.value), 'Student Level is not valid').required('You should pick one'),
        other_requirments: Yup.string()
    })
    const { t } = useTranslation()

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>{t('title')}</h5>
                <small className='text-muted'>{t('subtitle')}</small>
            </div>
            <Formik
                initialValues={defaultValues}
                validationSchema={Schema}
                onSubmit={async (values) => {
                    onSubmit(values)
                    stepper.next()
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`college_name`}>
                                    {t('college')}
                                </Label>
                                <Field
                                    type='text'
                                    name={`college_name`}
                                    id={`college_name`}
                                    placeholder='ex. Engineering and Technology'
                                    className={`form-control ${errors.college_name && touched.college_name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="college_name" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`branch_name`}>
                                    {t('branch')}
                                </Label>
                                <Field
                                    type='text'
                                    name={`branch_name`}
                                    id={`branch_name`}
                                    placeholder='ex. Computer Systems'
                                    className={`form-control ${errors.branch_name && touched.branch_name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="branch_name" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <Row>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`major_name`}>
                                    {t('major')}
                                </Label>
                                <Field
                                    type='text'
                                    name={`major_name`}
                                    id={`major_name`}
                                    placeholder='ex. Software Engineering'
                                    className={`form-control ${errors.major_name && touched.major_name ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="major_name" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`stu_level`}>
                                    {t('status')}
                                </Label>
                                <Select
                                    isClearable={false}
                                    theme={selectThemeColors}
                                    id='stu_level'
                                    options={studentLevelTypes}
                                    className={`react-select ${errors.stu_level && touched.stu_level ? 'is-invalid' : ''}`}
                                    classNamePrefix='select'
                                    onChange={value => { values.stu_level = value.value }}
                                />
                                <ErrorMessage name="stu_level" component='p' className="invalid-feedback" />
                            </Col>

                        </Row>
                        <Row>

                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`stu_gender`}>
                                    {t('gender')}
                                </Label>
                                <Select
                                    isClearable={false}
                                    theme={selectThemeColors}
                                    id='stu_sex'
                                    options={studentGenderTypes}
                                    className={`react-select ${errors.stu_sex && touched.stu_sex ? 'is-invalid' : ''}`}
                                    classNamePrefix='select'
                                    onChange={value => { values.stu_sex = value.value }}
                                />
                                <ErrorMessage name="stu_sex" component='p' className="invalid-feedback" />
                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`other_requirments`}>
                                    {t('other')}
                                </Label>
                                <Field
                                    type='text'
                                    name={`other_requirments`}
                                    id={`other_requirments`}
                                    placeholder='ex. GPA > 85 | 3.0'
                                    className={`form-control ${errors.other_requirments && touched.other_requirments ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="other_requirments" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <div className='d-flex justify-content-between'>
                            <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()}>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>{t('previous')}</span>
                            </Button>
                            <Button color='primary' className='btn-next' type='submit'>
                                <span className='align-middle d-sm-inline-block d-none'>{t('next')}</span>
                                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>

        </Fragment>
    )
}
export default StudentDetails
