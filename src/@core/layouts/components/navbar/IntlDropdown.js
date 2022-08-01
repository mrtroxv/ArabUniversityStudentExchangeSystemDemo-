// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'
import { useRTL } from '@hooks/useRTL'
// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const IntlDropdown = () => {
  // ** Hooks
  const { i18n } = useTranslation()
  const [isRtl, setValue] = useRTL()
  // ** Vars
  const langObj = {
    en: 'English',
    ar: 'Arabic'
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
    console.log(isRtl)
    if (lang === 'ar') {
      setValue(true)
    } else {
      setValue(false)
    }
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className='country-flag flag-icon'
          countryCode={i18n.language === 'en' ? 'us' : 'sa'}
        />
        <span className='selected-language'>{langObj[i18n.language]}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ms-1'>English</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'ar')}>
          <ReactCountryFlag className='country-flag' countryCode='sa' svg />
          <span className='ms-1'>Arabic</span>
        </DropdownItem>

      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
