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

const OfferWizard = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)

    const [data, setData] = useState({})

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
            title: 'Institute Details',
            subtitle: 'Enter Inst. Details.',
            content: <CompanyDetails stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'candidate-qualifications',
            title: 'Qualifications',
            subtitle: 'Candidate\'s Qualifications.',
            content: <StudentDetails stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'training-details',
            title: 'Training Details',
            subtitle: 'Enter Information.',
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
