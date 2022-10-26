
import AvatarGroup from '@components/avatar-group'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const TableBasic = () => {
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
            <tr>
                <td>
                    <span className='align-middle fw-bold'>#2</span>
                </td>
                <td>Software Engineering</td>
                <td>
                    Palestinian Technical University
                </td>
                <td>
                    <Badge pill color='light-success' className='me-1'>
                        Completed
                    </Badge>
                </td>
                <td>
                    <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
                            </DropdownItem>
                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
            </tbody>
        </Table>
    )
}

export default TableBasic