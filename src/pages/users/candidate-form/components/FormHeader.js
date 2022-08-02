import React from 'react'

const FormHeader = (props) => {
    return (
        <div className='content-header'>
            <h5 className='mb-0'>{props.title}</h5>
            <small className='text-muted'>{props.subtitle}</small>
        </div>
    )
}

export default FormHeader