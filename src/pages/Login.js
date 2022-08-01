import { useSkin } from "@hooks/useSkin"
import { Link, useNavigate } from "react-router-dom"
import InputPasswordToggle from "@components/input-password-toggle"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button
} from "reactstrap"
import "@styles/react/pages/page-authentication.scss"
import logo from "@src/assets/images/logo/AARU.png"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const { skin } = useSkin()
  const navigate = useNavigate()

  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default


  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required('No Email provided'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  })


  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logo} height='40' />
          <h2 className="brand-text text-primary ms-1">Internship Manager</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Sign in 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account
            </CardText>
            <Formik
              initialValues={{
                email: '',
                password: '',
                'remember-me': false
              }}
              validationSchema={SignInSchema}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500))
                alert(JSON.stringify(values, null, 2))
                navigate('/')
              }}
            >
              {({ errors, touched }) => (
                <Form className="auth-login-form mt-2">
                  <div className="mb-2">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Field
                      name='email'
                      id="email"
                      placeholder='example@example.com'
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      autoFocus
                    />
                    <ErrorMessage name="email" component='p' className="invalid-feedback" />
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="password">
                        Password
                      </Label>
                      <Link to="/forgot-password">
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    <Field
                      name='password'
                      id='password'
                      placeholder='············'
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      type="password"

                    />
                    <ErrorMessage name="password" component='p' className="invalid-feedback" />
                  </div>
                  <div className="form-check mb-1">
                    <Field name='remember-me' id='remember-me' type="checkbox" className='form-check-input' />
                    <Label className="form-check-label" for="remember-me">
                      Remember Me
                    </Label>
                  </div>
                  <Button type="submit" color="primary" block>
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
