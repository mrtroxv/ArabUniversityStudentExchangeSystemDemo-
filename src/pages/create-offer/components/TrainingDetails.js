// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button, InputGroup, InputGroupText } from 'reactstrap'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// ** Utils
import { selectThemeColors } from '@utils'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const TrainingDetails = ({ stepper, onsubmit, data }) => {
    const defaultValues = {
        train_description: '',
        train_type: '',
        train_length: '',
        train_start_date: '',
        train_end_date: '',
        support_amount: '',
        support_types: [],
        meals_text: '',
        residence_text: '',
        transfer_text: ''
    }
    const supportTypeOptions = [
        { value: 'Residence', label: 'Residence' },
        { value: 'Food', label: 'Food' },
        { value: 'Transfer', label: 'Transfer' }
    ]
    const trainingTypeOptions = [
        { value: 'Remote', label: 'Remote' },
        { value: 'On-Site', label: 'On-Site' },
        { value: 'On-Field', label: 'On-Field' }
    ]
    const Schema = Yup.object().shape({
        train_description: Yup.string()
            .required('No description provided')
            .min(32, 'Too Short - Description must be at least 32 characters long'),
        train_type: Yup.string()
            .required('You have to pick one')
            .oneOf(trainingTypeOptions.map(type => type.value)),
        train_length: Yup.number().required('No Length provided').min(4, 'Too Short - Length must be at least 4 Weeks'),
        train_start_date: Yup.date().required('No Date provided'),
        train_end_date: Yup.date().required('No Date provided'),
        support_amount: Yup.number().required('No Length provided').min(4, 'Too Short - Length must be at least 4 Weeks'),
        support_type: Yup.array().oneOf(supportTypeOptions.map(value => value.value))
    })

    const { t } = useTranslation()
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>{t('trainingTitle')}</h5>
                <small className='text-muted'>{t('trainingSubTitle')}</small>
            </div>
            <Formik
                initialValues={defaultValues}
                validationSchema={Schema}
                onSubmit={async (values) => {

                    axios.post('http://localhost:3500/offer', {
                        ...data, ...values
                    }, {
                        headers: {
                            authorization: JSON.parse(localStorage.getItem('accessToken'))
                        }
                    }).then((response) => {
                        console.log(response)
                    }).catch((error) => {
                        console.log(error)
                    })
                    onsubmit(values)
                }}
                validateOnChange='true'
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Row>
                            <Col className='mb-1'>
                                <Label className='form-label' for={`train_description`}>
                                    {t('trainingDescription')}
                                </Label>
                                <Field
                                    type='text'
                                    name={`train_description`}
                                    id={`train_description`}
                                    placeholder='More details about the training'
                                    className={`form-control ${errors.train_description && touched.train_description ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="train_description" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`train_type`}>
                                    {t('trainingType')}
                                </Label>
                                <Select
                                    isClearable={false}
                                    theme={selectThemeColors}
                                    id='train_type'
                                    options={trainingTypeOptions}
                                    className={`react-select ${errors.train_type && touched.train_type ? 'is-invalid' : ''}`}
                                    classNamePrefix='select'
                                    onChange={option => { values.train_type = option.value }}
                                />
                                <ErrorMessage name="train_type" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <Row>

                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for={`train_length`}>
                                    {t('trainingLength')}
                                </Label>
                                <Field
                                    type='number'
                                    name={`train_length`}
                                    id={`train_length`}
                                    placeholder='No. of Weeks'
                                    className={`form-control ${errors.train_length && touched.train_length ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="train_length" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='3' className='mb-2'>
                                <Label className='form-label' for={`train_start_date`}>
                                    {t('trainingStartDate')}
                                </Label>
                                <Field
                                    type='date'
                                    name={`train_start_date`}
                                    id={`train_start_date`}
                                    placeholder='DD/MM/YYYY'
                                    className={`form-control ${errors.train_start_date && touched.train_start_date ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="train_start_date" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='3' className='mb-2'>
                                <Label className='form-label' for={`train_end_date`}>
                                    {t('trainingEndDate')}
                                </Label>
                                <Field
                                    type='date'
                                    name={`train_end_date`}
                                    id={`train_end_date`}
                                    placeholder='DD/MM/YYYY'
                                    className={`form-control ${errors.train_end_date && touched.train_end_date ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="train_end_date" component='p' className="invalid-feedback" />

                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-1'>
                                <Label className='form-label' for={`support_amount`}>
                                    {t('trainingSupportAmount')}
                                </Label>
                                <InputGroup className='input-group-merge mb-1'>
                                    <InputGroupText>$</InputGroupText>
                                    <Field
                                        type='number'
                                        name={`support_amount`}
                                        id={`support_amount`}
                                        placeholder='100'
                                        className={`form-control ${errors.support_amount && touched.support_amount ? 'is-invalid' : ''}`}
                                    />
                                </InputGroup>

                                <ErrorMessage name="support_amount" component='p' className="invalid-feedback" />

                            </Col>
                            <Col md='6' className='mb-1'>
                                <Label className='form-label' for={`support_type`}>
                                    {t('trainingSupportFood')}

                                </Label>
                                <Col>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Field name='meals' id='meals' type="checkbox" className='form-check-input' />
                                        </InputGroupText>
                                        <Field name='meals_text' type='text' placeholder='No. of Meals' className={`form-control`} />
                                    </InputGroup>
                                </Col>

                            </Col>

                        </Row>
                        <Row>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for={`support_type`}>
                                    {t('trainingSupportResidence')}

                                </Label>
                                <Col>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Field name='residence' id='residence' type="checkbox" className='form-check-input' />
                                        </InputGroupText>
                                        <Field name='residence_text' type='text' placeholder='Residence details' className={`form-control`} />
                                    </InputGroup>
                                </Col>

                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for={`support_type`}>
                                    {t('trainingSupportTransfer')}

                                </Label>
                                <Col>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Field name='transfer' id='transfer' type="checkbox" className='form-check-input' />
                                        </InputGroupText>
                                        <Field name='transfer_text' type='text' placeholder='Transfer details' className={`form-control`} />
                                    </InputGroup>
                                </Col>

                            </Col>
                        </Row>
                        <div className='d-flex justify-content-between'>
                            <Button color='secondary' className='btn-prev' onClick={() => stepper.previous()}>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>{t('previous')}</span>
                            </Button>
                            <Button type='submit' color='success' className='btn-submit'>
                                <span className='align-middle d-sm-inline-block d-none'>{t('submit')}</span>
                            </Button>
                        </div>

                    </Form>
                )}
            </Formik>

        </Fragment >
    )
}
export default TrainingDetails
