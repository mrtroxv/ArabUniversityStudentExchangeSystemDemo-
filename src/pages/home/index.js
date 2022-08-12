import React, { Fragment } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardLink,
    Row,
    Col
} from "reactstrap"
import ActiveOffers from './components/ActiveOffers'
import ObtainedOffers from './components/ObtainedOffers'
import OwnedOffers from './components/OwnedOffers'
import UserDetails from './components/UserDetails'
import SentOffers from './components/SentOffers'
import TableBasic from './components/table/Table'
import { useTranslation } from 'react-i18next'
import Active from './components/table/Active'
import Sent from './components/table/Sent'
import Obtained from './components/table/Obtained'
import Owned from './components/table/Owned'

function Home() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const viewTableHandler = (route) => {
        navigate(route)
    }
    return (
        <Fragment>
            <Breadcrumbs title={`${t('home')}`} data={[]} />
            <Row className='match-height'>
                <Col lg='6' md='12'>
                    <Row className='match-height'>
                        <Col lg='6' md='3' xs='6'>
                            <OwnedOffers onView={viewTableHandler} />

                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <SentOffers onView={viewTableHandler} />

                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <ObtainedOffers onView={viewTableHandler} />

                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <ActiveOffers onView={viewTableHandler} />
                        </Col>
                    </Row>
                </Col>
                <Col lg='6' md='12'>
                    <UserDetails />
                </Col>
            </Row>
            {/* <Row>
                <Col> */}
            <Card>
                <Routes>
                    <Route index path='owned-offers' element={<Owned />} />
                    <Route path='sent-offers' element={<Sent />} />
                    <Route path='obtained-offers' element={<Obtained />} />
                    <Route path='active-offers' element={<Active />} />
                </Routes>
            </Card>
            {/* </Col>
            </Row> */}

        </Fragment>
    )
}

export default Home