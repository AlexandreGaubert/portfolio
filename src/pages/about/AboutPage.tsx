import React from 'react'
import Title from './components/title/Title'
import './AboutPage.scss';

interface Props {
    sectionId: number;
}

export default function AboutPage(props: Props) {
    function handleCVDownload() {
        const win = window.open('cv.pdf');

        if (win)
            win.document.title = 'CV Alexandre Gaubert'
    }

    return (
        <div className="page" id="about-page" data-sectionid={props.sectionId}>
            <Title />
            <div onClick={handleCVDownload} id="cv-download-btn">
                <span id="text">Télécharger mon CV</span>
                <i id="icon" className="fa fa-download"></i>
            </div>
            <div id="scrolldown-btn">
                <span className='chevron' />
                <span className='chevron' />
                <span className='chevron' />
            </div>
        </div>
    )
}
