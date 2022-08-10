import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import TableBasic from './Table'

function Owned() {
    return (
        <TableBasic>
            <tr>
                <td>
                    <span className='align-middle fw-bold'>#4</span>
                </td>
                <td>English</td>
                <td>
                    Arabic American University
                </td>
                <td>
                    <Badge pill color='light-warning' className='me-1'>
                        Pending
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
        </TableBasic>
    )
}

export default Owned