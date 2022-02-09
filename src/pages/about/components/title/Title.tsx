import React from 'react'
import './Title.scss';
import profilePic from '../../../../assets/images/profile.jpg';
import TypewriterText from '../../../../components/reusable/TypewritterText/TypewritterText';

const skills = ['ReactJS', 'Typescript', 'Javascript'];

export default function Title() {
    return (
        <div id="title-container">
            <div id="header">
                <div id='profile-pic'>
                    <img
                        alt='Alexandre souriant'
                        src={profilePic}
                    />
                </div>
                <div id="title">
                    <span><strong>Alexandre</strong> Gaubert,</span>
                    <span id="textWithTypewriter">Développeur spécialisé <TypewriterText color='#EB5C68' texts={skills} /></span>
                </div>
            </div>
        </div>
    )
}
