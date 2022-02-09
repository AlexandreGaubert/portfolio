import React, { useEffect, useRef, useState } from 'react';
import AboutPage from './pages/about/AboutPage';
import ServicesPage from './pages/services/ServicesPage';
import ContactPage from './pages/contact/ContactPage';
import CompetencesPage from './pages/competences/Competences';
import classNames from 'classnames';
import './index.scss';

const sectionsNames = ["Présentation", "Services", "Compétences", "Contact"]

function diff(x: number, y: number) {
    if (Math.sign(x) === Math.sign(y)) {
        return Math.abs(x - y);
    } else {
        return Math.abs(x) + Math.abs(y);
    };
};

enum ScrollDirection {
    UP,
    DOWN
}

function App() {
    const divRef = useRef<HTMLDivElement>(null);
    const [currentSectionId, setCurrentSectionId] = useState<number>(0);
    const [scrollHeight, setScrollHeight] = useState<number>(0);

    const isScrolling = useRef<boolean>(false);
    const isTouching = useRef<boolean>(false);
    const lastTouchY = useRef<number>(0);

    function moveSection(direction: ScrollDirection) {
        // Si un scroll est en cours on s'arrête
        if (isScrolling.current)
            return;

        // On vérifie d'abord que la section courante n'est pas "scrollable"
        const currentSection = document.querySelector(`div[data-sectionid="${currentSectionId}"]`)
        const canScroll = currentSection && (currentSection.scrollHeight > currentSection.clientHeight);
        const isEndOfScroll = currentSection && (currentSection.scrollTop + (currentSection as any).offsetHeight > currentSection.scrollHeight);

        // Si elle est "scrollable" et qu'elle n'est pas au bout de son scroll, on annule l'event pour laisser le scroll se faire
        if (canScroll && !isEndOfScroll)
            return;

        const maxSectionCount = document.querySelectorAll('.page').length - 1;

        if (direction === ScrollDirection.DOWN) {
            if (currentSectionId === maxSectionCount) return;

            isScrolling.current = true;
            setTimeout(() => isScrolling.current = false, 700)
            setCurrentSectionId(sectionId => sectionId >= maxSectionCount ? sectionId : sectionId + 1);
        } else if (direction === ScrollDirection.UP) {
            if (currentSectionId === 0) return;

            isScrolling.current = true;
            setTimeout(() => isScrolling.current = false, 700)
            setCurrentSectionId(sectionId => sectionId <= 0 ? sectionId : sectionId - 1);
        }
    }

    function handleOnWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (e.deltaY > 0) {
            moveSection(ScrollDirection.DOWN)
        } else if (e.deltaY < 0) {
            moveSection(ScrollDirection.UP)
        }
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        // On veut pouvoir scroller à l'intérieur d'un textarea
        if ((e.target as any).tagName === 'TEXTAREA') {
            return;
        }

        const touchY = e.touches[0].screenY;
        const STEP = 10;

        if (lastTouchY.current === 0 || isTouching.current === false) {
            lastTouchY.current = touchY;
            isTouching.current = true;
            return;
        }

        if (diff(touchY, lastTouchY.current) >= STEP) {
            if (lastTouchY.current - touchY < 0) {
                moveSection(ScrollDirection.UP);
            }

            if (lastTouchY.current - touchY > 0) {
                moveSection(ScrollDirection.DOWN);
            }

            lastTouchY.current = touchY;
        }

    }

    function handleTouchEnd() {
        isTouching.current = false;
    }

    function handleGoToContact() {
        setCurrentSectionId(3);
    }

    useEffect(() => {
        let heightSum = 0;

        for (let index = 0; index < currentSectionId; index++) {
            const section = document.querySelector(`div[data-sectionid="${index}"]`);

            heightSum += section?.getBoundingClientRect()?.height ?? 0;
        }

        setScrollHeight(heightSum);
        isScrolling.current = true;

        setTimeout(() => isScrolling.current = false, 700)
    }, [currentSectionId]);

    return (
        <div className="App">
            <div id="dot-nav">
                {Array(4).fill(" ").map((el, index) =>
                    <div
                        key={index}
                        onClick={() => setCurrentSectionId(index)}
                        className={classNames({
                            'dot': true,
                            'selected': currentSectionId === index
                        })}
                    >
                        <span className='dot-legend'>{sectionsNames[index]}</span>
                    </div>
                )}
            </div>
            <div
                id="main-view"
                ref={divRef}
                onWheel={handleOnWheel}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ transform: `translate3d(0px, ${-scrollHeight}px, 0px)`, transition: 'all .7s ease' }}
            >
                <AboutPage sectionId={0} />
                <ServicesPage sectionId={1} gotToContact={handleGoToContact} />
                <CompetencesPage sectionId={2} />
                <ContactPage sectionId={3} />
            </div>
        </div>
    );
}

export default App;