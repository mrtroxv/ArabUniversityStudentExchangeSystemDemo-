import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import CandidateInformation from './components/CandidateInformation'
import StudyInformation from './components/StudyInformation'
import ContactInformation from './components/ContactInformation'
import { Col } from 'reactstrap'


const CandidateForm = () => {

    const [stepper, setStepper] = useState(null)
    const ref = useRef(null)

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
            id: 'candidateInformation',
            title: 'Candidate',
            subtitle: 'Enter information',
            content: <CandidateInformation stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'studyInformation',
            title: 'Study information',
            subtitle: 'Enter information',
            content: <StudyInformation stepper={stepper} onSubmit={submitHandler} />
        },
        {
            id: 'contactInformation',
            title: 'Contact',
            subtitle: 'Enter information',
            content: <ContactInformation stepper={stepper} onSubmit={submitHandler} />
        }
    ]
    return (
        <Col md="8">
            <Wizard type='vertical' options={{
                linear: false
            }} instance={(el) => setStepper(el)} ref={ref} steps={steps} />
        </Col>
    )
}

export default CandidateForm
