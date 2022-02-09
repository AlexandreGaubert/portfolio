import classNames from "classnames";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { Skill, SkillPosition, WindowCorner } from "../../models";
import { getElementCorner, getRandomInteger } from "../../utils";
import Line from "../Line/Line";
import './Skill.scss';

export default function SkillComponent(props: Skill) {
    const skillRef = useRef<HTMLImageElement>(null);
    const moveImageInterval = useRef<NodeJS.Timeout | void>();
    const isPageFullyVisible = useRef<boolean>(false);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [skillPosition, setSkillPosition] = useState<SkillPosition>({ left: props.left, top: props.top })

    const windowCorner = useMemo(() => getElementCorner(props.left, props.top), [props.left, props.top])
    const positionning = useMemo(() => ({
        top: windowCorner === WindowCorner.TopLeft || windowCorner === WindowCorner.TopRight ? 0 : undefined,
        left: windowCorner === WindowCorner.TopLeft || windowCorner === WindowCorner.BottomLeft ? 0 : undefined,
        right: windowCorner === WindowCorner.TopRight || windowCorner === WindowCorner.BottomRight ? 0 : undefined,
        bottom: windowCorner === WindowCorner.BottomLeft || windowCorner === WindowCorner.BottomRight ? 0 : undefined
    }), [windowCorner]);

    function toggleHover() {
        setIsHover(hover => !hover);
    }

    const moveSkill = useCallback(() => {
        const minLeft = props.left;
        const maxLeft = props.left + 2;
        const minTop = props.top;
        const maxTop = props.top + 2;

        const left = getRandomInteger(minLeft, maxLeft);
        const top = getRandomInteger(minTop, maxTop);

        setSkillPosition({ left, top });
    }, [props.left, props.top])

    useEffect(() => {
        const pageElement = document.getElementById('competences-page');

        const startMovingObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            if (entries[0]?.isIntersecting) {
                moveImageInterval.current = setInterval(moveSkill, 3000);
                moveSkill();
            } else {
                if (moveImageInterval.current) {
                    moveImageInterval.current = clearInterval(moveImageInterval.current);
                }
            }

        }, { threshold: 0.1 });

        const pageFullyIntersectingOberver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {

            isPageFullyVisible.current = entries[0].isIntersecting;

        }, { threshold: 1 });

        if (pageElement) {
            startMovingObserver.observe(pageElement)
            pageFullyIntersectingOberver.observe(pageElement)
        }
    }, [moveSkill]);

    return (
        <>
            <div
                className="skill"
                style={{
                    height: `${props.size ?? 100}px`,
                    width: `${props.size ?? 100}px`,
                    transform: `translateY(${window.innerHeight * (skillPosition.top / 100)}px)`,
                }}
            >
                <div
                    ref={skillRef}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    style={{
                        transform: `translateX(${window.innerWidth * (skillPosition.left / 100)}px)`,
                        ...positionning
                    }}>
                    <img
                        src={props.logoUrl}
                        height={(props.size ?? 100) - 16}
                        alt={`Logo de la compétence en ${props.title} de Alexandre Gaubert: développeur web en freelance, spécialiste JavaSCript et ReactJS`}
                    />
                    <span className={classNames({ 'title': true, 'visible': isHover })}>{props.title}</span>
                    <span className={classNames({ 'description': true, 'visible': isHover })}>{props.description}</span>
                </div>
            </div>
            {!!moveImageInterval.current &&
                <Line
                    skillElement={skillRef.current}
                    isPageFullyVisible={isPageFullyVisible}
                />
            }
        </>
    );
}
