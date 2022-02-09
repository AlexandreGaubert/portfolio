import { useState, useCallback, useEffect } from "react";
import { LinePosition } from "../../models";
import { getPositionFromClientRect } from "../../utils";
import './Line.scss';

interface Props {
    skillElement: HTMLElement | null;
    isPageFullyVisible: React.MutableRefObject<boolean>;
}

const idleLinePosition: LinePosition = {
    angle: 0,
    distance: 0,
    left: 0,
    top: 0
}

export default function Line(props: Props) {
    const [linePosition, setLinePosition] = useState<LinePosition>(idleLinePosition);

    function getRelativePositioning(skillElement: HTMLElement, mainCircleElement: HTMLElement) {
        const skillParentTransform = new WebKitCSSMatrix(window.getComputedStyle(skillElement.parentElement as any).transform);
        const skillTransform = new WebKitCSSMatrix(window.getComputedStyle(skillElement).transform);

        const skillPosition = {
            x: skillTransform.m41 + (skillElement.clientWidth / 2),
            y: skillParentTransform.m42 + (skillElement.clientHeight / 2)
        };

        const mainCirclePosition = {
            x: mainCircleElement.offsetLeft,
            y: mainCircleElement.offsetTop
        }

        return { mainCirclePosition, skillPosition };
    }

    function getAbsolutePositioning(skillElement: HTMLElement, mainCircleElement: HTMLElement) {
        const skillPosition = getPositionFromClientRect(skillElement);
        const mainCirclePosition = getPositionFromClientRect(mainCircleElement);

        return { mainCirclePosition, skillPosition };
    }

    const getLineStyling = useCallback(() => {
        const mainCircleElement = document.getElementById('main-circle');
        if (!props.skillElement || !mainCircleElement) {
            console.error('élément non trouvé');
            return idleLinePosition;
        };

        const { skillPosition, mainCirclePosition } = props.isPageFullyVisible.current ?
            getAbsolutePositioning(props.skillElement, mainCircleElement)
            : getRelativePositioning(props.skillElement, mainCircleElement)


        const distance = Math.hypot(mainCirclePosition.x - skillPosition.x, mainCirclePosition.y - skillPosition.y);
        const angle = Math.atan2((mainCirclePosition.y - skillPosition.y), (mainCirclePosition.x - skillPosition.x)) * (180 / Math.PI)
        const lineLeft = ((mainCirclePosition.x + skillPosition.x) / 2) - (distance / 2);
        const lineTop = (mainCirclePosition.y + skillPosition.y) / 2;

        setLinePosition({
            angle,
            distance,
            top: lineTop,
            left: lineLeft
        });
    }, [props.skillElement, props.isPageFullyVisible]);

    useEffect(() => {
        const getLineStylingInterval = setInterval(getLineStyling, 10);

        return () => {
            clearInterval(getLineStylingInterval);
        }
    }, [getLineStyling]);

    return (
        <div
            className="line"
            style={{
                width: linePosition.distance,
                transform: `rotate(${linePosition.angle}deg)`,
                left: linePosition.left + "px",
                top: linePosition.top + 'px'
            }}
        />
    )
}