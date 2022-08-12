// ** React Imports
import { Fragment, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import UniversityDetails from './components/UniversityDetails'
import CompanyDetails from './components/CompanyDetails'
import TrainingDetails from './components/TrainingDetails'
import StudentDetails from './components/StudentDetails'

import { Col, Card } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const OfferWizard = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const [data, setData] = useState({})
    const { t } = useTranslation()
    const submitHandler = (data) => {
        setData((prevData) => {
            return { ...prevData, ...data }
        })
        console.log(data)

    }

    console.log(data)

    const steps = [
        {
            id: 'company-details',
            title: t('instituteTab'),
            subtitle: t('instituteTabSubTitle'),
            content: <CompanyDetails stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'candidate-qualifications',
            title: t('qualificationTab'),
            subtitle: t('qualificationTabSubTitle'),
            content: <StudentDetails stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'training-details',
            title: t('trainingTab'),
            subtitle: t('trainingTabSubTitle'),
            content: <TrainingDetails stepper={stepper} onSubmit={submitHandler} />
        }
    ]

    return (
        <Col md="8" className='vertical-wizard'>
            <Wizard type='vertical' options={{
                linear: false
            }} instance={el => setStepper(el)} ref={ref} steps={steps} />
        </Col>
    )
}

export default OfferWizard
