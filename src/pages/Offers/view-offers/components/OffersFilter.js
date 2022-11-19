import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, CardHeader, CardTitle, CardBody, Col, Row } from 'reactstrap'

const OffersFilter = (props) => {
    const { t } = useTranslation()
    const {onView, filter, src, title} = props
    const onClick = () => {
        onView(filter)
    }
  return (
    <Card className="card-offer-status">
    <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
    </CardHeader>
    <CardBody>
        <Row>
            <Col>
                <Button.Ripple color='primary' onClick={onClick}>{t('view')}</Button.Ripple>
            </Col>
        </Row>
    </CardBody>
    <img className='status-icon' src={src} alt='Medal Pic' />
</Card>
  )
}

export default OffersFilter