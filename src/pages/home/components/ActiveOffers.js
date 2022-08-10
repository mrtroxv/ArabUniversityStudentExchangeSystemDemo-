import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

import active from '@src/assets/images/svg/icons8_hard_working.svg'
import { useTranslation } from 'react-i18next'
function ActiveOffers({ onView }) {
    const { t } = useTranslation()
    const onClick = () => {
        onView('active-offers')
    }
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>{t('activeOffers')}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <Button.Ripple color='primary' onClick={onClick}>{t('view')}</Button.Ripple>
                    </Col>
                </Row>
            </CardBody>
            <img className='status-icon' src={active} alt='Medal Pic' />
        </Card>
    )
}

export default ActiveOffers