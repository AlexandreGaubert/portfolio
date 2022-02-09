import React, { useCallback, useEffect, useRef, useState } from 'react'
import './TypewritterText.scss';

interface Props {
    texts: string[];
    color?: string;
}

export default function TypewriterText({ texts, color }: Props) {
    const [currentText, setCurrentText] = useState<string>(texts[0]);
    const currentTextRef = useRef<string>(texts[0]);

    const changeText = useCallback(() => {
        setInterval(() => {
            const nextTextIndex = texts.indexOf(currentTextRef.current) + 1;

            if (nextTextIndex > texts.length - 1) {
                setCurrentText(texts[0]);
                currentTextRef.current = texts[0]
            }
            else {
                setCurrentText(texts[nextTextIndex]);
                currentTextRef.current = texts[nextTextIndex]
            }
        }, 3000)
    }, [texts])

    useEffect(() => {
        changeText();
    }, [changeText]);

    return (
        <div className='typewritter'>
            <h1 style={{
                color,
                animation: `typing 3s steps(${currentText.length}, end) infinite, blink .5s step-end infinite`
            }}>
                {currentText}
            </h1>
        </div>
    )
}
