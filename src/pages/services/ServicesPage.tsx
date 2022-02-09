import classNames from 'classnames';
import React, { useState } from 'react'
import ServiceComponent from './components/service/Service';
import './ServicesPage.scss';

export interface Service {
    title: string;
    icon: React.ReactNode;
    description: string;
}

const services: Service[] = [
    {
        title: 'migration codebase',
        description: `Votre projet React a de l'historique ?
    
Vous définissez les points stratégiques de votre projet, et je m'occupe de la migration vers les dernières mises à jour.
        `,
        icon: <i className='fa fa-code' />
    },
    {
        title: 'Intégration maquette',
        description: `Votre graphiste a terminé sa maquette et vous cherchez un expert pour l'intégrer ?
        
Je suis là pour l'intégration en mode Pixel Perfect !`,
        icon: <i className='fa fa-edit' />
    },
    {
        title: 'renforcer votre équipe',
        description: `Besoin de renfort sur votre projet ? 

Aucun problème ! Je viens soutenir votre équipe pour des missions à court ou moyen terme.
        `,
        icon: <i className='fa fa-users' />
    },
    {
        title: 'Développement spécifique',
        description: `Besoin d'un composant ou d'une page spécifique ?

Je suis aussi disponible pour du développement ponctuel sur des missions très courtes.
        `,
        icon: <i className='fa fa-laptop-code' />
    },
]

interface Props {
    sectionId: number;
    gotToContact: () => void;
}

export default function ServicesPage(props: Props) {
    const [currentFace, setCurrentFace] = useState<number>(0);
    const MAX_FACE_ID = services.length - 1;

    function handleNextFace() {
        setCurrentFace(currentFace => currentFace + 1 > MAX_FACE_ID ? 0 : currentFace + 1);
    }

    function handlePreviousFace() {
        setCurrentFace(currentFace => currentFace - 1 < 0 ? MAX_FACE_ID : currentFace - 1);
    }

    return (
        <div className="page" id='services-page' data-sectionid={props.sectionId}>
            <div id="services-page-title">Mes services</div>
            <div id="services-container">
                <div className='prev-next-btn' onClick={handlePreviousFace} />
                <div className='prev-next-btn' onClick={handleNextFace} />

                <div id="services" className={classNames({
                    'show-first': currentFace === 0,
                    'show-second': currentFace === 1,
                    'show-third': currentFace === 2,
                    'show-fourth': currentFace === 3,
                })}>
                    {services.map((service, index) =>
                        <ServiceComponent
                            id={`service-${index}`}
                            key={service.title}
                            gotToContact={props.gotToContact}
                            {...service}
                        />
                    )}
                </div>


                <div id="cube-shadow" className={classNames({
                    'show-first': currentFace === 0,
                    'show-second': currentFace === 1,
                    'show-third': currentFace === 2,
                    'show-fourth': currentFace === 3,
                })} />
            </div>
            <div id="dots">
                <div className={classNames({ 'dot': true, selected: currentFace === 0 })} onClick={() => setCurrentFace(0)} />
                <div className={classNames({ 'dot': true, selected: currentFace === 1 })} onClick={() => setCurrentFace(1)} />
                <div className={classNames({ 'dot': true, selected: currentFace === 2 })} onClick={() => setCurrentFace(2)} />
                <div className={classNames({ 'dot': true, selected: currentFace === 3 })} onClick={() => setCurrentFace(3)} />
            </div>
        </div>
    )
}

