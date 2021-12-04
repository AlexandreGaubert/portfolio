import React from 'react'
import NavItem from './NavItem'
import './NavBar.scss'

export default function NavBar() {
    return (
        <div id='navbar'>
            <NavItem title='à propos' />
            <NavItem title='expérience' />
            <NavItem title='portfolio' />
            <NavItem title='contact' />
        </div>
    )
}
