
import AvatarGroup from '@components/avatar-group'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const TableBasic = (props) => {
    const { t } = useTranslation()

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>{t('viewOfferID')}</th>
                    <th>{t('viewOfferMajor')}</th>
                    <th>{t('viewOfferUniversity')}</th>
                    <th>{t('viewOfferStatus')}</th>
                    <th>{t('viewOfferActions')}</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </Table>
    )
}

export default TableBasic