import { useSkin } from "@hooks/useSkin"
import { Link, useNavigate } from "react-router-dom"

import InputPasswordToggle from "@components/input-password-toggle"
import { Row, Col, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'
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
            <Alert color='primary'>
              <div className='alert-body font-small-2'>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle
                id='login-tip'
                className='position-absolute'
                size={18}
                style={{ top: '10px', right: '10px' }}
              />
              <UncontrolledTooltip target='login-tip' placement='left'>
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert>
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

// export default Login
// // ** React Imports
// import { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// // ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// // ** Third Party Components
// import toast from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { Formik, Field, Form, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { HelpCircle, Coffee, X } from 'react-feather'
// import logo from "@src/assets/images/logo/AARU.png"

// // ** Actions
// import { handleLogin } from '@store/authentication'

// // ** Context
// import { AbilityContext } from '@src/utility/context/Can'

// // ** Custom Components
// import Avatar from '@components/avatar'
// import InputPasswordToggle from '@components/input-password-toggle'

// // ** Utils
// import { getHomeRouteForLoggedInUser } from '@utils'

// // ** Reactstrap Imports
// import { Row, Col, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// // ** Styles
// import '@styles/react/pages/page-authentication.scss'

// const ToastContent = ({ t, name, role }) => {
//   return (
//     <div className='d-flex'>
//       <div className='me-1'>
//         <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
//       </div>
//       <div className='d-flex flex-column'>
//         <div className='d-flex justify-content-between'>
//           <h6>{name}</h6>
//           <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
//         </div>
//         <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
//       </div>
//     </div>
//   )
// }

// // const defaultValues = {
// //   password: 'admin',
// //   loginEmail: 'admin@demo.com'
// // }

// const Login = () => {
//   // ** Hooks
//   const { skin } = useSkin()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const ability = useContext(AbilityContext)

//   const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
//     source = require(`@src/assets/images/pages/${illustration}`).default

//   const onSubmit = data => {
//     console.log(data, Object.values(data))

//     if (Object.values(data).every(field => field.length > 0)) {
//       useJwt
//         .login({ email: data.email, password: data.password })
//         .then(res => {
//           const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
//           dispatch(handleLogin(data))
//           ability.update(res.data.userData.ability)
//           navigate(getHomeRouteForLoggedInUser(data.role))
//           toast(t => (
//             <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
//           ))
//         })
//         .catch(err => console.log(err))
//     } else {
//       for (const key in data) {
//         if (data[key].length === 0) {
//           setError(key, {
//             type: 'manual'
//           })
//         }
//       }
//     }
//   }


//   const SignInSchema = Yup.object().shape({
//     email: Yup.string().email().required('No Email provided'),
//     password: Yup.string()
//       .required('No password provided.')
//       .min(4, 'Password is too short - should be 4 chars minimum.')
//       .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
//   })


//   return (
//     <div className="auth-wrapper auth-cover">
//       <Row className="auth-inner m-0">
//         <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
//           <img src={logo} height='40' />
//           <h2 className="brand-text text-primary ms-1">Internship Manager</h2>
//         </Link>
//         <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
//           <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
//             <img className="img-fluid" src={source} alt="Login Cover" />
//           </div>
//         </Col>
//         <Col
//           className="d-flex align-items-center auth-bg px-2 p-lg-5"
//           lg="4"
//           sm="12"
//         >
//           <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
//             <CardTitle tag="h2" className="fw-bold mb-1">
//               Sign in 👋
//             </CardTitle>
//             <CardText className="mb-2">
//               Please sign-in to your account
//             </CardText>
//             <Alert color='primary'>
//               <div className='alert-body font-small-2'>
//                 <p>
//                   <small className='me-50'>
//                     admin@demo.com | admin
//                   </small>
//                 </p>

//               </div>
//               <HelpCircle
//                 id='login-tip'
//                 className='position-absolute'
//                 size={18}
//                 style={{ top: '10px', right: '10px' }}
//               />
//               <UncontrolledTooltip target='login-tip' placement='left'>
//                 This is just for ACL demo purpose.
//               </UncontrolledTooltip>
//             </Alert>
//             <Formik
//               initialValues={{
//                 email: '',
//                 password: '',
//                 'remember-me': false
//               }}
//               validationSchema={SignInSchema}
//               onSubmit={(values) => {

//                 onSubmit(values)
//               }}
//             >
//               {({ errors, touched }) => (
//                 <Form className="auth-login-form mt-2">
//                   <div className="mb-2">
//                     <Label className="form-label" for="email">
//                       Email
//                     </Label>
//                     <Field
//                       name='email'
//                       id="email"
//                       placeholder='example@example.com'
//                       type="email"
//                       className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
//                       autoFocus
//                     />
//                     <ErrorMessage name="email" component='p' className="invalid-feedback" />
//                   </div>
//                   <div className="mb-2">
//                     <div className="d-flex justify-content-between">
//                       <Label className="form-label" for="password">
//                         Password
//                       </Label>
//                       <Link to="/forgot-password">
//                         <small>Forgot Password?</small>
//                       </Link>
//                     </div>
//                     <Field
//                       name='password'
//                       id='password'
//                       placeholder='············'
//                       className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
//                       type="password"

//                     />
//                     <ErrorMessage name="password" component='p' className="invalid-feedback" />
//                   </div>
//                   <div className="form-check mb-1">
//                     <Field name='remember-me' id='remember-me' type="checkbox" className='form-check-input' />
//                     <Label className="form-check-label" for="remember-me">
//                       Remember Me
//                     </Label>
//                   </div>
//                   <Button type="submit" color="primary" block>
//                     Sign in
//                   </Button>
//                 </Form>
//               )}
//             </Formik>
//           </Col>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default Login
