// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'
import { useTranslation } from 'react-i18next'

// ** Menu Items Array
import MenuItems from '@src/navigation/vertical'

const VerticalLayout = props => {

  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  // send the custom hook to the function and use it
  const { t } = useTranslation()
  const navigation = MenuItems(t)

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
