// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { useTranslation } from 'react-i18next'

// // ** Utils
// import { selectThemeColors } from '@utils'

const AccountTabs = ({ data }) => {
  // ** Hooks
  const defaultValues = {
    lastName: '',
    firstName: data.fullName.split(' ')[0]
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const { t } = useTranslation()
  // ** States
  // const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  // const onChange = e => {
  //   const reader = new FileReader(),
  //     files = e.target.files
  //   reader.onload = function () {
  //     setAvatar(reader.result)
  //   }
  //   reader.readAsDataURL(files[0])
  // }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  // const handleImgReset = () => {
  //   setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
  // }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>{t('accountTitle')}</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>

          <Form className='pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  {t('firstName')}
                </Label>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <Input id='firstName' placeholder='John' invalid={errors.firstName && true} {...field} />
                  )}
                />
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  {t('lastName')}
                </Label>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <Input id='lastName' placeholder='Doe' invalid={errors.lastName && true} {...field} />
                  )}
                />
                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  {t('emailAddress')}
                </Label>
                <Input id='emailInput' type='email' name='email' placeholder='Email' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='company'>
                  {t('university')}
                </Label>
                <Input id='company' name='company' placeholder='University Name' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phNumber'>
                  {t('phoneNumber')}
                </Label>
                <Cleave
                  id='phNumber'
                  name='phNumber'
                  className='form-control'
                  placeholder='1 234 567 8900'
                  options={{ phone: true, phoneRegionCode: 'US' }}
                />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  {t('address')}
                </Label>
                <Input id='address' name='address' placeholder='12, Business Park' />
              </Col>

              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  {t('save')}
                </Button>
                <Button color='secondary' outline>
                  {t('cancel')}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <DeleteAccount /> */}
    </Fragment>
  )
}

export default AccountTabs
