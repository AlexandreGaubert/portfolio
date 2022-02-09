import React from 'react'
import './PortfolioPage.scss';

interface Props {
    sectionId: number;
}

export default function Portfolio(props: Props) {
    return (
        <div id="portfolio-page" className="page" data-sectionid={props.sectionId}>
            
        </div>
    )
}
