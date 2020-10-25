import React from 'react'
import NavbarLayout from './NavbarLayout'

function Layout(props) {
    return (
        <React.Fragment>
            <NavbarLayout />
            <div className='container'>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Layout