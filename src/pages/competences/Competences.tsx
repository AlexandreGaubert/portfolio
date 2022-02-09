import React from 'react'
import profilePic from '../../assets/images/profile.jpg';
import reactLogo from '../../assets/images/logos/react.png';
import typescriptLogo from '../../assets/images/logos/typescript.png';
import nodejsLogo from '../../assets/images/logos/nodejs.png';
import javascriptLogo from '../../assets/images/logos/javascript.png';
import gitLogo from '../../assets/images/logos/git.png';
import './Competences.scss';
import SkillComponent from './components/Skill/Skill';
import { Skill } from './models';

interface Props {
    sectionId: number;
}

const skills: Skill[] = [
    {
        top: 20,
        left: 20,
        description: `Le framework Javascript qu'on ne présente plus, celui avec lequel j'ai appris le développement web.
                
        Fort de près de quatre années d'expérience sur cette technologie front-end, j'en ai fait ma spécialité.`,
        title: 'ReactJS',
        logoUrl: reactLogo,
        size: 125
    },
    {
        top: 80,
        left: 80,
        description: `Typescript est une surcouche de Javascript, il permet d'écrire un code robuste et aide à limiter les erreurs de développement.
                
        Incoutournable, je l'utilise depuis près de trois ans en milieu professionnel.`,
        title: 'Typescript',
        logoUrl: typescriptLogo,
        size: 125
    },
    {
        top: 60,
        left: 15,
        description: `Le framework back-end écrit en JavaScript et très largement utilisé de nos jours. 
                
        Fort d'une expérience personnelle sur cette technologie, j'y suis à l'aise bien que ce n'est pas ma spécialité.`,
        title: 'NodeJS',
        logoUrl: nodejsLogo,
        size: 125
    },
    {
        top: 15,
        left: 80,
        description: `Peu utilisé, il y a encore quelques années, aujourd'hui la quasi-totalité des technologies front-end reposent dessus.
                
        En tant que dévelopeur front, c'est le premier langage que je dois maîtriser.`,
        title: 'JavaScript',
        logoUrl: javascriptLogo
    },
    {
        top: 15,
        left: 55,
        description: `L'incontournable gestionnaire de code source. 
                
        Je m'en suis toujours servi pour tous mes projets en équipe depuis l'école, et jusqu'à aujourd'hui, en milieu professionnel.`,
        title: 'Git',
        logoUrl: gitLogo
    },
]

export default function CompetencesPage(props: Props) {
    return (
        <div className="page" id="competences-page" data-sectionid={props.sectionId}>
            <img
                src={profilePic}
                id="main-circle"
                alt="Alexandre Gaubert, développeur web freelance react javascript, au milieu de ses compétences en typescript, HTML, CSS, react, Git"
            />
            {skills.map(skill =>
                <SkillComponent {...skill} key={skill.title} />
            )}
        </div>
    )
}