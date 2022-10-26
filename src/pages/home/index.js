// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
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

import UserDetails from './components/UserDetails'
import TableBasic from './components/table/Table'
import { useTranslation } from 'react-i18next'
import Active from './components/table/Active'
import Sent from './components/table/Sent'
import Obtained from './components/table/Obtained'
import Owned from './components/table/Owned'
import axios from 'axios'
import OffersFilter from './components/OffersFilter'
import ownedImage from '@src/assets/images/svg/icons8_box.svg'
import sentImage from '@src/assets/images/svg/icons8_paper_plane.svg'
import obtainedImage from '@src/assets/images/svg/icons8_post_office.svg'
import activeImage from '@src/assets/images/svg/icons8_hard_working.svg'

function Home() {
    // eslint-disable-next-line
    const [offersList, setOffersList] = useState([])
    const [offersStatus, setOffersStatus] = useState("pending")
    useEffect(() => {
        axios.get('http://localhost:3500/offer/show_offer', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('accessToken'))
            }
        })
            .then(res => {
                console.log(res.data)
                setOffersList(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const { t } = useTranslation()
    const viewTableHandler = (route) => {
        setOffersStatus(route)
        console.log(offersStatus)
    }
    
    return (
        <Fragment>
            <Breadcrumbs title={`${t('home')}`} data={[]} />
            <Row className='match-height'>
                <Col lg='6' md='12'>
                    <Row className='match-height'>
                        <Col lg='6' md='3' xs='6'>
                            <OffersFilter onView={viewTableHandler} filter="owned" title="ownedOffers" src={ownedImage}/>
                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <OffersFilter onView={viewTableHandler} filter="sent" title="sentOffers" src={sentImage}/>
                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <OffersFilter onView={viewTableHandler} filter="obtained" title="obtainedOffers" src={obtainedImage}/>
                        </Col>
                        <Col lg='6' md='3' xs='6'>
                            <OffersFilter onView={viewTableHandler} filter="active" title="activeOffers" src={activeImage}/>
                        </Col>
                    </Row>
                </Col>
                <Col lg='6' md='12'>
                    <UserDetails />
                </Col>
            </Row>
           
            <Card>
               
            </Card>

        </Fragment>
    )
}

export default Home