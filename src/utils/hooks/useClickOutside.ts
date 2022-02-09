import React, { useCallback, useEffect } from 'react';

export default function useClickOutside(ref: React.MutableRefObject<any>, onClickOutside: (e: MouseEvent) => void) {

    const handleClick = useCallback((e: MouseEvent) => {

        if (!ref.current?.contains(e.target))
            onClickOutside(e);

    }, [ref, onClickOutside]);

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [ref, onClickOutside, handleClick])

    return [ref];
}
