import { WindowCorner } from "./models";

export function getPositionFromClientRect(element: HTMLElement) {
    const { top, left, width, height } = element.getBoundingClientRect();

    return {
        x: left + (width / 2),
        y: top + (height / 2)
    }
}

export function getRandomInteger(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

const HALF_MAX_WIDTH = 50;
const HALF_MAX_HEIGHT = 50;

export function getElementCorner(left: number, top: number): WindowCorner {
    if (left > HALF_MAX_WIDTH && top > HALF_MAX_HEIGHT) return WindowCorner.BottomRight;
    if (left < HALF_MAX_WIDTH && top < HALF_MAX_HEIGHT) return WindowCorner.TopLeft;
    if (left < HALF_MAX_WIDTH && top > HALF_MAX_HEIGHT) return WindowCorner.BottomLeft;
    if (left > HALF_MAX_WIDTH && top < HALF_MAX_HEIGHT) return WindowCorner.TopRight;

    return WindowCorner.TopLeft;
}