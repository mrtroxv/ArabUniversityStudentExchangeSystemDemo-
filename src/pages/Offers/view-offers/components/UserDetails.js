import React from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next'


function UserDetails() {
    const { t } = useTranslation()

    return (
        <Card >
            <CardHeader>
                <CardTitle>{t('userDetails')}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row className="mb-3">
                    <Col>
                        <CardText>University Name</CardText>
                    </Col>
                    <Col>
                        <CardText>User Name</CardText>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <CardText>Email Address</CardText>
                    </Col>
                    <Col>
                        <CardText>Phone Number</CardText>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <CardText>Address Details</CardText>
                    </Col>
                    <Col>
                        <CardText>Country</CardText>
                    </Col>
                </Row>
            </CardBody>

        </Card>
    )
}

export default UserDetails