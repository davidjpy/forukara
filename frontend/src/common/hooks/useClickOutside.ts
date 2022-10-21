import { useRef, useEffect } from 'react';

export const useClickOutside = (handlerFunction: () => void) => {
    const node = useRef<HTMLElement>();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!node?.current?.contains(e.target as HTMLLIElement)) {
                handlerFunction();
            }
        }
        window.addEventListener('mousedown', handler);

        return () => {
            window.removeEventListener('mousedown', handler);
        }
    });

    return node;
}

