import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

import image from '@src/assets/images/svg/icons8_paper_plane.svg'
function SentOffers() {
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>Sent Offers</CardTitle>
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

export default SentOffers