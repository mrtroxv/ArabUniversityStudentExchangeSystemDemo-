import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import image from '@src/assets/images/svg/icons8_box.svg'
import { useTranslation } from 'react-i18next'

function OwnedOffers({ onView }) {
    const { t } = useTranslation()
    const onClick = () => {
        onView('owned-offers')
    }
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>{t('ownedOffers')}</CardTitle>
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

export default OwnedOffers