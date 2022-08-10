import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import image from '@src/assets/images/svg/icons8_post_office.svg'
import { useTranslation } from 'react-i18next'

function ObtainedOffers({ onView }) {
    const { t } = useTranslation()
    const onClick = () => {

        onView('obtained-offers')
    }
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>{t('obtainedOffers')}</CardTitle>
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

export default ObtainedOffers