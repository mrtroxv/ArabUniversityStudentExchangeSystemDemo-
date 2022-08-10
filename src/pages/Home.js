import { Fragment } from "react"
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

const Home = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Home' data={[]} />
      <Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='3' xs='6'>
              <Card>
                <CardBody>
                  Home
                </CardBody>
              </Card>
            </Col>
            <Col lg='6' md='3' xs='6'>
              <Card>
                Home2
              </Card>

            </Col>
            <Col lg='12' md='6' xs='12'>
              <Card>
                Home3
              </Card>

            </Col>
          </Row>
        </Col>
        <Col lg='8' md='12'>
          <Card>
            Home4
          </Card>

        </Col>
      </Row>
      <Row>
        <Col mx="3">
          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
            </CardHeader>
          </Card>
        </Col>
        <Col mx="6">
          <Card>
            <CardHeader>
              <CardTitle>Home</CardTitle>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>

        {/* <Col xs='12' xl='5'>
        <Card>
          <CardHeader>
            <CardTitle>Kick start your project 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>All the best for your new project.</CardText>
            <CardText>
              Please make sure to read our{" "}
              <CardLink
                href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/"
                target="_blank"
              >
                Template Documentation
              </CardLink>{" "}
              to understand where to go from here and how to use our template.
            </CardText>
          </CardBody>
        </Card>

      </Col> */}
        <Col xs='12' xl='5'>
          <Card>
            <CardHeader>
              <CardTitle>Want to integrate JWT? 🔒</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>
                We carefully crafted JWT flow so you can implement JWT with ease and
                with minimum efforts.
              </CardText>
              <CardText>
                Please read our{" "}
                <CardLink
                  href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth"
                  target="_blank"
                >
                  JWT Documentation
                </CardLink>{" "}
                to get more out of JWT authentication.
              </CardText>
            </CardBody>
          </Card>
        </Col>


      </Row>
    </Fragment>

  )
}

export default Home
