import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import image from '@src/assets/images/svg/icons8_paper_plane.svg'
function SentOffers({ onView }) {
    const { t } = useTranslation()
    const onClick = () => {

        onView('sent-offers')
    }
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>{t('sentOffers')}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <Button.Ripple color='primary' onClick={onClick}>{t('view')}</Button.Ripple>
                    </Col>
                </Row>
            </CardBody>
            <img className='status-icon' src={image} alt='Medal Pic' />
        </Card>
    )
}

export default SentOffers