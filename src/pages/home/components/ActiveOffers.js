import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

import active from '@src/assets/images/svg/icons8_hard_working.svg'
function ActiveOffers() {
    return (
        <Card className="card-offer-status">
            <CardHeader>
                <CardTitle>Active Offers</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <Button color='primary'>View</Button>
                    </Col>
                </Row>
            </CardBody>
            <img className='status-icon' src={active} alt='Medal Pic' />
        </Card>
    )
}

export default ActiveOffers