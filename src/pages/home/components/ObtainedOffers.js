import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import image from '@src/assets/images/svg/icons8_post_office.svg'

function ObtainedOffers() {
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>Obtained Offers</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <Button color='primary'>View</Button>
                    </Col>
                </Row>
            </CardBody>
            <img className='status-icon' src={image} alt='Medal Pic' />

        </Card>
    )
}

export default ObtainedOffers