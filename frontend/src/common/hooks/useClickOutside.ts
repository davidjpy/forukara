import { useRef, useEffect } from 'react';

export const useClickOutside = (handlerFunction: () => void) => {
    const node = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!node?.current?.contains(e.target as HTMLDivElement)) {
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

