import classNames from 'classnames'
import React from 'react'
import './NavBar.scss'

interface Props {
    title: string;
}

export default function NavItem(props: Props) {
    const selected = false;

    return (
        <div id="navitem" className={classNames({ selected })}>
            <span>{props.title}</span>
        </div>
    )
}
